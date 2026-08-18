import { Gift, LogIn, Soup } from "lucide-react"
import { NavLink, useNavigate } from "react-router-dom"

import { categories } from "@/mocks/categories"
import { ORDER_RULES, SITE } from "@/shared/config/site"
import { cn } from "@/shared/lib/cn"

type SidebarProps = {
  activeCategory: string
  onSelectCategory: (id: string) => void
  className?: string
}

/** Левая навигационная колонка витрины (десктоп ≥1120px). */
export function Sidebar({ activeCategory, onSelectCategory, className }: SidebarProps) {
  const navigate = useNavigate()

  return (
    <aside
      className={cn(
        "sticky top-5 flex h-[calc(100dvh-40px)] w-[164px] shrink-0 flex-col",
        "rounded-[var(--r-2xl)] border border-line bg-surface p-3 shadow-[var(--shadow-card)]",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => navigate("/")}
        className="mb-3 grid cursor-pointer place-items-center rounded-[var(--r-lg)] py-1 transition-transform duration-200 hover:scale-[1.03]"
        aria-label={`${SITE.name} — на главную`}
      >
        <img src={SITE.brandLogo} alt={SITE.name} className="h-16 w-auto object-contain" />
      </button>

      <nav className="flex flex-col gap-0.5">
        {categories.map((category) => {
          const active = category.id === activeCategory
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onSelectCategory(category.id)}
              className={cn(
                "flex h-10 cursor-pointer items-center gap-2.5 rounded-[var(--r-md)] px-2.5",
                "text-[13px] font-bold transition-all duration-200",
                active
                  ? "bg-brand-soft text-brand"
                  : "text-fg-muted hover:bg-surface-3 hover:text-fg",
              )}
            >
              <CategoryIcon icon={category.icon} active={active} />
              <span className="truncate">{category.name}</span>
            </button>
          )
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-2.5">
        <div className="rounded-[var(--r-lg)] bg-brand-soft p-3">
          <div className="mb-1 flex items-center gap-1.5">
            <Gift size={14} className="text-brand" strokeWidth={2.6} />
            <span className="text-[12px] leading-none font-extrabold text-brand">
              {ORDER_RULES.promo.title}
            </span>
          </div>
          <p className="text-[10.5px] leading-[1.45] text-fg-muted">
            {ORDER_RULES.promo.subtitle}
          </p>
          <div className="mt-2 grid h-7 place-items-center rounded-[var(--r-xs)] bg-surface text-[11px] font-extrabold tracking-[0.06em] text-brand">
            {ORDER_RULES.promo.code}
          </div>
        </div>

        <NavLink
          to="/admin"
          className="flex items-center gap-2.5 rounded-[var(--r-md)] px-2.5 py-2 text-fg-muted transition-colors hover:bg-surface-3 hover:text-fg"
        >
          <LogIn size={17} strokeWidth={2.2} />
          <span className="flex flex-col leading-tight">
            <span className="text-[12.5px] font-bold">Войти</span>
            <span className="text-[10px] text-fg-faint">для бонусов</span>
          </span>
        </NavLink>
      </div>
    </aside>
  )
}

function CategoryIcon({ icon, active }: { icon: string | null; active: boolean }) {
  if (!icon) {
    return (
      <Soup
        size={20}
        strokeWidth={2}
        className={cn("shrink-0", active ? "text-brand" : "text-fg-faint")}
      />
    )
  }
  return (
    <img
      src={icon}
      alt=""
      aria-hidden
      className={cn(
        "size-5 shrink-0 object-contain transition-all duration-200",
        active ? "opacity-100" : "opacity-45 grayscale",
      )}
    />
  )
}
