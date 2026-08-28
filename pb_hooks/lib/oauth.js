/**
 * OAuth-профиль: телефон, имена, несколько email, слияние app_users по телефону.
 */

var COLLECTION = "app_users"

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

function normalizeEmail(raw) {
  var email = String(raw === undefined || raw === null ? "" : raw).trim().toLowerCase()
  if (!email || email.indexOf("@") < 1) return ""
  return email.slice(0, 255)
}

function asObject(raw) {
  if (!raw) return null
  if (typeof raw === "object") return raw
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw)
    } catch (err) {
      return null
    }
  }
  return null
}

function splitFullName(full) {
  var parts = String(full || "")
    .trim()
    .split(/\s+/)
    .filter(function (p) {
      return p.length > 0
    })
  if (!parts.length) return { firstName: "", lastName: "" }
  if (parts.length === 1) return { firstName: parts[0].slice(0, 50), lastName: "" }
  return {
    firstName: parts[0].slice(0, 50),
    lastName: parts.slice(1).join(" ").slice(0, 50),
  }
}

function readExtraEmails(record) {
  var raw = record.get("extraEmails")
  if (!Array.isArray(raw)) return []
  var out = []
  for (var i = 0; i < raw.length; i++) {
    var email = normalizeEmail(raw[i])
    if (email) out.push(email)
  }
  return out
}

function writeExtraEmails(record, emails) {
  var seen = {}
  var out = []
  for (var i = 0; i < emails.length; i++) {
    var email = normalizeEmail(emails[i])
    if (!email || seen[email]) continue
    seen[email] = true
    out.push(email)
  }
  record.set("extraEmails", out)
}

/**
 * primary email + extraEmails без дублей.
 * @param {import("pocketbase").Record} record
 * @param {string[]} incoming
 */
function addEmailsToRecord(record, incoming) {
  if (!record || !incoming || !incoming.length) return

  var primary = normalizeEmail(record.getString("email"))
  var extras = readExtraEmails(record)
  var seen = {}
  if (primary) seen[primary] = true
  for (var i = 0; i < extras.length; i++) {
    seen[extras[i]] = true
  }

  for (var j = 0; j < incoming.length; j++) {
    var email = normalizeEmail(incoming[j])
    if (!email || seen[email]) continue
    seen[email] = true
    if (!primary) {
      primary = email
      record.set("email", email)
      continue
    }
    extras.push(email)
  }

  writeExtraEmails(record, extras)
}

function applyNames(record, names, onlyEmpty) {
  if (!record || !names) return
  var first = String(names.firstName || "").trim().slice(0, 50)
  var last = String(names.lastName || "").trim().slice(0, 50)
  if (!first && !last) return

  if (onlyEmpty) {
    if (first && !record.getString("firstName")) record.set("firstName", first)
    if (last && !record.getString("lastName")) record.set("lastName", last)
    return
  }
  if (first) record.set("firstName", first)
  if (last) record.set("lastName", last)
}

function readAddresses(record) {
  var raw = record.get("addresses")
  return Array.isArray(raw) ? raw.slice() : []
}

function mergeAddresses(target, source) {
  var merged = readAddresses(target)
  var seen = {}
  for (var i = 0; i < merged.length; i++) {
    var item = merged[i]
    if (item && item.id) seen[String(item.id)] = true
  }
  var incoming = readAddresses(source)
  for (var j = 0; j < incoming.length; j++) {
    var row = incoming[j]
    if (!row || typeof row !== "object") continue
    var id = row.id ? String(row.id) : ""
    if (id && seen[id]) continue
    if (id) seen[id] = true
    merged.push(row)
  }
  if (merged.length && !merged.some(function (a) { return a && a.isDefault })) {
    merged[0] = Object.assign({}, merged[0], { isDefault: true })
  }
  target.set("addresses", merged)
}

function findAppUserByPhone(app, phone, exceptId) {
  try {
    var record = app.findFirstRecordByFilter(COLLECTION, "phone = {:phone}", { phone: phone })
    if (exceptId && record.id === exceptId) return null
    return record
  } catch (err) {
    return null
  }
}

