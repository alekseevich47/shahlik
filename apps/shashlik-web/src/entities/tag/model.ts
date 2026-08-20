import type { CategoryId } from "@/entities/category/model"

/** Синтетический чип «Все» — в PB не хранится. */
export const ALL_TAG = "all" as const

export type TagFilterId = typeof ALL_TAG | string

/** Фильтр витрины, привязанный к категории товара. */
export type CategoryTag = {
  id: string
  categoryId: CategoryId | string
  /** Стабильный ключ в `products.tags`. */
  slug: string
  name: string
  emoji: string | null
  order: number
}

export function slugFromName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/ё/g, "e")
    .replace(/[^a-z0-9а-я-]+/gi, "-")
    .replace(/^-|-$/g, "")
    .replace(/[а-я]/gi, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}
