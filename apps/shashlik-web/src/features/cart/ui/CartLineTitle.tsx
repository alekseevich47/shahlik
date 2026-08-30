import type { Product } from "@/entities/product/model"
import { cn } from "@/shared/lib/cn"

type CartLineTitleProps = {
  name: string
  sizeLabel: string
  variantLabel?: string
  product: Product
  className?: string
}

/** Название + размер (серый) и вариант мяса строкой ниже. */
export function CartLineTitle({
  name,
  sizeLabel,
  variantLabel,
  product,
  className,
}: CartLineTitleProps) {
  const showVariant = Boolean(variantLabel && product.variants.length > 1)

  return (
    <div className={cn("min-w-0", className)}>
      <p className="truncate text-[12.5px] leading-snug text-fg">
        <span className="font-bold">{name}</span>
        {sizeLabel ? (
          <span className="text-[11.5px] font-semibold text-fg-muted"> · {sizeLabel}</span>
        ) : null}
      </p>
      {showVariant ? (
        <p className="truncate text-[11.5px] font-medium text-fg-muted">{variantLabel}</p>
      ) : null}
    </div>
  )
}
