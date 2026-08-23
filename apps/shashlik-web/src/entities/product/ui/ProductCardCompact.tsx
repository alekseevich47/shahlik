import { Plus } from "lucide-react"
import { Link } from "react-router-dom"

import { useBadges } from "@/entities/badge/api"
import { badgeLabel } from "@/entities/badge/model"
import type { Product } from "@/entities/product/model"
import { minPrice } from "@/entities/product/lib"
import { Badge } from "@/shared/ui/badge"
import { cn } from "@/shared/lib/cn"
import { formatPrice } from "@/shared/lib/format"
import { scoreColor } from "@/shared/ui/rating"

type Props = {
  product: Product
  onAdd: (product: Product) => void
  className?: string
}

/** Компактная карточка для мобильных горизонтальных подборок. */
export function ProductCardCompact({ product, onAdd, className }: Props) {
  const { data: badges = [] } = useBadges()
  const label = badgeLabel(product.badge, badges)
  const meta = [product.variants[0]?.label, product.sizes[0]?.label]
    .filter(Boolean)
    .join(" • ")

  return (
    <article
      className={cn(
        "flex flex-col overflow-hidden rounded-[var(--r-lg)] border border-line bg-surface shadow-[var(--shadow-card)]",
        className,
      )}
    >
      <Link
        to={`/product/${product.slug}`}
        className="relative block aspect-[4/3] bg-surface-3"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="size-full object-cover"
        />
        {product.badge && label ? (
          <Badge variant="brand" size="sm" className="absolute top-1.5 right-1.5">
            {label}
          </Badge>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col gap-1 p-2.5">
        <Link
          to={`/product/${product.slug}`}
          className="text-[13.5px] leading-tight font-extrabold text-fg"
        >
          {product.name}
          {product.emoji ? <span className="ml-1">{product.emoji}</span> : null}
        </Link>
        {meta ? <p className="text-[10.5px] text-fg-muted">{meta}</p> : null}
        <span
          className="text-[11px] font-extrabold tabular-nums"
          style={{ color: scoreColor(product.rating.overall, 10) }}
        >
          {product.rating.overall}/10
        </span>
        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
          <span className="text-[15px] leading-none font-extrabold text-fg tabular-nums">
            {formatPrice(minPrice(product))}
          </span>
          <button
            type="button"
            onClick={() => onAdd(product)}
            aria-label={`Добавить «${product.name}»`}
            className="grid size-7 cursor-pointer place-items-center rounded-[var(--r-xs)] bg-brand text-on-brand shadow-brand transition-colors hover:bg-brand-hover"
          >
            <Plus size={15} strokeWidth={3} />
          </button>
        </div>
      </div>
    </article>
  )
}
