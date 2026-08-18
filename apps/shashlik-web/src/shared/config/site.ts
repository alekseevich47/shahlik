import type { ProductTag } from "@/entities/product/model"

export const SITE = {
  name: "Шашлыковский",
  brandLogo: "/logo/logo.png",
  phoneDisplay: "8 (999) 999-99-99",
  phoneTel: "tel:+79999999999",
  address: "ул. Ленина, 123",
  deliveryFrom: "сегодня с 11:30",
} as const

/** Экономика заказа (моки; при интеграции переедет на сервер). */
export const ORDER_RULES = {
  packFee: 24,
  deliveryFee: 149,
  freeDeliveryFrom: 800,
  promo: { code: "BOSS10", percent: 10, title: "Скидка 10%", subtitle: "на первый заказ по промокоду" },
} as const

export const TAG_FILTERS: ReadonlyArray<{ id: ProductTag | "all"; label: string; emoji?: string }> = [
  { id: "all", label: "Все" },
  { id: "classic", label: "Классика" },
  { id: "spicy", label: "Острая", emoji: "🌶" },
  { id: "cheese", label: "Сырная", emoji: "🧀" },
  { id: "bbq", label: "BBQ", emoji: "🍖" },
]

export const BADGE_LABEL = {
  hit: "Хит",
  new: "Новинка",
  spicy: "Острое",
} as const
