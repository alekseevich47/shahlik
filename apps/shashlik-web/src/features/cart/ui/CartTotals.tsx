import { useCartTotals } from "@/features/cart/model/selectors"
import { useCartStore } from "@/features/cart/model/store"
import { formatPrice } from "@/shared/lib/format"

import { SumRow } from "./SumRow"

export function CartTotals() {
  const { lines, goods, packFee, deliveryFee, discount, freeDeliveryLeft, minOrder, acceptingOrders, stopMessage } =
    useCartTotals()
  const mode = useCartStore((s) => s.mode)
  const empty = lines.length === 0
  const belowMinOrder = minOrder > 0 && goods < minOrder

  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-[12px] font-extrabold text-brand">Доставка и оплата</p>
      <SumRow label="Стоимость товаров" value={formatPrice(goods)} />
      <SumRow label="Упаковка заказа" value={formatPrice(packFee)} />
      {mode === "delivery" ? (
        <SumRow
          label="Доставка"
          value={deliveryFee ? formatPrice(deliveryFee) : "Бесплатно"}
          tone={deliveryFee ? "default" : "success"}
        />
      ) : null}
      {discount ? <SumRow label="Скидка" value={`−${formatPrice(discount)}`} tone="success" /> : null}
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
