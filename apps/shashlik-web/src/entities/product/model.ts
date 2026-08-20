import type { CategoryId } from "@/entities/category/model"

export type MeatIcon = "chicken" | "pork" | null

/** Вариант мяса внутри карточки товара. Цена = size.price + variant.priceDelta. */
export type ProductVariant = {
  id: string
  label: string
  icon: MeatIcon
  priceDelta: number
}

/** Размер / порция. SKU кассы = пара «вариант × размер». */
export type ProductSize = {
  id: string
  label: string
  price: number
  /** Дефолтный артикул размера (если нет переопределения по варианту). */
  article?: string
  /** Переопределение артикула для варианта мяса: «Курица M» ≠ «Свинина M». */
  articleByVariant?: Record<string, string>
}

export type RatingCriterion = {
  id: string
  label: string
  hint: string
  /** Оценка по 5-балльной шкале с шагом 0.5. */
  value: number
}

export type ProductRating = {
  /** Общая оценка 0–10. */
  overall: number
  votes: number
  criteria: RatingCriterion[]
}

export type ProductBadge = "hit" | "new" | "spicy"

/** Пищевая ценность на 100 г. */
export type ProductNutrition = {
  kcal: number
  fat: number
  protein: number
  carbs: number
}

/** Slug тега из `product_tags` (набор задаётся на категорию). */
export type ProductTag = string

export type Product = {
  id: string
  slug: string
  categoryId: CategoryId
  name: string
  /** Эмодзи рядом с названием на карточке (🔥 / 🧀 / 🌶). */
  emoji?: string
  /** Одна строка для страницы товара. */
  tagline: string
  composition: string
  image: string
  badge?: ProductBadge
  nutrition: ProductNutrition
  tags: ProductTag[]
  variants: ProductVariant[]
  sizes: ProductSize[]
  rating: ProductRating
  order: number
  active: boolean
  createdAt: string
  updatedAt: string
  stats: { views: number; addedToCart: number; orders: number; revenue: number }
}

export const DEFAULT_CRITERIA: ReadonlyArray<Omit<RatingCriterion, "value">> = [
  { id: "taste", label: "Вкусно?", hint: "Оцените вкус блюда" },
  { id: "composition", label: "Состав", hint: "Оцените качество ингредиентов" },
  { id: "service", label: "Сервис", hint: "Оцените подачу и сервис" },
]
