function pad2(n) {
  return n < 10 ? "0" + n : String(n)
}

function trimStr(value, maxLen) {
  if (value === undefined || value === null) {
    return ""
  }
  var s = String(value)
  if (s.length <= maxLen) {
    return s
  }
  return s.substring(0, maxLen)
}

function formatPbDateTime(d) {
  return (
    d.getFullYear() +
    "-" +
    pad2(d.getMonth() + 1) +
    "-" +
    pad2(d.getDate()) +
    " " +
    pad2(d.getHours()) +
    ":" +
    pad2(d.getMinutes()) +
    ":" +
    pad2(d.getSeconds())
  )
}

function parsePbDate(raw) {
  if (raw === undefined || raw === null || raw === "") {
    return null
  }
  var s = String(raw)
  if (s.length >= 19) {
    s = s.substring(0, 19)
  }
  return new Date(s.replace(" ", "T"))
}

function findSize(sizes, sizeId) {
  if (!sizes || !sizes.length || !sizeId) {
    return null
  }
  for (var i = 0; i < sizes.length; i++) {
    if (sizes[i] && sizes[i].id === sizeId) {
      return sizes[i]
    }
  }
  return null
}

function findVariant(variants, variantId) {
  if (!variants || !variants.length) {
    return null
  }
  if (!variantId) {
    return variants[0]
  }
  for (var i = 0; i < variants.length; i++) {
    if (variants[i] && variants[i].id === variantId) {
      return variants[i]
    }
  }
  return null
}

function priceOf(size, variant) {
  var delta = variant ? Number(variant.priceDelta) || 0 : 0
  return (Number(size.price) || 0) + delta
}

function articleFor(size, variantId) {
  if (variantId && size.articleByVariant) {
    var override = size.articleByVariant[variantId]
    if (override !== undefined && override !== null && String(override).trim()) {
      return String(override).trim()
    }
  }
  if (size.article !== undefined && size.article !== null && String(size.article).trim()) {
    return String(size.article).trim()
  }
  return ""
}

function isArticleStopped(article) {
  if (!article) {
    return false
  }
  try {
    var stock = $app.findFirstRecordByFilter(
      "frontpad_stock",
      "article = {:article}",
      { article: article },
    )
    return stock.getBool("stopped")
  } catch (err) {
    return false
  }
}

function assertArticleAvailable(article, label) {
  if (!article) {
    throw new BadRequestError("Позиция недоступна")
  }
  if (isArticleStopped(article)) {
    throw new BadRequestError("«" + label + "» временно недоступно")
  }
}

function calcCouponDiscount(goods, kind, value) {
  if (goods <= 0) {
    return 0
  }
  if (kind === "percent") {
    return Math.round((goods * Number(value)) / 100)
  }
  return Math.min(Math.round(Number(value)), goods)
}

function resolveCouponDiscount(goods, rawCode) {
  var code = rawCode ? String(rawCode).trim().toUpperCase() : ""
  if (!code) {
    return { discount: 0, couponCode: "" }
  }

  var coupon
  try {
    coupon = $app.findFirstRecordByFilter("coupons", "code = {:code}", { code: code })
  } catch (err) {
    throw new BadRequestError("Промокод не найден")
  }

  if (!coupon.getBool("active")) {
    throw new BadRequestError("Промокод недействителен")
  }

  var now = new Date()
  var startsAt = parsePbDate(coupon.get("startsAt"))
  if (startsAt && now < startsAt) {
    throw new BadRequestError("Промокод ещё не активен")
  }

  var endsAt = parsePbDate(coupon.get("endsAt"))
  if (endsAt && now > endsAt) {
    throw new BadRequestError("Промокод истёк")
  }

  var minTotal = coupon.getFloat("minTotal") || 0
  if (minTotal > 0 && goods < minTotal) {
    throw new BadRequestError("Минимальная сумма для промокода — " + Math.round(minTotal) + "₽")
  }

  var usesLimit = coupon.getFloat("usesLimit") || 0
  var uses = coupon.getFloat("uses") || 0
  if (usesLimit > 0 && uses >= usesLimit) {
    throw new BadRequestError("Лимит использований промокода исчерпан")
  }

  var kind = coupon.getString("kind")
  var value = coupon.getFloat("value") || 0
  return {
    discount: calcCouponDiscount(goods, kind, value),
    couponCode: code,
    kind: kind,
    value: value,
  }
}

