// Своя бонусная система: роуты, cron ДР, bootstrap singleton.

routerAdd(
  "GET",
  "/api/bonus/public",
  function (e) {
    var bonus = require(__hooks + "/lib/bonus.js")
    return bonus.handlePublicSettings(e)
  },
)

routerAdd(
  "GET",
  "/api/profile/bonus",
  function (e) {
    var bonus = require(__hooks + "/lib/bonus.js")
    return bonus.handleProfileBonus(e)
  },
  $apis.requireAuth("app_users"),
)

routerAdd(
  "POST",
  "/api/bonus/adjust",
  function (e) {
    var bonus = require(__hooks + "/lib/bonus.js")
    return bonus.handleAdjust(e)
  },
  $apis.requireAuth("users"),
)

routerAdd(
  "POST",
  "/api/bonus/events/pwa-install",
  function (e) {
    var bonus = require(__hooks + "/lib/bonus.js")
    return bonus.handlePwaInstall(e)
  },
  $apis.requireAuth("app_users"),
)

routerAdd(
  "POST",
  "/api/profile/referral",
  function (e) {
    var bonus = require(__hooks + "/lib/bonus.js")
    return bonus.handleReferral(e)
  },
  $apis.requireAuth("app_users"),
)

routerAdd(
  "POST",
  "/api/bonus/bulk-percent",
  function (e) {
    var bonus = require(__hooks + "/lib/bonus.js")
    return bonus.handleBulkPercent(e)
  },
  $apis.requireAuth("users"),
)

onBootstrap(function (e) {
  e.next()

  var config = require(__hooks + "/lib/config.js")
  var singletonId = config.SETTINGS_ID

  try {
    $app.findRecordById("bonus_settings", singletonId)
  } catch (err) {
    try {
      var collection = $app.findCollectionByNameOrId("bonus_settings")
      var record = new Record(collection)
      record.id = singletonId
      var bonus = require(__hooks + "/lib/bonus.js")
      var defaults = bonus.BONUS_SETTINGS_DEFAULTS
      record.set("enabled", defaults.enabled)
      record.set("defaultEarnPercent", defaults.defaultEarnPercent)
      record.set("birthdayAmount", defaults.birthdayAmount)
      record.set("referralInviterAmount", defaults.referralInviterAmount)
      record.set("referralInviteeAmount", defaults.referralInviteeAmount)
      record.set("pwaInstallAmount", defaults.pwaInstallAmount)
      record.set("registrationAmount", defaults.registrationAmount)
      record.set("maxSpendPercent", defaults.maxSpendPercent)
      record.set("earnOnStatus", defaults.earnOnStatus)
      $app.save(record)
    } catch (createErr) {
      $app.logger().warn("bonus_settings bootstrap failed", "error", String(createErr))
    }
  }
})

if ($os.getenv("FRONTPAD_CRON") !== "0") {
  cronAdd("bonus-birthday", "15 5 * * *", function () {
    try {
      var bonus = require(__hooks + "/lib/bonus.js")
      var result = bonus.runBirthdayCron()
      $app.logger().info("bonus birthday cron", "processed", result.processed || 0)
    } catch (err) {
      $app.logger().error("bonus birthday cron failed", "error", String(err))
    }
  })
}

// Начисление при переходе заказа в done (админка / ручной статус).
onRecordUpdateRequest(function (e) {
  var prev = ""
  try {
    prev = e.record.original().getString("status")
  } catch (err) {
    prev = ""
  }
  var next = e.record.getString("status")
  e.next()

  if (prev === next || next !== "done") {
    return
  }

  try {
    var bonus = require(__hooks + "/lib/bonus.js")
    var order = $app.findRecordById("orders", e.record.id)
    bonus.creditOrderEarn(order)
  } catch (err) {
    $app.logger().error("bonus earn on status failed", "orderId", e.record.id, "error", String(err))
  }
}, "orders")

// Реферальный код + подарок за регистрацию при создании app_users (OAuth).
onRecordAfterCreateSuccess(function (e) {
  try {
    var bonus = require(__hooks + "/lib/bonus.js")
    var user = $app.findRecordById("app_users", e.record.id)
    bonus.ensureReferralCode($app, user)
    bonus.creditRegistrationBonus($app, user)
  } catch (err) {
    // ignore
  }
  e.next()
}, "app_users")

// Прямая правка customers.score с клиента запрещена — только ledger / суперюзер.
onRecordUpdateRequest(function (e) {
  if (e.hasSuperuserAuth && e.hasSuperuserAuth()) {
    return e.next()
  }
  // Внутренние $app.save из хуков идут без e.auth — score менять можно.
  if (!e.auth) {
    return e.next()
  }
  try {
    var orig = e.record.original()
    e.record.set("score", orig.getFloat("score") || 0)
  } catch (err) {
    // ignore
  }
  return e.next()
}, "customers")
