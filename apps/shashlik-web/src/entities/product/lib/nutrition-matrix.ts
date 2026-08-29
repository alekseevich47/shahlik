import type { ProductNutrition, ProductSize, ProductVariant } from "@/entities/product/model"

export const NUTRITION_FIELDS = [
  ["kcal", "Ккал"],
  ["protein", "Б"],
  ["fat", "Ж"],
  ["carbs", "У"],
] as const satisfies ReadonlyArray<readonly [keyof ProductNutrition, string]>

export function cellNutrition(
  size: ProductSize,
  variantId: string | null,
): ProductNutrition {
  if (variantId && size.nutritionByVariant?.[variantId]) {
    return size.nutritionByVariant[variantId]
  }
  const first = size.nutritionByVariant
    ? Object.values(size.nutritionByVariant)[0]
    : undefined
  return first ?? { kcal: 0, protein: 0, fat: 0, carbs: 0 }
}

export function setCellNutrition(
  sizes: ProductSize[],
  sizeId: string,
  variantId: string | null,
  key: keyof ProductNutrition,
  raw: string,
): ProductSize[] {
  const parsed = Number(raw.replace(",", "."))
  const value = Number.isFinite(parsed) && parsed >= 0 ? parsed : 0

  return sizes.map((size) => {
    if (size.id !== sizeId) return size
    const current = cellNutrition(size, variantId)
    const nextCell = { ...current, [key]: value }
    if (!variantId) {
      return { ...size, nutritionByVariant: { ...(size.nutritionByVariant ?? {}), base: nextCell } }
    }
    return {
      ...size,
      nutritionByVariant: { ...(size.nutritionByVariant ?? {}), [variantId]: nextCell },
    }
  })
}

/** Fallback `product.nutrition` — L + первый вариант или первый размер. */
export function defaultNutritionFromSizes(
  sizes: ProductSize[],
  variants: ProductVariant[],
): ProductNutrition {
  const size = sizes.find((s) => s.id === "l") ?? sizes[0]
  if (!size) return { kcal: 0, protein: 0, fat: 0, carbs: 0 }
  const variantId = variants[0]?.id ?? null
  return cellNutrition(size, variantId)
}
