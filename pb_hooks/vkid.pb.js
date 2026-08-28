// VK ID (id.vk.ru): старт и callback. Не путать со встроенным legacy-провайдером `vk`.
// require(`${__hooks}/lib/…`) — только внутри обработчиков (JSVM).

routerAdd("GET", "/api/auth/vk/start", function (e) {
  var vkid = require(__hooks + "/lib/vkid.js")
  return vkid.handleStart(e)
})

routerAdd("GET", "/api/auth/vk/callback", function (e) {
  var vkid = require(__hooks + "/lib/vkid.js")
  return vkid.handleCallback(e)
})

routerAdd("POST", "/api/auth/vk/complete", function (e) {
  var vkid = require(__hooks + "/lib/vkid.js")
  return vkid.handleComplete(e)
})
