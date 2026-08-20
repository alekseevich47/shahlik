/** Fallback, если PB `settings#main` недоступен. Живые значения — `useSettings()`. */
export const SITE = {
  name: "Шашлыковский",
  brandLogo: "/logo/logo.png",
  phoneDisplay: "8 (999) 999-99-99",
  phoneTel: "tel:+79999999999",
  address: "ул. Ленина, 123",
  deliveryFrom: "сегодня с 11:30",
} as const

/** Fallback экономики заказа; витрина/корзина берут цифры из `useSettings()`. */
export const ORDER_RULES = {
  packFee: 24,
  deliveryFee: 149,
  freeDeliveryFrom: 800,
  promo: { code: "BOSS10", percent: 10, title: "Скидка 10%", subtitle: "на первый заказ по промокоду" },
} as const

export const BADGE_LABEL = {
  hit: "Хит",
  new: "Новинка",
  spicy: "Острое",
} as const
