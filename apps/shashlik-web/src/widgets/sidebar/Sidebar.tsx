import { Gift, LogIn, User } from "lucide-react"
import { NavLink, useNavigate } from "react-router-dom"

import { useAccount, useProfileBonus } from "@/entities/account/api"
import { useCategories } from "@/entities/category/api"
import { CategoryIcon } from "@/entities/category/ui/CategoryIcon"
import { useSettings } from "@/entities/settings/api"
import { settingsFallback } from "@/entities/settings/model"
import { SITE } from "@/shared/config/site"
import { cn } from "@/shared/lib/cn"
import { NAV_RAIL_GAP, NAV_RAIL_WIDTH } from "@/widgets/sidebar/rail"

type SidebarProps = {
  activeCategory: string
  onSelectCategory: (id: string) => void
  /** Колонка уехала влево — навигация живёт на стеклянной плашке. */
  collapsed?: boolean
  className?: string
}

/**
 * Левая навигационная колонка витрины. Сам `aside` остаётся sticky, съезд —
 * на внутреннем `.nav-dock`: transform на sticky-боксе срывает прилипание.
 */
export function Sidebar({ activeCategory, onSelectCategory, collapsed, className }: SidebarProps) {
  const navigate = useNavigate()
  const { data: categories = [] } = useCategories()
  const { data: settings = settingsFallback() } = useSettings()
  const account = useAccount()
  const { data: bonus } = useProfileBonus(Boolean(account))
  const displayName =
    [account?.firstName, account?.lastName].filter(Boolean).join(" ") || account?.phone || "Профиль"

  return (
    <aside
      className="sticky top-5 h-[calc(100dvh-40px)] shrink-0 self-start"
      style={{ width: NAV_RAIL_WIDTH, marginRight: NAV_RAIL_GAP }}
      inert={collapsed}
      aria-hidden={collapsed}
    >
      <div
        className={cn(
          "nav-dock flex h-full flex-col rounded-[var(--r-2xl)] border border-line bg-surface p-3",
          "shadow-[var(--shadow-card)]",
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
                {settings.promoTitle}
              </span>
            </div>
            <p className="text-[10.5px] leading-[1.45] text-fg-muted">
              {settings.promoSubtitle}
            </p>
            <div className="mt-2 grid h-7 place-items-center rounded-[var(--r-xs)] bg-surface text-[11px] font-extrabold tracking-[0.06em] text-brand">
              {settings.promoCode}
            </div>
          </div>

          <NavLink
            to="/profile"
            className="flex items-center gap-2.5 rounded-[var(--r-md)] px-2.5 py-2 text-fg-muted transition-colors hover:bg-surface-3 hover:text-fg"
          >
            {account ? <User size={17} strokeWidth={2.2} /> : <LogIn size={17} strokeWidth={2.2} />}
            <span className="flex min-w-0 flex-col leading-tight">
              {account ? (
                <>
                  <span className="truncate text-[12.5px] font-bold">{displayName}</span>
                  <span className="text-[10px] text-fg-faint">
                    {bonus ? `${bonus.score} баллов` : "баллы…"}
                  </span>
                </>
              ) : (
                <>
                  <span className="text-[12.5px] font-bold">Войти</span>
                  <span className="text-[10px] text-fg-faint">для бонусов</span>
                </>
              )}
            </span>
          </NavLink>
        </div>
      </div>
    </aside>
  )
}
