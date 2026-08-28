/**
 * Синхронизация sizes / variants / артикулов / цен / tagline из temp/Товары.xls → PocketBase products.
 * Запуск из apps/shashlik-web:
 *   PB_EMAIL=... PB_PASSWORD=... node scripts/sync-products-from-cash.mjs
 *   node scripts/sync-products-from-cash.mjs --dry-run
 */
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import PocketBase from "pocketbase"

const __dir = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(__dir, "../../..")
const dryRun = process.argv.includes("--dry-run")

const PB_URL = process.env.PB_URL ?? "https://shashlik.loomixx.ru"
const PB_EMAIL = process.env.PB_EMAIL
const PB_PASSWORD = process.env.PB_PASSWORD

if (!PB_EMAIL || !PB_PASSWORD) {
  console.error("Set PB_EMAIL and PB_PASSWORD env vars")
  process.exit(1)
}

const MEAT_VARIANTS = [
  { id: "chicken", label: "Курица", icon: "chicken", priceDelta: 0 },
  { id: "pork", label: "Свинина", icon: "pork", priceDelta: 0 },
]

const TAGLINES = {
  arabskaya:
    "Пряный арабский соус, свежие овощи и сочное мясо — яркий вкус Востока в каждом кусочке",
  barbekyu:
    "Дымный соус барбекю и мясо с угля — насыщенный, с лёгкой копотью и сладковатым финишем",
  gavayskaya:
    "Сочные ананасы и расплавленный сыр — сладко-солёный баланс, который хочется повторить",
  kavkazskaya:
    "Острый кавказский соус, маринованные овощи и аромат специй — для тех, кто любит характер",
  pikantnaya:
    "Халапеньо и острый соус — жгучая шаурма с хрустящими овощами и сочным мясом",
  syrnaya:
    "Много моцареллы и нежный сырный соус — мягкая, сытная и очень аппетитная",
  klassicheskaya:
    "Классика жанра: лаваш, свежие овощи, маринованный лук и фирменные соусы без лишнего",
  derevenskaya:
    "Картофель по-деревенски, овощи и мясо — сытная «деревенская» шаурма с домашним характером",
  italyanskaya:
    "Вяленые томаты, моцарелла и острый соус — итальянские ноты в привычном формате",
  meganaggets:
    "Хрустящие куриные наггетсы, овощи и классический соус — детский хит и взрослый перекус",
  "frensis-bekon":
    "Хрустящий бекон, мясо и соус барбекю — мощный, дымный вкус для настоящих мясоедов",
  chesnochnaya:
    "Чесночный соус и свежие овощи — ароматная шаурма с пикантным, но не перебивающим вкусом",
  mariinskaya:
    "Нежный сливочный соус и сочное мясо — мягкий, сбалансированный вкус без остроты",
}

function parseCatalog(html) {
  const rows = []
  const trRe = /<tr[^>]*>([\s\S]*?)<\/tr>/gi
  let tr
  while ((tr = trRe.exec(html))) {
    const tds = []
    const tdRe = /<td[^>]*>([\s\S]*?)<\/td>/gi
    let td
    while ((td = tdRe.exec(tr[1]))) {
      tds.push(
        td[1]
          .replace(/<[^>]+>/g, "")
          .replace(/&nbsp;/g, " ")
          .trim(),
      )
    }
    if (tds.length >= 5 && tds[0] !== "Категория") rows.push(tds)
  }
  const items = []
  for (const r of rows) {
    const art = r[4]?.trim()
    if (!art) continue
    items.push({
      cat: r[0],
      name: r[1],
      price: Math.round(Number(r[2]) || 0),
      art,
    })
  }
  return items
}

const SKU_RE =
  /^(?<flavor>.+?)\s+(?<size>L|XL)\s+(?:с|со)\s+(?<meat>куриц(?:ей|а|ей)|курц(?:ей|а)|свинин(?:ой|а))/iu

function parseSkuName(name) {
  const m = name.match(SKU_RE)
  if (!m?.groups) return null
  const meatRaw = m.groups.meat.toLowerCase()
  return {
    flavor: m.groups.flavor.trim(),
    size: m.groups.size.toUpperCase(),
    meat: meatRaw.includes("кур") ? "chicken" : "pork",
  }
}

function flavorKey(flavor) {
  return flavor
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-zа-яё0-9-]/gi, "")
}

const FLAVOR_ALIASES = {
  классическая: "klassicheskaya",
  мариинская: "mariinskaya",
  "френсис бекон": "frensis-bekon",
  "итальянская острая": "italyanskaya",
  итальянская: "italyanskaya",
}

