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
  /** Средняя оценка 0–5, шаг 0.1 (критерии ввода — целые 0–5). */
  value: number
  /** Счётчики голосов по звёздам 0…5 (длина 6). */
  distribution?: number[]
}

const RATING_MAX = 5

/** Нормализует значение к шкале 0–5 (legacy 0–10 → /2). */
export function criterionScore(value: number): number {
  if (!Number.isFinite(value)) return 0
  const raw = value > RATING_MAX ? value / 2 : value
  return Math.min(RATING_MAX, Math.max(0, Math.round(raw * 10) / 10))
}

/** Звёзды 0–5 (шаг 0.1) — то же, что criterionScore. */
export function criterionStars(value: number): number {
  return criterionScore(value)
}

/** Нормализует гистограмму 0…5 звёзд. */
export function normalizeDistribution(raw: unknown): number[] {
  const empty = [0, 0, 0, 0, 0, 0]
  if (!Array.isArray(raw) || raw.length === 0) return empty
  return empty.map((_, i) => {
    const n = Number(raw[i])
    return Number.isFinite(n) && n > 0 ? Math.round(n) : 0
  })
}

export type ProductRating = {
  /** Общая оценка 0–5, шаг 0.1. */
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
  /** До 5 фото (PB multi-file `image`) — светлая тема. */
  images: string[]
  /** Имена файлов в PB — для точечного удаления. */
  imageFilenames: string[]
  /** Фото тёмной темы (PB multi-file `imageDark`); пусто → fallback на `images`. */
  imagesDark: string[]
  /** Имена файлов PB для `imageDark`. */
  imageDarkFilenames: string[]
  badge?: ProductBadge
  nutrition: ProductNutrition
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
