import type { ResolvedLine } from "@/features/cart/model/selectors"
import { formatPrice } from "@/shared/lib/format"

import { CartLineTitle } from "@/features/cart/ui/CartLineTitle"

/** Строка заказа в checkout — только просмотр, без редактирования. */
export function CheckoutLineRow({ line }: { line: ResolvedLine }) {
  return (
    <li className="flex items-start gap-2.5 py-3">
      <img
        src={line.product.image}
        alt=""
        className="size-14 shrink-0 rounded-[var(--r-md)] object-cover"
      />
      <div className="min-w-0 flex-1">
        <CartLineTitle
          name={line.product.name}
          sizeLabel={line.sizeLabel}
          variantLabel={line.variantLabel}
          product={line.product}
        />
        <p className="mt-1 text-[13px] font-extrabold text-fg tabular-nums">
          {formatPrice(line.unitPrice * line.line.quantity)}
        </p>
      </div>
      <span className="shrink-0 pt-0.5 text-[13px] font-bold text-fg-muted tabular-nums">
        ×{line.line.quantity}
      </span>
    </li>
  )
}
