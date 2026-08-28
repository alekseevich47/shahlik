var CACHE_TTL_MS = 60 * 1000
var BONUS_ZERO = { score: 0, sale: 0, card: "" }

function requireAppUser(e) {
  if (!e.auth || e.auth.collection().name !== "app_users") {
    throw new UnauthorizedError("Нужна авторизация клиента")
  }
  return e.auth
}

function readBody(e) {
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
 * Нормализация к +7XXXXXXXXXX (10 цифр после кода страны).
 * @param {unknown} raw
 * @returns {string}
 */
function normalizePhone(raw) {
  var digits = String(raw === undefined || raw === null ? "" : raw).replace(/\D/g, "")
  if (digits.length === 11 && digits.charAt(0) === "8") {
    digits = "7" + digits.slice(1)
  }
  if (digits.length === 10 && digits.charAt(0) === "9") {
    digits = "7" + digits
  }
  if (digits.length !== 11 || digits.charAt(0) !== "7") {
    return ""
  }
  return "+" + digits
}

function phoneVariants(normalized) {
  if (!normalized || normalized.charAt(0) !== "+") {
    return []
  }
  var digits = normalized.slice(1)
  var local = digits.slice(1)
  return [normalized, digits, "8" + local]
}

function bonusFromCustomer(record) {
  return {
    score: record.getFloat("score") || 0,
    sale: record.getFloat("sale") || 0,
    card: record.getString("card") || "",
  }
}

function isFresh(record) {
  var config = require(__hooks + "/lib/config.js")
  var updatedMs = config.parsePbDateTimeMs(config.readPbDateTime(record, "updated"))
  if (updatedMs === null) {
    return false
  }
  // После create created≈updated; после get_client save updated сдвигается.
  // Иначе свежесозданная карточка на 60 с закрыла бы первый запрос в кассу.
  var createdMs = config.parsePbDateTimeMs(config.readPbDateTime(record, "created"))
  if (createdMs !== null && createdMs === updatedMs) {
    return false
  }
  return Date.now() - updatedMs < CACHE_TTL_MS
}

function findCustomerByPhone(app, phone) {
  try {
    return app.findFirstRecordByFilter("customers", "phone = {:phone}", { phone: phone })
  } catch (err) {
    return null
  }
}

function findCustomerById(app, id) {
  if (!id) {
    return null
  }
  try {
    return app.findRecordById("customers", id)
  } catch (err) {
    return null
  }
}

function createCustomer(app, phone) {
  var collection = app.findCollectionByNameOrId("customers")
  var record = new Record(collection)
  record.set("phone", phone)
  record.set("name", "")
  record.set("card", "")
  record.set("sale", 0)
  record.set("score", 0)
  record.set("blocked", false)
  record.set("ordersCount", 0)
  record.set("totalSpent", 0)
  app.save(record)
  return record
}

function applyClientData(record, data) {
  if (!data || typeof data !== "object") {
    return
  }
  if (data.name !== undefined && data.name !== null && String(data.name).length > 0) {
    record.set("name", String(data.name).slice(0, 100))
  }
  if (data.street !== undefined && data.street !== null) {
    record.set("street", String(data.street).slice(0, 50))
  }
  if (data.home !== undefined && data.home !== null) {
    record.set("home", String(data.home).slice(0, 50))
  }
  if (data.pod !== undefined && data.pod !== null) {
    record.set("pod", String(data.pod).slice(0, 2))
  }
  if (data.et !== undefined && data.et !== null) {
    record.set("et", String(data.et).slice(0, 2))
  }
  if (data.apart !== undefined && data.apart !== null) {
    record.set("apart", String(data.apart).slice(0, 50))
  }
  if (data.descr !== undefined && data.descr !== null) {
    record.set("comment", String(data.descr).slice(0, 100))
  }

  var card = data.card === undefined || data.card === null ? "" : String(data.card).replace(/\D/g, "").slice(0, 16)
  record.set("card", card)

  var sale = Number(data.sale)
  if (isNaN(sale) || sale < 0) {
    sale = 0
  }
  if (sale > 100) {
    sale = 100
  }
  record.set("sale", sale)

  var score = Number(data.score)
  if (isNaN(score) || score < 0) {
    score = 0
  }
  record.set("score", score)
}

function ensureCustomer(app, user) {
  var customerId = user.getString("customerId")
  var customer = findCustomerById(app, customerId)
  if (customer) {
    return customer
  }

  var phone = normalizePhone(user.getString("phone"))
  if (!phone) {
    return null
  }

  customer = findCustomerByPhone(app, phone)
  if (!customer) {
    customer = createCustomer(app, phone)
  }

  if (user.getString("customerId") !== customer.id) {
    user.set("customerId", customer.id)
    if (!normalizePhone(user.getString("phone"))) {
      user.set("phone", phone)
    }
    app.save(user)
  }

  return customer
}

function fetchClientFromCash(phone) {
  var http = require(__hooks + "/lib/http.js")
  return http.call("get_client", { client_phone: phone })
}

function refreshBonusFromCash(app, customer, phone) {
  var result = fetchClientFromCash(phone)
  if (!result.ok) {
    if (result.error && result.error.code === "invalid_client_phone") {
      applyClientData(customer, BONUS_ZERO)
      app.save(customer)
      return { bonus: BONUS_ZERO, cached: false, missing: true }
    }
    var http = require(__hooks + "/lib/http.js")
    throw new BadRequestError(http.errorText(result.error))
  }

  applyClientData(customer, result.data)
  app.save(customer)
  return { bonus: bonusFromCustomer(customer), cached: false, missing: false }
}

/**
 * GET /api/profile/bonus
 */
function handleBonus(e) {
  var auth = requireAppUser(e)
  var user = $app.findRecordById("app_users", auth.id)
  var phone = normalizePhone(user.getString("phone"))
  if (!phone) {
    throw new BadRequestError("Привяжите телефон")
  }

  var customer = ensureCustomer($app, user)
  if (!customer) {
    throw new BadRequestError("Привяжите телефон")
  }

  if (isFresh(customer)) {
    var cached = bonusFromCustomer(customer)
    return e.json(200, {
      score: cached.score,
      sale: cached.sale,
      card: cached.card,
      cached: true,
    })
  }

  var refreshed = refreshBonusFromCash($app, customer, phone)
  return e.json(200, {
    score: refreshed.bonus.score,
    sale: refreshed.bonus.sale,
    card: refreshed.bonus.card,
    cached: false,
  })
}

function findAppUserByPhone(app, phone, exceptId) {
  try {
    var record = app.findFirstRecordByFilter("app_users", "phone = {:phone}", { phone: phone })
    if (exceptId && record.id === exceptId) {
      return null
    }
    return record
  } catch (err) {
    return null
  }
}

function backfillOrders(app, userId, phone) {
  var variants = phoneVariants(phone)
  if (!variants.length) {
    return 0
  }

  var filterParts = []
  var params = { userId: userId }
  for (var i = 0; i < variants.length; i++) {
    var key = "p" + i
    filterParts.push("phone = {:" + key + "}")
    params[key] = variants[i]
  }

  var filter =
    "(" +
    filterParts.join(" || ") +
    ") && (userId = '' || userId = {:userId})"

  var orders = app.findRecordsByFilter("orders", filter, "-created", 200, 0, params)
  var linked = 0
  for (var j = 0; j < orders.length; j++) {
    var order = orders[j]
    if (order.getString("userId") === userId) {
      continue
    }
    order.set("userId", userId)
    app.save(order)
    linked++
  }
  return linked
}

/**
 * Пишет phone + customerId + бэкофилл заказов. Не меняет уже зафиксированный другой номер.
 * @returns {{ phone: string, customerId: string, linkedOrders: number } | null}
 */
function bindPhoneToUser(app, user, phoneRaw) {
  var phone = normalizePhone(phoneRaw)
  if (!phone || !user) return null

  var existing = normalizePhone(user.getString("phone"))
  if (existing && existing !== phone) {
    return null
  }
  if (existing === phone && user.getString("customerId")) {
    return {
      phone: phone,
      customerId: user.getString("customerId"),
      linkedOrders: 0,
    }
  }

  var taken = findAppUserByPhone(app, phone, user.id)
  if (taken) {
    var oauth = require(__hooks + "/lib/oauth.js")
    oauth.mergeUsersIntoTarget(app, taken.id, user.id)
    user = app.findRecordById("app_users", user.id)
  }

  var result = { phone: phone, customerId: "", linkedOrders: 0 }
  app.runInTransaction(function (txApp) {
    var fresh = txApp.findRecordById("app_users", user.id)
    var customer = findCustomerByPhone(txApp, phone)
    if (!customer) {
      customer = createCustomer(txApp, phone)
    }
    fresh.set("phone", phone)
    fresh.set("customerId", customer.id)
    txApp.save(fresh)
    result.customerId = customer.id
    result.linkedOrders = backfillOrders(txApp, fresh.id, phone)
    user.set("phone", phone)
    user.set("customerId", customer.id)
  })
  return result
}

/**
 * POST /api/profile/link
 * body: { phone }
 * Телефон фиксируется один раз — смена запрещена.
 */
function handleLink(e) {
  var auth = requireAppUser(e)
  var body = readBody(e)
  var phone = normalizePhone(body.phone)
  if (!phone) {
    throw new BadRequestError("Укажите телефон в формате +7XXXXXXXXXX")
  }

  var user = $app.findRecordById("app_users", auth.id)
  var existing = normalizePhone(user.getString("phone"))
  if (existing && existing !== phone) {
    throw new BadRequestError("Телефон уже зафиксирован и не меняется")
  }

  var result = bindPhoneToUser($app, user, phone)
  if (!result) {
    throw new BadRequestError("Не удалось привязать телефон")
  }
  return e.json(200, result)
}

/** Яндекс OAuth: createData + имена до создания записи. */
function handleOAuthAuth(e) {
  if (e.providerName !== "yandex") {
    return e.next()
  }

  var oauth = require(__hooks + "/lib/oauth.js")
  var payload = oauth.extractYandexProfile(e.oauth2User)

  if (e.record) {
    oauth.applyOAuthProfileBeforeSave(e.record, payload)
    if (payload.phone && !oauth.normalizePhone(e.record.getString("phone"))) {
      e.record.set("phone", payload.phone)
    }
  } else {
    oauth.ensureCreateDataProfile(e, payload)
  }

  return e.next()
}

/** После успешного OAuth2: телефон из meta (надёжнее, чем код сразу после e.next()). */
function handleOAuthAuthSuccess(e) {
  if (e.authMethod !== "oauth2") {
    return e.next()
  }

  var record = e.record
  if (!record || record.collection().name !== "app_users") {
    return e.next()
  }

  var oauth = require(__hooks + "/lib/oauth.js")
  var payload = oauth.extractYandexProfileFromMeta(e.meta)
  var hasNames =
    payload.names && (payload.names.firstName || payload.names.lastName)
  if (!payload.phone && !hasNames) {
    return e.next()
  }

  try {
    oauth.finalizeOAuthLogin($app, record, payload)
  } catch (err) {
    var msg = err && err.message ? String(err.message) : String(err)
    $app.logger().warn("oauth auth phone finalize failed", "error", msg)
  }

  return e.next()
}

/** Клиент не может менять phone/birthday после первой записи. */
function lockAppUserIdentityFields(e) {
  if (e.hasSuperuserAuth && e.hasSuperuserAuth()) {
    return e.next()
  }
  var orig = e.record.original()
  var oldPhone = normalizePhone(orig.getString("phone"))
  var newPhone = normalizePhone(e.record.getString("phone"))
  if (oldPhone) {
    if (newPhone && newPhone !== oldPhone) {
      throw new BadRequestError("Телефон уже зафиксирован и не меняется")
    }
    e.record.set("phone", oldPhone)
  }

  var oldBirthday = orig.getString("birthday") || ""
  if (oldBirthday) {
    e.record.set("birthday", oldBirthday)
  }

  return e.next()
}

module.exports = {
  CACHE_TTL_MS: CACHE_TTL_MS,
  normalizePhone: normalizePhone,
  bindPhoneToUser: bindPhoneToUser,
  handleBonus: handleBonus,
  handleLink: handleLink,
  handleOAuthAuth: handleOAuthAuth,
  handleOAuthAuthSuccess: handleOAuthAuthSuccess,
  lockAppUserIdentityFields: lockAppUserIdentityFields,
}
