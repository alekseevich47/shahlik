var TERMINAL_STATUSES = {
  done: true,
  canceled: true,
}

function constantTimeEqual(a, b) {
  var left = String(a || "")
  var right = String(b || "")
  if (left.length !== right.length) {
    return false
  }
  var diff = 0
  for (var i = 0; i < left.length; i++) {
    diff |= left.charCodeAt(i) ^ right.charCodeAt(i)
  }
  return diff === 0
}

function readQueryToken(e) {
  try {
    return e.request.url.query().get("token") || ""
  } catch (err) {
    try {
      var info = e.requestInfo()
      if (info && info.query && info.query.token) {
        return String(info.query.token)
      }
    } catch (err2) {
      // ignore
    }
  }
  return ""
}

function verifyHookToken(e, config) {
  var expected = config.getHookToken()
  if (!expected) {
    return false
  }
  return constantTimeEqual(readQueryToken(e), expected)
}

function readWebhookBody(e) {
  try {
    var info = e.requestInfo()
    if (info && info.body && typeof info.body === "object") {
      return info.body
    }
  } catch (err) {
    // ignore
  }
  return {}
}

/**
 * Код статуса кассы → наш OrderStatus.
 * Сначала statusMap из настроек, иначе DEFAULT_STATUS_MAP (чтобы пустая
 * кастомная карта не глушила стандартные 1/3/5/9).
 */
function mapFrontpadStatus(fpStatus, fpSettings, config) {
  var statusKey = String(fpStatus)
  var mapped = null
  if (fpSettings && fpSettings.statusMap && fpSettings.statusMap[statusKey]) {
    mapped = String(fpSettings.statusMap[statusKey])
  }
  if (!mapped && config && config.DEFAULT_STATUS_MAP) {
    mapped = config.DEFAULT_STATUS_MAP[statusKey] || null
  }
  return mapped || null
}

function applyStatusChange(body, fpSettings, config) {
  var logger = $app.logger()

  if (!body || body.action !== "change_status") {
    return
  }

  var fpOrderId = Number(body.order_id)
  if (isNaN(fpOrderId)) {
    logger.warn("frontpad webhook: invalid order_id", "raw", String(body.order_id))
    return
  }

  var fpStatusRaw = body.status
  var fpStatus =
    fpStatusRaw !== undefined && fpStatusRaw !== null ? Number(fpStatusRaw) : null
  if (fpStatus !== null && isNaN(fpStatus)) {
    fpStatus = null
  }

  var record
  try {
    record = $app.findFirstRecordByFilter("orders", "frontpadOrderId = {:id}", {
      id: fpOrderId,
    })
  } catch (err) {
    logger.warn(
      "frontpad webhook: order not found",
      "frontpadOrderId",
      fpOrderId,
      "status",
      fpStatus,
    )
    return
  }

  if (!record) {
    logger.warn(
      "frontpad webhook: order not found",
      "frontpadOrderId",
      fpOrderId,
      "status",
      fpStatus,
    )
    return
  }

  var currentStatus = record.getString("status")
  var nextStatus = currentStatus

  if (fpStatus !== null) {
    record.set("frontpadStatus", fpStatus)
  }

  record.set("statusSource", "hook")

  if (fpStatus !== null) {
    var mapped = mapFrontpadStatus(fpStatus, fpSettings, config)
    if (mapped && !TERMINAL_STATUSES[currentStatus]) {
      record.set("status", mapped)
      nextStatus = mapped
    } else if (!mapped) {
      logger.warn(
        "frontpad webhook: unmapped status code",
        "frontpadOrderId",
        fpOrderId,
        "fpStatus",
        fpStatus,
        "orderId",
        record.id,
      )
    }
  }

  $app.save(record)

  if (nextStatus === "done" && currentStatus !== "done") {
    try {
      var bonus = require(__hooks + "/lib/bonus.js")
      var fresh = $app.findRecordById("orders", record.id)
      bonus.creditOrderEarn(fresh)
    } catch (err) {
      $app.logger().error("bonus earn webhook failed", "orderId", record.id, "error", String(err))
    }
  }
}

function handleStatusWebhook(e) {
  var config = require(__hooks + "/lib/config.js")
  var logger = $app.logger()

  if (!verifyHookToken(e, config)) {
    throw new NotFoundError("")
  }

  try {
    var body = readWebhookBody(e)
    var fpSettings = config.loadFrontpadSettings()
    applyStatusChange(body, fpSettings, config)
  } catch (err) {
    logger.error("frontpad status webhook failed", "error", String(err))
  }

  // Всегда 200: касса не должна ретраить из‑за нашей внутренней ошибки.
  return e.json(200, { ok: true })
}

module.exports = {
  constantTimeEqual: constantTimeEqual,
  handleStatusWebhook: handleStatusWebhook,
  mapFrontpadStatus: mapFrontpadStatus,
}
