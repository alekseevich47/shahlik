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

function applyStatusChange(body, fpSettings) {
  if (!body || body.action !== "change_status") {
    return
  }

  var fpOrderId = Number(body.order_id)
  if (isNaN(fpOrderId)) {
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
    return
  }

  if (!record) {
    return
  }

  var currentStatus = record.getString("status")

  if (fpStatus !== null) {
    record.set("frontpadStatus", fpStatus)
  }

  record.set("statusSource", "hook")

  if (fpStatus !== null) {
    var statusKey = String(fpStatus)
    var mapped = fpSettings.statusMap ? fpSettings.statusMap[statusKey] : null
    if (mapped && !TERMINAL_STATUSES[currentStatus]) {
      record.set("status", mapped)
    }
  }

  $app.save(record)
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
    applyStatusChange(body, fpSettings)
  } catch (err) {
    logger.error("frontpad status webhook failed", "error", String(err))
  }

  return e.json(200, { ok: true })
}

module.exports = {
  constantTimeEqual: constantTimeEqual,
  handleStatusWebhook: handleStatusWebhook,
}
