// Журнал действий. Регистрации только здесь (JSVM).

onRecordAfterCreateSuccess(function (e) {
  var audit = require(__hooks + "/lib/audit.js")
  return audit.hookCollectionWrite(e, "create")
})

onRecordAfterUpdateSuccess(function (e) {
  var audit = require(__hooks + "/lib/audit.js")
  return audit.hookCollectionWrite(e, "update")
})

onRecordAfterDeleteSuccess(function (e) {
  var audit = require(__hooks + "/lib/audit.js")
  return audit.hookCollectionWrite(e, "delete")
})

onRecordAuthRequest(function (e) {
  e.next()
  try {
    if (!e.record || e.record.collection().name !== "users") {
      return
    }
    var audit = require(__hooks + "/lib/audit.js")
    audit.write({
      e: e,
      actorType: e.record.getString("role") === "manager" ? "manager" : "admin",
      actorId: e.record.id,
      action: "auth.login",
      entity: "users",
      entityId: e.record.id,
    })
  } catch (err) {
    // ignore
  }
}, "users")
