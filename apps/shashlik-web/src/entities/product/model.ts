import type { CategoryId } from "@/entities/category/model"

export type MeatIcon = "chicken" | "pork" | null

/** Вариант мяса внутри карточки товара. Цена SKU — в `size.price` / `size.priceByVariant`. */
export type ProductVariant = {
  id: string
  label: string
  icon: MeatIcon
  /** @deprecated Не используется в расчёте цены; оставлено для совместимости PB. */
  priceDelta: number
}

/** Размер / порция. SKU кассы = пара «вариант × размер». */
export type ProductSize = {
  id: string
  label: string
  /** Базовая цена (без вариантов) или fallback при чтении legacy-данных. */
  price: number
  /** Граммовка: «300 г», «0,5 л». */
  weight?: string
  /** Дефолтный артикул размера (если нет переопределения по варианту). */
  article?: string
  /** Переопределение артикула для варианта мяса: «Курица M» ≠ «Свинина M». */
  articleByVariant?: Record<string, string>
  /** Цена SKU по варианту мяса — каждая ячейка матрицы независима. */
  priceByVariant?: Record<string, number>
  /** КБЖУ на 100 г по варианту мяса (из техкарт кассы). */
  nutritionByVariant?: Record<string, ProductNutrition>
}

export type RatingCriterion = {
  id: string
  label: string
  hint: string
  /** Оценка 0–10, шаг 1 в админке; на витрине — 5 звёзд с половинками (value / 2). */
  value: number
}

/** Нормализует value критерия к шкале 0–10 (legacy 0–5 ×2). */
export function criterionScore(value: number): number {
  if (Number.isInteger(value) && value > 5) return Math.min(10, Math.max(0, value))
  return Math.min(10, Math.max(0, Math.round(value * 2)))
}

/** Звёзды 0–5 (½) для критерия со шкалой 0–10. */
export function criterionStars(value: number): number {
  return criterionScore(value) / 2
}

export type ProductRating = {
  /** Общая оценка 0–10. */
  overall: number
  votes: number
  criteria: RatingCriterion[]
}

/** Slug бейджа из `product_badges` (hit / new / spicy / кастом). */
export type ProductBadge = string

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
  /** Эмодзи рядом с названием на карточке (legacy, в форме редактора не показывается). */
  emoji?: string
  /** Одна строка для страницы товара. */
  tagline: string
  composition: string
  /** Состав по варианту мяса (размер не влияет). */
  compositionByVariant?: Record<string, string>
  /** Главное фото (= `images[0]`). */
  image: string
  /** До 5 фото (PB multi-file `image`). */
  images: string[]
  /** Имена файлов в PB — для точечного удаления. */
  imageFilenames: string[]
  badge?: ProductBadge
  nutrition: ProductNutrition
  tags: ProductTag[]
  variants: ProductVariant[]
  sizes: ProductSize[]
  rating: ProductRating
  order: number
  active: boolean
  /** % начисления; null/undefined → default из bonus_settings */
  bonusPercent?: number | null
  createdAt: string
  updatedAt: string
  stats: { views: number; addedToCart: number; orders: number; revenue: number }
}

export const DEFAULT_CRITERIA: ReadonlyArray<Omit<RatingCriterion, "value">> = [
  { id: "taste", label: "Вкусно?", hint: "Оцените вкус блюда" },
  { id: "composition", label: "Состав", hint: "Оцените качество ингредиентов" },
  { id: "service", label: "Сервис", hint: "Оцените подачу и сервис" },
]
