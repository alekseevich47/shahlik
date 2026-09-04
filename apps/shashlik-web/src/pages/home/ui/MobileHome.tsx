import { ChevronRight } from "lucide-react"
import { useCallback, useMemo } from "react"
import { useNavigate } from "react-router-dom"

import { useAccount } from "@/entities/account/api"
import { useCategories } from "@/entities/category/api"
import { useProducts } from "@/entities/product/api"
import type { Product } from "@/entities/product/model"
import { ProductCardCompact } from "@/entities/product/ui/ProductCardCompact"
import { useSettings } from "@/entities/settings/api"
import { settingsFallback } from "@/entities/settings/model"
import type { TagFilterId } from "@/entities/tag/model"
import { useAddProduct } from "@/features/cart/lib/useAddProduct"
import { CategoryTiles } from "@/widgets/catalog/CategoryTiles"
import { TagFilters } from "@/widgets/catalog/TagFilters"
import { HeroBanner } from "@/widgets/hero/HeroBanner"
import { AddressBar } from "@/widgets/mobile/AddressBar"
import { PromoBanner } from "@/widgets/promo/PromoBanner"

import { groupProductsByCategory } from "../lib/groupByCategory"
import { useCatalogScrollSpy } from "../lib/useCatalogScrollSpy"
import { CatalogCategorySection } from "./CatalogCategorySection"

type Props = {
  category: string
  onCategoryChange: (id: string) => void
  tag: TagFilterId
  onTagChange: (tag: TagFilterId) => void
  items: Product[]
}

export function MobileHome({
  category,
  onCategoryChange,
  tag,
  onTagChange,
  items,
}: Props) {
  const addProduct = useAddProduct()
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

  const { scrollToCategory } = useCatalogScrollSpy({
    sectionIds,
    activeCategory: category,
    onCategoryChange,
  })

  const handleCategorySelect = useCallback(
    (id: string) => {
      onCategoryChange(id)
      scrollToCategory(id)
    },
    [onCategoryChange, scrollToCategory],
  )

  return (
    <div className="flex flex-col gap-4 px-4 pt-3 pb-24">
      <AddressBar />
      <HeroBanner />
      <CategoryTiles value={category} onChange={handleCategorySelect} />

      <ScrollSection title="Популярное" items={popular} onAdd={addProduct} />

      <PromoBanner
        title={settings.promoTitle}
        subtitle={settings.promoSubtitle}
        code={settings.promoCode}
      />
      <PromoBanner
        title={settings.promo2Title}
        subtitle={settings.promo2Subtitle}
        code={settings.promo2Code}
        onClick={account ? undefined : () => navigate("/profile")}
      />

      {combo.length ? (
        <ScrollSection title="Комбо" items={combo} onAdd={addProduct} />
      ) : null}

      <section>
        <TagFilters categoryId={category} value={tag} onChange={onTagChange} className="mb-3" />
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
              >
                <div className="grid grid-cols-2 gap-3">
                  {sectionItems.map((product) => (
                    <ProductCardCompact key={product.id} product={product} onAdd={addProduct} />
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
  onAdd,
}: {
  title: string
  items: Product[]
  onAdd: (product: Product) => void
}) {
  return (
    <section>
      <div className="mb-2.5 flex items-center justify-between gap-3">
        <h2 className="text-[18px] leading-none font-extrabold text-fg">{title}</h2>
        <button
          type="button"
          className="flex cursor-pointer items-center gap-0.5 text-[12px] font-bold text-fg-muted"
        >
          Смотреть все
          <ChevronRight size={14} strokeWidth={2.6} />
        </button>
      </div>
      <div className="scrollbar-none -mx-4 flex gap-3 overflow-x-auto px-4" data-lenis-prevent>
        {items.map((product) => (
          <ProductCardCompact
            key={product.id}
            product={product}
            onAdd={onAdd}
            className="w-[142px] shrink-0"
          />
        ))}
      </div>
    </section>
  )
}
