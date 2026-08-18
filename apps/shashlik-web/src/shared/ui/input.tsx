import type { ComponentProps } from "react"

import { cn } from "@/shared/lib/cn"

export function Input({ className, ...props }: ComponentProps<"input">) {
  return (
    <input
      data-slot="input"
      className={cn(
        "h-11 w-full rounded-[var(--r-md)] border border-line bg-surface px-3.5 text-[14px] font-semibold text-fg",
        "placeholder:font-medium placeholder:text-fg-faint",
        "transition-colors outline-none focus:border-brand-border",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  )
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "w-full resize-none rounded-[var(--r-md)] border border-line bg-surface px-3.5 py-2.5 text-[13px] leading-[1.55] font-medium text-fg",
        "placeholder:text-fg-faint transition-colors outline-none focus:border-brand-border",
        className,
      )}
      {...props}
    />
  )
}

export function Field({
  label,
  hint,
  className,
  children,
}: {
  label: string
  hint?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <label className={cn("flex flex-col gap-1.5", className)}>
      <span className="text-[12px] font-bold text-fg-muted">{label}</span>
      {children}
      {hint ? <span className="text-[11px] text-fg-faint">{hint}</span> : null}
    </label>
  )
}
