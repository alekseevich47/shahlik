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
      if (k) {
        return true
      }
    }
  } catch (err) {
    // ignore
  }
  return false
}

function readRawBodyString(e) {
  try {
    return toString(e.request.body) || ""
  } catch (err) {
    return ""
  }
}

/** Разбор application/x-www-form-urlencoded из сырой строки. */
function parseFormBody(raw) {
  var out = { action: "", order_id: null, status: null }
  if (!raw || raw.indexOf("=") < 0) {
    return null
  }
  var parts = String(raw).split("&")
  for (var i = 0; i < parts.length; i++) {
    var pair = parts[i]
    var eq = pair.indexOf("=")
    if (eq < 0) {
      continue
    }
    var key = decodeURIComponent(pair.substring(0, eq).replace(/\+/g, " "))
    var val = decodeURIComponent(pair.substring(eq + 1).replace(/\+/g, " "))
    if (key === "action") {
      out.action = val
    } else if (key === "order_id") {
      out.order_id = val
    } else if (key === "status") {
      out.status = val
    }
  }
  if (!out.action && out.order_id === null && out.status === null) {
    return null
  }
  return out
}

/**
 * Нормализованное тело webhook Frontpad (PB 0.29).
 * Порядок: requestInfo → bindBody → raw JSON → raw form.
 */
function readWebhookBody(e) {
  var out = {
    action: "",
    order_id: null,
    status: null,
    source: "empty",
    rawLen: 0,
  }

  var raw = readRawBodyString(e)
  out.rawLen = raw ? raw.length : 0

  // 1) requestInfo — не потребляет body повторно после bind в некоторых версиях
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
  } catch (err) {
    // continue
  }

  // 2) bindBody
  try {
    var bound = new DynamicModel({
      action: "",
      order_id: -0,
      status: -0,
    })
    e.bindBody(bound)
    var boundAction = String(bound.action || "")
    var boundOrderId = Number(bound.order_id)
    if (boundAction || (!isNaN(boundOrderId) && boundOrderId > 0)) {
      out.action = boundAction
      out.order_id = bound.order_id
      out.status = bound.status
      out.source = "bindBody"
      return out
    }
  } catch (err2) {
    // continue
  }

  // 3) raw JSON
  if (raw && raw.charAt(0) === "{") {
    try {
      var parsed = JSON.parse(raw)
      if (parsed && typeof parsed === "object") {
        out.action = String(parsed.action || "")
        out.order_id = parsed.order_id
        out.status = parsed.status
        out.source = "rawJson"
        return out
      }
    } catch (err3) {
      // continue
    }
  }

  // 4) raw form
  var form = parseFormBody(raw)
  if (form) {
    out.action = String(form.action || "")
    out.order_id = form.order_id
    out.status = form.status
    out.source = "rawForm"
    return out
  }

  return out
}

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

function findOrderByFrontpadId(fpOrderId) {
  var record = null
  try {
    record = $app.findFirstRecordByFilter("orders", "frontpadOrderId = {:id}", {
      id: fpOrderId,
    })
  } catch (err) {
    record = null
  }
  if (record) {
    return record
  }
  // иногда число лежит как строка в сравнении фильтра
  try {
    record = $app.findFirstRecordByFilter("orders", "frontpadOrderId = {:id}", {
      id: String(fpOrderId),
    })
  } catch (err2) {
    record = null
  }
  return record
}

/**
 * @returns {{ applied: boolean, reason: string, orderId?: string, status?: string, fpStatus?: number|null }}
 */
