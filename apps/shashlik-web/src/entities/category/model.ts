/** Известные id из сида — для дефолтов в моках. Новые категории из админки — произвольный `string`. */
export const KNOWN_CATEGORY_IDS = [
  "shawarma",
  "shashlik",
  "pizza",
  "combo",
  "sides",
  "drinks",
  "sauces",
] as const

export type KnownCategoryId = (typeof KNOWN_CATEGORY_IDS)[number]

/** Код категории (PB id), pattern `^[a-z]+$`. */
export type CategoryId = string

export type Category = {
  id: CategoryId
  name: string
  /** PNG-иконка из брендового набора (public/icons). */
  icon: string | null
  order: number
}
