import { Car, Bike } from "lucide-react"

import type { DeliveryMode } from "@/entities/order/model"
import { cn } from "@/shared/lib/cn"

const OPTIONS = [
  { value: "pickup" as const, label: "Заберу сам", Icon: Car },
  { value: "delivery" as const, label: "Надо привезти", Icon: Bike },
]

type CheckoutModeToggleProps = {
  value: DeliveryMode
  onChange: (next: DeliveryMode) => void
  className?: string
}

export function CheckoutModeToggle({ value, onChange, className }: CheckoutModeToggleProps) {
  const index = Math.max(
    OPTIONS.findIndex((o) => o.value === value),
    0,
  )

  return (
    <div
      role="tablist"
      aria-label="Способ получения"
      className={cn(
        "relative grid h-12 w-full items-center rounded-[var(--r-lg)] bg-surface-3 p-1",
        className,
      )}
      style={{ gridTemplateColumns: `repeat(${OPTIONS.length}, minmax(0, 1fr))` }}
    >
      <span
        aria-hidden
        className="absolute top-1 bottom-1 left-1 rounded-[var(--r-md)] bg-brand shadow-brand transition-transform duration-300 ease-[var(--ease-out-soft)]"
        style={{
          width: `calc((100% - 8px) / ${OPTIONS.length})`,
          transform: `translateX(${index * 100}%)`,
        }}
      />
      {OPTIONS.map(({ value: optValue, label, Icon }) => {
        const active = optValue === value
        return (
          <button
            key={optValue}
            role="tab"
            type="button"
            aria-selected={active}
            onClick={() => onChange(optValue)}
            className={cn(
              "relative z-10 flex h-10 cursor-pointer items-center justify-center gap-2 rounded-[var(--r-md)] text-[13px] font-bold transition-colors duration-200",
              active ? "text-on-brand" : "text-fg-muted hover:text-fg",
            )}
          >
            <Icon size={17} strokeWidth={2.2} />
            {label}
          </button>
        )
      })}
    </div>
  )
}
