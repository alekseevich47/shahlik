// Регистрации хуков, роутов и cron для интеграции Frontpad.
// require(`${__hooks}/lib/…`) — только внутри обработчиков (JSVM).
//
// Cron можно выключить env FRONTPAD_CRON=0 (systemd unit).
//
// Шаг 3: onRecordAfterCreateSuccess("orders") → send.sendOrder
// Шаг 4: cronAdd("frontpad-worker", …) → jobs.runWorkerTick
// Шаг 5: cronAdd sync_stops / sync_products → sync.*
// Шаг 6: routerAdd POST /api/webhooks/frontpad/status
//
// Диагностика: GET /api/frontpad/diag?token=FRONTPAD_HOOK_TOKEN

function frontpadCronEnabled() {
  return $os.getenv("FRONTPAD_CRON") !== "0"
}

// Шаг 1: на старте создаём singleton-записи, чтобы фронт не ловил 404.
// Важно: `e.next()` первым, иначе системная инициализация прервётся.
onBootstrap(function (e) {
  e.next()

  var config = require(__hooks + "/lib/config.js")
  var singletonId = config.SETTINGS_ID

  function ensureSingleton(collectionName) {
    try {
      $app.findRecordById(collectionName, singletonId)
      return
    } catch (err) {
      // singleton может отсутствовать (dev/переезд базы)
    }

    var collection = $app.findCollectionByNameOrId(collectionName)
    var record = new Record(collection)
    record.id = singletonId
    $app.save(record)
  }

  ensureSingleton("settings")
  ensureSingleton("frontpad_settings")
})

onRecordCreateRequest(function (e) {
  var order = require(__hooks + "/lib/order.js")
  order.validateAndRecalculateOrder(e)
}, "orders")

onRecordAfterCreateSuccess(function (e) {
  var logger = $app.logger()
  var record = e.record

  var couponCode = record.getString("couponCode")
  if (couponCode) {
    try {
      var coupon = $app.findFirstRecordByFilter("coupons", "code = {:code}", {
        code: couponCode,
      })
      var uses = coupon.getFloat("uses") || 0
      coupon.set("uses", uses + 1)
      $app.save(coupon)
    } catch (err) {
      logger.warn(
        "coupon uses increment failed",
        "orderId",
        record.id,
        "error",
        String(err),
      )
    }
  }

  try {
    var send = require(__hooks + "/lib/send.js")
    send.sendOrder(record.id)
  } catch (err) {
    logger.error("order send failed", "orderId", record.id, "error", String(err))
    try {
      var orderRecord = $app.findRecordById("orders", record.id)
      orderRecord.set("frontpadError", String(err))
      orderRecord.set("sentAt", "")
      $app.save(orderRecord)
    } catch (patchErr) {
      logger.error("order send patch failed", "orderId", record.id, "error", String(patchErr))
    }
  }

  e.next()
}, "orders")

if (frontpadCronEnabled()) {
  cronAdd("frontpad-worker", "* * * * *", function () {
    var logger = $app.logger()
    try {
      var jobs = require(__hooks + "/lib/jobs.js")
      jobs.runWorkerTick()
    } catch (err) {
      logger.error("frontpad worker tick failed", "error", String(err))
    }
  })

  cronAdd("frontpad-sync-stops", "*/15 * * * *", function () {
    var logger = $app.logger()
    try {
      var config = require(__hooks + "/lib/config.js")
      if (!config.loadFrontpadSettings().syncEnabled) {
        return
      }
      var jobs = require(__hooks + "/lib/jobs.js")
      jobs.enqueueJob("sync_stops", {})
    } catch (err) {
      logger.error("frontpad sync_stops enqueue failed", "error", String(err))
    }
  })

  cronAdd("frontpad-sync-products", "0 * * * *", function () {
    var logger = $app.logger()
    try {
      var config = require(__hooks + "/lib/config.js")
      if (!config.loadFrontpadSettings().syncEnabled) {
        return
      }
      var jobs = require(__hooks + "/lib/jobs.js")
      jobs.enqueueJob("sync_products", {})
    } catch (err) {
      logger.error("frontpad sync_products enqueue failed", "error", String(err))
    }
  })

  cronAdd("frontpad-purge-jobs", "17 4 * * *", function () {
    var logger = $app.logger()
    try {
      var jobs = require(__hooks + "/lib/jobs.js")
      jobs.purgeOldJobs()
    } catch (err) {
      logger.error("frontpad purge jobs failed", "error", String(err))
    }
  })
}

// Джобы из админки исполняются сразу при создании, чтобы кнопка
// работала независимо от cron (в т.ч. при FRONTPAD_CRON=0).
onRecordAfterCreateSuccess(function (e) {
  var logger = $app.logger()
  var kind = e.record.getString("kind")

  if (kind === "resend_order" || kind === "send_order" || kind === "apply_prices") {
    try {
      var jobs = require(__hooks + "/lib/jobs.js")
      jobs.runJobById(e.record.id)
    } catch (err) {
      logger.error("frontpad job immediate run failed", "jobId", e.record.id, "error", String(err))
    }
  }

  e.next()
}, "frontpad_jobs")

routerAdd("POST", "/api/webhooks/frontpad/status", function (e) {
  var webhook = require(__hooks + "/lib/webhook.js")
  return webhook.handleStatusWebhook(e)
})

routerAdd("GET", "/api/frontpad/diag", function (e) {
  var config = require(__hooks + "/lib/config.js")
  var token = config.getHookToken()
  var webhook = require(__hooks + "/lib/webhook.js")

  var given = ""
  try {
    given = e.request.url.query().get("token") || ""
  } catch (err) {
    given = ""
  }

  if (!token || !webhook.constantTimeEqual(given, token)) {
    throw new NotFoundError("")
  }

  var fp = config.loadFrontpadSettings()
  var site = config.loadSettings()

  return e.json(200, {
    env: {
      secretSet: config.getSecret().length > 0,
      hookTokenSet: true,
      apiUrl: config.getApiUrl(),
      cronEnabled: frontpadCronEnabled(),
    },
    frontpadSettings: {
      found: fp.id === config.SETTINGS_ID,
      sendEnabled: fp.sendEnabled,
      syncEnabled: fp.syncEnabled,
      sendPrices: fp.sendPrices,
      payCodePickup: fp.payCodePickup,
      payCodeDelivery: fp.payCodeDelivery,
      articlePack: fp.articlePack,
      articleDelivery: fp.articleDelivery,
      hookStatuses: fp.hookStatuses,
      hookUrlResolved: config.buildHookUrl(fp),
      retryLimit: fp.retryLimit,
      lastError: fp.lastError,
      lastOrderSentAt: fp.lastOrderSentAt,
    },
    siteSettings: {
      acceptingOrders: site.acceptingOrders,
      packFee: site.packFee,
      deliveryFee: site.deliveryFee,
      minOrder: site.minOrder,
    },
    now: config.toPbDateTime(new Date()),
  })
})
