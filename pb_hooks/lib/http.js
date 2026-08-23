var WARNING_KEYS = [
  "invalid_certificate",
  "invalid_datetime",
  "invalid_format",
  "too_long_period",
  "invalid_product_keys",
  "invalid_tags",
  "invalid_hook_status",
]

var DEFAULT_TIMEOUT_MS = 8000

function isEmpty(value) {
  return value === undefined || value === null || value === ""
}

function formEncode(params) {
  var parts = []

  function appendPair(key, value) {
    if (isEmpty(value)) {
      return
    }
    parts.push(encodeURIComponent(key) + "=" + encodeURIComponent(String(value)))
  }

  function encodeValue(key, value) {
    if (isEmpty(value)) {
      return
    }

    if (value && typeof value.length === "number" && typeof value !== "string") {
      for (var i = 0; i < value.length; i++) {
        if (!isEmpty(value[i])) {
          appendPair(key + "[" + i + "]", value[i])
        }
      }
      return
    }

    if (typeof value === "object") {
      for (var subKey in value) {
        if (!value.hasOwnProperty(subKey)) {
          continue
        }
        if (!isEmpty(value[subKey])) {
          appendPair(key + "[" + subKey + "]", value[subKey])
        }
      }
      return
    }

    appendPair(key, value)
  }

  if (!params) {
    return ""
  }

  for (var name in params) {
    if (!params.hasOwnProperty(name)) {
      continue
    }
    encodeValue(name, params[name])
  }

  return parts.join("&")
}

function extractWarnings(data) {
  var warnings = []
  if (!data || typeof data !== "object") {
    return warnings
  }

  for (var i = 0; i < WARNING_KEYS.length; i++) {
    var key = WARNING_KEYS[i]
    if (data[key] !== undefined && data[key] !== null && data[key] !== "") {
      warnings.push({ key: key, value: data[key] })
    }
  }

  if (data.warnings && typeof data.warnings === "object") {
    for (var wKey in data.warnings) {
      if (data.warnings.hasOwnProperty(wKey)) {
        warnings.push({ key: wKey, value: data.warnings[wKey] })
      }
    }
  }

  return warnings
}

function warningsToText(warnings) {
  if (!warnings || !warnings.length) {
    return ""
  }
  var chunks = []
  for (var i = 0; i < warnings.length; i++) {
    var item = warnings[i]
    chunks.push(item.key + ": " + JSON.stringify(item.value))
  }
  return chunks.join("; ")
}

function maskSecret(value) {
  if (value === undefined || value === null) {
    return value
  }

  if (typeof value === "string") {
    if (value.indexOf("secret=") >= 0) {
      return value.replace(/secret=[^&]*/g, "secret=***")
    }
    return value
  }

  if (typeof value !== "object") {
    return value
  }

  if (value && typeof value.length === "number" && typeof value !== "string") {
    var arr = []
    for (var i = 0; i < value.length; i++) {
      arr.push(maskSecret(value[i]))
    }
    return arr
  }

  var out = {}
  for (var key in value) {
    if (!value.hasOwnProperty(key)) {
      continue
    }
    if (key === "secret") {
      out[key] = "***"
    } else {
      out[key] = maskSecret(value[key])
    }
  }
  return out
}

/**
 * @param {string} method
 * @param {Object} params
 * @param {{ timeout?: number }} [options]
 * @returns {{ ok: boolean, data: Object|null, error: Object|null, warnings: Array }}
 */
function call(method, params, options) {
  var config = require(__hooks + "/lib/config.js")
  var secret = config.getSecret()
  var apiUrl = config.getApiUrl()
  var timeout = (options && options.timeout) || DEFAULT_TIMEOUT_MS

  if (!secret) {
    return {
      ok: false,
      data: null,
      error: { code: "missing_secret", message: "FRONTPAD_SECRET не задан" },
      warnings: [],
    }
  }

  var payload = {}
  if (params) {
    for (var key in params) {
      if (params.hasOwnProperty(key) && key !== "secret") {
        payload[key] = params[key]
      }
    }
  }
  payload.secret = secret

  var url = apiUrl + "?" + method
  var body = formEncode(payload)

  try {
    var response = $http.send({
      url: url,
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      timeout: timeout,
    })

    if (!response || response.statusCode < 200 || response.statusCode >= 300) {
      var statusCode = response ? response.statusCode : 0
      return {
        ok: false,
        data: null,
        error: {
          code: "http_error",
          message: "HTTP " + statusCode,
          statusCode: statusCode,
        },
        warnings: [],
      }
    }

    var data = JSON.parse(response.raw)

    if (data.result === "error") {
      return {
        ok: false,
        data: maskSecret(data),
        error: {
          code: data.error || "unknown",
          message: data.description || data.error || "Ошибка кассы",
        },
        warnings: [],
      }
    }

    var warnings = extractWarnings(data)
    return {
      ok: true,
      data: maskSecret(data),
      error: null,
      warnings: warnings,
    }
  } catch (err) {
    return {
      ok: false,
      data: null,
      error: {
        code: "network",
        message: String(err),
      },
      warnings: [],
    }
  }
}

module.exports = {
  DEFAULT_TIMEOUT_MS: DEFAULT_TIMEOUT_MS,
  formEncode: formEncode,
  call: call,
  maskSecret: maskSecret,
  extractWarnings: extractWarnings,
  warningsToText: warningsToText,
}
