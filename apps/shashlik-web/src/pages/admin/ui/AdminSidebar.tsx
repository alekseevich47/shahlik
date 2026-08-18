import { Link } from "react-router-dom"

import { ADMIN_NAV } from "@/pages/admin/model"
import { ORDER_RULES, SITE } from "@/shared/config/site"
import { cn } from "@/shared/lib/cn"

type Props = {
  active: string
  onSelect: (id: string) => void
}

export function AdminSidebar({ active, onSelect }: Props) {
  return (
    <aside className="sticky top-0 hidden h-dvh w-[168px] shrink-0 flex-col border-r border-line bg-surface-2 p-3 lg:flex">
      <Link to="/" className="mb-4 flex flex-col items-center gap-0.5 pt-2">
        <img src={SITE.brandLogo} alt={SITE.name} className="h-14 w-auto object-contain" />
        <span className="text-[10px] font-bold tracking-[0.14em] text-fg-faint">admin</span>
      </Link>

      <nav className="flex flex-col gap-0.5">
        {ADMIN_NAV.map((item) => {
          const isActive = item.id === active
          const Icon = item.icon
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className={cn(
                "flex h-9.5 cursor-pointer items-center gap-2.5 rounded-[var(--r-sm)] px-2.5 text-left",
                "text-[12.5px] font-bold transition-colors",
                isActive
                  ? "bg-brand-soft text-brand"
                  : "text-fg-muted hover:bg-surface-3 hover:text-fg",
              )}
            >
              <Icon size={16} strokeWidth={2.2} className="shrink-0" />
              <span className="truncate">{item.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="mt-auto rounded-[var(--r-md)] bg-brand-soft p-3">
        <p className="text-[11.5px] font-extrabold text-brand">🎁 {ORDER_RULES.promo.title}</p>
        <p className="mt-0.5 text-[10px] leading-[1.4] text-fg-muted">
          {ORDER_RULES.promo.subtitle}
        </p>
        <p className="mt-1 text-[11px] font-extrabold tracking-[0.06em] text-brand">
          {ORDER_RULES.promo.code}
        </p>
        <button
          type="button"
          className="mt-2 h-7 w-full cursor-pointer rounded-[var(--r-xs)] bg-surface text-[11px] font-bold text-fg-soft transition-colors hover:text-brand"
        >
          Подробнее
        </button>
      </div>
    </aside>
  )
}
