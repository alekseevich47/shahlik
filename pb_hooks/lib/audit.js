/**
 * Журнал действий admin / manager / user / guest.
 * Best-effort: ошибки записи не должны ломать основной поток.
 */

function readRequestMeta(e) {
  var ip = ""
  var ua = ""
  try {
    var info = e.requestInfo()
    if (info) {
      if (info.headers) {
        ua = String(info.headers["user-agent"] || info.headers["User-Agent"] || "").slice(0, 300)
        ip = String(
          info.headers["x-real-ip"] ||
            info.headers["X-Real-Ip"] ||
            info.headers["x-forwarded-for"] ||
            "",
        ).split(",")[0].trim().slice(0, 64)
      }
    }
  } catch (err) {
    // ignore
  }
  return { ip: ip, userAgent: ua }
}

function actorFromAuth(auth) {
  if (!auth) {
    return { actorType: "guest", actorId: "" }
  }
  try {
    var name = auth.collection().name
    if (name === "users") {
      var role = auth.getString("role")
      return {
        actorType: role === "manager" ? "manager" : "admin",
        actorId: auth.id,
      }
    }
    if (name === "app_users") {
      return { actorType: "user", actorId: auth.id }
    }
  } catch (err) {
    // ignore
  }
  return { actorType: "guest", actorId: "" }
}

/**
 * @param {{ actorType?: string, actorId?: string, action: string, entity?: string, entityId?: string, meta?: any, e?: any, app?: any }} opts
 */
function write(opts) {
  try {
    var app = opts.app || $app
    var collection = app.findCollectionByNameOrId("activity_logs")
    var record = new Record(collection)

    var actorType = opts.actorType || "guest"
    var actorId = opts.actorId || ""
    if ((!opts.actorType || !opts.actorId) && opts.e && opts.e.auth) {
      var fromAuth = actorFromAuth(opts.e.auth)
      if (!opts.actorType) {
        actorType = fromAuth.actorType
      }
      if (!opts.actorId) {
        actorId = fromAuth.actorId
      }
    }

    record.set("actorType", actorType)
    if (actorId) {
      record.set("actorId", String(actorId).slice(0, 32))
    }
    record.set("action", String(opts.action || "unknown").slice(0, 64))
    if (opts.entity) {
      record.set("entity", String(opts.entity).slice(0, 64))
    }
    if (opts.entityId) {
      record.set("entityId", String(opts.entityId).slice(0, 64))
    }
    if (opts.meta !== undefined) {
      record.set("meta", opts.meta)
    }

    if (opts.e) {
      var meta = readRequestMeta(opts.e)
      if (meta.ip) {
        record.set("ip", meta.ip)
      }
      if (meta.userAgent) {
        record.set("userAgent", meta.userAgent)
      }
    }

    app.save(record)
  } catch (err) {
    try {
      $app.logger().warn("audit write failed", "error", String(err), "action", opts.action || "")
    } catch (logErr) {
      // ignore
    }
  }
}

var AUDITED_COLLECTIONS = {
  products: true,
  categories: true,
  addons: true,
  banners: true,
  coupons: true,
  settings: true,
  bonus_settings: true,
  reviews: true,
  customers: true,
  orders: true,
  product_tags: true,
  product_badges: true,
  size_templates: true,
  users: true,
}

function hookCollectionWrite(e, action) {
  var name = ""
  try {
    name = e.collection ? e.collection.name : e.record.collection().name
  } catch (err) {
    try {
      name = e.record.collection().name
    } catch (err2) {
      return e.next()
    }
  }

  if (!AUDITED_COLLECTIONS[name]) {
    return e.next()
  }

  // Не логируем системные патчи заказов из хуков кассы без auth.
  if (name === "orders" && action === "update") {
    try {
      if (!e.auth) {
        return e.next()
      }
    } catch (err) {
      return e.next()
    }
  }

  e.next()

  write({
    e: e,
    action: name + "." + action,
    entity: name,
    entityId: e.record ? e.record.id : "",
    meta: action === "delete" ? {} : undefined,
  })
}

module.exports = {
  write: write,
  actorFromAuth: actorFromAuth,
  hookCollectionWrite: hookCollectionWrite,
  AUDITED_COLLECTIONS: AUDITED_COLLECTIONS,
}
