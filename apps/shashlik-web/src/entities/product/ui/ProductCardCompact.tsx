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
import { cn } from "@/shared/lib/cn"
import { formatPrice } from "@/shared/lib/format"
import { ThemeAwareImage } from "@/shared/ui/theme-aware-image"

type Props = {
  product: Product
  className?: string
  /** Скрыть рейтинг (напр. в «Популярное»). */
  hideRating?: boolean
}

/** Компактная карточка для мобильных горизонтальных подборок и сетки. */
export function ProductCardCompact({ product, className, hideRating }: Props) {
  const location = useLocation()
  const productState = withBackground(location)
  const { data: badges = [] } = useBadges()
  const { data: stopped = new Set<string>() } = useStoppedArticles()
  const label = badgeLabel(product.badge, badges)
  const outOfStock = isProductStopped(product, stopped)
  const href = `/product/${product.slug}`

  return (
    <article
      className={cn(
        "relative flex flex-col overflow-hidden rounded-[var(--r-lg)] border border-line bg-surface shadow-[var(--shadow-card)]",
        className,
      )}
    >
      <Link
        to={href}
        state={productState}
        aria-label={product.name}
        className="absolute inset-0 z-0"
      />

      <div
        className="pointer-events-none relative bg-surface-3"
        style={{ aspectRatio: PRODUCT_ASPECT_RATIO }}
      >
        <ThemeAwareImage
          lightSrc={product.image}
          darkSrc={product.imagesDark[0]}
          alt=""
          loading="lazy"
          className="size-full object-cover"
        />
        {product.badge && label ? (
          <Badge variant="brand" size="sm" className="absolute top-1.5 right-1.5">
            {label}
          </Badge>
        ) : null}
      </div>

      <div className="pointer-events-none relative flex flex-1 flex-col gap-1 p-2.5">
        <div className="flex items-start justify-between gap-1.5">
          <h3 className="min-w-0 flex-1 text-[13.5px] leading-tight font-extrabold text-fg">
            {product.name}
            {product.emoji ? <span className="ml-1">{product.emoji}</span> : null}
          </h3>
          {!hideRating ? (
            <span className="inline-flex shrink-0 items-center gap-0.5 pt-0.5 text-[11px] font-extrabold text-brand tabular-nums dark:text-fg">
              <Star size={12} className="text-brand dark:text-fg" strokeWidth={2.4} />
              {product.rating.overall}
            </span>
          ) : null}
        </div>
        {product.tagline ? (
          <p className="line-clamp-2 text-[10.5px] leading-[1.4] text-fg-muted">{product.tagline}</p>
        ) : null}
        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
          <span className="text-[17px] leading-none font-extrabold text-fg tabular-nums">
            {formatPrice(minPrice(product))}
          </span>
          {outOfStock ? (
            <span className="text-[10px] leading-tight font-bold text-fg-muted">Нет в наличии</span>
          ) : null}
        </div>
      </div>
    </article>
  )
}
