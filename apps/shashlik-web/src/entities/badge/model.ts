/** Справочник бейджей витрины (`product_badges`). На товаре хранится `slug`. */
export type ProductBadgeDef = {
  id: string
  slug: string
  label: string
  order: number
}

export const DEFAULT_BADGES: ReadonlyArray<Omit<ProductBadgeDef, "id">> = [
  { slug: "hit", label: "Хит", order: 1 },
  { slug: "new", label: "Новинка", order: 2 },
  { slug: "spicy", label: "Острое", order: 3 },
]

export function badgeLabel(
  slug: string | undefined,
  defs: ReadonlyArray<Pick<ProductBadgeDef, "slug" | "label">> = DEFAULT_BADGES,
): string {
  if (!slug) return ""
  return defs.find((d) => d.slug === slug)?.label ?? slug
}
