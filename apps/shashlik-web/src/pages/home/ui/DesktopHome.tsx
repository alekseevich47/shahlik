import { useEffect, useState } from "react"

import { ALL_CATEGORY } from "@/entities/category/model"
import type { Product } from "@/entities/product/model"
import type { TagFilterId } from "@/entities/tag/model"
import { ProductCard } from "@/entities/product/ui/ProductCard"
import { useCategories } from "@/entities/category/api"
import { useAddProduct } from "@/features/cart/lib/useAddProduct"
import { CartDock } from "@/features/cart/ui/CartDock"
import { useCartPanelStore } from "@/features/cart/model/panel"
import { useInView } from "@/shared/hooks/useInView"
import { useIsWide } from "@/shared/hooks/useMediaQuery"
import { useSettling } from "@/shared/hooks/useSettling"
import { FloatingActions } from "@/widgets/header/FloatingActions"
import { STICKY_BAR, StickyBar } from "@/widgets/header/StickyBar"
import { HeroBanner } from "@/widgets/hero/HeroBanner"
import { Sidebar } from "@/widgets/sidebar/Sidebar"
import { TagFilters } from "@/widgets/catalog/TagFilters"

import { groupProductsByCategory } from "../lib/groupByCategory"

/** Маяк действий пропал под верхом плашки → плашка выезжает. */
const ACTIONS_MARGIN = `-${STICKY_BAR.top}px 0px 0px 0px`
/** Строка тегов дошла до низа раскрытой плашки → плашка забирает навигацию. */
const FILTERS_MARGIN = `-${STICKY_BAR.top + STICKY_BAR.expanded}px 0px 0px 0px`

type Props = {
  category: string
  onCategoryChange: (id: string) => void
  tag: TagFilterId
  onTagChange: (tag: TagFilterId) => void
  items: Product[]
  onOpenSearch: () => void
  onOpenCart: () => void
}

export function DesktopHome({
  category,
  onCategoryChange,
  tag,
  onTagChange,
  items,
  onOpenSearch,
  onOpenCart,
}: Props) {
  const addProduct = useAddProduct()
  const { data: categories = [] } = useCategories()
  const wide = useIsWide()
  const panelOpen = useCartPanelStore((s) => s.open)
  const togglePanel = useCartPanelStore((s) => s.toggle)
  const [ready, setReady] = useState(false)

  const [actionsRef, actionsInView] = useInView<HTMLDivElement>({ rootMargin: ACTIONS_MARGIN })
  const [filtersRef, filtersInView] = useInView<HTMLDivElement>({ rootMargin: FILTERS_MARGIN })

  useEffect(() => {
    setReady(true)
  }, [])

  const cartState = !wide ? "sheet" : panelOpen ? "open" : "closed"
  const onCart = wide ? togglePanel : onOpenCart
  const cartPressed = wide ? panelOpen : undefined
  const barVisible = ready && !actionsInView
  const barExpanded = ready && !filtersInView
  // Треки, выезд панелей и геометрия плашки едут одним переходом — метим их
  // одним флагом, чтобы дорогие эффекты выключались ровно на эти кадры.
  const animating = useSettling(`${barVisible}|${barExpanded}|${cartState}`)
  const allCategories = category === ALL_CATEGORY
  const sections = allCategories ? groupProductsByCategory(items, categories) : null
  const activeCategory = categories.find((c) => c.id === category)

  return (
    <div className="mx-auto w-full max-w-[1680px] px-5 py-5">
      <div
        className="home-desktop"
        data-cart={cartState}
        data-nav={barExpanded ? "hidden" : "shown"}
        data-ready={ready ? "1" : "0"}
        data-animating={animating ? "1" : "0"}
      >
        <Sidebar
          activeCategory={category}
          onSelectCategory={onCategoryChange}
          collapsed={barExpanded}
        />

        <main className="relative min-w-0">
          {/* Маяк высотой с ряд действий: absolute — не влияет на поток. */}
          <div
            ref={actionsRef}
            aria-hidden
            className="pointer-events-none absolute top-0 left-0 h-14 w-px"
          />

          <StickyBar
            visible={barVisible}
            expanded={barExpanded}
            animating={animating}
            category={category}
            onCategoryChange={onCategoryChange}
            tag={tag}
            onTagChange={onTagChange}
            onSearch={onOpenSearch}
            onCart={onCart}
            cartPressed={cartPressed}
          />

          <FloatingActions
            className="absolute top-4 right-4 z-20"
            onSearch={onOpenSearch}
            onCart={onCart}
            cartPressed={cartPressed}
          />

          <HeroBanner />

          <div ref={filtersRef} className="mt-4">
            <TagFilters categoryId={category} value={tag} onChange={onTagChange} />
          </div>

          <section className="mt-4">
            {items.length === 0 ? (
              <EmptyCategory all={allCategories} />
            ) : allCategories && sections ? (
              <div className="flex flex-col gap-8">
                {sections.map(({ category: section, items: sectionItems }) => (
                  <div key={section.id}>
                    <h2 className="mb-3 text-[18px] font-extrabold text-fg">{section.name}</h2>
                    <ProductGrid items={sectionItems} onAdd={addProduct} />
                  </div>
                ))}
              </div>
            ) : (
              <>
                <h2 className="sr-only">{activeCategory?.name}</h2>
                <ProductGrid items={items} onAdd={addProduct} />
              </>
            )}
          </section>
        </main>

        {wide ? <CartDock /> : null}
      </div>
    </div>
  )
}

function ProductGrid({ items, onAdd }: { items: Product[]; onAdd: (product: Product) => void }) {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-3" style={{ gap: "var(--catalog-gap)" }}>
      {items.map((product) => (
        <ProductCard key={product.id} product={product} onAdd={onAdd} />
      ))}
    </div>
  )
}

function EmptyCategory({ all }: { all: boolean }) {
  return (
    <div className="grid place-items-center rounded-[var(--r-xl)] border border-dashed border-line-strong py-20 text-center">
      <p className="text-[15px] font-bold text-fg-soft">
        {all ? "В меню пока пусто" : "В этой категории пока пусто"}
      </p>
      <p className="mt-1 text-[13px] text-fg-muted">
        {all
          ? "Скоро добавим блюда — загляните позже"
          : "Скоро добавим — загляните в «Шаурму» или «Шашлык»"}
      </p>
    </div>
  )
}
