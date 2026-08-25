import type { Addon } from "@/entities/addon/model"
import { formatPrice } from "@/shared/lib/format"
import { Stepper } from "@/shared/ui/stepper"

type Props = {
  addon: Addon
  quantity: number
  onChange: (next: number) => void
}

/** Строка добавки/соуса: thumb + имя/вес + серая цена + кнопка цены / stepper. */
export function AddonRow({ addon, quantity, onChange }: Props) {
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
        {addon.weight ? (
          <span className="font-semibold text-fg-muted">, {addon.weight}</span>
        ) : null}
        <span className="ml-1.5 font-bold text-fg-muted tabular-nums">
          +{formatPrice(addon.price)}
        </span>
      </span>
      {quantity > 0 ? (
        <Stepper size="sm" value={quantity} onChange={onChange} tone="solid" />
      ) : (
        <button
          type="button"
          onClick={() => onChange(1)}
          aria-label={`Добавить ${addon.name}`}
          className="h-8 shrink-0 cursor-pointer rounded-[var(--r-xs)] bg-surface-3 px-2.5 text-[11px] font-extrabold text-fg-soft tabular-nums transition-colors hover:bg-fg hover:text-on-brand"
        >
          +{formatPrice(addon.price)}
        </button>
      )}
    </li>
  )
}
