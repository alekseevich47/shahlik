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
    if (obj[key] !== undefined && obj[key] !== null && obj[key] !== "") {
      return obj[key]
    }
  } catch (err2) {
    // ignore
  }
  return undefined
}

function hasHookFields(obj) {
  return (
    fieldOf(obj, "action") !== undefined ||
    fieldOf(obj, "order_id") !== undefined ||
    fieldOf(obj, "status") !== undefined
  )
}

function readRawBodyString(e) {
  try {
    if (typeof readerToString === "function") {
      return readerToString(e.request.body) || ""
    }
  } catch (err) {
    // ignore
  }
  try {
    return toString(e.request.body) || ""
  } catch (err2) {
    return ""
  }
}

function parseFormBody(raw) {
  if (!raw || raw.indexOf("=") < 0) {
    return null
  }
  var out = { action: "", order_id: null, status: null }
  var parts = String(raw).split("&")
  for (var i = 0; i < parts.length; i++) {
    var pair = parts[i]
    var eq = pair.indexOf("=")
    if (eq < 0) {
      continue
    }
    var key = pair.substring(0, eq)
    var val = pair.substring(eq + 1)
    try {
      key = decodeURIComponent(key.replace(/\+/g, " "))
      val = decodeURIComponent(val.replace(/\+/g, " "))
    } catch (err) {
      // keep raw
    }
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

function fillFromObject(out, obj, source) {
  out.action = String(fieldOf(obj, "action") || "")
  out.order_id = fieldOf(obj, "order_id")
  out.status = fieldOf(obj, "status")
  out.source = source
  return out
}

/**
 * Без DynamicModel/bindBody — на PB 0.29 bindBody даёт exception/panic.
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

  // 1) уже распарсенный requestInfo.body
  try {
    var info = e.requestInfo()
    var body = info ? info.body : null
    if (body && typeof body === "object" && hasHookFields(body)) {
      return fillFromObject(out, body, "requestInfo")
    }
  } catch (err) {
    out.readInfoError = String(err)
  }

  // 2) raw JSON
  if (raw && raw.charAt(0) === "{") {
    try {
      var parsed = JSON.parse(raw)
      if (parsed && typeof parsed === "object") {
        return fillFromObject(out, parsed, "rawJson")
      }
    } catch (err2) {
      out.readJsonError = String(err2)
    }
  }

  // 3) raw form
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
  try {
    record = $app.findFirstRecordByFilter("orders", "frontpadOrderId = {:id}", {
      id: String(fpOrderId),
    })
  } catch (err2) {
    record = null
  }
  return record
}

function applyStatusChange(body, fpSettings, config) {
  var action = body && body.action ? String(body.action) : ""
  if (action !== "change_status") {
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
    return {
      applied: false,
      reason: "invalid_order_id",
      order_id: body.order_id,
      rawLen: body.rawLen || 0,
      source: body.source || "",
    }
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
    return {
      applied: false,
      reason: "order_not_found",
      frontpadOrderId: fpOrderId,
      fpStatus: fpStatus,
      rawLen: body.rawLen || 0,
      source: body.source || "",
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
    }
  }

  $app.save(record)

  if (nextStatus === "done" && currentStatus !== "done") {
    try {
      var bonus = require(__hooks + "/lib/bonus.js")
      var fresh = $app.findRecordById("orders", record.id)
      bonus.creditOrderEarn(fresh)
    } catch (err) {
      console.log("bonus earn webhook failed: " + String(err))
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
    rawLen: body.rawLen || 0,
  }
}

function jsonResult(extra) {
  var base = {
    ok: true,
    applied: false,
    reason: "",
    source: "",
    rawLen: 0,
    action: "",
    orderId: "",
    frontpadOrderId: 0,
    fpStatus: null,
    status: "",
    error: "",
    step: "",
  }
  for (var k in extra) {
    if (extra.hasOwnProperty(k)) {
      base[k] = extra[k]
    }
  }
  return base
}

function handleStatusWebhook(e) {
  var config
  var body
  var fpSettings
  var result

  try {
    config = require(__hooks + "/lib/config.js")
  } catch (err) {
    return e.json(200, jsonResult({ reason: "exception", step: "require_config", error: String(err) }))
  }

  if (!verifyHookToken(e, config)) {
    throw new NotFoundError("")
  }

  try {
    body = readWebhookBody(e)
  } catch (err) {
    console.log("frontpad webhook readBody error: " + String(err))
    return e.json(
      200,
      jsonResult({ reason: "exception", step: "readBody", error: String(err) }),
    )
  }

  try {
    fpSettings = config.loadFrontpadSettings()
  } catch (err) {
    console.log("frontpad webhook settings error: " + String(err))
    return e.json(
      200,
      jsonResult({
        reason: "exception",
        step: "settings",
        error: String(err),
        rawLen: body.rawLen || 0,
        source: body.source || "",
      }),
    )
  }

  try {
    result = applyStatusChange(body, fpSettings, config)
  } catch (err) {
    console.log("frontpad webhook apply error: " + String(err))
    return e.json(
      200,
      jsonResult({
        reason: "exception",
        step: "apply",
        error: String(err),
        rawLen: body.rawLen || 0,
        source: body.source || "",
        action: body.action || "",
      }),
    )
  }

  console.log(
    "frontpad webhook result applied=" +
      result.applied +
      " reason=" +
      result.reason +
      " source=" +
      (result.source || "") +
      " rawLen=" +
      (result.rawLen || 0),
  )

  return e.json(
    200,
    jsonResult({
      applied: !!result.applied,
      reason: result.reason || "",
      source: result.source || "",
      rawLen: result.rawLen || 0,
      action: result.action || body.action || "",
      orderId: result.orderId || "",
      frontpadOrderId: result.frontpadOrderId || 0,
      fpStatus: result.fpStatus != null ? result.fpStatus : null,
      status: result.status || "",
      step: "done",
      error: "",
    }),
  )
}

module.exports = {
  constantTimeEqual: constantTimeEqual,
  handleStatusWebhook: handleStatusWebhook,
  mapFrontpadStatus: mapFrontpadStatus,
}
