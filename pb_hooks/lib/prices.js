/** Применение цен кассы к products.sizes[].price и variants[].priceDelta.
 * Алгоритм дублируется в entities/product/lib/prices.ts — менять оба.
 *
 * База = первый вариант: size.price = цена кассы ячейки [вариант0, size],
 * variant.priceDelta = цена[вариантN, size] − size.price.
 * Если артикул не у всех ячеек или priceDelta расходится по размерам —
 * товар не трогаем, строка в отчёт. Пишем только при priceSource = frontpad.
 */

var PAGE = 200

function listAll(collection, sort) {
  var all = []
  var offset = 0
  while (true) {
    var batch = $app.findRecordsByFilter(
      collection,
      "id != ''",
      sort || "",
      PAGE,
      offset,
    )
    for (var i = 0; i < batch.length; i++) {
      all.push(batch[i])
    }
    if (batch.length < PAGE) {
      break
    }
    offset += PAGE
  }
  return all
}

function roundPrice(value) {
  var n = Number(value)
  if (isNaN(n)) {
    return 0
  }
  return Math.round(n)
}

function loadStockMap() {
  var map = {}
  var records = listAll("frontpad_stock", "article")
  for (var i = 0; i < records.length; i++) {
    var article = String(records[i].getString("article") || "").trim()
    if (!article) {
      continue
    }
    map[article] = roundPrice(records[i].getFloat("price"))
  }
  return map
}

function variantLabel(variant, order) {
  if (!variant) {
    return "без варианта"
  }
  var label = order.getField(variant, "label")
  return label ? String(label) : "без варианта"
}

function sizeLabel(size, order) {
  var label = order.getField(size, "label")
  return label ? String(label) : "?"
}

function cloneSize(size, order, parseJsonField) {
  var getField = order.getField
  var out = {
    id: String(getField(size, "id") || ""),
    label: String(getField(size, "label") || ""),
    price: roundPrice(getField(size, "price")),
  }
  var article = getField(size, "article")
  if (article !== undefined && article !== null && String(article).trim()) {
    out.article = String(article).trim()
  }
  var rawByVar = getField(size, "articleByVariant")
  if (typeof rawByVar === "string") {
    rawByVar = parseJsonField(rawByVar, null)
  } else if (rawByVar && typeof rawByVar === "object") {
    try {
      var asText = String(rawByVar)
      if (asText && asText !== "[object Object]" && asText.charAt(0) === "{") {
        rawByVar = parseJsonField(asText, rawByVar)
      }
    } catch (err) {
      // Go-map: оставляем как есть и читаем ключи ниже
    }
  }
  if (rawByVar && typeof rawByVar === "object") {
    var byVar = {}
    var has = false
    for (var k in rawByVar) {
      var val = rawByVar[k]
      if (val === undefined || val === null) {
        continue
      }
      var text = String(val).trim()
      if (!text) {
        continue
      }
      byVar[String(k)] = text
      has = true
    }
    if (has) {
      out.articleByVariant = byVar
    }
  }
  return out
}

function cloneVariant(variant, order) {
  var getField = order.getField
  var icon = getField(variant, "icon")
  var out = {
    id: String(getField(variant, "id") || ""),
    label: String(getField(variant, "label") || ""),
    priceDelta: roundPrice(getField(variant, "priceDelta")),
  }
  if (icon === "chicken" || icon === "pork") {
    out.icon = icon
  } else {
    out.icon = null
  }
  return out
}

/**
 * @returns {{ skip: boolean, reason?: string, changed?: boolean, sizes?: Object[], variants?: Object[] }}
 */
