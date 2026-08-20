import type { ReactNode } from "react"
import { Link } from "react-router-dom"

import { cn } from "@/shared/lib/cn"

import { AdminCard } from "./AdminCard"

type Props = {
  label: string
  value: ReactNode
  hint?: string
  tone?: "default" | "danger" | "success"
  to?: string
  sparkline?: ReactNode
  className?: string
}

export function StatCard({
  label,
  value,
  hint,
  tone = "default",
  to,
  sparkline,
  className,
}: Props) {
  const body = (
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="text-[12px] font-bold text-fg-muted">{label}</p>
        <p
          className={cn(
            "mt-1.5 text-[22px] leading-none font-extrabold tabular-nums tracking-tight",
            tone === "danger" && "text-red",
            tone === "success" && "text-success",
            tone === "default" && "text-fg",
          )}
        >
          {value}
        </p>
        {hint ? (
          <p className="mt-2 text-[11px] leading-snug font-medium text-fg-faint">{hint}</p>
        ) : null}
      </div>
      {sparkline ? <div className="mt-1 shrink-0 text-brand">{sparkline}</div> : null}
    </div>
  )

  if (to) {
    return (
      <Link
        to={to}
        className={cn(
          "block rounded-[var(--r-lg)] outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-brand/40",
          className,
        )}
      >
        <AdminCard bodyClassName="p-4">{body}</AdminCard>
      </Link>
    )
  }

  return (
    <AdminCard className={className} bodyClassName="p-4">
      {body}
    </AdminCard>
  )
}
