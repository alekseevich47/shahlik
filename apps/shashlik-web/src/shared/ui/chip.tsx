import type { ComponentProps } from "react"

import { cn } from "@/shared/lib/cn"

type ChipProps = ComponentProps<"button"> & { active?: boolean }

/** Фильтр-чип ленты («Все», «Классика», «Острая 🌶»). */
export function Chip({ className, active = false, ...props }: ChipProps) {
  return (
    <button
      type="button"
      data-active={active || undefined}
      className={cn(
        "inline-flex h-9 shrink-0 cursor-pointer items-center gap-1.5 rounded-[var(--r-sm)] px-3.5",
        "text-[13px] font-bold whitespace-nowrap transition-all duration-200",
        active
          ? "border border-brand-border bg-brand-soft text-brand"
          : "border border-transparent bg-surface text-fg-muted hover:bg-surface-3 hover:text-fg",
        className,
      )}
      {...props}
    />
  )
}

type OptionCardProps = ComponentProps<"button"> & { active?: boolean }

/**
 * Тумблер выбора на PDP (вариант мяса / размер), без обводки.
 * Активное — product-accent (оранж light / лайм dark).
 */
export function OptionCard({ className, active = false, ...props }: OptionCardProps) {
  return (
    <button
      type="button"
      data-active={active || undefined}
      className={cn(
        "flex min-h-10 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-[var(--r-md)] px-3 py-1.5",
        "text-[13px] font-bold transition-all duration-200",
        active
          ? "bg-product-accent-soft text-product-accent"
          : "bg-surface-3 text-fg-muted hover:text-fg",
        "disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:text-fg-muted",
        className,
      )}
      {...props}
    />
  )
}
