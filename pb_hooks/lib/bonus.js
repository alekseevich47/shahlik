/**
 * Своя бонусная система: append-only ledger + денормализованный customers.score.
 * Кассовые бонусы Frontpad не используем.
 */

var BONUS_SETTINGS_DEFAULTS = {
  enabled: true,
  defaultEarnPercent: 5,
  birthdayAmount: 300,
  referralInviterAmount: 200,
  referralInviteeAmount: 100,
  pwaInstallAmount: 150,
  registrationAmount: 100,
  maxSpendPercent: 50,
  earnOnStatus: "done",
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

function loadBonusSettings(app) {
  var config = require(__hooks + "/lib/config.js")
  var dao = app || $app
  try {
    var record = dao.findRecordById("bonus_settings", config.SETTINGS_ID)
    var maxSpend = record.getFloat("maxSpendPercent")
    if (isNaN(maxSpend) || maxSpend < 0) {
      maxSpend = BONUS_SETTINGS_DEFAULTS.maxSpendPercent
    }
    if (maxSpend > 100) {
      maxSpend = 100
    }
    var earnPct = record.getFloat("defaultEarnPercent")
    if (isNaN(earnPct) || earnPct < 0) {
      earnPct = BONUS_SETTINGS_DEFAULTS.defaultEarnPercent
    }
    if (earnPct > 100) {
      earnPct = 100
    }
    return {
      id: record.id,
      enabled: record.getBool("enabled"),
      defaultEarnPercent: earnPct,
      birthdayAmount: Math.max(0, record.getFloat("birthdayAmount") || 0),
      referralInviterAmount: Math.max(0, record.getFloat("referralInviterAmount") || 0),
      referralInviteeAmount: Math.max(0, record.getFloat("referralInviteeAmount") || 0),
      pwaInstallAmount: Math.max(0, record.getFloat("pwaInstallAmount") || 0),
      registrationAmount: Math.max(0, record.getFloat("registrationAmount") || 0),
      maxSpendPercent: maxSpend,
      earnOnStatus: record.getString("earnOnStatus") || BONUS_SETTINGS_DEFAULTS.earnOnStatus,
    }
  } catch (err) {
    return {
      id: config.SETTINGS_ID,
      enabled: BONUS_SETTINGS_DEFAULTS.enabled,
      defaultEarnPercent: BONUS_SETTINGS_DEFAULTS.defaultEarnPercent,
      birthdayAmount: BONUS_SETTINGS_DEFAULTS.birthdayAmount,
      referralInviterAmount: BONUS_SETTINGS_DEFAULTS.referralInviterAmount,
      referralInviteeAmount: BONUS_SETTINGS_DEFAULTS.referralInviteeAmount,
      pwaInstallAmount: BONUS_SETTINGS_DEFAULTS.pwaInstallAmount,
      registrationAmount: BONUS_SETTINGS_DEFAULTS.registrationAmount,
      maxSpendPercent: BONUS_SETTINGS_DEFAULTS.maxSpendPercent,
      earnOnStatus: BONUS_SETTINGS_DEFAULTS.earnOnStatus,
    }
  }
}

/**
 * GET /api/bonus/public — витрина (гости): % и подарочные суммы.
 */
function handlePublicSettings(e) {
  var settings = loadBonusSettings($app)
  return e.json(200, {
    enabled: Boolean(settings.enabled),
    defaultEarnPercent: settings.defaultEarnPercent,
    registrationAmount: settings.registrationAmount,
    pwaInstallAmount: settings.pwaInstallAmount,
    maxSpendPercent: settings.maxSpendPercent,
  })
}

function findLedgerByDedupe(app, dedupeKey) {
  if (!dedupeKey) {
    return null
  }
  try {
    return app.findFirstRecordByFilter("bonus_ledger", "dedupeKey = {:k}", { k: dedupeKey })
  } catch (err) {
    return null
  }
}

/**
 * Единый writer. Вызывать внутри runInTransaction с txApp.
 * @returns {{ ok: boolean, skipped?: boolean, balanceAfter?: number, delta?: number, error?: string }}
 */
function applyLedgerDelta(app, opts) {
  var customerId = opts.customerId
  var delta = Math.round(Number(opts.delta) || 0)
  if (!customerId || !delta) {
    return { ok: false, error: "empty_delta" }
  }

  var dedupeKey = opts.dedupeKey ? String(opts.dedupeKey) : ""
  if (dedupeKey) {
    var existing = findLedgerByDedupe(app, dedupeKey)
    if (existing) {
      return {
        ok: true,
        skipped: true,
        balanceAfter: existing.getFloat("balanceAfter") || 0,
        delta: existing.getFloat("delta") || 0,
      }
    }
  }

  var customer
  try {
    customer = app.findRecordById("customers", customerId)
  } catch (err) {
    return { ok: false, error: "customer_not_found" }
  }

  var balance = customer.getFloat("score") || 0
  var next = Math.round(balance + delta)
  if (next < 0) {
    return { ok: false, error: "insufficient_balance" }
  }

  var collection = app.findCollectionByNameOrId("bonus_ledger")
  var entry = new Record(collection)
  entry.set("customerId", customerId)
  if (opts.userId) {
    entry.set("userId", opts.userId)
  }
  entry.set("delta", delta)
  entry.set("balanceAfter", next)
  entry.set("reason", opts.reason || "adjust")
  if (opts.refType) {
    entry.set("refType", String(opts.refType).slice(0, 32))
  }
  if (opts.refId) {
    entry.set("refId", String(opts.refId).slice(0, 64))
  }
  if (dedupeKey) {
    entry.set("dedupeKey", dedupeKey.slice(0, 120))
  }
  if (opts.meta !== undefined) {
    entry.set("meta", opts.meta)
  }
  if (opts.actorType) {
    entry.set("actorType", String(opts.actorType).slice(0, 16))
  }
  if (opts.actorId) {
    entry.set("actorId", String(opts.actorId).slice(0, 32))
  }

  app.save(entry)
  customer.set("score", next)
  app.save(customer)

  return { ok: true, skipped: false, balanceAfter: next, delta: delta }
}

function applyLedgerDeltaTx(opts) {
  var result = { ok: false, error: "tx_failed" }
  $app.runInTransaction(function (txApp) {
    result = applyLedgerDelta(txApp, opts)
    if (!result.ok) {
      throw new BadRequestError(result.error || "Не удалось изменить баланс")
    }
  })
  return result
}

function listLedgerForCustomer(app, customerId, limit) {
  var n = limit || 20
  try {
    return app.findRecordsByFilter(
      "bonus_ledger",
      "customerId = {:id}",
      "-created",
      n,
      0,
      { id: customerId },
    )
  } catch (err) {
    return []
  }
}

function mapLedgerEntry(record) {
  return {
    id: record.id,
    delta: record.getFloat("delta") || 0,
    balanceAfter: record.getFloat("balanceAfter") || 0,
    reason: record.getString("reason") || "",
    refType: record.getString("refType") || "",
    refId: record.getString("refId") || "",
    created: record.getString("created") || "",
  }
}

function requireStaff(e) {
  if (!e.auth || e.auth.collection().name !== "users") {
    throw new UnauthorizedError("Нужна авторизация сотрудника")
  }
  var role = e.auth.getString("role")
  if (role !== "admin" && role !== "manager") {
    throw new ForbiddenError("Недостаточно прав")
  }
  return e.auth
}

function requireAppUser(e) {
  if (!e.auth || e.auth.collection().name !== "app_users") {
    throw new UnauthorizedError("Нужна авторизация клиента")
  }
  return e.auth
}

function ensureReferralCode(app, user) {
  var code = user.getString("referralCode") || ""
  if (code) {
    return code
  }
  var alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  for (var attempt = 0; attempt < 8; attempt++) {
    var built = ""
    for (var i = 0; i < 8; i++) {
      built += alphabet.charAt(Math.floor(Math.random() * alphabet.length))
    }
    try {
      app.findFirstRecordByFilter("app_users", "referralCode = {:c}", { c: built })
    } catch (err) {
      user.set("referralCode", built)
      app.save(user)
      return built
    }
  }
  throw new BadRequestError("Не удалось выдать реферальный код")
}

/**
 * GET /api/profile/bonus — свой баланс, без Frontpad.
 */
function handleProfileBonus(e) {
  var profile = require(__hooks + "/lib/profile.js")
  var auth = requireAppUser(e)
  var user = $app.findRecordById("app_users", auth.id)
  var phone = profile.normalizePhone(user.getString("phone"))
  if (!phone) {
    throw new BadRequestError("Привяжите телефон")
  }

  var customer = profile.ensureCustomer($app, user)
  if (!customer) {
    throw new BadRequestError("Привяжите телефон")
  }

  ensureReferralCode($app, user)

  var entries = listLedgerForCustomer($app, customer.id, 30)
  var history = []
  for (var i = 0; i < entries.length; i++) {
    history.push(mapLedgerEntry(entries[i]))
  }

  return e.json(200, {
    score: customer.getFloat("score") || 0,
    sale: 0,
    card: "",
    referralCode: user.getString("referralCode") || "",
    referredBy: user.getString("referredBy") || "",
    history: history,
  })
}

/**
 * POST /api/bonus/adjust — ручное начисление/списание (staff).
 * body: { customerId, delta, reason?, comment? }
 */
function handleAdjust(e) {
  var staff = requireStaff(e)
  var body = readBody(e)
  var customerId = body.customerId ? String(body.customerId) : ""
  var delta = Math.round(Number(body.delta) || 0)
  if (!customerId || !delta) {
    throw new BadRequestError("Укажите customerId и delta ≠ 0")
  }

  var reason = body.reason === "manual" || body.reason === "adjust" ? body.reason : "manual"
  var result = applyLedgerDeltaTx({
    customerId: customerId,
    delta: delta,
    reason: reason,
    dedupeKey: "",
    meta: { comment: body.comment ? String(body.comment).slice(0, 200) : "" },
    actorType: staff.getString("role") === "admin" ? "admin" : "manager",
    actorId: staff.id,
  })

  try {
    var audit = require(__hooks + "/lib/audit.js")
    audit.write({
      actorType: staff.getString("role") === "admin" ? "admin" : "manager",
      actorId: staff.id,
      action: "bonus.adjust",
      entity: "customers",
      entityId: customerId,
      meta: { delta: delta, balanceAfter: result.balanceAfter },
      e: e,
    })
  } catch (err) {
    // audit best-effort
  }

  return e.json(200, {
    ok: true,
    score: result.balanceAfter,
    delta: result.delta,
  })
}

function resolveCustomerForUser(app, user) {
  var profile = require(__hooks + "/lib/profile.js")
  return profile.ensureCustomer(app, user)
}

/**
 * Подарок за первую регистрацию (после привязки телефона / customer).
 * Идемпотентно: registrationClaimed + dedupeKey.
 */
function creditRegistrationBonus(app, user) {
  if (!user) {
    return { ok: false, skipped: true }
  }
  var settings = loadBonusSettings(app)
  if (!settings.enabled || settings.registrationAmount <= 0) {
    return { ok: true, skipped: true, reason: "disabled" }
  }
  if (user.getBool("registrationClaimed")) {
    return { ok: true, skipped: true, reason: "already_claimed" }
  }

  var customer = resolveCustomerForUser(app, user)
  if (!customer) {
    return { ok: false, skipped: true, reason: "no_customer" }
  }

  var result = applyLedgerDeltaTx({
    customerId: customer.id,
    userId: user.id,
    delta: Math.round(settings.registrationAmount),
    reason: "registration",
    dedupeKey: "registration:" + user.id,
    actorType: "user",
    actorId: user.id,
  })

  if (!result.skipped) {
    try {
      user.set("registrationClaimed", true)
      app.save(user)
    } catch (err) {
      // ignore
    }
  }

  return result
}

/**
 * POST /api/bonus/events/pwa-install
 */
function handlePwaInstall(e) {
  var auth = requireAppUser(e)
  var settings = loadBonusSettings($app)
  if (!settings.enabled || settings.pwaInstallAmount <= 0) {
    return e.json(200, { ok: false, reason: "disabled" })
  }

  var user = $app.findRecordById("app_users", auth.id)
  if (user.getBool("pwaInstallClaimed")) {
    return e.json(200, { ok: false, reason: "already_claimed" })
  }

  var customer = resolveCustomerForUser($app, user)
  if (!customer) {
    throw new BadRequestError("Привяжите телефон")
  }

  var dedupeKey = "pwa:" + user.id
  var result = applyLedgerDeltaTx({
    customerId: customer.id,
    userId: user.id,
    delta: Math.round(settings.pwaInstallAmount),
    reason: "pwa_install",
    dedupeKey: dedupeKey,
    actorType: "user",
    actorId: user.id,
  })

  if (!result.skipped) {
    user.set("pwaInstallClaimed", true)
    $app.save(user)
  }

  try {
    var audit = require(__hooks + "/lib/audit.js")
    audit.write({
      actorType: "user",
      actorId: user.id,
      action: "bonus.pwa_install",
      entity: "app_users",
      entityId: user.id,
      meta: { delta: result.delta, skipped: Boolean(result.skipped) },
      e: e,
    })
  } catch (err) {
    // ignore
  }

  return e.json(200, {
    ok: true,
    skipped: Boolean(result.skipped),
    score: result.balanceAfter,
    delta: result.delta,
  })
}

/**
 * POST /api/profile/referral — body: { code }
 */
function handleReferral(e) {
  var auth = requireAppUser(e)
  var body = readBody(e)
  var code = body.code ? String(body.code).trim().toUpperCase() : ""
  if (!code || code.length < 6) {
    throw new BadRequestError("Введите реферальный код")
  }

  var invitee = $app.findRecordById("app_users", auth.id)
  if (invitee.getString("referredBy")) {
    return e.json(200, { ok: false, reason: "already_referred" })
  }

  var inviter
  try {
    inviter = $app.findFirstRecordByFilter("app_users", "referralCode = {:c}", { c: code })
  } catch (err) {
    throw new BadRequestError("Код не найден")
  }

  if (inviter.id === invitee.id) {
    throw new BadRequestError("Нельзя указать свой код")
  }

  var settings = loadBonusSettings($app)
  var profile = require(__hooks + "/lib/profile.js")
  var inviteeCustomer = profile.ensureCustomer($app, invitee)
  var inviterCustomer = profile.ensureCustomer($app, inviter)
  if (!inviteeCustomer || !inviterCustomer) {
    throw new BadRequestError("Привяжите телефон")
  }

  invitee.set("referredBy", inviter.id)
  $app.save(invitee)

  var inviteeKey = "referral:invitee:" + invitee.id
  var inviterKey = "referral:inviter:" + invitee.id

  if (settings.enabled && settings.referralInviteeAmount > 0) {
    applyLedgerDeltaTx({
      customerId: inviteeCustomer.id,
      userId: invitee.id,
      delta: Math.round(settings.referralInviteeAmount),
      reason: "referral",
      dedupeKey: inviteeKey,
      refType: "app_users",
      refId: inviter.id,
      actorType: "user",
      actorId: invitee.id,
    })
  }

  if (settings.enabled && settings.referralInviterAmount > 0) {
    applyLedgerDeltaTx({
      customerId: inviterCustomer.id,
      userId: inviter.id,
      delta: Math.round(settings.referralInviterAmount),
      reason: "referral",
      dedupeKey: inviterKey,
      refType: "app_users",
      refId: invitee.id,
      actorType: "user",
      actorId: invitee.id,
    })
  }

  try {
    var audit = require(__hooks + "/lib/audit.js")
    audit.write({
      actorType: "user",
      actorId: invitee.id,
      action: "bonus.referral",
      entity: "app_users",
      entityId: invitee.id,
      meta: { inviterId: inviter.id },
      e: e,
    })
  } catch (err) {
    // ignore
  }

  return e.json(200, { ok: true })
}

function productEarnPercent(product, settings) {
  if (!product) {
    return settings.defaultEarnPercent
  }
  try {
    var raw = product.get("bonusPercent")
    if (raw === null || raw === undefined || raw === "") {
      return settings.defaultEarnPercent
    }
    var pct = Number(raw)
    if (isNaN(pct) || pct < 0) {
      return settings.defaultEarnPercent
    }
    if (pct > 100) {
      return 100
    }
    return pct
  } catch (err) {
    return settings.defaultEarnPercent
  }
}

function calcOrderEarnAmount(orderRecord, settings) {
  if (!settings.enabled) {
    return 0
  }
  var config = require(__hooks + "/lib/config.js")
  var order = require(__hooks + "/lib/order.js")
  var lines = order.readStoredLines(orderRecord, config.parseJsonField)
  var earned = 0
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i]
    var product = null
    try {
      if (line.productId) {
        product = $app.findRecordById("products", line.productId)
      }
    } catch (err) {
      product = null
    }
    var pct = productEarnPercent(product, settings)
    var lineTotal = Number(line.total) || 0
    earned += (lineTotal * pct) / 100
  }

  var couponCode = orderRecord.getString("couponCode") || ""
  if (couponCode) {
    try {
      var coupon = $app.findFirstRecordByFilter("coupons", "code = {:code}", {
        code: couponCode,
      })
      if (coupon.getString("kind") === "bonus") {
        earned += coupon.getFloat("value") || 0
      }
    } catch (err) {
      // ignore
    }
  }

  return Math.round(earned)
}