function applyStatusChange(body, fpSettings, config) {
  var logger = $app.logger()
  var action = body && body.action ? String(body.action) : ""

  if (action !== "change_status") {
    var skipMsg =
      "frontpad webhook: skip action=" +
      (action || "(empty)") +
      " source=" +
      (body && body.source ? body.source : "?") +
      " rawLen=" +
      (body && body.rawLen ? body.rawLen : 0)
    logger.warn(skipMsg)
    return {
      applied: false,
      reason: "no_change_status",
      source: body && body.source ? body.source : "empty",
      rawLen: body && body.rawLen ? body.rawLen : 0,
      action: action || "",
    }
  }

  var fpOrderId = Number(body.order_id)
  if (isNaN(fpOrderId)) {
    logger.warn("frontpad webhook: invalid order_id raw=" + String(body.order_id))
    return { applied: false, reason: "invalid_order_id", order_id: body.order_id }
  }

  var fpStatusRaw = body.status
  var fpStatus =
    fpStatusRaw !== undefined && fpStatusRaw !== null && fpStatusRaw !== ""
      ? Number(fpStatusRaw)
      : null
  if (fpStatus !== null && isNaN(fpStatus)) {
    fpStatus = null
  }

  var record = findOrderByFrontpadId(fpOrderId)
  if (!record) {
    logger.warn("frontpad webhook: order not found id=" + fpOrderId)
    return {
      applied: false,
      reason: "order_not_found",
      frontpadOrderId: fpOrderId,
      fpStatus: fpStatus,
    }
  }

  var currentStatus = record.getString("status")
  var nextStatus = currentStatus
  var mapped = null

  if (fpStatus !== null) {
    record.set("frontpadStatus", fpStatus)
  }
  record.set("statusSource", "hook")

  if (fpStatus !== null) {
    mapped = mapFrontpadStatus(fpStatus, fpSettings, config)
    if (mapped && !TERMINAL_STATUSES[currentStatus]) {
      record.set("status", mapped)
      nextStatus = mapped
    } else if (!mapped) {
      logger.warn(
        "frontpad webhook: unmapped status fpStatus=" +
          fpStatus +
          " orderId=" +
          record.id,
      )
    }
  }

  $app.save(record)

  logger.warn(
    "frontpad webhook: applied orderId=" +
      record.id +
      " fpId=" +
      fpOrderId +
      " fpStatus=" +
      fpStatus +
      " status=" +
      nextStatus,
  )

  if (nextStatus === "done" && currentStatus !== "done") {
    try {
      var bonus = require(__hooks + "/lib/bonus.js")
      var fresh = $app.findRecordById("orders", record.id)
      bonus.creditOrderEarn(fresh)
    } catch (err) {
      logger.error("bonus earn webhook failed orderId=" + record.id + " err=" + String(err))
    }
  }

  return {
    applied: true,
    reason: mapped ? "ok" : "saved_fp_status_unmapped",
    orderId: record.id,
    frontpadOrderId: fpOrderId,
    fpStatus: fpStatus,
    status: nextStatus,
    source: body.source || "",
  }
}

function handleStatusWebhook(e) {
  var config = require(__hooks + "/lib/config.js")
  var logger = $app.logger()
  var result = { applied: false, reason: "init" }

  if (!verifyHookToken(e, config)) {
    throw new NotFoundError("")
  }

  try {
    var body = readWebhookBody(e)
    var fpSettings = config.loadFrontpadSettings()
    result = applyStatusChange(body, fpSettings, config)
  } catch (err) {
    logger.error("frontpad status webhook failed err=" + String(err))
    result = { applied: false, reason: "exception", error: String(err) }
  }

  // Всегда 200 для кассы; applied/reason — чтобы руками видеть причину.
  return e.json(200, {
    ok: true,
    applied: !!result.applied,
    reason: result.reason || "",
    source: result.source || "",
    rawLen: result.rawLen || 0,
    action: result.action || "",
    orderId: result.orderId || "",
    frontpadOrderId: result.frontpadOrderId || 0,
    fpStatus: result.fpStatus != null ? result.fpStatus : null,
    status: result.status || "",
  })
}

module.exports = {
  constantTimeEqual: constantTimeEqual,
  handleStatusWebhook: handleStatusWebhook,
  mapFrontpadStatus: mapFrontpadStatus,
}
