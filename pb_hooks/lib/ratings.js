var CRITERION_IDS = ["taste", "composition", "service"]
var CRITERION_META = {
  taste: { id: "taste", label: "Вкусно?", hint: "Оцените вкус блюда" },
  composition: { id: "composition", label: "Состав", hint: "Оцените качество ингредиентов" },
  service: { id: "service", label: "Сервис", hint: "Оцените подачу и сервис" },
}

function requireAppUser(e) {
  if (!e.auth || e.auth.collection().name !== "app_users") {
    throw new UnauthorizedError("Нужна авторизация")
  }
  return e.auth
}

function readBody(e) {
  try {
    var info = e.requestInfo()
    if (info && info.body && typeof info.body === "object") {
      return info.body
    }
  } catch (err) {
    // ignore
  }
  return {}
}

function asString(v) {
  return typeof v === "string" ? v.trim() : ""
}

function clampStar(n) {
  if (!Number.isFinite(n)) return null
  var v = Math.round(n)
  if (v < 0 || v > 5) return null
  return v
}

function sanitizeCriteria(raw) {
  if (!raw || typeof raw !== "object") return null
  var out = {}
  var count = 0
  for (var i = 0; i < CRITERION_IDS.length; i++) {
    var id = CRITERION_IDS[i]
    if (!Object.prototype.hasOwnProperty.call(raw, id)) continue
    var star = clampStar(Number(raw[id]))
    if (star === null) return null
    out[id] = star
    count++
  }
  if (count !== CRITERION_IDS.length) return null
  return out
}

function orderHasProduct(order, productId) {
  var lines = order.get("lines")
  if (!lines || typeof lines.length !== "number") return false
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i]
    if (line && String(line.productId || "") === productId) return true
  }
  return false
}

function emptyDist() {
  return [0, 0, 0, 0, 0, 0]
}

function round1(n) {
  return Math.round(n * 10) / 10
}

/**
 * Пересчёт products.rating из всех product_ratings по productId.
 */
function recalculateProductRating(productId) {
  var rows = $app.findRecordsByFilter(
    "product_ratings",
    "productId = {:pid}",
    "-created",
    5000,
    0,
    { pid: productId },
  )

  var votes = rows.length
  var sumAll = 0
  var countAll = 0
  var perCrit = {}
  for (var i = 0; i < CRITERION_IDS.length; i++) {
    perCrit[CRITERION_IDS[i]] = { sum: 0, count: 0, dist: emptyDist() }
  }

  for (var r = 0; r < rows.length; r++) {
    var criteria = rows[r].get("criteria")
    if (!criteria || typeof criteria !== "object") continue
    for (var c = 0; c < CRITERION_IDS.length; c++) {
      var cid = CRITERION_IDS[c]
      var star = clampStar(Number(criteria[cid]))
      if (star === null) continue
      perCrit[cid].sum += star
      perCrit[cid].count += 1
      perCrit[cid].dist[star] += 1
      sumAll += star
      countAll += 1
    }
  }

  var product = $app.findRecordById("products", productId)
  var existing = product.get("rating")
  var labelMap = {}
  if (existing && existing.criteria && typeof existing.criteria.length === "number") {
    for (var k = 0; k < existing.criteria.length; k++) {
      var row = existing.criteria[k]
      if (row && row.id) {
        labelMap[row.id] = { label: row.label, hint: row.hint }
      }
    }
  }

  var criteriaOut = []
  for (var j = 0; j < CRITERION_IDS.length; j++) {
    var id = CRITERION_IDS[j]
    var meta = CRITERION_META[id]
    var labels = labelMap[id] || meta
    var bucket = perCrit[id]
    criteriaOut.push({
      id: id,
      label: labels.label || meta.label,
      hint: labels.hint || meta.hint,
      value: bucket.count ? round1(bucket.sum / bucket.count) : 0,
      distribution: bucket.dist,
    })
  }

  var overall = countAll ? round1(sumAll / countAll) : 0
  product.set("rating", {
    overall: overall,
    votes: votes,
    criteria: criteriaOut,
  })
  $app.save(product)

  return { overall: overall, votes: votes, criteria: criteriaOut }
}

/**
 * POST /api/ratings/submit
 * body: { orderId, productId, criteria: { taste, composition, service } }
 */
function submitRating(e) {
  var auth = requireAppUser(e)
  var body = readBody(e)
  var orderId = asString(body.orderId)
  var productId = asString(body.productId)
  var criteria = sanitizeCriteria(body.criteria)

  if (!orderId || !productId || !criteria) {
    throw new BadRequestError("Некорректные данные оценки")
  }

  var order
  try {
    order = $app.findRecordById("orders", orderId)
  } catch (err) {
    throw new NotFoundError("Заказ не найден")
  }

  if (order.getString("status") !== "done") {
    throw new BadRequestError("Оценить можно только выполненный заказ")
  }
  if (order.getString("userId") !== auth.id) {
    throw new ForbiddenError("Это не ваш заказ")
  }
  if (!orderHasProduct(order, productId)) {
    throw new BadRequestError("Товара нет в заказе")
  }

  try {
    $app.findRecordById("products", productId)
  } catch (err) {
    throw new NotFoundError("Товар не найден")
  }

  var existing = null
  try {
    existing = $app.findFirstRecordByFilter(
      "product_ratings",
      "orderId = {:oid} && productId = {:pid}",
      { oid: orderId, pid: productId },
    )
  } catch (err) {
    existing = null
  }
  if (existing) {
    throw new BadRequestError("Вы уже оценили этот товар в заказе")
  }

  var collection = $app.findCollectionByNameOrId("product_ratings")
  var record = new Record(collection)
  record.set("userId", auth.id)
  record.set("orderId", orderId)
  record.set("productId", productId)
  record.set("criteria", criteria)
  $app.save(record)

  var rating = recalculateProductRating(productId)
  return e.json(200, { ok: true, rating: rating, id: record.id })
}

/**
 * GET /api/ratings/order/:orderId — какие productId уже оценены.
 */
function listOrderRatings(e) {
  var auth = requireAppUser(e)
  var orderId = asString(e.request.pathValue("orderId"))
  if (!orderId) throw new BadRequestError("Нет orderId")

  var order
  try {
    order = $app.findRecordById("orders", orderId)
  } catch (err) {
    throw new NotFoundError("Заказ не найден")
  }
  if (order.getString("userId") !== auth.id) {
    throw new ForbiddenError("Это не ваш заказ")
  }

  var rows = $app.findRecordsByFilter(
    "product_ratings",
    "orderId = {:oid} && userId = {:uid}",
    "-created",
    200,
    0,
    { oid: orderId, uid: auth.id },
  )
  var productIds = []
  for (var i = 0; i < rows.length; i++) {
    productIds.push(rows[i].getString("productId"))
  }
  return e.json(200, { productIds: productIds })
}

module.exports = {
  submitRating: submitRating,
  listOrderRatings: listOrderRatings,
  recalculateProductRating: recalculateProductRating,
}