/**
 * Списание при создании заказа. Возвращает bonusSpent.
 */
function resolveSpendForOrder(opts) {
  var settings = opts.settings || loadBonusSettings($app)
  var wantSpend = Boolean(opts.spendBonus)
  var goods = Number(opts.goods) || 0
  var discount = Number(opts.discount) || 0
  var userId = opts.userId || ""
  var customerId = opts.customerId || ""

  if (!wantSpend || !settings.enabled || !userId || !customerId) {
    return 0
  }

  var customer
  try {
    customer = $app.findRecordById("customers", customerId)
  } catch (err) {
    return 0
  }

  var balance = Math.max(0, Math.round(customer.getFloat("score") || 0))
  if (balance <= 0) {
    return 0
  }

  var afterPromo = Math.max(goods - discount, 0)
  var maxByPercent = Math.round((afterPromo * settings.maxSpendPercent) / 100)
  var cap = Math.min(balance, afterPromo, maxByPercent)
  return Math.max(0, cap)
}

function debitOrderSpend(orderId, customerId, userId, amount) {
  if (!amount || amount <= 0 || !customerId) {
    return { ok: true, skipped: true }
  }
  return applyLedgerDeltaTx({
    customerId: customerId,
    userId: userId || "",
    delta: -Math.round(amount),
    reason: "order_spend",
    dedupeKey: "order_spend:" + orderId,
    refType: "orders",
    refId: orderId,
    actorType: userId ? "user" : "guest",
    actorId: userId || "",
  })
}

