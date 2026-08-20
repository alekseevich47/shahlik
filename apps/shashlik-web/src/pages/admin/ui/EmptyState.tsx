import type { ReactNode } from "react"

import { cn } from "@/shared/lib/cn"
import { Button } from "@/shared/ui/button"

type Props = {
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  icon?: ReactNode
  className?: string
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  icon,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 px-6 py-14 text-center",
        className,
      )}
    >
      {icon ? <div className="mb-1 text-fg-faint">{icon}</div> : null}
      <p className="text-[14px] font-extrabold text-fg">{title}</p>
      {description ? (
        <p className="max-w-sm text-[13px] leading-[1.45] font-medium text-fg-muted">
          {description}
        </p>
      ) : null}
      {onAction && actionLabel ? (
        <Button variant="soft" size="sm" className="mt-2" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  )
}
