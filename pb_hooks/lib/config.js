/// @typedef {Object} SiteSettings
/// @property {string} id
/// @property {number} packFee
/// @property {number} deliveryFee
/// @property {number} freeDeliveryFrom
/// @property {number} minOrder
/// @property {boolean} acceptingOrders
/// @property {string} stopMessage
/// @property {string} address

/// @typedef {Object} FrontpadSettingsRecord
/// @property {string} id
/// @property {boolean} sendEnabled
/// @property {boolean} syncEnabled
/// @property {string} payCodePickup
/// @property {string} payCodeDelivery
/// @property {string} channel
/// @property {string} affiliate
/// @property {string} point
/// @property {string[]} orderTags
/// @property {number[]} hookStatuses
/// @property {Object.<string, string>} statusMap
/// @property {string} hookUrl
/// @property {boolean} sendPrices
/// @property {string} articlePack
/// @property {string} articleDelivery
/// @property {number} retryLimit
/// @property {string} lastError
/// @property {string|null} lastProductsSyncAt
/// @property {string|null} lastStopsSyncAt
/// @property {string|null} lastOrderSentAt

var SETTINGS_ID = "main"

var DEFAULT_API_URL = "https://app.frontpad.ru/api/index.php"

/** @type {Object.<string, string>} */
var DEFAULT_STATUS_MAP = {
  "1": "cooking",
  "3": "delivering",
  "5": "done",
  "9": "canceled",
}

var SITE_DEFAULTS = {
  packFee: 24,
  deliveryFee: 149,
  freeDeliveryFrom: 800,
  minOrder: 0,
  acceptingOrders: true,
  stopMessage: "Сейчас заказы не принимаем",
  address: "",
}

function getSecret() {
  return $os.getenv("FRONTPAD_SECRET") || ""
}

function getHookToken() {
  return $os.getenv("FRONTPAD_HOOK_TOKEN") || ""
}

function getApiUrl() {
  var url = $os.getenv("FRONTPAD_API_URL")
  if (url && String(url).length > 0) {
    return String(url)
  }
  return DEFAULT_API_URL
}

function parseJsonField(raw, fallback) {
  if (raw === undefined || raw === null || raw === "") {
    return fallback
  }
  if (typeof raw === "object") {
    return raw
  }
  try {
    return JSON.parse(String(raw))
  } catch (err) {
    return fallback
  }
}

function isArrayLike(value) {
  return Boolean(value) && typeof value === "object" && typeof value.length === "number"
}

/** Goja часто отдаёт JSON-поле как срез байт ASCII (`[91,51,…]` = `"[3,…"`). */
function decodeByteJson(value) {
  if (!isArrayLike(value) || !value.length) {
    return undefined
  }
  var s = ""
  for (var i = 0; i < value.length; i++) {
    var c = value[i]
    if (typeof c !== "number" || c !== Math.floor(c) || c < 9 || c > 126) {
      return undefined
    }
    s += String.fromCharCode(c)
  }
  var t = s.replace(/^\s+|\s+$/g, "")
  if (t.charAt(0) !== "[" && t.charAt(0) !== "{") {
    return undefined
  }
  return parseJsonField(t, [])
}

function coerceJsonArray(raw) {
  var parsed = parseJsonField(raw, null)
  if (typeof parsed === "string") {
    var t = parsed.replace(/^\s+|\s+$/g, "")
    if (t.charAt(0) === "[") {
      parsed = parseJsonField(t, [])
    } else if (t.indexOf(",") >= 0) {
      parsed = t.split(",")
    } else {
      parsed = t ? [t] : []
    }
  }
  var fromBytes = decodeByteJson(parsed)
  if (fromBytes !== undefined) {
    parsed = fromBytes
  }
  if (!isArrayLike(parsed)) {
    return []
  }
  var out = []
  for (var i = 0; i < parsed.length; i++) {
    out.push(parsed[i])
  }
  return out
}

