/** Пустое значение для datetime-поля PB — именно "", не null. */
var EMPTY_DATETIME = ""

function nowPb() {
  var config = require(__hooks + "/lib/config.js")
  return config.toPbDateTime(new Date())
}

function recordToOrder(record, parseJsonField) {
  var config = require(__hooks + "/lib/config.js")
  var orderLib = require(__hooks + "/lib/order.js")
  var lines = []
  if (typeof orderLib.readStoredLines === "function") {
    lines = orderLib.readStoredLines(record, parseJsonField)
  } else {
    lines = parseJsonField(record.get("lines"), [])
  }
  return {
    id: record.id,
    number: record.getString("number"),
    customer: record.getString("customer"),
    phone: record.getString("phone"),
    mode: record.getString("mode"),
    comment: record.getString("comment") || "",
    couponCode: record.getString("couponCode") || "",
    lines: lines,
    goods: record.getFloat("goods") || 0,
    packFee: record.getFloat("packFee") || 0,
    deliveryFee: record.getFloat("deliveryFee") || 0,
    discount: record.getFloat("discount") || 0,
    total: record.getFloat("total") || 0,
    addressParts: parseJsonField(record.get("addressParts"), null),
    personCount: record.getFloat("personCount") || 0,
    preorderAt: config.readPbDateTime(record, "preorderAt") || null,
  }
}

function createDryRunJob(orderId, maskedPayload) {
  var collection = $app.findCollectionByNameOrId("frontpad_jobs")
  var job = new Record(collection)
  job.set("kind", "send_order")
  job.set("payload", { orderId: orderId })
  job.set("status", "done")
  job.set("result", maskedPayload)
  job.set("attempts", 0)
  job.set("error", "")
  $app.save(job)
  return job.id
}

function patchOrder(orderId, fields) {
  var record = $app.findRecordById("orders", orderId)
  for (var key in fields) {
    if (fields.hasOwnProperty(key)) {
      record.set(key, fields[key])
    }
  }
  $app.save(record)
}

function patchFrontpadSettings(fields) {
  var config = require(__hooks + "/lib/config.js")
  try {
    var record = $app.findRecordById("frontpad_settings", config.SETTINGS_ID)
    for (var key in fields) {
      if (fields.hasOwnProperty(key)) {
        record.set(key, fields[key])
      }
    }
    $app.save(record)
  } catch (err) {
    // settings singleton may be missing in dev
  }
}

function shouldEnqueueResend(error) {
  if (!error) {
    return false
  }
  var code = error.code
  if (code === "invalid_product_keys" || code === "invalid_secret" || code === "missing_secret") {
    return false
  }
  if (code === "network") {
    return false
  }
  if (code === "http_error") {
    return (error.statusCode || 0) >= 500
  }
  return true
}

/**
 * Ставит метку отправки, если заказ ещё не уходил в кассу.
 *
 * Транзакция обязана работать через txApp: обращение к внешнему $app внутри
 * runInTransaction идёт по другому соединению и упирается в write-lock,
 * который держит эта же транзакция — запрос висит до busy timeout.
 *
 * @param {string} orderId
 * @param {boolean} force ручная переотправка: блокирует только заполненный frontpadOrderId
 */
function claimOrderSend(orderId, force) {
  var config = require(__hooks + "/lib/config.js")
  var claimed = false

  $app.runInTransaction(function (txApp) {
    var record = txApp.findRecordById("orders", orderId)

    if (record.getFloat("frontpadOrderId")) {
      return
    }
    if (!force && config.readPbDateTime(record, "sentAt")) {
      return
    }

    record.set("sentAt", config.toPbDateTime(new Date()))
    txApp.save(record)
    claimed = true
  })

  return claimed
}

/** Снимает метку отправки, чтобы заказ можно было отправить повторно. */
function patchSendFailure(orderId, message) {
  try {
    patchOrder(orderId, {
      frontpadError: message,
      sentAt: EMPTY_DATETIME,
    })
  } catch (err) {
    // ignore
  }
}

/**
 * Идемпотентная отправка одного заказа в кассу.
 *
 * @param {string} orderId
 * @param {{ noEnqueue?: boolean, force?: boolean }} [options]
 * @returns {{ sent: boolean, skipped?: boolean, dryRun?: boolean, error?: string, retryable?: boolean }}
 */
