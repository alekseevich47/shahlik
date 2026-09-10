// Оценки товаров после выполненного заказа (только app_users + hook).

routerAdd(
  "POST",
  "/api/ratings/submit",
  function (e) {
    var ratings = require(__hooks + "/lib/ratings.js")
    return ratings.submitRating(e)
  },
  $apis.requireAuth("app_users"),
)

routerAdd(
  "GET",
  "/api/ratings/order/{orderId}",
  function (e) {
    var ratings = require(__hooks + "/lib/ratings.js")
    return ratings.listOrderRatings(e)
  },
  $apis.requireAuth("app_users"),
)