function creditOrderEarn(orderRecord) {
  var settings = loadBonusSettings($app)
  var earnStatus = settings.earnOnStatus || "done"
  if (orderRecord.getString("status") !== earnStatus) {
    return { ok: true, skipped: true }
  }

  // При списании бонусов за заказ начисление не происходит.
  var spent = Math.round(orderRecord.getFloat("bonusSpent") || 0)
  if (spent > 0) {
    orderRecord.set("bonusEarned", 0)
    try {
      $app.save(orderRecord)
    } catch (err) {
      // ignore
    }
    return { ok: true, skipped: true, amount: 0, reason: "spent" }
  }

  var amount = calcOrderEarnAmount(orderRecord, settings)
  orderRecord.set("bonusEarned", amount)

  var customerId = orderRecord.getString("customerId") || ""
  var userId = orderRecord.getString("userId") || ""
  if (!customerId || amount <= 0) {
    try {
      $app.save(orderRecord)
    } catch (err) {
      // ignore
    }
    return { ok: true, skipped: true, amount: 0 }
  }

  var result = applyLedgerDeltaTx({
    customerId: customerId,
    userId: userId,
    delta: amount,
    reason: "order_earn",
    dedupeKey: "order_earn:" + orderRecord.id,
    refType: "orders",
    refId: orderRecord.id,
    meta: { couponCode: orderRecord.getString("couponCode") || "" },
    actorType: "user",
    actorId: userId,
  })

  try {
    $app.save(orderRecord)
  } catch (err) {
    // ignore
  }

  return result
}

