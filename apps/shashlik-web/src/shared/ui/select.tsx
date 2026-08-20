import type { ComponentProps } from "react"

import { cn } from "@/shared/lib/cn"

export function Select({ className, children, ...props }: ComponentProps<"select">) {
  return (
    <select
      data-slot="select"
      className={cn(
        "h-11 w-full cursor-pointer rounded-[var(--r-md)] border border-line bg-surface px-3.5 text-[14px] font-semibold text-fg",
        "outline-none focus:border-brand-border",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  )
}
