import { ShoppingBag, Zap } from "lucide-react"

import { useCartTotals } from "@/features/cart/model/selectors"
import { useCheckoutDialogStore } from "@/features/checkout/model/dialog"
import { useCartStore } from "@/features/cart/model/store"
import { cn } from "@/shared/lib/cn"
import { formatPrice } from "@/shared/lib/format"
import { Button } from "@/shared/ui/button"
import { Segmented } from "@/shared/ui/segmented"

import { CartLineRow } from "./CartLineRow"
import { CartPromo } from "./CartPromo"
import { CartTotals } from "./CartTotals"

const MODE_OPTIONS = [
  { value: "pickup", label: "Заберу сам" },
  { value: "delivery", label: "Надо привезти" },
] as const

export function CartPanel({ className }: { className?: string }) {
  const { lines, total, minOrder, goods, acceptingOrders } = useCartTotals()
  const mode = useCartStore((s) => s.mode)
  const setMode = useCartStore((s) => s.setMode)
  const checkoutOpen = useCheckoutDialogStore((s) => s.open)
  const setCheckoutOpen = useCheckoutDialogStore((s) => s.setOpen)

  const empty = lines.length === 0
  const belowMinOrder = minOrder > 0 && goods < minOrder
  const checkoutBlocked = !acceptingOrders || belowMinOrder

  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-[var(--r-2xl)] border border-line bg-surface shadow-[var(--shadow-card)]",
        className,
      )}
    >
      <div className="flex flex-col gap-3 p-4 pb-3">
        <h2 className="text-[20px] leading-none font-extrabold tracking-[-0.01em] text-fg">
          Мой заказ
        </h2>
        <Segmented
          value={mode}
          onChange={setMode}
          options={MODE_OPTIONS}
          ariaLabel="Способ получения"
        />
      </div>

      <div className="scrollbar-slim flex-1 overflow-y-auto px-4">
        {empty ? (
          <div className="flex h-full min-h-40 flex-col items-center justify-center gap-2 py-8 text-center">
            <ShoppingBag size={30} className="text-fg-faint" strokeWidth={1.6} />
            <p className="text-[13px] font-bold text-fg-soft">Корзина пуста</p>
            <p className="max-w-45 text-[11.5px] text-fg-muted">
              Добавьте шаурму или шашлык — соберём заказ за пару минут
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-line">
            {lines.map((line) => (
              <CartLineRow key={line.line.id} line={line} />
            ))}
          </ul>
        )}
      </div>

      <div className="flex flex-col gap-3 border-t border-line p-4">
        <CartPromo />
        <CartTotals />

        <div className="flex items-end justify-between gap-3">
          <span className="flex flex-col">
            <span className="text-[12px] font-semibold text-fg-muted">Итого</span>
            <span className="text-[26px] leading-none font-extrabold text-fg tabular-nums">
              {formatPrice(total)}
            </span>
          </span>
          <Button
            size="lg"
            disabled={empty || checkoutBlocked || checkoutOpen}
            onClick={() => setCheckoutOpen(true)}
            className="flex-1"
          >
            <Zap size={17} strokeWidth={2.6} fill="currentColor" />
            Оформить заказ
          </Button>
        </div>
      </div>
    </div>
  )
}
