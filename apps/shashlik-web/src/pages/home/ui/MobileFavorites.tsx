import { useMemo, useState } from "react"

import { useCategories } from "@/entities/category/api"
import type { Category } from "@/entities/category/model"
import { useProducts } from "@/entities/product/api"
import { ProductCardCompact } from "@/entities/product/ui/ProductCardCompact"
import { useFavoriteIds } from "@/features/favorites/model/store"
import { useAxisLockedHorizontalScroll } from "@/shared/hooks/useAxisLockedHorizontalScroll"
import { cn } from "@/shared/lib/cn"
import { MOBILE_CATEGORY_STICKY_H } from "@/widgets/mobile/MobileCategoryBar"

import { groupProductsByCategory } from "../lib/groupByCategory"
import { CatalogCategorySection } from "./CatalogCategorySection"

/** Вкладка «Любимое»: избранные товары + горизонтальные категории. */
export function MobileFavorites() {
  const favoriteIds = useFavoriteIds()
  const { data: products = [] } = useProducts()
  const { data: categories = [] } = useCategories()

  const favorites = useMemo(
    () => products.filter((p) => p.active && favoriteIds.includes(p.id)),
    [products, favoriteIds],
  )

  const usedCategories = useMemo(
    () => categories.filter((c) => favorites.some((p) => p.categoryId === c.id)),
    [categories, favorites],
  )

  const [category, setCategory] = useState<string>("")
  const activeCategory =
    category && usedCategories.some((c) => c.id === category)
      ? category
      : (usedCategories[0]?.id ?? "")

  const filtered = useMemo(() => {
    if (!activeCategory) return favorites
    return favorites.filter((p) => p.categoryId === activeCategory)
  }, [favorites, activeCategory])

  const sections = useMemo(
    () => groupProductsByCategory(filtered, categories),
    [filtered, categories],
  )

  return (
    <div className="flex flex-col gap-4 px-4 pt-3 pb-[calc(68px+env(safe-area-inset-bottom))]">
      <h1 className="text-[22px] font-extrabold tracking-[-0.02em] text-fg">Любимое</h1>

      {favorites.length === 0 ? (
        <p className="rounded-[var(--r-lg)] border border-dashed border-line-strong py-12 text-center text-[13px] font-semibold text-fg-muted">
          Пока пусто — нажмите сердечко на карточке товара
        </p>
      ) : (
        <>
          {usedCategories.length > 0 ? (
            <FavoritesCategoryChips
              categories={usedCategories}
              value={activeCategory}
              onChange={setCategory}
            />
          ) : null}

          <div className="flex flex-col gap-6">
            {sections.map(({ category: section, items: sectionItems }) => (
              <CatalogCategorySection
                key={section.id}
                categoryId={section.id}
                title={section.name}
                headingClassName="mb-2.5 text-[18px] leading-none font-extrabold text-fg"
                scrollMarginTop={MOBILE_CATEGORY_STICKY_H + 8}
              >
                <div className="grid grid-cols-2 gap-3">
                  {sectionItems.map((product) => (
                    <ProductCardCompact key={product.id} product={product} />
                  ))}
                </div>
              </CatalogCategorySection>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function FavoritesCategoryChips({
  categories,
  value,
  onChange,
}: {
  categories: Category[]
  value: string
  onChange: (id: string) => void
}) {
  const scrollRef = useAxisLockedHorizontalScroll<HTMLDivElement>()
  return (
    <div ref={scrollRef} className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4">
      {categories.map((category) => {
        const active = category.id === value
        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onChange(category.id)}
            className={cn(
              "flex h-9 shrink-0 cursor-pointer items-center gap-1.5 rounded-full border px-3 text-[12px] font-bold transition-colors",
              active
                ? "border-brand-border bg-brand-soft text-brand"
                : "border-line bg-surface text-fg-muted",
            )}
          >
            {category.icon ? (
              <img src={category.icon} alt="" className="size-4 object-contain" />
            ) : null}
            {category.name}
          </button>
        )
      })}
    </div>
  )
}
