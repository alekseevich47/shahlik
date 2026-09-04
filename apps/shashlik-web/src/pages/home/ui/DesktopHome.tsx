import { LazyMotion } from "motion/react"
import * as m from "motion/react-m"
import { useCallback, useEffect, useMemo, useState } from "react"

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
import { useCatalogScrollSpy } from "../lib/useCatalogScrollSpy"
import { CatalogCategorySection } from "./CatalogCategorySection"

const loadDomMax = () => import("@/app/motion-features-max").then((mod) => mod.default)

/** Синхрон с `--ease-out-soft` и треком корзины 0.55s. */
const GRID_LAYOUT_TRANSITION = { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }

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
          onSelectCategory={handleCategorySelect}
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
            onCategoryChange={handleCategorySelect}
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
              <EmptyCategory />
            ) : (
              <CatalogSections
                sections={sections}
                onAdd={addProduct}
                layout={wide}
              />
            )}
          </section>
        </main>

        {wide ? <CartDock /> : null}
      </div>
    </div>
  )
}

type CatalogSection = ReturnType<typeof groupProductsByCategory>[number]

function CatalogSections({
  sections,
  onAdd,
  layout,
}: {
  sections: CatalogSection[]
  onAdd: (product: Product) => void
  layout: boolean
}) {
  const content = (
    <div className="flex flex-col gap-8">
      {sections.map(({ category: section, items: sectionItems }) => (
        <CatalogCategorySection
          key={section.id}
          categoryId={section.id}
          title={section.name}
          headingClassName="mb-3 text-[18px] font-extrabold text-fg"
        >
          <ProductGrid items={sectionItems} onAdd={onAdd} layout={layout} />
        </CatalogCategorySection>
      ))}
    </div>
  )

  if (!layout) return content

  return (
    <LazyMotion features={loadDomMax} strict>
      {content}
    </LazyMotion>
  )
}

function ProductGrid({
  items,
  onAdd,
  layout,
}: {
  items: Product[]
  onAdd: (product: Product) => void
  layout: boolean
}) {
  return (
    <div className="product-grid">
      {items.map((product) =>
        layout ? (
          <m.div
            key={product.id}
            layout="position"
            layoutScroll
            transition={GRID_LAYOUT_TRANSITION}
          >
            <ProductCard product={product} onAdd={onAdd} />
          </m.div>
        ) : (
          <ProductCard key={product.id} product={product} onAdd={onAdd} />
        ),
      )}
    </div>
  )
}

function EmptyCategory() {
  return (
    <div className="grid place-items-center rounded-[var(--r-xl)] border border-dashed border-line-strong py-20 text-center">
      <p className="text-[15px] font-bold text-fg-soft">В меню пока пусто</p>
      <p className="mt-1 text-[13px] text-fg-muted">Скоро добавим блюда — загляните позже</p>
    </div>
  )
}