/**
 * ДР: cron раз в сутки.
 */
function runBirthdayCron() {
  var settings = loadBonusSettings($app)
  if (!settings.enabled || settings.birthdayAmount <= 0) {
    return { processed: 0 }
  }

  var now = new Date()
  var mm = now.getUTCMonth() + 1
  var dd = now.getUTCDate()
  var year = now.getUTCFullYear()
  var mmStr = mm < 10 ? "0" + mm : String(mm)
  var ddStr = dd < 10 ? "0" + dd : String(dd)
  var suffix = "-" + mmStr + "-" + ddStr

  var users
  try {
    users = $app.findRecordsByFilter("app_users", "birthday != ''", "-created", 500, 0, {})
  } catch (err) {
    return { processed: 0, error: String(err) }
  }

  var profile = require(__hooks + "/lib/profile.js")
  var processed = 0
  for (var i = 0; i < users.length; i++) {
    var user = users[i]
    var bday = user.getString("birthday") || ""
    if (bday.indexOf(suffix) === -1) {
      continue
    }
    var customer = profile.ensureCustomer($app, user)
    if (!customer) {
      continue
    }
    var key = "birthday:" + year + ":" + user.id
    var result = applyLedgerDeltaTx({
      customerId: customer.id,
      userId: user.id,
      delta: Math.round(settings.birthdayAmount),
      reason: "birthday",
      dedupeKey: key,
      actorType: "user",
      actorId: user.id,
    })
    if (result.ok && !result.skipped) {
      processed++
    }
  }
  return { processed: processed }
}

