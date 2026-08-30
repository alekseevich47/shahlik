import { useCartTotals } from "@/features/cart/model/selectors"
import { useCartStore } from "@/features/cart/model/store"
import { formatPrice } from "@/shared/lib/format"
import { cn } from "@/shared/lib/cn"

import { SumRow } from "./SumRow"

type CartTotalsProps = {
  /** Доп. скидка баллами (checkout). */
  bonusDiscount?: number
  className?: string
}

export function CartTotals({ bonusDiscount = 0, className }: CartTotalsProps) {
  const {
    lines,
    goods,
    packFee,
    deliveryFee,
    discount,
    freeDeliveryLeft,
    minOrder,
    acceptingOrders,
    stopMessage,
  } = useCartTotals()
  const mode = useCartStore((s) => s.mode)
  const empty = lines.length === 0
  const belowMinOrder = minOrder > 0 && goods < minOrder
  const totalDiscount = discount + bonusDiscount
  const showDiscount = totalDiscount > 0

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <p className="text-[12px] font-extrabold text-brand">Доставка и оплата</p>
      <SumRow label="Стоимость товаров" value={formatPrice(goods)} />
      <div
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
          showDiscount ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
        aria-hidden={!showDiscount}
      >
        <div className="overflow-hidden">
          <SumRow label="Скидка" value={`−${formatPrice(totalDiscount)}`} tone="success" />
        </div>
      </div>
      <SumRow label="Упаковка заказа" value={formatPrice(packFee)} />
      {mode === "delivery" ? (
        <SumRow
          label="Доставка"
          value={deliveryFee ? formatPrice(deliveryFee) : "Бесплатно"}
          tone={deliveryFee ? "default" : "success"}
        />
      ) : null}
      {mode === "delivery" && freeDeliveryLeft > 0 && !empty ? (
        <p className="text-[11px] text-fg-muted">До бесплатной доставки {formatPrice(freeDeliveryLeft)}</p>
      ) : null}
      {belowMinOrder && !empty ? (
        <p className="text-[11px] text-fg-muted">
          Мин. заказ {formatPrice(minOrder)} — ещё {formatPrice(minOrder - goods)}
        </p>
      ) : null}
      {!acceptingOrders ? <p className="text-[12px] font-bold text-red">{stopMessage}</p> : null}
    </div>
  )
}
