import { Search, User } from "lucide-react"
import { NavLink } from "react-router-dom"

import { CartToggle } from "@/features/cart/ui/CartToggle"
import { useCartTotals } from "@/features/cart/model/selectors"
import { ThemeToggle } from "@/features/theme-toggle/ThemeToggle"
import { cn } from "@/shared/lib/cn"

type Props = {
  onSearch: () => void
  onCart: () => void
  /** Колонка корзины на широком столе — кнопка работает как ThemeToggle. */
  cartPressed?: boolean
  /** `glass` — кнопки лежат на стеклянной плашке: полупрозрачный фон без тени. */
  tone?: "solid" | "glass"
  /** Кнопка «Войти» слева от лупы — только на раскрытой плашке. */
  showAccount?: boolean
  className?: string
}

const TONE = {
  solid: "border-line bg-surface shadow-[var(--shadow-card)]",
  glass: "border-[var(--glass-btn-border)] bg-[var(--glass-btn)] shadow-none",
} as const

const ICON_BTN_SOLID =
  "grid size-11 cursor-pointer place-items-center rounded-[var(--r-md)] border text-fg transition-colors hover:border-brand-border hover:text-brand"

const ICON_BTN_GLASS =
  "grid size-11 cursor-pointer place-items-center rounded-[var(--r-md)] border text-white transition-colors hover:border-[var(--glass-btn-border)] hover:text-white"

/** Действия витрины: поиск, тема, корзина. Позиционирует вызывающий. */
export function FloatingActions({
  onSearch,
  onCart,
  cartPressed,
  tone = "solid",
  showAccount = false,
  className,
}: Props) {
  const { count, total } = useCartTotals()
  const skin = TONE[tone]
  const iconBtn = tone === "glass" ? ICON_BTN_GLASS : ICON_BTN_SOLID

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {showAccount ? (
        <NavLink to="/profile" aria-label="Профиль" className={cn(iconBtn, skin)}>
          <User size={18} strokeWidth={2.4} />
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
