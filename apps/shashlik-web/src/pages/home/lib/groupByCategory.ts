import type { Category } from "@/entities/category/model"
import type { Product } from "@/entities/product/model"

/** Группирует товары по порядку категорий витрины; пустые категории пропускает. */
export function groupProductsByCategory(products: Product[], categories: Category[]) {
  const byCategory = new Map<string, Product[]>()
  for (const product of products) {
    const bucket = byCategory.get(product.categoryId)
    if (bucket) bucket.push(product)
    else byCategory.set(product.categoryId, [product])
  }
  return categories
    .filter((category) => byCategory.has(category.id))
    .map((category) => ({ category, items: byCategory.get(category.id)! }))
}
