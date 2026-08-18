import type { Addon } from "@/entities/addon/model"
import { formatPrice } from "@/shared/lib/format"
import { Stepper } from "@/shared/ui/stepper"

type Props = {
  addon: Addon
  quantity: number
  onChange: (next: number) => void
}

export function AddonRow({ addon, quantity, onChange }: Props) {
  return (
    <li className="flex items-center gap-2.5 rounded-[var(--r-md)] border border-line bg-surface px-2.5 py-2">
      <img
        src={addon.image}
        alt=""
        loading="lazy"
        className="size-8 shrink-0 rounded-full object-cover"
      />
      <span className="min-w-0 flex-1 leading-tight">
        <span className="block truncate text-[12.5px] font-bold text-fg">{addon.name}</span>
        <span className="block text-[10px] text-fg-muted">{addon.weight}</span>
      </span>
      {quantity > 0 ? (
        <Stepper size="sm" value={quantity} onChange={onChange} tone="ghost" />
      ) : (
        <button
          type="button"
          onClick={() => onChange(1)}
          aria-label={`Добавить ${addon.name}`}
          className="h-7 shrink-0 cursor-pointer rounded-[var(--r-xs)] bg-surface-3 px-2 text-[11px] font-extrabold text-fg-soft transition-colors hover:bg-brand-soft hover:text-brand"
        >
          +{formatPrice(addon.price)}
        </button>
      )}
    </li>
  )
}
