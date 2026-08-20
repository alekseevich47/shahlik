/** Иконки категорий из `public/icons`. `kcal.png` — пищевая ценность, не категория. */
export const CATEGORY_ICONS = [
  "/icons/shaurma.png",
  "/icons/shahlik.png",
  "/icons/pizza.png",
  "/icons/combo.png",
  "/icons/garnir.png",
  "/icons/drinks.png",
] as const

export type CategoryIconPath = (typeof CATEGORY_ICONS)[number]
