// Роуты профиля клиента витрины (бонусы, привязка телефона).
// require(`${__hooks}/lib/…`) — только внутри обработчиков (JSVM).

routerAdd(
  "GET",
  "/api/profile/bonus",
  function (e) {
    var profile = require(__hooks + "/lib/profile.js")
    return profile.handleBonus(e)
  },
  $apis.requireAuth("app_users"),
)

routerAdd(
  "POST",
  "/api/profile/link",
  function (e) {
    var profile = require(__hooks + "/lib/profile.js")
    return profile.handleLink(e)
  },
  $apis.requireAuth("app_users"),
)