function toStringArray(raw) {
  var parsed = coerceJsonArray(raw)
  var out = []
  for (var i = 0; i < parsed.length; i++) {
    if (parsed[i] !== undefined && parsed[i] !== null && String(parsed[i]).length > 0) {
      out.push(String(parsed[i]).trim())
    }
  }
  return out
}

function toNumberArray(raw) {
  var parsed = coerceJsonArray(raw)
  var out = []
  for (var i = 0; i < parsed.length; i++) {
    var n = Number(parsed[i])
    if (!isNaN(n)) {
      out.push(n)
    }
  }
  return out
}

function toStatusMap(raw) {
  var parsed = parseJsonField(raw, null)
  if (!parsed || typeof parsed !== "object") {
    var copy = {}
    for (var key in DEFAULT_STATUS_MAP) {
      if (DEFAULT_STATUS_MAP.hasOwnProperty(key)) {
        copy[key] = DEFAULT_STATUS_MAP[key]
      }
    }
    return copy
  }
  var map = {}
  for (var code in parsed) {
    if (parsed.hasOwnProperty(code)) {
      map[String(code)] = String(parsed[code])
    }
  }
  return map
}

function pad2(n) {
  return n < 10 ? "0" + n : String(n)
}

/**
 * Дата → строка для datetime-поля PocketBase.
 * PB парсит "YYYY-MM-DD HH:MM:SS" как UTC, поэтому берём UTC-компоненты:
 * с локальными зона уезжает и фильтры по created/updated врут.
 */
function toPbDateTime(d) {
  return (
    d.getUTCFullYear() +
    "-" +
    pad2(d.getUTCMonth() + 1) +
    "-" +
    pad2(d.getUTCDate()) +
    " " +
    pad2(d.getUTCHours()) +
    ":" +
    pad2(d.getUTCMinutes()) +
    ":" +
    pad2(d.getUTCSeconds())
  )
}

/**
 * Чтение datetime-поля записи.
 * record.get() для datetime отдаёт Go-объект types.DateTime — он truthy даже
 * когда пустой, поэтому сравнивать с "" / null нельзя. getString() у нулевого
 * DateTime даёт "".
 */
function readPbDateTime(record, name) {
  try {
    var s = record.getString(name)
    if (s !== undefined && s !== null && String(s) !== "") {
      return String(s)
    }
  } catch (err) {
    // поле может быть не datetime
  }
  try {
    var raw = record.get(name)
    if (raw === undefined || raw === null) {
      return ""
    }
    var text = String(raw)
    if (text === "" || text === "[object Object]" || text.indexOf("0001-01-01") === 0) {
      return ""
    }
    return text
  } catch (err2) {
    return ""
  }
}

/**
 * "YYYY-MM-DD HH:MM:SS[.mmm]Z" → ms.
 * Такой формат отдаёт PocketBase, но не парсит new Date() в Goja — нужен ISO.
 */
function parsePbDateTimeMs(raw) {
  if (raw === undefined || raw === null || raw === "") {
    return null
  }
  var s = String(raw).trim()
  if (s === "" || s === "[object Object]" || s.indexOf("0001-01-01") === 0) {
    return null
  }
  s = s.replace(" ", "T")
  if (s.charAt(s.length - 1) !== "Z" && s.indexOf("+") < 0) {
    s = s + "Z"
  }
  var ms = new Date(s).getTime()
  return isNaN(ms) ? null : ms
}

function readDateField(record, name) {
  var value = readPbDateTime(record, name)
  return value ? value : null
}

