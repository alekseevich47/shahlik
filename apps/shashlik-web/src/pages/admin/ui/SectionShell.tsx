import * as m from "motion/react-m"
import type { ReactNode } from "react"

import { cn } from "@/shared/lib/cn"

type Props = {
  title: string
  description?: string
  actions?: ReactNode
  className?: string
  children: ReactNode
}

export function SectionShell({ title, description, actions, className, children }: Props) {
  return (
    <m.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className={cn("flex flex-col gap-4", className)}
    >
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-[20px] leading-tight font-extrabold text-fg">{title}</h2>
          {description ? (
            <p className="mt-1 text-[13px] leading-[1.45] font-medium text-fg-muted">
              {description}
            </p>
          ) : null}
        </div>
        {actions ? <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div> : null}
      </header>
      {children}
    </m.div>
  )
}