function checkPromo(rawCode, goods) {
  var code = rawCode ? String(rawCode).trim().toUpperCase() : ""
  if (!code) {
    return { ok: false, message: "Введите промокод" }
  }

  var goodsNum = Number(goods)
  if (isNaN(goodsNum) || goodsNum < 0) {
    return { ok: false, message: "Некорректная сумма заказа" }
  }

  try {
    var result = resolveCouponDiscount(goodsNum, code)
    return {
      ok: true,
      kind: result.kind,
      value: result.value,
      discount: result.discount,
    }
  } catch (err) {
    var msg = "Не удалось проверить промокод"
    if (err && err.message) {
      msg = String(err.message)
    }
    return { ok: false, message: msg }
  }
}

function generateOrderNumber() {
  var now = new Date()
  var prefix = pad2(now.getDate()) + pad2(now.getMonth() + 1)
  var startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)
  var todayOrders = $app.findRecordsByFilter(
    "orders",
    "created >= {:since}",
    "-created",
    500,
    0,
    { since: formatPbDateTime(startOfDay) },
  )
  var seq = todayOrders.length + 1
  var nnn =
    seq < 10 ? "00" + seq : seq < 100 ? "0" + seq : seq < 1000 ? String(seq) : String(seq)
  return prefix + "-" + nnn
}

function countRecentOrdersByPhone(phone, since) {
  return $app.findRecordsByFilter(
    "orders",
    "phone = {:phone} && created >= {:since}",
    "-created",
    3,
    0,
    { phone: phone, since: formatPbDateTime(since) },
  ).length
}

function loadAddon(addonId) {
  try {
    return $app.findRecordById("addons", addonId)
  } catch (err) {
    throw new BadRequestError("Добавка недоступна")
  }
}

/**
 * Приводит значение из JSVM (Go slice / JSONRaw / string / object) к JS-массиву.
 * JSON.stringify в Goja для Go-значений часто даёт "{}"/null — не использовать.
 */
function toArrayLike(value, parseJsonField) {
  if (value === undefined || value === null || value === "") {
    return []
  }

  if (typeof value === "string") {
    var fromStr = parseJsonField(value, null)
    if (fromStr === null || fromStr === undefined) {
      return []
    }
    value = fromStr
  } else if (typeof value !== "object") {
    return []
  } else {
    // types.JSONRaw и аналоги: String(value) → сырой JSON
    try {
      var asText = String(value)
      if (
        asText &&
        asText !== "[object Object]" &&
        (asText.charAt(0) === "[" || asText.charAt(0) === "{")
      ) {
        var fromRaw = parseJsonField(asText, null)
        if (fromRaw !== null && fromRaw !== undefined) {
          value = fromRaw
        }
      }
    } catch (err) {
      // ignore
    }
  }

  if (typeof value.length === "number" && typeof value !== "string") {
    var arr = []
    for (var i = 0; i < value.length; i++) {
      arr.push(value[i])
    }
    return arr
  }

  if (typeof value === "object") {
    var keys = []
    for (var key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        keys.push(key)
      }
    }
    if (!keys.length) {
      return []
    }
    keys.sort(function (a, b) {
      return Number(a) - Number(b)
    })
    var out = []
    for (var k = 0; k < keys.length; k++) {
      out.push(value[keys[k]])
    }
    return out
  }

  return []
}

function plainObject(value, parseJsonField) {
  if (value === undefined || value === null) {
    return null
  }
  if (typeof value === "string") {
    value = parseJsonField(value, null)
  }
  if (!value || typeof value !== "object") {
    return null
  }
  // массив — не строка заказа
  if (typeof value.length === "number" && value.productId === undefined && value.sizeId === undefined) {
    return null
  }
  return value
}

function normalizeLines(raw, parseJsonField) {
  var parsed = toArrayLike(raw, parseJsonField)
  var out = []
  for (var i = 0; i < parsed.length; i++) {
    var line = plainObject(parsed[i], parseJsonField)
    if (line) {
      out.push(line)
    }
  }
  return out
}