/** @returns {SiteSettings} */
function loadSettings() {
  try {
    var record = $app.findRecordById("settings", SETTINGS_ID)
    return {
      id: record.id,
      packFee: record.getFloat("packFee") || SITE_DEFAULTS.packFee,
      deliveryFee: record.getFloat("deliveryFee") || SITE_DEFAULTS.deliveryFee,
      freeDeliveryFrom: record.getFloat("freeDeliveryFrom") || SITE_DEFAULTS.freeDeliveryFrom,
      minOrder: record.getFloat("minOrder") || SITE_DEFAULTS.minOrder,
      acceptingOrders: record.getBool("acceptingOrders"),
      stopMessage: record.getString("stopMessage") || SITE_DEFAULTS.stopMessage,
      address: record.getString("address") || SITE_DEFAULTS.address,
    }
  } catch (err) {
    return {
      id: SETTINGS_ID,
      packFee: SITE_DEFAULTS.packFee,
      deliveryFee: SITE_DEFAULTS.deliveryFee,
      freeDeliveryFrom: SITE_DEFAULTS.freeDeliveryFrom,
      minOrder: SITE_DEFAULTS.minOrder,
      acceptingOrders: SITE_DEFAULTS.acceptingOrders,
      stopMessage: SITE_DEFAULTS.stopMessage,
      address: SITE_DEFAULTS.address,
    }
  }
}

/** @returns {FrontpadSettingsRecord} */
function loadFrontpadSettings() {
  try {
    var record = $app.findRecordById("frontpad_settings", SETTINGS_ID)
    var retryLimit = record.getFloat("retryLimit")
    if (!retryLimit || retryLimit < 1) {
      retryLimit = 5
    }
    return {
      id: record.id,
      sendEnabled: record.getBool("sendEnabled"),
      syncEnabled: record.getBool("syncEnabled"),
      payCodePickup: record.getString("payCodePickup") || "",
      payCodeDelivery: record.getString("payCodeDelivery") || "",
      channel: record.getString("channel") || "",
      affiliate: record.getString("affiliate") || "",
      point: record.getString("point") || "",
      orderTags: toStringArray(record.get("orderTags")),
      hookStatuses: toNumberArray(record.get("hookStatuses")),
      statusMap: toStatusMap(record.get("statusMap")),
      hookUrl: record.getString("hookUrl") || "",
      sendPrices: record.getBool("sendPrices"),
      articlePack: record.getString("articlePack") || "",
      articleDelivery: record.getString("articleDelivery") || "",
      retryLimit: retryLimit,
      lastError: record.getString("lastError") || "",
      lastProductsSyncAt: readDateField(record, "lastProductsSyncAt"),
      lastStopsSyncAt: readDateField(record, "lastStopsSyncAt"),
      lastOrderSentAt: readDateField(record, "lastOrderSentAt"),
    }
  } catch (err) {
    return {
      id: SETTINGS_ID,
      sendEnabled: false,
      syncEnabled: false,
      payCodePickup: "",
      payCodeDelivery: "",
      channel: "",
      affiliate: "",
      point: "",
      orderTags: [],
      hookStatuses: [],
      statusMap: toStatusMap(null),
      hookUrl: "",
      sendPrices: false,
      articlePack: "",
      articleDelivery: "",
      retryLimit: 5,
      lastError: "",
      lastProductsSyncAt: null,
      lastStopsSyncAt: null,
      lastOrderSentAt: null,
    }
  }
}

function buildHookUrl(fpSettings) {
  var base = fpSettings.hookUrl || ""
  var token = getHookToken()
  if (!base || !token) {
    return ""
  }
  var sep = base.indexOf("?") >= 0 ? "&" : "?"
  return base + sep + "token=" + encodeURIComponent(token)
}

module.exports = {
  SETTINGS_ID: SETTINGS_ID,
  DEFAULT_API_URL: DEFAULT_API_URL,
  DEFAULT_STATUS_MAP: DEFAULT_STATUS_MAP,
  getSecret: getSecret,
  getHookToken: getHookToken,
  getApiUrl: getApiUrl,
  loadSettings: loadSettings,
  loadFrontpadSettings: loadFrontpadSettings,
  buildHookUrl: buildHookUrl,
  parseJsonField: parseJsonField,
  toPbDateTime: toPbDateTime,
  readPbDateTime: readPbDateTime,
  parsePbDateTimeMs: parsePbDateTimeMs,
}
