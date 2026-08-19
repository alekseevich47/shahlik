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

const ICON_BTN =
  "grid size-11 cursor-pointer place-items-center rounded-[var(--r-md)] border text-fg transition-colors hover:border-brand-border hover:text-brand"

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

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {showAccount ? (
        <NavLink to="/admin" aria-label="Войти" className={cn(ICON_BTN, skin)}>
          <User size={18} strokeWidth={2.4} />
        </NavLink>
      ) : null}

      <button
        type="button"
        onClick={onSearch}
        aria-label="Поиск по меню"
        className={cn(ICON_BTN, skin)}
      >
        <Search size={18} strokeWidth={2.4} />
      </button>

      <ThemeToggle className={skin} />

      <CartToggle
        onClick={onCart}
        count={count}
        total={total}
        pressed={cartPressed}
        className={skin}
      />
    </div>
  )
}
