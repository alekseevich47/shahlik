import { useAccount } from "@/entities/account/api"
import { usePublicBonusSettings } from "@/entities/bonus/api"
import { calcCartEarn } from "@/entities/bonus/lib/earn"
import { publicBonusSettingsFallback } from "@/entities/bonus/model"
import { useCartTotals } from "@/features/cart/model/selectors"
import { useCartStore } from "@/features/cart/model/store"
import { formatPrice } from "@/shared/lib/format"
import { cn } from "@/shared/lib/cn"
import { CoinIcon } from "@/shared/ui/coin-icon"

import { SumRow } from "./SumRow"

type CartTotalsProps = {
  /** Доп. скидка баллами (checkout). */
  bonusDiscount?: number
  /** Превью начисления; при списании — 0. */
  bonusEarned?: number
  /** Показать строку бонусов. */
  showBonusEarn?: boolean
  /** Заголовок блока сумм. */
  title?: string
  /** Плотнее строки (checkout «Чек»). */
  compact?: boolean
  className?: string
}

export function CartTotals({
  bonusDiscount = 0,
  bonusEarned,
  showBonusEarn = true,
  title = "Доставка и оплата",
  compact = false,
  className,
}: CartTotalsProps) {
  const { lines, goods, deliveryFee, discount, freeDeliveryLeft, minOrder, acceptingOrders, stopMessage } =
    useCartTotals()
  const mode = useCartStore((s) => s.mode)
  const user = useAccount()
  const { data: bonusSettings = publicBonusSettingsFallback() } = usePublicBonusSettings()
  const empty = lines.length === 0
  const belowMinOrder = minOrder > 0 && goods < minOrder
  const totalDiscount = discount + bonusDiscount
  const showDiscount = totalDiscount > 0
  const isGuest = !user

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

  const rowSize = compact ? "text-[11px]" : "text-[12px]"
  const gapClass = compact ? "gap-1" : "gap-1.5"
  const collapsedMb = compact ? "mb-[-0.25rem]" : "mb-[-0.375rem]"

  return (
    <div className={cn("flex flex-col", gapClass, className)}>
      <p className={cn("font-extrabold text-brand", rowSize)}>{title}</p>
      <SumRow dense={compact} label="Стоимость товаров" value={formatPrice(goods)} />
      {showBonusEarn && bonusSettings.enabled && earnedPreview > 0 ? (
        <div className="flex items-center justify-between gap-3">
          <span className={cn(rowSize, "text-fg-muted")}>
            {isGuest ? "Можно получить" : "Начислено бонусов"}
          </span>
          <span
            className={cn(
              "inline-flex shrink-0 items-center gap-1 whitespace-nowrap font-bold leading-none text-fg tabular-nums",
              rowSize,
            )}
          >
            {isGuest ? earnedPreview : `+${earnedPreview}`}
            <CoinIcon />
          </span>
        </div>
      ) : null}
      <div
        className={cn(
          "grid transition-[grid-template-rows,opacity,margin] duration-300 ease-out",
          showDiscount ? "grid-rows-[1fr] opacity-100" : cn(collapsedMb, "grid-rows-[0fr] opacity-0"),
        )}
        aria-hidden={!showDiscount}
      >
        <div className="overflow-hidden">
          <SumRow
            dense={compact}
            label="Скидка"
            value={`−${formatPrice(totalDiscount)}`}
            tone="success"
          />
        </div>
      </div>
      {mode === "delivery" ? (
        <SumRow
          dense={compact}
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
      {!acceptingOrders ? (
        <p className={cn("font-bold text-red", rowSize)}>{stopMessage}</p>
      ) : null}
    </div>
  )
}