function readOrderLinesFromEvent(e, parseJsonField) {
  var candidates = []

  try {
    candidates.push(e.record.get("lines"))
  } catch (err1) {
    // ignore
  }

  try {
    var info = e.requestInfo()
    if (info && info.body) {
      candidates.push(info.body.lines)
      // на всякий случай — тело целиком как строка не трогаем
    }
  } catch (err2) {
    // ignore
  }

  for (var i = 0; i < candidates.length; i++) {
    var lines = normalizeLines(candidates[i], parseJsonField)
    if (lines.length) {
      return lines
    }
  }

  return []
}

function resolveLine(line, parseJsonField) {
  line = plainObject(line, parseJsonField)
  if (!line) {
    throw new BadRequestError("Некорректный состав заказа")
  }

  var productId = line.productId
  var sizeId = line.sizeId
  var variantId = line.variantId
  var quantity = Number(line.quantity)

  if (!productId || !sizeId || !quantity || quantity < 1 || quantity !== Math.floor(quantity)) {
    throw new BadRequestError("Некорректная позиция заказа")
  }

  var productRecord
  try {
    productRecord = $app.findRecordById("products", productId)
  } catch (err) {
    throw new BadRequestError("Товар недоступен")
  }

  if (!productRecord.getBool("active")) {
    throw new BadRequestError("Товар недоступен")
  }

  var variants = parseJsonField(productRecord.get("variants"), [])
  var sizes = parseJsonField(productRecord.get("sizes"), [])
  var size = findSize(sizes, sizeId)
  if (!size) {
    throw new BadRequestError("Размер недоступен")
  }

  var variant = findVariant(variants, variantId)
  if (variantId && !variant) {
    throw new BadRequestError("Вариант недоступен")
  }

  var productName = productRecord.getString("name")
  var unitPrice = priceOf(size, variant)
  var article = articleFor(size, variant ? variant.id : variantId)
  assertArticleAvailable(article, productName)

  var resolvedAddons = []
  var addonsTotal = 0
  var rawAddons = line.addons

  if (rawAddons && rawAddons.length) {
    for (var i = 0; i < rawAddons.length; i++) {
      var rawAddon = rawAddons[i]
      if (!rawAddon || typeof rawAddon !== "object") {
        continue
      }
      var addonId = rawAddon.id || rawAddon.addonId
      var addonQty = Number(rawAddon.quantity)
      if (!addonId || !addonQty || addonQty < 1 || addonQty !== Math.floor(addonQty)) {
        throw new BadRequestError("Некорректная добавка")
      }

      var addonRecord = loadAddon(addonId)
      var addonName = addonRecord.getString("name")
      var addonPrice = addonRecord.getFloat("price") || 0
      var addonArticle = trimStr(addonRecord.getString("article"), 32)
      var addonKind = addonRecord.getString("kind") || "extra"

      assertArticleAvailable(addonArticle, addonName)

      resolvedAddons.push({
        id: addonRecord.id,
        name: addonName,
        quantity: addonQty,
        price: addonPrice,
        article: addonArticle || undefined,
        kind: addonKind,
      })
      addonsTotal += addonPrice * addonQty
    }
  }

  var lineTotal = unitPrice * quantity + addonsTotal

  return {
    productId: productId,
    variantId: variant ? variant.id : variantId || undefined,
    sizeId: size.id,
    article: article,
    quantity: quantity,
    name: productName,
    variantLabel: variant ? variant.label : undefined,
    sizeLabel: size.label,
    unitPrice: unitPrice,
    addons: resolvedAddons,
    total: lineTotal,
  }
}

function trimAddressParts(record, parseJsonField) {
  var parts = parseJsonField(record.get("addressParts"), null)
  if (!parts || typeof parts !== "object") {
    return
  }
  record.set("addressParts", {
    street: trimStr(parts.street, 50),
    home: trimStr(parts.home, 50),
    pod: trimStr(parts.pod, 2),
    et: trimStr(parts.et, 2),
    apart: trimStr(parts.apart, 50),
  })
}