function planProduct(record, stockMap, order, parseJsonField) {
  var variants = order.toArrayLike(record.get("variants"), parseJsonField)
  var sizes = order.toArrayLike(record.get("sizes"), parseJsonField)

  if (!sizes.length) {
    return { skip: true, reason: "нет размеров" }
  }

  var rows = variants.length ? variants : [null]
  var si
  var vi

  for (vi = 0; vi < rows.length; vi++) {
    var variant = rows[vi]
    var variantId = variant ? order.getField(variant, "id") : ""
    for (si = 0; si < sizes.length; si++) {
      var article = order.articleFor(sizes[si], variantId)
      if (!article) {
        return {
          skip: true,
          reason:
            "нет артикула: " + variantLabel(variant, order) + " × " + sizeLabel(sizes[si], order),
        }
      }
      if (stockMap[article] === undefined) {
        return { skip: true, reason: "нет в кассе: " + article }
      }
    }
  }

  var newSizes = []
  var base = rows[0]
  var baseId = base ? order.getField(base, "id") : ""
  for (si = 0; si < sizes.length; si++) {
    var cloned = cloneSize(sizes[si], order, parseJsonField)
    cloned.price = stockMap[order.articleFor(sizes[si], baseId)]
    newSizes.push(cloned)
  }

  var newVariants = []
  for (vi = 0; vi < variants.length; vi++) {
    newVariants.push(cloneVariant(variants[vi], order))
  }

  if (newVariants.length) {
    newVariants[0].priceDelta = 0
    for (vi = 1; vi < newVariants.length; vi++) {
      var deltas = []
      var vId = order.getField(variants[vi], "id")
      for (si = 0; si < sizes.length; si++) {
        var cash = stockMap[order.articleFor(sizes[si], vId)]
        deltas.push(cash - newSizes[si].price)
      }
      var firstDelta = deltas[0]
      for (var di = 1; di < deltas.length; di++) {
        if (deltas[di] !== firstDelta) {
          return {
            skip: true,
            reason: "надбавка «" + variantLabel(variants[vi], order) + "» разная по размерам",
          }
        }
      }
      newVariants[vi].priceDelta = firstDelta
    }
  }

  var changed = false
  for (si = 0; si < sizes.length; si++) {
    if (roundPrice(order.getField(sizes[si], "price")) !== newSizes[si].price) {
      changed = true
      break
    }
  }
  if (!changed) {
    for (vi = 0; vi < variants.length; vi++) {
      if (roundPrice(order.getField(variants[vi], "priceDelta")) !== newVariants[vi].priceDelta) {
        changed = true
        break
      }
    }
  }

  return {
    skip: false,
    changed: changed,
    sizes: newSizes,
    variants: newVariants,
  }
}

/**
 * @returns {{
 *   ok: boolean,
 *   applied: boolean,
 *   priceSource: string,
 *   updated: number,
 *   skipped: number,
 *   unchanged: number,
 *   skippedRows: Object[],
 *   updatedRows: Object[]
 * }}
 */
function applyPrices() {
  var config = require(__hooks + "/lib/config.js")
  var order = require(__hooks + "/lib/order.js")
  var fp = config.loadFrontpadSettings()
  var write = fp.priceSource === "frontpad"
  var stockMap = loadStockMap()
  var products = listAll("products", "order")

  var skippedRows = []
  var updatedRows = []
  var unchanged = 0

  for (var i = 0; i < products.length; i++) {
    var record = products[i]
    var name = record.getString("name") || record.id
    var plan
    try {
      plan = planProduct(record, stockMap, order, config.parseJsonField)
    } catch (err) {
      skippedRows.push({ id: record.id, name: name, reason: "ошибка: " + String(err) })
      continue
    }

    if (plan.skip) {
      skippedRows.push({ id: record.id, name: name, reason: plan.reason || "пропущен" })
      continue
    }

    if (!plan.changed) {
      unchanged++
      continue
    }

    if (!write) {
      updatedRows.push({ id: record.id, name: name })
      continue
    }

    try {
      record.set("sizes", plan.sizes)
      record.set("variants", plan.variants)
      $app.save(record)
      updatedRows.push({ id: record.id, name: name })
    } catch (saveErr) {
      skippedRows.push({
        id: record.id,
        name: name,
        reason: "ошибка записи: " + String(saveErr),
      })
    }
  }

  return {
    ok: true,
    applied: write,
    priceSource: write ? "frontpad" : "site",
    updated: updatedRows.length,
    skipped: skippedRows.length,
    unchanged: unchanged,
    skippedRows: skippedRows,
    updatedRows: updatedRows,
  }
}

module.exports = {
  applyPrices: applyPrices,
}
