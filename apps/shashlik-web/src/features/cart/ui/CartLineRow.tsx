import { X } from "lucide-react"

import type { ResolvedLine } from "@/features/cart/model/selectors"
import { useCartStore } from "@/features/cart/model/store"
import { Stepper } from "@/shared/ui/stepper"
import { formatPrice } from "@/shared/lib/format"

export function CartLineRow({ line }: { line: ResolvedLine }) {
  const setQuantity = useCartStore((s) => s.setQuantity)
  const remove = useCartStore((s) => s.remove)

  const title = [line.product.name, line.variantLabel, line.sizeLabel]
    .filter(Boolean)
    .join(" • ")

  return (
    <li className="flex flex-col gap-1.5 py-2.5">
      <div className="flex items-center gap-2.5">
        <img
          src={line.product.image}
          alt=""
          className="size-10 shrink-0 rounded-[var(--r-sm)] object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[12.5px] font-bold text-fg">{title}</p>
          <p className="text-[13px] font-extrabold text-fg tabular-nums">
            {formatPrice(line.unitPrice * line.line.quantity)}
          </p>
        </div>
        <Stepper
          size="sm"
          value={line.line.quantity}
          min={1}
          onChange={(next) => setQuantity(line.line.id, next)}
          ariaLabel={`Количество: ${title}`}
        />
        <button
          type="button"
          aria-label={`Убрать ${title}`}
          onClick={() => remove(line.line.id)}
          className="grid size-6 shrink-0 cursor-pointer place-items-center rounded-[var(--r-xs)] text-fg-faint transition-colors hover:bg-surface-3 hover:text-red"
        >
          <X size={14} strokeWidth={2.6} />
        </button>
      </div>

      {line.addons.length ? (
        <ul className="ml-12.5 flex flex-col gap-0.5">
          {line.addons.map(({ addon, quantity }) => (
            <li
              key={addon.id}
              className="flex items-center justify-between gap-2 text-[11px] text-fg-muted"
            >
              <span className="truncate">
                + {addon.name}
                {quantity > 1 ? ` ×${quantity}` : ""}
              </span>
              <span className="shrink-0 font-bold tabular-nums">
                {formatPrice(addon.price * quantity)}
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  )
}