function moveExternalAuths(app, sourceId, targetId) {
  var moved = 0
  var rows
  try {
    rows = app.findRecordsByFilter(
      "_externalAuths",
      "recordRef = {:id}",
      "-created",
      200,
      0,
      { id: sourceId },
    )
  } catch (err) {
    return 0
  }

  for (var i = 0; i < rows.length; i++) {
    var row = rows[i]
    var provider = row.getString("provider")
    var providerId = row.getString("providerId")
    try {
      app.findFirstRecordByFilter(
        "_externalAuths",
        "recordRef = {:target} && provider = {:p} && providerId = {:pid}",
        { target: targetId, p: provider, pid: providerId },
      )
      app.delete(row)
      continue
    } catch (err) {
      // нет дубля на target
    }
    row.set("recordRef", targetId)
    app.save(row)
    moved++
  }
  return moved
}

function reassignOrders(app, fromUserId, toUserId) {
  var orders
  try {
    orders = app.findRecordsByFilter(
      "orders",
      "userId = {:uid}",
      "-created",
      500,
      0,
      { uid: fromUserId },
    )
  } catch (err) {
    return 0
  }
  var count = 0
  for (var i = 0; i < orders.length; i++) {
    orders[i].set("userId", toUserId)
    app.save(orders[i])
    count++
  }
  return count
}

/**
 * Переносит source → target, source удаляется. target сохраняет токен текущего входа.
 */
function mergeUsersIntoTarget(app, sourceId, targetId) {
  if (!sourceId || !targetId || sourceId === targetId) return targetId

  var source = app.findRecordById(COLLECTION, sourceId)
  var target = app.findRecordById(COLLECTION, targetId)

  addEmailsToRecord(target, [source.getString("email")])
  addEmailsToRecord(target, readExtraEmails(source))

  applyNames(
    target,
    {
      firstName: source.getString("firstName"),
      lastName: source.getString("lastName"),
    },
    true,
  )

  mergeAddresses(target, source)

  if (!target.getString("customerId") && source.getString("customerId")) {
    target.set("customerId", source.getString("customerId"))
  }
  if (!normalizePhone(target.getString("phone")) && normalizePhone(source.getString("phone"))) {
    target.set("phone", normalizePhone(source.getString("phone")))
  }
  if (!target.getString("birthday") && source.getString("birthday")) {
    target.set("birthday", source.getString("birthday"))
  }

  moveExternalAuths(app, sourceId, targetId)
  reassignOrders(app, sourceId, targetId)
  app.save(target)
  app.delete(source)
  return targetId
}

function emailsFromYandexOAuth(oauth2User) {
  var out = []
  if (!oauth2User) return out

  var top = normalizeEmail(oauth2User.email || oauth2User.Email)
  if (top) out.push(top)

  var raw = asObject(oauth2User.rawUser || oauth2User.RawUser)
  if (!raw) return out

  var def = normalizeEmail(raw.default_email)
  if (def) out.push(def)

  if (Array.isArray(raw.emails)) {
    for (var i = 0; i < raw.emails.length; i++) {
      out.push(raw.emails[i])
    }
  }

  return out
}

function phoneFromYandexOAuth(oauth2User) {
  if (!oauth2User) return ""

  var direct = normalizePhone(oauth2User.phone || oauth2User.Phone)
  if (direct) return direct

  var raw = asObject(oauth2User.rawUser || oauth2User.RawUser)
  if (!raw) return ""

  var dp = raw.default_phone
  if (dp) {
    if (typeof dp === "string" || typeof dp === "number") {
      var fromDp = normalizePhone(dp)
      if (fromDp) return fromDp
    }
    if (typeof dp === "object") {
      var fromObj = normalizePhone(dp.number || dp.phone || dp.value)
      if (fromObj) return fromObj
    }
  }

  if (Array.isArray(raw.phones)) {
    for (var i = 0; i < raw.phones.length; i++) {
      var row = raw.phones[i]
      if (!row) continue
      if (typeof row === "string" || typeof row === "number") {
        var p1 = normalizePhone(row)
        if (p1) return p1
        continue
      }
      if (typeof row === "object") {
        var p2 = normalizePhone(row.number || row.phone || row.value)
        if (p2) return p2
      }
    }
  }

  return ""
}

