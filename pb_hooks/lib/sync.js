var PRODUCTS_MIN_INTERVAL_MS = 60 * 60 * 1000

function pad2(n) {
  return n < 10 ? "0" + n : String(n)
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

function patchFrontpadSettings(fields) {
  var config = require(__hooks + "/lib/config.js")
  try {
    var record = $app.findRecordById("frontpad_settings", config.SETTINGS_ID)
    for (var key in fields) {
      if (fields.hasOwnProperty(key)) {
        record.set(key, fields[key])
      }
    }
    $app.save(record)
  } catch (err) {
    // singleton may be missing in dev
  }
}

function parseSyncDate(raw) {
  if (!raw) {
    return null
  }
  var ms = new Date(String(raw)).getTime()
  return isNaN(ms) ? null : ms
}

function isProductsSyncAllowed(lastProductsSyncAt) {
  var lastMs = parseSyncDate(lastProductsSyncAt)
  if (lastMs === null) {
    return true
  }
  return Date.now() - lastMs >= PRODUCTS_MIN_INTERVAL_MS
}

function toArray(value) {
  if (value === undefined || value === null) {
    return []
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
      if (value.hasOwnProperty(key)) {
        keys.push(key)
      }
    }
    keys.sort(function (a, b) {
      return Number(a) - Number(b)
    })
    var out = []
    for (var j = 0; j < keys.length; j++) {
      out.push(value[keys[j]])
    }
    return out
  }

  return [value]
}

function parsePrice(value) {
  var n = parseFloat(String(value))
  return isNaN(n) ? 0 : n
}

function parseSaleFlag(value) {
  return value === 1 || value === "1" || value === true
}

function normalizeArticle(value) {
  if (value === undefined || value === null) {
    return ""
  }
  return String(value).trim()
}

function listAllStock() {
  return $app.findRecordsByFilter("frontpad_stock", "id != ''", "article", 500, 0)
}

function upsertStockArticle(article, name, price, sale) {
  var collection = $app.findCollectionByNameOrId("frontpad_stock")
  var record

  try {
    record = $app.findFirstRecordByFilter("frontpad_stock", "article = {:article}", {
      article: article,
    })
    record.set("name", name)
    record.set("price", price)
    record.set("sale", sale)
    $app.save(record)
    return "updated"
  } catch (err) {
    record = new Record(collection)
    record.set("article", article)
    record.set("name", name)
    record.set("price", price)
    record.set("sale", sale)
    record.set("stopped", false)
    $app.save(record)
    return "created"
  }
}

function isNoStopsResponse(data) {
  if (!data) {
    return false
  }
  return data.error === "no_stops" || data.description === "no_stops"
}

/**
 * @returns {{ ok: boolean, skipped?: boolean, message?: string, error?: string, count?: number, removed?: number }}
 */
function syncProducts() {
  var config = require(__hooks + "/lib/config.js")
  var http = require(__hooks + "/lib/http.js")
  var fpSettings = config.loadFrontpadSettings()

  if (!fpSettings.syncEnabled) {
    return { ok: true, skipped: true, message: "синхронизация каталога отключена" }
  }

  if (!isProductsSyncAllowed(fpSettings.lastProductsSyncAt)) {
    return { ok: true, skipped: true, message: "пропущено по лимиту" }
  }

  var response = http.call("get_products", {}, { timeout: 15000 })

  if (!response.ok) {
    var errorText = response.error ? response.error.message : "Ошибка синхронизации каталога"
    patchFrontpadSettings({ lastError: errorText })
    return { ok: false, error: errorText }
  }

  var data = response.data || {}
  var articles = toArray(data.product_id)
  var names = toArray(data.name)
  var prices = toArray(data.price)
  var sales = toArray(data.sale)
  var seen = {}
  var upserted = 0
  var created = 0

  for (var i = 0; i < articles.length; i++) {
    var article = normalizeArticle(articles[i])
    if (!article) {
      continue
    }

    var name = names[i] !== undefined && names[i] !== null ? String(names[i]) : article
    var price = parsePrice(prices[i])
    var sale = parseSaleFlag(sales[i])
    var action = upsertStockArticle(article, name, price, sale)
    seen[article] = true
    upserted++
    if (action === "created") {
      created++
    }
  }

  var removed = 0
  var stockRecords = listAllStock()
  for (var j = 0; j < stockRecords.length; j++) {
    var stockArticle = stockRecords[j].getString("article")
    if (!seen[stockArticle]) {
      $app.delete(stockRecords[j])
      removed++
    }
  }

  patchFrontpadSettings({
    lastProductsSyncAt: formatPbDateTime(new Date()),
    lastError: "",
  })

  return {
    ok: true,
    count: upserted,
    created: created,
    removed: removed,
  }
}

/**
 * @returns {{ ok: boolean, error?: string, stopped?: number, cleared?: boolean }}
 */
function syncStops() {
  var http = require(__hooks + "/lib/http.js")
  var response = http.call("get_stops", {}, { timeout: 15000 })

  if (!response.ok) {
    var errorText = response.error ? response.error.message : "Ошибка синхронизации стоп-листа"
    patchFrontpadSettings({ lastError: errorText })
    return { ok: false, error: errorText }
  }

  var data = response.data || {}
  var stoppedSet = {}

  if (!isNoStopsResponse(data)) {
    var articles = toArray(data.product_id)
    for (var i = 0; i < articles.length; i++) {
      var article = normalizeArticle(articles[i])
      if (article) {
        stoppedSet[article] = true
      }
    }
  }

  var stockRecords = listAllStock()
  var stoppedCount = 0
  var cleared = isNoStopsResponse(data)

  for (var j = 0; j < stockRecords.length; j++) {
    var record = stockRecords[j]
    var stockArticle = record.getString("article")
    var shouldStop = !!stoppedSet[stockArticle]
    if (record.getBool("stopped") !== shouldStop) {
      record.set("stopped", shouldStop)
      $app.save(record)
    }
    if (shouldStop) {
      stoppedCount++
    }
  }

  patchFrontpadSettings({
    lastStopsSyncAt: formatPbDateTime(new Date()),
    lastError: "",
  })

  return {
    ok: true,
    stopped: stoppedCount,
    cleared: cleared,
  }
}

module.exports = {
  syncProducts: syncProducts,
  syncStops: syncStops,
}