/**
 * Пересчёт и валидация заказа перед созданием.
 *
 * @param {core.RecordRequestEvent} e
 */
function validateAndRecalculateOrder(e) {
  var config = require(__hooks + "/lib/config.js")
  var record = e.record
  var settings = config.loadSettings()
  var parseJsonField = config.parseJsonField

  if (!settings.acceptingOrders) {
    throw new BadRequestError(settings.stopMessage || "Сейчас заказы не принимаем")
  }

  var rawLines = readOrderLinesFromEvent(e, parseJsonField)
  if (!rawLines.length) {
    var debugHint = ""
    try {
      var raw = e.record.get("lines")
      debugHint = " (lines type=" + typeof raw + ")"
    } catch (err) {
      debugHint = " (lines unavailable)"
    }
    throw new BadRequestError("Добавьте позиции в заказ" + debugHint)
  }

  var resolvedLines = []
  var goods = 0
  var positions = 0

  for (var i = 0; i < rawLines.length; i++) {
    var resolved = resolveLine(rawLines[i], parseJsonField)
    resolvedLines.push(resolved)
    goods += resolved.total
    positions += resolved.quantity
  }

  var mode = record.getString("mode")
  var packFee = resolvedLines.length ? settings.packFee : 0
  var freeDeliveryLeft = Math.max(settings.freeDeliveryFrom - goods, 0)
  var deliveryFee =
    mode === "delivery" && resolvedLines.length && freeDeliveryLeft > 0
      ? settings.deliveryFee
      : 0

  var couponCodeRaw = record.getString("couponCode") || record.getString("promo")
  var couponResult = resolveCouponDiscount(goods, couponCodeRaw)
  var discount = couponResult.discount
  var total = Math.max(goods + packFee + deliveryFee - discount, 0)

  if (goods < settings.minOrder) {
    throw new BadRequestError(
      "Минимальная сумма заказа — " + Math.round(settings.minOrder) + "₽",
    )
  }

  var phone = trimStr(record.getString("phone"), 50)
  if (!phone) {
    throw new BadRequestError("Укажите телефон")
  }

  var tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000)
  if (countRecentOrdersByPhone(phone, tenMinutesAgo) >= 3) {
    throw new BadRequestError("Слишком много заказов с этого номера. Попробуйте позже")
  }

  record.set("customer", trimStr(record.getString("customer"), 50))
  record.set("phone", phone)
  record.set("comment", trimStr(record.getString("comment"), 100))
  trimAddressParts(record, parseJsonField)

  record.set("lines", resolvedLines)
  record.set("positions", positions)
  record.set("goods", goods)
  record.set("packFee", packFee)
  record.set("deliveryFee", deliveryFee)
  record.set("discount", discount)
  record.set("total", total)
  record.set("couponCode", couponResult.couponCode)
  record.set("promo", "")

  record.set("number", generateOrderNumber())
  record.set("status", "new")
  record.set("statusSource", "client")

  record.set("frontpadOrderId", null)
  record.set("frontpadOrderNumber", "")
  record.set("frontpadError", "")
  record.set("frontpadStatus", null)
  record.set("sentAt", null)

  e.next()
}

function formatPreorderDatetime(raw) {
  if (raw === undefined || raw === null || raw === "") {
    return null
  }
  var s = String(raw)
  if (s.length >= 19) {
    s = s.substring(0, 19).replace("T", " ")
  }
  var d = new Date(s.replace(" ", "T"))
  if (isNaN(d.getTime())) {
    return null
  }
  var now = new Date()
  var maxDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
  if (d < now || d > maxDate) {
    return null
  }
  return s
}

function buildDescr(order) {
  var parts = []
  if (order.comment) {
    parts.push(order.comment)
  }
  if (order.mode === "pickup") {
    parts.push("Самовывоз")
  } else {
    parts.push("Доставка")
  }
  if (order.couponCode) {
    parts.push("Промокод: " + order.couponCode)
  }
  return trimStr(parts.join(". "), 100)
}

/**
 * Сборка payload для Frontpad new_order.
 *
 * @param {Object} order
 * @param {Object} fpSettings
 * @returns {Object}
 */