function matchProduct(product, catalogByFlavor) {
  const name = product.name.trim().toLowerCase()
  for (const flavor of Object.keys(catalogByFlavor)) {
    if (name === flavor.toLowerCase() || name.startsWith(flavor.toLowerCase())) {
      return flavor
    }
  }
  const slugGuess = FLAVOR_ALIASES[name] ?? product.slug
  for (const flavor of Object.keys(catalogByFlavor)) {
    if (flavorKey(flavor) === flavorKey(slugGuess) || flavorKey(flavor) === product.slug) {
      return flavor
    }
  }
  return null
}

function buildCatalogMap(items) {
  const map = {}
  for (const item of items) {
    const parsed = parseSkuName(item.name)
    if (!parsed) continue
    map[parsed.flavor] ??= {}
    map[parsed.flavor][parsed.size] ??= {}
    map[parsed.flavor][parsed.size][parsed.meat] = { art: item.art, price: item.price }
  }
  const bbq = items.find((i) => i.art === "51147")
  if (bbq) {
    map["Барбекю"] ??= {}
    map["Барбекю"].XL ??= {}
    map["Барбекю"].XL.chicken = { art: bbq.art, price: bbq.price }
  }
  return map
}

function buildSizes(flavorData) {
  return ["l", "xl"].map((id) => {
    const label = id.toUpperCase()
    const row = flavorData[label] ?? {}
    const chicken = row.chicken
    const pork = row.pork
    const prices = [chicken?.price, pork?.price].filter((p) => p != null)
    const minPrice = prices.length ? Math.min(...prices) : 0
    const articleByVariant = {}
    const priceByVariant = {}
    if (chicken) {
      articleByVariant.chicken = chicken.art
      priceByVariant.chicken = chicken.price
    }
    if (pork) {
      articleByVariant.pork = pork.art
      priceByVariant.pork = pork.price
    }
    return {
      id,
      label,
      weight: id === "l" ? "300 г" : "400 г",
      price: minPrice,
      ...(Object.keys(articleByVariant).length ? { articleByVariant } : {}),
      ...(Object.keys(priceByVariant).length ? { priceByVariant } : {}),
    }
  })
}

/** L/XL без артикулов — для карточек, которых нет в выгрузке кассы */
function buildDefaultSizes() {
  return [
    {
      id: "l",
      label: "L",
      weight: "300 г",
      price: 340,
      priceByVariant: { chicken: 340, pork: 360 },
    },
    {
      id: "xl",
      label: "XL",
      weight: "400 г",
      price: 390,
      priceByVariant: { chicken: 390, pork: 420 },
    },
  ]
}

async function auth(pb) {
  try {
    await pb.collection("users").authWithPassword(PB_EMAIL, PB_PASSWORD)
    return "users"
  } catch {
    await pb.collection("_superusers").authWithPassword(PB_EMAIL, PB_PASSWORD)
    return "_superusers"
  }
}

const html = readFileSync(join(repoRoot, "temp/Товары.xls"), "utf8")
const items = parseCatalog(html)
const catalogByFlavor = buildCatalogMap(items)

const pb = new PocketBase(PB_URL)
const authAs = await auth(pb)
console.log("Auth:", authAs)

const products = await pb.collection("products").getFullList({ sort: "order" })
console.log("Products in PB:", products.length)

let updated = 0
let skipped = 0

for (const product of products) {
  if (product.slug === "test" || product.name === "Тест") {
    skipped++
    continue
  }

  if (product.categoryId !== "shaurma" && product.categoryId !== "shawarma") {
    skipped++
    continue
  }

  const flavor = matchProduct(product, catalogByFlavor)
  const fromCash = flavor && catalogByFlavor[flavor]
  const sizes = fromCash ? buildSizes(catalogByFlavor[flavor]) : buildDefaultSizes()
  const tagline = TAGLINES[product.slug] ?? product.tagline

  const patch = {
    variants: MEAT_VARIANTS,
    sizes,
    tagline,
  }

  if (fromCash) {
    const hasArticles = sizes.some(
      (s) => s.articleByVariant && Object.keys(s.articleByVariant).length > 0,
    )
    if (!hasArticles) {
      console.log("SKIP (no articles):", product.slug, flavor)
      skipped++
      continue
    }
    console.log("UPDATE (cash):", product.slug, "←", flavor)
  } else {
    console.log("UPDATE (default sizes):", product.slug, product.name)
  }

  if (!dryRun) {
    await pb.collection("products").update(product.id, patch)
  }
  updated++
}

console.log("\nDone.", dryRun ? "(dry-run)" : "", "updated:", updated, "skipped:", skipped)
