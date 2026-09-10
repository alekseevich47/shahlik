import type { Addon } from "@/entities/addon/model"
import { formatPrice } from "@/shared/lib/format"
import { Stepper } from "@/shared/ui/stepper"

type Props = {
  addon: Addon
  quantity: number
  onChange: (next: number) => void
}

function formatWeight(weight?: string): string | null {
  if (!weight?.trim()) return null
  const raw = weight.trim()
  if (/гр\.?$/i.test(raw) || /г$/i.test(raw) || /мл/i.test(raw) || /л$/i.test(raw)) return raw
  return `${raw} гр.`
}

/** Строка добавки/соуса: thumb + имя + «N гр., +цена» + кнопка «+» / stepper. */
export function AddonRow({ addon, quantity, onChange }: Props) {
  const weightLabel = formatWeight(addon.weight)

  return (
    <li className="flex items-center gap-2.5 py-1.5">
      <img
        src={addon.image}
        alt=""
        loading="lazy"
        className="size-10 shrink-0 rounded-[var(--r-sm)] object-cover"
      />
      <span className="min-w-0 flex-1 truncate text-[12.5px] leading-tight font-bold text-fg">
        {addon.name}
        {weightLabel || addon.price > 0 ? (
          <span className="font-semibold text-fg-muted">
            {weightLabel ? (
              <>
                {" "}
                {weightLabel}
                {addon.price > 0 ? ", " : ""}
              </>
            ) : null}
            {addon.price > 0 ? (
              <span className="tabular-nums">+{formatPrice(addon.price)}</span>
            ) : null}
          </span>
        ) : null}
      </span>
      {quantity > 0 ? (
        <Stepper size="sm" value={quantity} onChange={onChange} tone="solid" />
      ) : (
        <button
          type="button"
          onClick={() => onChange(1)}
          aria-label={`Добавить ${addon.name}`}
          className="grid size-8 shrink-0 cursor-pointer place-items-center rounded-[var(--r-xs)] bg-surface-3 text-[16px] font-extrabold leading-none text-fg-soft transition-colors hover:bg-fg hover:text-on-brand"
        >
          +
        </button>
      )}
    </li>
  )
}
