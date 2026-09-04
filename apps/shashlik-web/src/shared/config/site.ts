import { badgeLabel, DEFAULT_BADGES } from "@/entities/badge/model"

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
  packFee: 0,
  deliveryFee: 149,
  freeDeliveryFrom: 800,
  promo: { code: "BOSS10", percent: 10, title: "Скидка 10%", subtitle: "на первый заказ по промокоду" },
} as const

/** @deprecated используйте `badgeLabel` + `useBadges()`; оставлен для сида/фолбэка. */
export const BADGE_LABEL = Object.fromEntries(
  DEFAULT_BADGES.map((b) => [b.slug, b.label]),
) as Record<string, string>

export function resolveBadgeLabel(slug: string | undefined): string {
  return badgeLabel(slug, DEFAULT_BADGES)
}
