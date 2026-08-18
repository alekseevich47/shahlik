import { Heart, Home, ShoppingCart, User, UtensilsCrossed } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { useCartTotals } from "@/features/cart/model/selectors"
import { cn } from "@/shared/lib/cn"

export type MobileTab = "home" | "menu" | "cart" | "favorites" | "profile"

const TABS: ReadonlyArray<{ id: MobileTab; label: string; icon: LucideIcon }> = [
  { id: "home", label: "Главная", icon: Home },
  { id: "menu", label: "Меню", icon: UtensilsCrossed },
  { id: "cart", label: "Корзина", icon: ShoppingCart },
  { id: "favorites", label: "Избранное", icon: Heart },
  { id: "profile", label: "Профиль", icon: User },
]

type Props = {
  value: MobileTab
  onChange: (tab: MobileTab) => void
}

export function MobileTabBar({ value, onChange }: Props) {
  const { count } = useCartTotals()

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 flex h-[68px] items-stretch border-t border-line bg-surface/92 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden">
      {TABS.map((tab) => {
        const active = tab.id === value
        const Icon = tab.icon
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            aria-current={active ? "page" : undefined}
            className={cn(
              "relative flex flex-1 cursor-pointer flex-col items-center justify-center gap-1 transition-colors",
              active ? "text-brand" : "text-fg-faint",
            )}
          >
            <span className="relative">
              <Icon size={21} strokeWidth={active ? 2.5 : 2} />
              {tab.id === "cart" && count > 0 ? (
                <span className="absolute -top-1 -right-2 grid size-4 place-items-center rounded-full bg-brand text-[9px] font-extrabold text-on-brand tabular-nums">
                  {count}
                </span>
              ) : null}
            </span>
            <span className="text-[10px] font-bold">{tab.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
