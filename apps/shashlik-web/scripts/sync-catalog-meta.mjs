/**
 * Синхронизация nutritionByVariant + compositionByVariant из temp/*.json.
 * PB: добавить поле compositionByVariant (json) в коллекцию products.
 * Запуск: PB_EMAIL=... PB_PASSWORD=... node scripts/sync-catalog-meta.mjs
 */
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import PocketBase from "pocketbase"

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "../../..")
const nutritionBySlug = JSON.parse(
  readFileSync(join(repoRoot, "temp/nutrition-shawarma.json"), "utf8"),
)
const compositionBySlug = JSON.parse(
  readFileSync(join(repoRoot, "temp/composition-shawarma.json"), "utf8"),
)

const PB_URL = process.env.PB_URL ?? "https://shashlik.loomixx.ru"
const PB_EMAIL = process.env.PB_EMAIL
const PB_PASSWORD = process.env.PB_PASSWORD

if (!PB_EMAIL || !PB_PASSWORD) {
  console.error("Set PB_EMAIL and PB_PASSWORD")
  process.exit(1)
}

function applyNutritionToSizes(sizes, slugData) {
  return sizes.map((size) => {
    const byMeat = slugData[size.id]
    if (!byMeat?.chicken || !byMeat?.pork) return size
    return {
      ...size,
      nutritionByVariant: {
        chicken: byMeat.chicken,
        pork: byMeat.pork,
      },
    }
  })
}

function buildCompositionByVariant(variants, slugData) {
  const out = {}
  for (const variant of variants) {
    const text = slugData[variant.id]
    if (text) out[variant.id] = text
  }
  return Object.keys(out).length ? out : null
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

const pb = new PocketBase(PB_URL)
console.log("Auth:", await auth(pb))

const products = await pb.collection("products").getFullList({ sort: "order" })
let updated = 0

for (const product of products) {
  const nutritionData = nutritionBySlug[product.slug]
  const compositionData = compositionBySlug[product.slug]
  if (!nutritionData && !compositionData) continue

  const sizes = nutritionData ? applyNutritionToSizes(product.sizes ?? [], nutritionData) : product.sizes
  const compositionByVariant = compositionData
    ? buildCompositionByVariant(product.variants ?? [], compositionData)
    : product.compositionByVariant

  const legacyComposition =
    compositionByVariant?.chicken ??
    compositionByVariant?.[product.variants?.[0]?.id] ??
    product.composition

  const fallbackNutrition = nutritionData?.l?.chicken ?? product.nutrition

  await pb.collection("products").update(product.id, {
    sizes,
    nutrition: fallbackNutrition,
    composition: legacyComposition,
    compositionByVariant,
  })
  console.log("Updated:", product.slug)
  updated++
}

console.log("Done. Updated:", updated)
