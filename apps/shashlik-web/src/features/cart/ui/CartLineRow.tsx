import { X } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"

import { useAccount } from "@/entities/account/api"
import { usePublicBonusSettings } from "@/entities/bonus/api"
import { calcLineEarn } from "@/entities/bonus/lib/earn"
import { publicBonusSettingsFallback } from "@/entities/bonus/model"
import { isAddonStopped, isSkuStopped, useStoppedArticles } from "@/entities/product/lib/stock"
import type { ResolvedLine } from "@/features/cart/model/selectors"
import { useCartStore } from "@/features/cart/model/store"
import { withBackground } from "@/shared/lib/background-location"
import { formatPrice } from "@/shared/lib/format"
import { Stepper } from "@/shared/ui/stepper"
import { ThemeAwareImage } from "@/shared/ui/theme-aware-image"

import { BonusEarnHint } from "./BonusEarnHint"
import { CartLineTitle } from "./CartLineTitle"

/** Отступ под фото size-10 + gap-2.5 — старт колонки текста. */
const TEXT_INSET = "ml-12.5"

export function CartLineRow({ line }: { line: ResolvedLine }) {
  const navigate = useNavigate()
  const location = useLocation()
  const setQuantity = useCartStore((s) => s.setQuantity)
  const remove = useCartStore((s) => s.remove)
  const bumpAddon = useCartStore((s) => s.bumpAddon)
  const user = useAccount()
  const { data: bonusSettings = publicBonusSettingsFallback() } = usePublicBonusSettings()
  const { data: stopped = new Set<string>() } = useStoppedArticles()

  const lineStopped =
    isSkuStopped(line.product, line.line.sizeId, line.line.variantId, stopped) ||
    line.addons.some(({ addon }) => isAddonStopped(addon, stopped))

  const earnAmount = bonusSettings.enabled
    ? Math.round(
        calcLineEarn(line.total, line.product.bonusPercent, bonusSettings.defaultEarnPercent),
      )
    : 0

  const openEdit = () => {
    navigate(`/product/${line.product.slug}`, {
      state: {
        ...withBackground(location),
        editLineId: line.line.id,
        draft: {
          variantId: line.line.variantId,
          sizeId: line.line.sizeId,
          quantity: line.line.quantity,
          addons: line.line.addons.map((a) => ({ ...a })),
        },
      },
    })
  }

  return (
    <li className="flex flex-col gap-1.5 py-2.5">
      <div
        role="button"
        tabIndex={0}
        onClick={openEdit}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            openEdit()
          }
        }}
        className="flex cursor-pointer flex-col gap-1 rounded-[var(--r-sm)] text-left outline-none focus-visible:ring-2 focus-visible:ring-brand-ring"
        aria-label={`Изменить «${line.product.name}»`}
      >
        <div className="flex items-start gap-2.5">
          <ThemeAwareImage
            lightSrc={line.product.image}
            darkSrc={line.product.imagesDark?.[0]}
            alt=""
            className="size-10 shrink-0 rounded-[var(--r-sm)] object-cover"
          />
          <div className="min-w-0 flex-1">
            <CartLineTitle
              name={line.product.name}
              sizeLabel={line.sizeLabel}
              variantLabel={line.variantLabel}
              product={line.product}
            />
            {lineStopped ? (
              <p className="text-[11px] font-semibold text-red">Нет в наличии</p>
            ) : null}
          </div>
          <div
            className="flex shrink-0 items-center gap-1"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <Stepper
              size="sm"
              value={line.line.quantity}
              min={1}
              onChange={(next) => setQuantity(line.line.id, next)}
              ariaLabel={`Количество: ${line.product.name}`}
            />
            <button
              type="button"
              aria-label={`Убрать ${line.product.name}`}
              onClick={() => remove(line.line.id)}
              className="grid size-6 shrink-0 cursor-pointer place-items-center rounded-[var(--r-xs)] text-fg-faint transition-colors hover:bg-surface-3 hover:text-red"
            >
              <X size={14} strokeWidth={2.6} />
            </button>
          </div>
        </div>

        {line.addons.length ? (
          <ul className={`${TEXT_INSET} flex flex-col gap-0.5 pr-1`}>
            {line.addons.map(({ addon, quantity }) => (
              <li
                key={addon.id}
                className="flex min-w-0 items-center gap-2 text-[11px] text-fg-muted"
              >
                <span className="min-w-0 flex-1 truncate">+ {addon.name}</span>
                <div className="flex shrink-0 items-center gap-1.5">
                  <span className="font-bold tabular-nums">
                    {formatPrice(addon.price * quantity)}
                  </span>
                  <button
                    type="button"
                    aria-label={`Убрать добавку ${addon.name}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      bumpAddon(addon.id, -quantity, line.line.id)
                    }}
                    className="grid size-5 shrink-0 cursor-pointer place-items-center rounded-[var(--r-xs)] text-fg-faint transition-colors hover:bg-surface-3 hover:text-red"
                  >
                    <X size={12} strokeWidth={2.6} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : null}

        <p
          className={`${TEXT_INSET} flex flex-nowrap items-center gap-x-1.5 pr-1 text-[13px] font-extrabold text-fg tabular-nums`}
        >
          {formatPrice(line.total)}
          <BonusEarnHint amount={earnAmount} guest={!user} />
        </p>
      </div>
    </li>
  )
}
