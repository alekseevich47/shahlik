/**
 * Загрузка nutritionByVariant в sizes из temp/nutrition-shawarma.json.
 * Запуск: PB_EMAIL=... PB_PASSWORD=... node scripts/sync-nutrition-from-docx.mjs
 */
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import PocketBase from "pocketbase"

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "../../..")
const nutritionBySlug = JSON.parse(
  readFileSync(join(repoRoot, "temp/nutrition-shawarma.json"), "utf8"),
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
  const data = nutritionBySlug[product.slug]
  if (!data) continue

  const sizes = applyNutritionToSizes(product.sizes ?? [], data)
  const fallback = data.l?.chicken ?? product.nutrition

  await pb.collection("products").update(product.id, {
    sizes,
    nutrition: fallback,
  })
  console.log("Updated:", product.slug)
  updated++
}

console.log("Done. Updated:", updated)
