// Роуты профиля клиента витрины (бонусы, привязка телефона).
// require(`${__hooks}/lib/…`) — только внутри обработчиков (JSVM).

routerAdd(
  "POST",
  "/api/profile/link",
  function (e) {
    var profile = require(__hooks + "/lib/profile.js")
    return profile.handleLink(e)
  },
  $apis.requireAuth("app_users"),
)

onRecordAuthWithOAuth2Request(
  function (e) {
    var profile = require(__hooks + "/lib/profile.js")
    return profile.handleOAuthAuth(e)
  },
  "app_users",
)

onRecordAuthRequest(
  function (e) {
    var profile = require(__hooks + "/lib/profile.js")
    return profile.handleOAuthAuthSuccess(e)
  },
  "app_users",
)

onRecordUpdateRequest(
  function (e) {
    var profile = require(__hooks + "/lib/profile.js")
    return profile.lockAppUserIdentityFields(e)
  },
  "app_users",
)
