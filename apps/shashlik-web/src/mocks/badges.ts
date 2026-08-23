import type { ProductBadgeDef } from "@/entities/badge/model"
import { DEFAULT_BADGES } from "@/entities/badge/model"

/** Сид `product_badges` — совпадает с историческими slug hit/new/spicy. */
export const BADGE_SEED: ProductBadgeDef[] = DEFAULT_BADGES.map((b) => ({
  ...b,
  id: b.slug,
}))
