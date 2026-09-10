import { Heart, Home, ShoppingCart, User } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"

import { useAccount } from "@/app/providers/account"
import { useCartTotals } from "@/features/cart/model/selectors"
import { cn } from "@/shared/lib/cn"

export type MobileTab = "home" | "cart" | "favorites" | "profile"

const TABS: ReadonlyArray<{ id: MobileTab; label: string; icon: LucideIcon }> = [
  { id: "home", label: "Витрина", icon: Home },
  { id: "cart", label: "Корзина", icon: ShoppingCart },
  { id: "favorites", label: "Любимое", icon: Heart },
  { id: "profile", label: "Профиль", icon: User },
]

type Props = {
  value: MobileTab
  onChange: (tab: MobileTab) => void
}

export function MobileTabBar({ value, onChange }: Props) {
  const navigate = useNavigate()
  const { count } = useCartTotals()
  const { user } = useAccount()

  return (
    <nav
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 flex items-stretch border-t border-line bg-surface",
        "h-[calc(68px+env(safe-area-inset-bottom))] pb-[env(safe-area-inset-bottom)] lg:hidden",
      )}
    >
      {TABS.map((tab) => {
        const active = tab.id === value
        const Icon = tab.icon
        const showAvatar = tab.id === "profile" && user?.avatarUrl
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              if (tab.id === "profile") {
                navigate("/profile")
                return
              }
              onChange(tab.id)
            }}
            aria-current={active ? "page" : undefined}
            className={cn(
              "relative flex flex-1 cursor-pointer flex-col items-center justify-center gap-1 transition-colors",
              active ? "text-brand" : "text-fg-faint",
            )}
          >
            <span className="relative">
              {showAvatar ? (
                <img
                  src={user.avatarUrl!}
                  alt=""
                  className={cn(
                    "size-[22px] rounded-full object-cover",
                    active ? "ring-2 ring-brand" : "ring-1 ring-line",
                  )}
                />
              ) : (
                <Icon size={21} strokeWidth={active ? 2.5 : 2} />
              )}
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
