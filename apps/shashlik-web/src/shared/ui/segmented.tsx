import { useId } from "react"

import { cn } from "@/shared/lib/cn"

type SegmentedProps<T extends string> = {
  value: T
  onChange: (next: T) => void
  options: ReadonlyArray<{ value: T; label: string }>
  className?: string
  ariaLabel?: string
}

/**
 * Переключатель с плавно скользящей пилюлей (Заберу сам / Надо привезти).
 * Пилюля двигается через transform, а не сменой фона у двух кнопок.
 */
export function Segmented<T extends string>({
  value,
  onChange,
  options,
  className,
  ariaLabel,
}: SegmentedProps<T>) {
  const id = useId()
  const index = Math.max(
    options.findIndex((o) => o.value === value),
    0,
  )

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        "relative grid h-11 w-full items-center rounded-[var(--r-md)] bg-surface-3 p-1",
        className,
      )}
      style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
    >
      <span
        aria-hidden
        className="absolute top-1 bottom-1 left-1 rounded-[var(--r-sm)] bg-brand shadow-brand transition-transform duration-300 ease-[var(--ease-out-soft)]"
        style={{
          width: `calc((100% - 8px) / ${options.length})`,
          transform: `translateX(${index * 100}%)`,
        }}
      />
      {options.map((option) => {
        const active = option.value === value
        return (
          <button
            key={option.value}
            id={`${id}-${option.value}`}
            role="tab"
            type="button"
            aria-selected={active}
            onClick={() => onChange(option.value)}
            className={cn(
              "relative z-10 h-9 cursor-pointer rounded-[var(--r-sm)] text-[13px] font-bold transition-colors duration-200",
              active ? "text-on-brand" : "text-fg-muted hover:text-fg",
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