function sendOrder(orderId, options) {
  options = options || {}
  var config = require(__hooks + "/lib/config.js")
  var http = require(__hooks + "/lib/http.js")
  var orderLib = require(__hooks + "/lib/order.js")
  var logger = $app.logger()

  if (!claimOrderSend(orderId, !!options.force)) {
    logger.warn("frontpad send skipped: already claimed", "orderId", orderId)
    return { sent: false, skipped: true }
  }

  try {
    var fpSettings = config.loadFrontpadSettings()
    var record = $app.findRecordById("orders", orderId)
    var order = recordToOrder(record, config.parseJsonField)
    var payload = orderLib.buildNewOrderPayload(order, fpSettings)
    var maskedPayload = http.maskSecret(payload)

    if (!payload.product || !payload.product.length) {
      patchSendFailure(
        orderId,
        "Нет позиций для кассы (lines=" + (order.lines ? order.lines.length : 0) + ")",
      )
      logger.error(
        "frontpad send skipped: empty product[]",
        "orderId",
        orderId,
        "linesCount",
        order.lines ? order.lines.length : 0,
      )
      return { sent: false, error: "empty payload" }
    }

    if (!fpSettings.sendEnabled) {
      var dryRunNote = "dry-run"
      try {
        createDryRunJob(orderId, maskedPayload)
      } catch (jobErr) {
        // не роняем dry-run из-за коллекции джобов — payload всё равно виден в логе
        dryRunNote = "dry-run (джоб не создан: " + String(jobErr) + ")"
        logger.error("frontpad dry-run job save failed", "orderId", orderId, "error", String(jobErr))
      }
      // sentAt снимаем: dry-run не должен блокировать реальную отправку потом
      patchOrder(orderId, { frontpadError: dryRunNote, sentAt: EMPTY_DATETIME })
      logger.info(
        "frontpad dry-run",
        "orderId",
        orderId,
        "payload",
        JSON.stringify(maskedPayload),
      )
      return { sent: false, dryRun: true }
    }

    var response = http.call("new_order", payload)

    if (response.ok) {
      var warningsText = http.warningsToText(response.warnings)
      var data = response.data || {}
      patchOrder(orderId, {
        frontpadOrderId: data.order_id ? Number(data.order_id) : 0,
        frontpadOrderNumber: data.order_number ? String(data.order_number) : "",
        frontpadError: warningsText,
      })
      patchFrontpadSettings({
        lastOrderSentAt: nowPb(),
        lastError: warningsText,
      })
      logger.info(
        "frontpad order sent",
        "orderId",
        orderId,
        "fpOrderId",
        data.order_id,
      )
      return { sent: true }
    }

    var error = response.error || { code: "unknown", message: "Ошибка кассы" }
    var errorText = http.errorText(error)

    if (shouldEnqueueResend(error)) {
      patchOrder(orderId, {
        frontpadError: errorText,
        sentAt: EMPTY_DATETIME,
      })
      if (!options.noEnqueue) {
        var jobs = require(__hooks + "/lib/jobs.js")
        // auto: джоб поставлен хуком после неудачной попытки — его берёт cron
        // по бэкоффу, а не немедленный прогон при создании записи
        jobs.enqueueJob("resend_order", { orderId: orderId, auto: true })
      }
      patchFrontpadSettings({ lastError: errorText })
      logger.warn(
        "frontpad send failed, resend queued",
        "orderId",
        orderId,
        "code",
        error.code,
      )
      return { sent: false, error: errorText, retryable: true }
    }

    if (error.code === "network" || error.code === "http_error") {
      patchOrder(orderId, {
        frontpadError: "Ответ кассы не получен, проверьте заказ вручную",
      })
      patchFrontpadSettings({
        lastError: "Ответ кассы не получен, проверьте заказ вручную",
      })
      logger.warn("frontpad send unknown result", "orderId", orderId, "code", error.code)
      return { sent: false, error: errorText }
    }

    patchOrder(orderId, {
      frontpadError: errorText,
      sentAt: EMPTY_DATETIME,
    })
    patchFrontpadSettings({ lastError: errorText })
    return { sent: false, error: errorText }
  } catch (err) {
    var msg = String(err)
    patchSendFailure(orderId, msg)
    logger.error("frontpad send crashed", "orderId", orderId, "error", msg)
    return { sent: false, error: msg }
  }
}

module.exports = {
  sendOrder: sendOrder,
}
