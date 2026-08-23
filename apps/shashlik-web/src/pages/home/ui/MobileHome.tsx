import { ChevronRight } from "lucide-react"

import { ALL_CATEGORY } from "@/entities/category/model"
import type { Product } from "@/entities/product/model"
import type { TagFilterId } from "@/entities/tag/model"
import { ProductCardCompact } from "@/entities/product/ui/ProductCardCompact"
import { useCategories } from "@/entities/category/api"
import { useProducts } from "@/entities/product/api"
import { useAddProduct } from "@/features/cart/lib/useAddProduct"
import { CategoryTiles } from "@/widgets/catalog/CategoryTiles"
import { TagFilters } from "@/widgets/catalog/TagFilters"
import { HeroBanner } from "@/widgets/hero/HeroBanner"
import { AddressBar } from "@/widgets/mobile/AddressBar"
import { PromoBanner } from "@/widgets/promo/PromoBanner"

import { groupProductsByCategory } from "../lib/groupByCategory"

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
  const { data: categories = [] } = useCategories()
  const { data: products = [] } = useProducts()
  const catalog = products.filter((p) => p.active)

  const popular = [...catalog].sort((a, b) => b.rating.overall - a.rating.overall).slice(0, 6)
  const combo = catalog.filter((p) => p.categoryId === "combo")
  const allCategories = category === ALL_CATEGORY
  const sections = allCategories ? groupProductsByCategory(items, categories) : null
  const activeCategory = categories.find((c) => c.id === category)

  return (
    <div className="flex flex-col gap-4 px-4 pt-3 pb-24">
      <AddressBar />
      <HeroBanner />
      <CategoryTiles value={category} onChange={onCategoryChange} />

      <ScrollSection title="Популярное" items={popular} onAdd={addProduct} />

      <PromoBanner />

      {combo.length ? (
        <ScrollSection title="Комбо" items={combo} onAdd={addProduct} />
      ) : null}

      <section>
        {!allCategories ? (
          <div className="mb-2.5 flex items-center justify-between gap-3">
            <h2 className="text-[18px] leading-none font-extrabold text-fg">{activeCategory?.name}</h2>
          </div>
        ) : null}
        <TagFilters categoryId={category} value={tag} onChange={onTagChange} className="mb-3" />
        {items.length === 0 ? (
          <p className="rounded-[var(--r-lg)] border border-dashed border-line-strong py-10 text-center text-[13px] font-semibold text-fg-muted">
            {allCategories ? "В меню пока пусто" : "В этой категории пока пусто"}
          </p>
        ) : allCategories && sections ? (
          <div className="flex flex-col gap-6">
            {sections.map(({ category: section, items: sectionItems }) => (
              <div key={section.id}>
                <h2 className="mb-2.5 text-[18px] leading-none font-extrabold text-fg">
                  {section.name}
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {sectionItems.map((product) => (
                    <ProductCardCompact key={product.id} product={product} onAdd={addProduct} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {items.map((product) => (
              <ProductCardCompact key={product.id} product={product} onAdd={addProduct} />
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
      <div className="scrollbar-none -mx-4 flex gap-3 overflow-x-auto px-4">
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