function namesFromYandexOAuth(oauth2User) {
  var raw = asObject(oauth2User && (oauth2User.rawUser || oauth2User.RawUser))
  if (!raw && oauth2User) raw = oauth2User

  if (!raw) return { firstName: "", lastName: "" }

  var first = String(raw.first_name || raw.firstName || "").trim()
  var last = String(raw.last_name || raw.lastName || "").trim()

  if (first || last) {
    return {
      firstName: first.slice(0, 50),
      lastName: last.slice(0, 50),
    }
  }

  var full = String(raw.real_name || raw.display_name || raw.name || "").trim()
  if (!full && oauth2User) {
    full = String(oauth2User.name || oauth2User.username || "").trim()
  }
  return splitFullName(full)
}

function phoneFromVkUser(vkUser) {
  if (!vkUser) return ""
  return normalizePhone(vkUser.phone || vkUser.mobile_phone || vkUser.home_phone)
}

function namesFromVkUser(vkUser) {
  if (!vkUser) return { firstName: "", lastName: "" }
  return {
    firstName: String(vkUser.first_name || vkUser.firstName || "").trim().slice(0, 50),
    lastName: String(vkUser.last_name || vkUser.lastName || "").trim().slice(0, 50),
  }
}

function extractYandexProfile(oauth2User) {
  return {
    phone: phoneFromYandexOAuth(oauth2User),
    names: namesFromYandexOAuth(oauth2User),
    emails: emailsFromYandexOAuth(oauth2User),
  }
}

function extractVkProfile(vkUser, accessEmail) {
  var emails = []
  var mail = normalizeEmail(accessEmail || vkUser.email)
  if (mail) emails.push(mail)
  return {
    phone: phoneFromVkUser(vkUser),
    names: namesFromVkUser(vkUser),
    emails: emails,
  }
}

/**
 * До e.next(): имена и email на создаваемую запись.
 */
function applyOAuthProfileBeforeSave(record, payload) {
  if (!record || !payload) return
  applyNames(record, payload.names, true)
  addEmailsToRecord(record, payload.emails || [])
}

/**
 * После успешного OAuth: телефон, customers, слияние дублей.
 */
function finalizeOAuthLogin(app, record, payload) {
  if (!record || !payload) return record

  var profile = require(__hooks + "/lib/profile.js")
  var fresh = app.findRecordById(COLLECTION, record.id)

  addEmailsToRecord(fresh, payload.emails || [])
  applyNames(fresh, payload.names, true)
  app.save(fresh)

  var phone = normalizePhone(payload.phone)
  if (!phone) return fresh

  var taken = findAppUserByPhone(app, phone, fresh.id)
  if (taken) {
    mergeUsersIntoTarget(app, taken.id, fresh.id)
    fresh = app.findRecordById(COLLECTION, record.id)
  }

  profile.bindPhoneToUser(app, fresh, phone)
  return app.findRecordById(COLLECTION, record.id)
}

module.exports = {
  COLLECTION: COLLECTION,
  normalizePhone: normalizePhone,
  normalizeEmail: normalizeEmail,
  splitFullName: splitFullName,
  readExtraEmails: readExtraEmails,
  addEmailsToRecord: addEmailsToRecord,
  applyNames: applyNames,
  findAppUserByPhone: findAppUserByPhone,
  mergeUsersIntoTarget: mergeUsersIntoTarget,
  phoneFromYandexOAuth: phoneFromYandexOAuth,
  namesFromYandexOAuth: namesFromYandexOAuth,
  emailsFromYandexOAuth: emailsFromYandexOAuth,
  phoneFromVkUser: phoneFromVkUser,
  namesFromVkUser: namesFromVkUser,
  extractYandexProfile: extractYandexProfile,
  extractVkProfile: extractVkProfile,
  applyOAuthProfileBeforeSave: applyOAuthProfileBeforeSave,
  finalizeOAuthLogin: finalizeOAuthLogin,
}
