import { Search, User } from "lucide-react"
import { NavLink } from "react-router-dom"

import { useAccount } from "@/app/providers/account"
import { CartToggle } from "@/features/cart/ui/CartToggle"
import { useCartTotals } from "@/features/cart/model/selectors"
import { ThemeToggle } from "@/features/theme-toggle/ThemeToggle"
import { cn } from "@/shared/lib/cn"

type Props = {
  onSearch: () => void
  onCart: () => void
  cartPressed?: boolean
  tone?: "solid" | "glass"
  showAccount?: boolean
  className?: string
}

/** Белый фон, тень, чёрные иконки — и для solid, и для glass (маленькое/большое меню). */
const TONE = {
  solid: "border-transparent bg-surface shadow-[var(--shadow-card)]",
  glass: "border-transparent bg-surface shadow-[var(--shadow-card)]",
} as const

const ICON_BTN_SOLID =
  "grid size-11 cursor-pointer place-items-center rounded-[var(--r-md)] border text-fg transition-colors hover:text-brand"

const ICON_BTN_GLASS =
  "grid size-10 cursor-pointer place-items-center rounded-[var(--r-md)] border text-fg transition-colors hover:text-brand"

export function FloatingActions({
  onSearch,
  onCart,
  cartPressed,
  tone = "solid",
  showAccount = false,
  className,
}: Props) {
  const { count, total } = useCartTotals()
  const { user } = useAccount()
  const skin = TONE[tone]
  const iconBtn = tone === "glass" ? ICON_BTN_GLASS : ICON_BTN_SOLID

  return (
    <div className={cn("flex items-center", tone === "glass" ? "gap-1.5" : "gap-2", className)}>
      {showAccount ? (
        <NavLink to="/profile" aria-label="Профиль" className={cn(iconBtn, skin)}>
          {user?.avatarUrl ? (
            <img src={user.avatarUrl} alt="" className="size-6 rounded-full object-cover" />
          ) : (
            <User size={18} strokeWidth={2.4} />
          )}
        </NavLink>
      ) : null}

      <button
        type="button"
        onClick={onSearch}
        aria-label="Поиск по меню"
        className={cn(iconBtn, skin)}
      >
        <Search size={18} strokeWidth={2.4} />
      </button>

      <ThemeToggle tone={tone} className={skin} />

      <CartToggle
        tone={tone}
        onClick={onCart}
        count={count}
        total={total}
        pressed={cartPressed}
        className={skin}
      />
    </div>
  )
}
