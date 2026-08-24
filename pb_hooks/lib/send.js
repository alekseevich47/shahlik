function pad2(n) {
  return n < 10 ? "0" + n : String(n)
}

function formatPbDateTime(d) {
  return (
    d.getFullYear() +
    "-" +
    pad2(d.getMonth() + 1) +
    "-" +
    pad2(d.getDate()) +
    " " +
    pad2(d.getHours()) +
    ":" +
    pad2(d.getMinutes()) +
    ":" +
    pad2(d.getSeconds())
  )
}

function isSentAtSet(raw) {
  return raw !== undefined && raw !== null && raw !== ""
}

function recordToOrder(record, parseJsonField) {
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
    preorderAt: record.get("preorderAt") ? String(record.get("preorderAt")) : null,
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

function claimOrderSend(orderId) {
  var claimed = false
  $app.runInTransaction(function () {
    var record = $app.findRecordById("orders", orderId)
    var fpOrderId = record.get("frontpadOrderId")
    var sentAt = record.get("sentAt")

    if ((fpOrderId && Number(fpOrderId) !== 0) || isSentAtSet(sentAt)) {
      return
    }

    record.set("sentAt", formatPbDateTime(new Date()))
    $app.save(record)
    claimed = true
  })
  return claimed
}

function patchSendFailure(orderId, message) {
  try {
    patchOrder(orderId, {
      frontpadError: message,
      sentAt: null,
    })
  } catch (err) {
    // ignore
  }
}

/**
 * Идемпотентная отправка одного заказа в кассу.
 *
 * @param {string} orderId
 * @param {{ noEnqueue?: boolean }} [options]
 * @returns {{ sent: boolean, skipped?: boolean, dryRun?: boolean, error?: string, retryable?: boolean }}
 */
function sendOrder(orderId, options) {
  options = options || {}
  var config = require(__hooks + "/lib/config.js")
  var http = require(__hooks + "/lib/http.js")
  var orderLib = require(__hooks + "/lib/order.js")
  var logger = $app.logger()

  if (!claimOrderSend(orderId)) {
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
      createDryRunJob(orderId, maskedPayload)
      patchOrder(orderId, { frontpadError: "dry-run" })
      logger.info("frontpad dry-run job saved", "orderId", orderId)
      return { sent: false, dryRun: true }
    }

    var response = http.call("new_order", payload)

    if (response.ok) {
      var warningsText = http.warningsToText(response.warnings)
      var data = response.data || {}
      patchOrder(orderId, {
        frontpadOrderId: data.order_id ? Number(data.order_id) : null,
        frontpadOrderNumber: data.order_number ? String(data.order_number) : "",
        frontpadError: warningsText,
      })
      patchFrontpadSettings({
        lastOrderSentAt: formatPbDateTime(new Date()),
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
    var errorText = error.message || error.code || "Ошибка кассы"

    if (shouldEnqueueResend(error)) {
      patchOrder(orderId, {
        frontpadError: errorText,
        sentAt: null,
      })
      if (!options.noEnqueue) {
        var jobs = require(__hooks + "/lib/jobs.js")
        jobs.enqueueJob("resend_order", { orderId: orderId })
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
      sentAt: null,
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
