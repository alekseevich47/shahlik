import { Star } from "lucide-react"
import { Link } from "react-router-dom"

import { useBadges } from "@/entities/badge/api"
import { badgeLabel } from "@/entities/badge/model"
import type { Product } from "@/entities/product/model"
import { minPrice } from "@/entities/product/lib"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import { scoreColor } from "@/shared/ui/rating"
import { cn } from "@/shared/lib/cn"
import { formatPrice } from "@/shared/lib/format"

type ProductCardProps = {
  product: Product
  onAdd: (product: Product) => void
  className?: string
}

export function ProductCard({ product, onAdd, className }: ProductCardProps) {
  const { data: badges = [] } = useBadges()
  const variantLabels = product.variants.map((v) => v.label)
  const sizeLabels = product.sizes.map((s) => s.label)
  const label = badgeLabel(product.badge, badges)

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
        className="relative block aspect-[16/10] overflow-hidden bg-surface-3"
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

      <div className="flex flex-1 flex-col gap-2.5 p-3.5">
        <Link
          to={`/product/${product.slug}`}
          className="line-clamp-2 min-h-[2lh] text-[17px] leading-tight font-extrabold tracking-[-0.01em] text-fg transition-colors hover:text-brand"
        >
          {product.name}
          {product.emoji ? <span className="ml-1">{product.emoji}</span> : null}
        </Link>

        {variantLabels.length || sizeLabels.length ? (
          <div className="flex h-5 gap-1.5 overflow-hidden">
            {variantLabels.slice(0, 1).map((label) => (
              <Badge key={label} size="sm">
                {label}
              </Badge>
            ))}
            {sizeLabels.slice(0, 1).map((label) => (
              <Badge key={label} size="sm">
                {label}
              </Badge>
            ))}
          </div>
        ) : null}

        {product.composition ? (
          <p className="line-clamp-3 h-[3lh] text-[11.5px] leading-[1.5] text-fg-muted">
            {product.composition}
          </p>
        ) : null}

        <div className="mt-auto flex flex-col gap-1.5 pt-1">
          <div className="flex items-center gap-1.5">
            <Star size={15} className="text-brand dark:text-fg" strokeWidth={2.4} />
            <span className="text-[14px] font-extrabold text-brand tabular-nums dark:text-fg">
              {product.rating.overall}/10
            </span>
          </div>

          <ul className="flex flex-col gap-[3px]">
            {product.rating.criteria.map((criterion) => (
              <li key={criterion.id} className="flex items-center justify-between gap-2">
                <span className="min-w-0 truncate text-[11px] font-medium text-fg-muted">
                  {criterion.label}
                </span>
                <span
                  className="shrink-0 text-[11px] font-extrabold tabular-nums"
                  style={{ color: scoreColor(criterion.value * 2, 10) }}
                >
                  {Number((criterion.value * 2).toFixed(1))}/10
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-1.5 flex items-center justify-between gap-2">
          <span className="text-[19px] leading-none font-extrabold text-fg tabular-nums">
            {formatPrice(minPrice(product))}
          </span>
          <div className="product-card-add">
            <div>
              <Button
                variant="soft"
                size="sm"
                onClick={() => onAdd(product)}
                className="dark:text-fg dark:hover:text-fg"
                aria-label={`Добавить «${product.name}» в заказ`}
              >
                Добавить
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
