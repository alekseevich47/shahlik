import * as DialogPrimitive from "@radix-ui/react-dialog"
import { Search } from "lucide-react"
import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"

import { minPrice } from "@/entities/product/lib"
import { products } from "@/mocks/products"
import { categoryById } from "@/mocks/categories"
import { formatPrice } from "@/shared/lib/format"

type SearchDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("")
  const navigate = useNavigate()

  const hits = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return products.slice(0, 6)
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.composition.toLowerCase().includes(q) ||
          p.variants.some((v) => v.label.toLowerCase().includes(q)),
      )
      .slice(0, 8)
  }, [query])

  const openProduct = (slug: string) => {
    onOpenChange(false)
    setQuery("")
    navigate(`/product/${slug}`)
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-200 bg-black/45 backdrop-blur-[2px] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className="fixed top-[12vh] left-1/2 z-201 w-[min(560px,calc(100vw-32px))] -translate-x-1/2 overflow-hidden rounded-[var(--r-xl)] border border-line bg-surface shadow-[var(--shadow-panel)] outline-none data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:zoom-in-95">
          <DialogPrimitive.Title className="sr-only">Поиск по меню</DialogPrimitive.Title>

          <div className="flex items-center gap-2.5 border-b border-line px-4">
            <Search size={18} className="shrink-0 text-fg-faint" strokeWidth={2.4} />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Шаурма, шашлык, соус…"
              className="h-14 w-full bg-transparent text-[15px] font-semibold text-fg outline-none placeholder:font-medium placeholder:text-fg-faint"
            />
          </div>

          <ul className="scrollbar-slim max-h-[52vh] overflow-y-auto p-2">
            {hits.length === 0 ? (
              <li className="px-3 py-8 text-center text-[13px] font-semibold text-fg-muted">
                Ничего не нашли — попробуйте другой запрос
              </li>
            ) : (
              hits.map((product) => (
                <li key={product.id}>
                  <button
                    type="button"
                    onClick={() => openProduct(product.slug)}
                    className="flex w-full cursor-pointer items-center gap-3 rounded-[var(--r-md)] p-2 text-left transition-colors hover:bg-surface-3"
                  >
                    <img
                      src={product.image}
                      alt=""
                      className="size-11 shrink-0 rounded-[var(--r-sm)] object-cover"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13.5px] font-bold text-fg">
                        {product.name}
                      </span>
                      <span className="block truncate text-[11px] text-fg-muted">
                        {categoryById(product.categoryId)?.name}
                      </span>
                    </span>
                    <span className="shrink-0 text-[13px] font-extrabold text-fg tabular-nums">
                      {formatPrice(minPrice(product))}
                    </span>
                  </button>
                </li>
              ))
            )}
          </ul>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
