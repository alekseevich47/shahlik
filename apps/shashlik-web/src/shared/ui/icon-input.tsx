import type { ComponentProps, ReactNode } from "react"

import { cn } from "@/shared/lib/cn"

type IconInputProps = ComponentProps<"input"> & {
  icon: ReactNode
}

export function IconInput({ icon, className, ...props }: IconInputProps) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-fg-faint">
        {icon}
      </span>
      <input
        data-slot="input"
        className={cn(
          "h-11 w-full rounded-[var(--r-md)] border border-line bg-surface pr-3.5 pl-10 text-[14px] font-semibold text-fg",
          "placeholder:font-medium placeholder:text-fg-faint",
          "transition-colors outline-none focus:border-brand-border",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
    </div>
  )
}

type IconTextareaProps = ComponentProps<"textarea"> & {
  icon?: ReactNode
  maxHint?: number
}

export function IconTextarea({ icon, maxHint, className, value, maxLength, ...props }: IconTextareaProps) {
  const len = String(value ?? "").length
  const limit = maxLength ?? maxHint

  return (
    <div className="relative">
      {icon ? (
        <span className="pointer-events-none absolute top-3 left-3.5 text-fg-faint">{icon}</span>
      ) : null}
      <textarea
        data-slot="textarea"
        value={value}
        maxLength={maxLength}
        className={cn(
          "w-full resize-none rounded-[var(--r-md)] border border-line bg-surface py-2.5 text-[13px] leading-[1.55] font-medium text-fg",
          icon ? "pl-10 pr-3.5" : "px-3.5",
          "placeholder:text-fg-faint transition-colors outline-none focus:border-brand-border",
          limit ? "pb-7" : "",
          className,
        )}
        {...props}
      />
      {limit ? (
        <span className="pointer-events-none absolute right-3 bottom-2 text-[10px] font-semibold text-fg-faint tabular-nums">
          {len}/{limit}
        </span>
      ) : null}
    </div>
  )
}
