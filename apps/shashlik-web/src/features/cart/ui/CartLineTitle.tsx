import type { Product } from "@/entities/product/model"
import { cn } from "@/shared/lib/cn"

type CartLineTitleProps = {
  name: string
  sizeLabel: string
  variantLabel?: string
  product: Product
  className?: string
}

/** Название; размер и мясо одной строкой через запятую («L, Курица»). */
export function CartLineTitle({
  name,
  sizeLabel,
  variantLabel,
  product,
  className,
}: CartLineTitleProps) {
  const showVariant = Boolean(variantLabel && product.variants.length > 1)
  const meta = [sizeLabel, showVariant ? variantLabel : null].filter(Boolean).join(", ")

  return (
    <div className={cn("min-w-0", className)}>
      <p className="truncate text-[12.5px] leading-snug font-bold text-fg">{name}</p>
      {meta ? (
        <p className="truncate text-[11.5px] font-medium text-fg-muted">{meta}</p>
      ) : null}
    </div>
  )
}
