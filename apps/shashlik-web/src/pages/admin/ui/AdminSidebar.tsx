import { LayoutGroup } from "motion/react"
import * as m from "motion/react-m"
import { Link, useLocation } from "react-router-dom"

import {
  ADMIN_NAV,
  type AdminRole,
  type AdminSectionId,
} from "@/pages/admin/model"
import { SITE } from "@/shared/config/site"
import { cn } from "@/shared/lib/cn"

const PILL = { type: "spring", stiffness: 480, damping: 36, mass: 0.65 } as const

type Props = {
  role: AdminRole
  counts: Partial<Record<AdminSectionId, number>>
}

export function AdminSidebar({ role, counts }: Props) {
  const location = useLocation()

  const items = ADMIN_NAV.filter(
    (item) => role === "admin" || item.role === "manager",
  )

  return (
    <aside className="sticky top-0 flex h-dvh w-[188px] shrink-0 flex-col border-r border-line bg-surface-2 p-3">
      <Link to="/" className="mb-4 flex flex-col items-center gap-0.5 pt-2">
        <img src={SITE.brandLogo} alt={SITE.name} className="h-14 w-auto object-contain" />
        <span className="text-[10px] font-bold tracking-[0.14em] text-fg-faint">admin</span>
      </Link>

      <LayoutGroup id="admin-nav">
        <nav className="flex flex-col gap-0.5">
          {items.map((item) => {
            const href = `/admin/${item.path}`
            const isActive =
              location.pathname === href ||
              location.pathname.startsWith(`${href}/`)
            const Icon = item.icon
            const count = counts[item.id]
            return (
              <Link
                key={item.id}
                to={href}
                className={cn(
                  "relative flex h-9.5 items-center gap-2 rounded-[var(--r-sm)] px-2.5 text-left",
                  "text-[12.5px] font-bold transition-colors",
                  isActive
                    ? "text-brand"
                    : "text-fg-muted hover:bg-surface-3/70 hover:text-fg",
                )}
              >
                {isActive ? (
                  <m.span
                    layoutId="admin-nav-pill"
                    className="absolute inset-0 rounded-[var(--r-sm)] bg-brand-soft"
                    transition={PILL}
                  />
                ) : null}
                <Icon size={16} strokeWidth={2.2} className="relative z-10 shrink-0" />
                <span className="relative z-10 min-w-0 flex-1 truncate">{item.label}</span>
                {count != null ? (
                  <span
                    className={cn(
                      "relative z-10 rounded-[5px] px-1.5 py-0.5 text-[10.5px] font-extrabold tabular-nums",
                      isActive ? "bg-brand/15 text-brand" : "bg-surface-3 text-fg-faint",
                    )}
                  >
                    {count}
                  </span>
                ) : null}
              </Link>
            )
          })}
        </nav>
      </LayoutGroup>
    </aside>
  )
}
