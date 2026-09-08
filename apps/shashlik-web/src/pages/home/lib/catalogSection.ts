import { STICKY_BAR } from "@/widgets/header/StickyBar"

export const CATALOG_SECTION_PREFIX = "catalog-"

export function catalogSectionId(categoryId: string) {
  return `${CATALOG_SECTION_PREFIX}${categoryId}`
}

/**
 * Отступ секции под sticky-плашку (top + expanded + зазор).
 * Канон — CSS `scroll-margin-top` на `CatalogCategorySection`.
 * Lenis `scrollTo(HTMLElement)` и нативный `scrollIntoView` читают его сами;
 * в `scrollTo` **не** передавать тот же offset повторно.
 */
export const CATALOG_SCROLL_MARGIN = STICKY_BAR.top + STICKY_BAR.expanded + 8

/** rootMargin для scroll-spy: активна секция в верхней части экрана под плашкой. */
export const CATALOG_SCROLL_SPY_MARGIN = `-${CATALOG_SCROLL_MARGIN}px 0px -55% 0px`