/**
 * POST /api/bonus/bulk-percent — body: { percent }
 * Проставляет bonusPercent всем товарам.
 */
function handleBulkPercent(e) {
  var staff = requireStaff(e)
  if (staff.getString("role") !== "admin") {
    throw new ForbiddenError("Только admin")
  }
  var body = readBody(e)
  var percent = Number(body.percent)
  if (isNaN(percent) || percent < 0 || percent > 100) {
    throw new BadRequestError("percent 0…100")
  }

  var products = $app.findRecordsByFilter("products", "id != ''", "-created", 5000, 0, {})
  var updated = 0
  for (var i = 0; i < products.length; i++) {
    products[i].set("bonusPercent", percent)
    $app.save(products[i])
    updated++
  }

  try {
    var audit = require(__hooks + "/lib/audit.js")
    audit.write({
      actorType: "admin",
      actorId: staff.id,
      action: "bonus.bulk_percent",
      entity: "products",
      meta: { percent: percent, updated: updated },
      e: e,
    })
  } catch (err) {
    // ignore
  }

  return e.json(200, { ok: true, updated: updated, percent: percent })
}

module.exports = {
  BONUS_SETTINGS_DEFAULTS: BONUS_SETTINGS_DEFAULTS,
  loadBonusSettings: loadBonusSettings,
  applyLedgerDelta: applyLedgerDelta,
  applyLedgerDeltaTx: applyLedgerDeltaTx,
  handleProfileBonus: handleProfileBonus,
  handleAdjust: handleAdjust,
  handlePublicSettings: handlePublicSettings,
  handlePwaInstall: handlePwaInstall,
  handleReferral: handleReferral,
  handleBulkPercent: handleBulkPercent,
  resolveSpendForOrder: resolveSpendForOrder,
  debitOrderSpend: debitOrderSpend,
  creditOrderEarn: creditOrderEarn,
  creditRegistrationBonus: creditRegistrationBonus,
  calcOrderEarnAmount: calcOrderEarnAmount,
  runBirthdayCron: runBirthdayCron,
  ensureReferralCode: ensureReferralCode,
  listLedgerForCustomer: listLedgerForCustomer,
  mapLedgerEntry: mapLedgerEntry,
}
