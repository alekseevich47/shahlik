import type { ReactNode } from "react"

import { cn } from "@/shared/lib/cn"

type Props = {
  title?: string
  action?: ReactNode
  className?: string
  bodyClassName?: string
  children: ReactNode
}

export function AdminCard({ title, action, className, bodyClassName, children }: Props) {
  return (
    <section
      className={cn(
        "overflow-hidden rounded-[var(--r-lg)] border border-line bg-surface-2 shadow-[var(--shadow-card)]",
        className,
      )}
    >
      {title ? (
        <header className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
          <h3 className="text-[14px] leading-none font-extrabold text-fg">{title}</h3>
          {action}
        </header>
      ) : null}
      <div className={cn("p-4", bodyClassName)}>{children}</div>
    </section>
  )
}
