import type { Product, ProductTag } from "@/entities/product/model"
import { ProductCard } from "@/entities/product/ui/ProductCard"
import { CartPanel } from "@/features/cart/ui/CartPanel"
import { useAddProduct } from "@/features/cart/lib/useAddProduct"
import { categoryById } from "@/mocks/categories"
import { useIsWide } from "@/shared/hooks/useMediaQuery"
import { FloatingActions } from "@/widgets/header/FloatingActions"
import { HeroBanner } from "@/widgets/hero/HeroBanner"
import { Sidebar } from "@/widgets/sidebar/Sidebar"
import { TagFilters } from "@/widgets/catalog/TagFilters"

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

  return (
    <div className="mx-auto flex w-full max-w-[1680px] gap-5 px-5 py-5">
      <Sidebar activeCategory={category} onSelectCategory={onCategoryChange} />

      <main className="relative min-w-0 flex-1">
        <FloatingActions
          onSearch={onOpenSearch}
          onCart={onOpenCart}
          cartVisible={wide}
        />

        <HeroBanner />

        <TagFilters value={tag} onChange={onTagChange} className="mt-4" />

        <section className="mt-4">
          <h2 className="sr-only">{categoryById(category)?.name}</h2>
          {items.length === 0 ? (
            <EmptyCategory />
          ) : (
            <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
              {items.map((product) => (
                <ProductCard key={product.id} product={product} onAdd={addProduct} />
              ))}
            </div>
          )}
        </section>
      </main>

      {wide ? (
        <div className="sticky top-5 h-[calc(100dvh-40px)] w-[340px] shrink-0">
          <CartPanel />
        </div>
      ) : null}
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
