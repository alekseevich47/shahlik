import { useAccount } from "@/entities/account/api"
import { usePublicBonusSettings } from "@/entities/bonus/api"
import { calcLineEarn } from "@/entities/bonus/lib/earn"
import { publicBonusSettingsFallback } from "@/entities/bonus/model"
import type { ResolvedLine } from "@/features/cart/model/selectors"
import { BonusEarnHint } from "@/features/cart/ui/BonusEarnHint"
import { CartLineTitle } from "@/features/cart/ui/CartLineTitle"
import { formatPrice } from "@/shared/lib/format"

/** Строка заказа в checkout — только просмотр, без редактирования. */
export function CheckoutLineRow({
  line,
  earnDisabled = false,
}: {
  line: ResolvedLine
  /** При списании бонусов начисление не показываем. */
  earnDisabled?: boolean
}) {
  const user = useAccount()
  const { data: bonusSettings = publicBonusSettingsFallback() } = usePublicBonusSettings()

  const earnAmount =
    !earnDisabled && bonusSettings.enabled
      ? Math.round(
          calcLineEarn(line.total, line.product.bonusPercent, bonusSettings.defaultEarnPercent),
        )
      : 0

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
        <p className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[13px] font-extrabold text-fg tabular-nums">
          {formatPrice(line.unitPrice * line.line.quantity)}
          <BonusEarnHint amount={earnAmount} guest={!user} />
        </p>
      </div>
      <span className="shrink-0 pt-0.5 text-[13px] font-bold text-fg-muted tabular-nums">
        ×{line.line.quantity}
      </span>
    </li>
  )
}
