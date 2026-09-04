import { useCartTotals } from "@/features/cart/model/selectors"
import { useCartStore } from "@/features/cart/model/store"
import { usePublicBonusSettings } from "@/entities/bonus/api"
import { calcCartEarn } from "@/entities/bonus/lib/earn"
import { publicBonusSettingsFallback } from "@/entities/bonus/model"
import { formatPrice } from "@/shared/lib/format"
import { cn } from "@/shared/lib/cn"
import { CoinIcon } from "@/shared/ui/coin-icon"

import { SumRow } from "./SumRow"

type CartTotalsProps = {
  /** Доп. скидка баллами (checkout). */
  bonusDiscount?: number
  /** Превью начисления; при списании — 0. */
  bonusEarned?: number
  /** Показать строку «Начислено бонусов». */
  showBonusEarn?: boolean
  className?: string
}

export function CartTotals({
  bonusDiscount = 0,
  bonusEarned,
  showBonusEarn = true,
  className,
}: CartTotalsProps) {
  const { lines, goods, deliveryFee, discount, freeDeliveryLeft, minOrder, acceptingOrders, stopMessage } =
    useCartTotals()
  const mode = useCartStore((s) => s.mode)
  const { data: bonusSettings = publicBonusSettingsFallback() } = usePublicBonusSettings()
  const empty = lines.length === 0
  const belowMinOrder = minOrder > 0 && goods < minOrder
  const totalDiscount = discount + bonusDiscount
  const showDiscount = totalDiscount > 0

  const earnedPreview =
    bonusEarned !== undefined
      ? bonusEarned
      : calcCartEarn(
          lines.map((line) => ({
            total: line.total,
            bonusPercent: line.product.bonusPercent,
          })),
          bonusSettings.defaultEarnPercent,
          bonusSettings.enabled,
        )

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <p className="text-[12px] font-extrabold text-brand">Доставка и оплата</p>
      <SumRow label="Стоимость товаров" value={formatPrice(goods)} />
      {showBonusEarn && bonusSettings.enabled && earnedPreview > 0 ? (
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1 text-[12px] text-fg-muted">
            Начислено бонусов
            <CoinIcon className="size-3.5 opacity-80" />
          </span>
          <span className="text-[12px] font-bold text-fg tabular-nums">+{earnedPreview}</span>
        </div>
      ) : null}
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
