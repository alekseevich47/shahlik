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

/** Достаёт поле из plain object / Go-map / DynamicModel. */
function fieldOf(obj, key) {
  if (!obj) {
    return undefined
  }
  try {
    if (typeof obj.get === "function") {
      var viaGet = obj.get(key)
      if (viaGet !== undefined && viaGet !== null && viaGet !== "") {
        return viaGet
      }
    }
  } catch (err) {
    // ignore
  }
  try {
    var viaDot = obj[key]
    if (viaDot !== undefined && viaDot !== null && viaDot !== "") {
      return viaDot
    }
  } catch (err2) {
    // ignore
  }
  return undefined
}

function hasAnyField(obj) {
  if (!obj) {
    return false
  }
  if (fieldOf(obj, "action") !== undefined) {
    return true
  }
  if (fieldOf(obj, "order_id") !== undefined) {
    return true
  }
  if (fieldOf(obj, "status") !== undefined) {
    return true
  }
  try {
    for (var k in obj) {
      if (obj.hasOwnProperty && obj.hasOwnProperty(k)) {
        return true
      }
      // Go-map без hasOwnProperty
      if (k) {
        return true
      }
    }
  } catch (err) {
    // ignore
  }
  return false
}

/**
 * Нормализованное тело webhook Frontpad.
 * PB 0.29: bindBody + requestInfo().body + raw JSON (PowerShell/прокси иногда
 * отдают body так, что один из путей пустой).
 */
function readWebhookBody(e) {
  var out = {
    action: "",
    order_id: null,
    status: null,
    source: "empty",
  }

  // 1) bindBody — канон PB 0.23+
  try {
    var bound = new DynamicModel({
      action: "",
      order_id: -0,
      status: -0,
    })
    e.bindBody(bound)
    var boundAction = String(bound.action || "")
    var boundOrderId = Number(bound.order_id)
    // Не путать «поле не пришло» (0) с успешным bind: нужен action или реальный order_id.
    if (boundAction || (!isNaN(boundOrderId) && boundOrderId > 0)) {
      out.action = boundAction
      out.order_id = bound.order_id
      out.status = bound.status
      out.source = "bindBody"
      return out
    }
  } catch (err) {
    // continue
  }

  // 2) requestInfo().body (json / form)
  try {
    var info = e.requestInfo()
    var body = info ? info.body : null
    if (body && typeof body === "object" && hasAnyField(body)) {
      out.action = String(fieldOf(body, "action") || "")
      out.order_id = fieldOf(body, "order_id")
      out.status = fieldOf(body, "status")
      out.source = "requestInfo"
      return out
    }
  } catch (err2) {
    // continue
  }

  // 3) raw body как JSON-строка
  try {
    var raw = ""
    try {
      raw = toString(e.request.body) || ""
    } catch (err3) {
      raw = ""
    }
    if (raw && raw.charAt(0) === "{") {
      var parsed = JSON.parse(raw)
      if (parsed && typeof parsed === "object") {
        out.action = String(parsed.action || "")
        out.order_id = parsed.order_id
        out.status = parsed.status
        out.source = "rawJson"
        return out
      }
    }
  } catch (err4) {
    // ignore
  }

  return out
}

/**
 * Код статуса кассы → наш OrderStatus.
 * Сначала statusMap из настроек, иначе DEFAULT_STATUS_MAP.
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

  var action = body && body.action ? String(body.action) : ""
  if (action !== "change_status") {
    logger.warn(
      "frontpad webhook: skip (no change_status)",
      "source",
      body && body.source ? body.source : "unknown",
      "action",
      action || "(empty)",
    )
    return
  }

  var fpOrderId = Number(body.order_id)
  if (isNaN(fpOrderId)) {
    logger.warn("frontpad webhook: invalid order_id", "raw", String(body.order_id))
    return
  }

  var fpStatusRaw = body.status
  var fpStatus =
    fpStatusRaw !== undefined && fpStatusRaw !== null && fpStatusRaw !== ""
      ? Number(fpStatusRaw)
      : null
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

  logger.info(
    "frontpad webhook: status applied",
    "orderId",
    record.id,
    "frontpadOrderId",
    fpOrderId,
    "fpStatus",
    fpStatus,
    "status",
    nextStatus,
    "source",
    body.source || "",
  )

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