function buildNewOrderPayload(order, fpSettings) {
  var config = require(__hooks + "/lib/config.js")

  var products = []
  var productKol = []
  var productMod = {}
  var productPrices = []
  var lines = order.lines || []

  for (var li = 0; li < lines.length; li++) {
    var line = lines[li]
    if (!line || !line.article) {
      continue
    }
    var parentIdx = products.length
    products.push(String(line.article))
    productKol.push(line.quantity)
    if (fpSettings.sendPrices) {
      productPrices.push(line.unitPrice)
    }

    var addons = line.addons || []
    for (var ai = 0; ai < addons.length; ai++) {
      var addon = addons[ai]
      if (!addon || !addon.article) {
        continue
      }
      var addonIdx = products.length
      products.push(String(addon.article))
      productKol.push(addon.quantity)
      productMod[String(addonIdx)] = parentIdx
      if (fpSettings.sendPrices) {
        productPrices.push(addon.price)
      }
    }
  }

  if (fpSettings.articlePack && order.packFee > 0) {
    products.push(String(fpSettings.articlePack))
    productKol.push(1)
    if (fpSettings.sendPrices) {
      productPrices.push(order.packFee)
    }
  }

  if (fpSettings.articleDelivery && order.deliveryFee > 0) {
    products.push(String(fpSettings.articleDelivery))
    productKol.push(1)
    if (fpSettings.sendPrices) {
      productPrices.push(order.deliveryFee)
    }
  }

  var payload = {
    product: products,
    product_kol: productKol,
  }

  var modKeys = []
  for (var modKey in productMod) {
    if (productMod.hasOwnProperty(modKey)) {
      modKeys.push(modKey)
    }
  }
  if (modKeys.length > 0) {
    payload.product_mod = productMod
  }

  if (fpSettings.sendPrices && productPrices.length > 0) {
    payload.product_price = productPrices
  }

  if (order.discount > 0) {
    payload.sale_amount = Math.round(order.discount)
  }

  payload.phone = order.phone || ""
  payload.name = order.customer || ""

  var descr = buildDescr(order)
  if (descr) {
    payload.descr = descr
  }

  if (order.mode === "delivery" && order.addressParts) {
    var ap = order.addressParts
    if (ap.street) {
      payload.street = ap.street
    }
    if (ap.home) {
      payload.home = ap.home
    }
    if (ap.pod) {
      payload.pod = ap.pod
    }
    if (ap.et) {
      payload.et = ap.et
    }
    if (ap.apart) {
      payload.apart = ap.apart
    }
  }

  var payCode =
    order.mode === "delivery" ? fpSettings.payCodeDelivery : fpSettings.payCodePickup
  if (payCode) {
    payload.pay = payCode
  }

  if (fpSettings.channel) {
    payload.channel = fpSettings.channel
  }
  if (fpSettings.affiliate) {
    payload.affiliate = fpSettings.affiliate
  }
  if (fpSettings.point) {
    payload.point = fpSettings.point
  }

  if (order.personCount > 0) {
    payload.person = order.personCount
  }

  var datetime = formatPreorderDatetime(order.preorderAt)
  if (datetime) {
    payload.datetime = datetime
  }

  if (fpSettings.orderTags && fpSettings.orderTags.length) {
    var tags = []
    for (var ti = 0; ti < fpSettings.orderTags.length && ti < 10; ti++) {
      tags.push(fpSettings.orderTags[ti])
    }
    if (tags.length) {
      payload.tags = tags
    }
  }

  if (fpSettings.hookStatuses && fpSettings.hookStatuses.length) {
    var hookStatus = []
    for (var hi = 0; hi < fpSettings.hookStatuses.length && hi < 5; hi++) {
      hookStatus.push(fpSettings.hookStatuses[hi])
    }
    if (hookStatus.length) {
      payload.hook_status = hookStatus
    }
  }

  var hookUrl = config.buildHookUrl(fpSettings)
  if (hookUrl) {
    payload.hook_url = hookUrl
  }

  return payload
}

module.exports = {
  validateAndRecalculateOrder: validateAndRecalculateOrder,
  buildNewOrderPayload: buildNewOrderPayload,
  checkPromo: checkPromo,
}
