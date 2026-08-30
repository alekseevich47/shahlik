import { Star } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

import { useBadges } from "@/entities/badge/api"
import { badgeLabel } from "@/entities/badge/model"
import { PRODUCT_ASPECT_RATIO } from "@/entities/product/format"
import type { Product } from "@/entities/product/model"
import { minPrice } from "@/entities/product/lib"
import { isProductStopped, useStoppedArticles } from "@/entities/product/lib/stock"
import { withBackground } from "@/shared/lib/background-location"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import { cn } from "@/shared/lib/cn"
import { formatPrice } from "@/shared/lib/format"

type ProductCardProps = {
  product: Product
  onAdd: (product: Product) => void
  className?: string
}

export function ProductCard({ product, onAdd, className }: ProductCardProps) {
  const location = useLocation()
  const productState = withBackground(location)
  const { data: badges = [] } = useBadges()
  const { data: stopped = new Set<string>() } = useStoppedArticles()
  const label = badgeLabel(product.badge, badges)
  const hasVariants = product.variants.length > 0
  const outOfStock = isProductStopped(product, stopped)

  return (
    <article
      className={cn(
        "product-card group flex flex-col overflow-hidden rounded-[var(--r-xl)] border border-line bg-surface",
        "shadow-[var(--shadow-card)] transition-all duration-300 ease-[var(--ease-out-soft)]",
        "hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]",
        className,
      )}
    >
      <Link
        to={`/product/${product.slug}`}
        state={productState}
        className="relative block overflow-hidden bg-surface-3"
        style={{ aspectRatio: PRODUCT_ASPECT_RATIO }}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
        />
        {product.badge && label ? (
          <Badge variant="brand" size="sm" className="absolute top-2.5 right-2.5">
            {label}
          </Badge>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-3.5">
        <div className="flex flex-col gap-0.5">
          <Link
            to={`/product/${product.slug}`}
            state={productState}
            className="line-clamp-2 text-[20px] leading-tight font-extrabold tracking-[-0.01em] text-fg transition-colors hover:text-brand"
          >
            {product.name}
            {product.emoji ? <span className="ml-1">{product.emoji}</span> : null}
          </Link>

          {hasVariants ? (
            <div className="flex flex-wrap gap-1.5">
              {product.variants.map((variant) => (
                <Badge key={variant.id} size="sm">
                  {variant.label}
                </Badge>
              ))}
            </div>
          ) : null}
        </div>

        {product.tagline ? (
          <p className="line-clamp-3 text-[11.5px] leading-[1.5] text-fg-muted">
            {product.tagline}
          </p>
        ) : null}

        <div className="mt-auto flex items-center gap-1.5 pt-0.5">
          <Star size={15} className="text-brand dark:text-fg" strokeWidth={2.4} />
          <span className="text-[14px] font-extrabold text-brand tabular-nums dark:text-fg">
            {product.rating.overall}/10
          </span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="text-[22px] leading-none font-extrabold text-fg tabular-nums">
            от {formatPrice(minPrice(product))}
          </span>
          <div className="product-card-add">
            <div>
              <Button
                variant="soft"
                size="sm"
                disabled={outOfStock}
                onClick={() => onAdd(product)}
                className="dark:text-fg dark:hover:text-fg"
                aria-label={
                  outOfStock
                    ? `«${product.name}» нет в наличии`
                    : `Добавить «${product.name}» в заказ`
                }
              >
                {outOfStock ? "Нет в наличии" : "Добавить"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
