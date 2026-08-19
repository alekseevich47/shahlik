import { useEffect, useState } from "react"

import type { Product, ProductTag } from "@/entities/product/model"
import { ProductCard } from "@/entities/product/ui/ProductCard"
import { CartDock } from "@/features/cart/ui/CartDock"
import { useCartPanelStore } from "@/features/cart/model/panel"
import { useAddProduct } from "@/features/cart/lib/useAddProduct"
import { categoryById } from "@/mocks/categories"
import { useInView } from "@/shared/hooks/useInView"
import { useIsWide } from "@/shared/hooks/useMediaQuery"
import { FloatingActions } from "@/widgets/header/FloatingActions"
import { STICKY_BAR, StickyBar } from "@/widgets/header/StickyBar"
import { HeroBanner } from "@/widgets/hero/HeroBanner"
import { Sidebar } from "@/widgets/sidebar/Sidebar"
import { TagFilters } from "@/widgets/catalog/TagFilters"

/** Маяк действий пропал под верхом плашки → плашка выезжает. */
const ACTIONS_MARGIN = `-${STICKY_BAR.top}px 0px 0px 0px`
/** Строка тегов дошла до низа раскрытой плашки → плашка забирает навигацию. */
const FILTERS_MARGIN = `-${STICKY_BAR.top + STICKY_BAR.expanded}px 0px 0px 0px`

type Props = {
  category: string
  onCategoryChange: (id: string) => void
  tag: ProductTag | "all"
  onTagChange: (tag: ProductTag | "all") => void
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

  return (
    <div className="mx-auto w-full max-w-[1680px] px-5 py-5">
      <div
        className="home-desktop"
        data-cart={cartState}
        data-nav={barExpanded ? "hidden" : "shown"}
        data-ready={ready ? "1" : "0"}
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
            <TagFilters value={tag} onChange={onTagChange} />
          </div>

          <section className="mt-4">
            <h2 className="sr-only">{categoryById(category)?.name}</h2>
            {items.length === 0 ? (
              <EmptyCategory />
            ) : (
              <div className="grid grid-cols-2 xl:grid-cols-3" style={{ gap: "var(--catalog-gap)" }}>
                {items.map((product) => (
                  <ProductCard key={product.id} product={product} onAdd={addProduct} />
                ))}
              </div>
            )}
          </section>
        </main>

        {wide ? <CartDock /> : null}
      </div>
    </div>
  )
}

function EmptyCategory() {
  return (
    <div className="grid place-items-center rounded-[var(--r-xl)] border border-dashed border-line-strong py-20 text-center">
      <p className="text-[15px] font-bold text-fg-soft">В этой категории пока пусто</p>
      <p className="mt-1 text-[13px] text-fg-muted">
        Скоро добавим — загляните в «Шаурму» или «Шашлык»
      </p>
    </div>
  )
}
