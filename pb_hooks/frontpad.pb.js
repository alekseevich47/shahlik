// Регистрации хуков, роутов и cron для интеграции Frontpad.
// require(`${__hooks}/lib/…`) — только внутри обработчиков (JSVM).
//
// Шаг 3: onRecordAfterCreateSuccess("orders") → send.sendOrder
// Шаг 4: cronAdd("frontpad-worker", …) → jobs.runWorkerTick
// Шаг 5: cronAdd sync_stops / sync_products → sync.*
// Шаг 6: routerAdd POST /api/webhooks/frontpad/status

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
  }
}, "orders")

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
    var jobs = require(__hooks + "/lib/jobs.js")
    jobs.enqueueJob("sync_stops", {})
  } catch (err) {
    logger.error("frontpad sync_stops enqueue failed", "error", String(err))
  }
})

cronAdd("frontpad-sync-products", "0 * * * *", function () {
  var logger = $app.logger()
  try {
    var jobs = require(__hooks + "/lib/jobs.js")
    jobs.enqueueJob("sync_products", {})
  } catch (err) {
    logger.error("frontpad sync_products enqueue failed", "error", String(err))
  }
})

routerAdd("POST", "/api/webhooks/frontpad/status", function (e) {
  var webhook = require(__hooks + "/lib/webhook.js")
  return webhook.handleStatusWebhook(e)
})
