import { useCallback, useMemo } from "react"
import { useNavigate } from "react-router-dom"

import { useAccount } from "@/entities/account/api"
import { useCategories } from "@/entities/category/api"
import { useProducts } from "@/entities/product/api"
import type { Product } from "@/entities/product/model"
import { ProductCardCompact } from "@/entities/product/ui/ProductCardCompact"
import { useSettings } from "@/entities/settings/api"
import { settingsFallback } from "@/entities/settings/model"
import { useAxisLockedHorizontalScroll } from "@/shared/hooks/useAxisLockedHorizontalScroll"
import { MobileCategoryBar, MOBILE_CATEGORY_STICKY_H } from "@/widgets/mobile/MobileCategoryBar"
import { HeroBanner } from "@/widgets/hero/HeroBanner"
import { PromoBanner } from "@/widgets/promo/PromoBanner"

import { groupProductsByCategory } from "../lib/groupByCategory"
import { useCatalogScrollSpy } from "../lib/useCatalogScrollSpy"
import { CatalogCategorySection } from "./CatalogCategorySection"

type Props = {
  category: string
  onCategoryChange: (id: string) => void
  items: Product[]
}

export function MobileHome({ category, onCategoryChange, items }: Props) {
  const navigate = useNavigate()
  const account = useAccount()
  const { data: settings = settingsFallback() } = useSettings()
  const { data: categories = [] } = useCategories()
  const { data: products = [] } = useProducts()
  const catalog = products.filter((p) => p.active)

  const popular = [...catalog].sort((a, b) => b.rating.overall - a.rating.overall).slice(0, 6)
  const combo = catalog.filter((p) => p.categoryId === "combo")
  const sections = useMemo(() => groupProductsByCategory(items, categories), [items, categories])
  const sectionIds = useMemo(() => sections.map(({ category: section }) => section.id), [sections])
  const firstCategoryId = sectionIds[0]

  const { scrollToCategory } = useCatalogScrollSpy({
    sectionIds,
    activeCategory: category,
    onCategoryChange,
    scrollMargin: MOBILE_CATEGORY_STICKY_H + 8,
    firstCategoryId,
  })

  const handleCategorySelect = useCallback(
    (id: string) => {
      onCategoryChange(id)
      scrollToCategory(id)
    },
    [onCategoryChange, scrollToCategory],
  )

  return (
    <div className="flex flex-col gap-4 px-4 pt-3 pb-[calc(68px+env(safe-area-inset-bottom))]">
      <HeroBanner />
      <MobileCategoryBar
        value={category}
        onChange={handleCategorySelect}
        firstCategoryId={firstCategoryId}
      />

      <ScrollSection title="Популярное" items={popular} hideRating />

      <PromoBanner
        title={settings.promoTitle}
        subtitle={settings.promoSubtitle}
        code={settings.promoCode}
      />
      {!account ? (
        <PromoBanner
          title={settings.promo2Title}
          subtitle={settings.promo2Subtitle}
          code={settings.promo2Code}
          onClick={() => navigate("/profile")}
        />
      ) : null}

      {combo.length ? <ScrollSection title="Комбо" items={combo} /> : null}

      <section>
        {items.length === 0 ? (
          <p className="rounded-[var(--r-lg)] border border-dashed border-line-strong py-10 text-center text-[13px] font-semibold text-fg-muted">
            В меню пока пусто
          </p>
        ) : (
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
        )}
      </section>
    </div>
  )
}

function ScrollSection({
  title,
  items,
  hideRating,
}: {
  title: string
  items: Product[]
  hideRating?: boolean
}) {
  const scrollRef = useAxisLockedHorizontalScroll<HTMLDivElement>()
  if (!items.length) return null
  return (
    <section>
      <div className="mb-2.5 flex items-center justify-between gap-3">
        <h2 className="text-[18px] leading-none font-extrabold text-fg">{title}</h2>
      </div>
      <div ref={scrollRef} className="scrollbar-none -mx-4 flex gap-3 overflow-x-auto px-4">
        {items.map((product) => (
          <ProductCardCompact
            key={product.id}
            product={product}
            hideRating={hideRating}
            className="w-[142px] shrink-0"
          />
        ))}
      </div>
    </section>
  )
}
