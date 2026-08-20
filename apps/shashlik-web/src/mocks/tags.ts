import type { CategoryTag } from "@/entities/tag/model"

/** Справочник для сида PB. Витрина читает `product_tags`. */
export const productTags: CategoryTag[] = [
  { id: "shawarma-classic", categoryId: "shawarma", slug: "classic", name: "Классика", emoji: null, order: 0 },
  { id: "shawarma-spicy", categoryId: "shawarma", slug: "spicy", name: "Острая", emoji: "🌶", order: 1 },
  { id: "shawarma-cheese", categoryId: "shawarma", slug: "cheese", name: "Сырная", emoji: "🧀", order: 2 },
  { id: "shawarma-bbq", categoryId: "shawarma", slug: "bbq", name: "BBQ", emoji: "🍖", order: 3 },
  { id: "shashlik-classic", categoryId: "shashlik", slug: "classic", name: "Классика", emoji: null, order: 0 },
  { id: "shashlik-spicy", categoryId: "shashlik", slug: "spicy", name: "Острая", emoji: "🌶", order: 1 },
  { id: "shashlik-bbq", categoryId: "shashlik", slug: "bbq", name: "BBQ", emoji: "🍖", order: 2 },
  { id: "pizza-classic", categoryId: "pizza", slug: "classic", name: "Классика", emoji: null, order: 0 },
  { id: "pizza-spicy", categoryId: "pizza", slug: "spicy", name: "Острая", emoji: "🌶", order: 1 },
  { id: "pizza-cheese", categoryId: "pizza", slug: "cheese", name: "Сырная", emoji: "🧀", order: 2 },
]
