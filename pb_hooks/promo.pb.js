// POST /api/promo/check — проверка промокода без публичного чтения coupons.

routerAdd("POST", "/api/promo/check", function (e) {
  var order = require(__hooks + "/lib/order.js")
  var body = {}

  try {
    var info = e.requestInfo()
    if (info && info.body && typeof info.body === "object") {
      body = info.body
    }
  } catch (err) {
    // ignore
  }

  var userId = ""
  try {
    if (e.auth && e.auth.collection().name === "app_users") {
      userId = e.auth.id
    }
  } catch (err) {
    userId = ""
  }

  var result = order.checkPromo(body.code, body.goods, userId)
  return e.json(200, result)
})
