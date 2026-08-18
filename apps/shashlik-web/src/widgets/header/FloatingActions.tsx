import { Search, ShoppingCart } from "lucide-react"

import { useCartTotals } from "@/features/cart/model/selectors"
import { ThemeToggle } from "@/features/theme-toggle/ThemeToggle"
import { cn } from "@/shared/lib/cn"

type Props = {
  onSearch: () => void
  onCart: () => void
  /** Панель корзины уже видна справа — иконку корзины прячем. */
  cartVisible: boolean
  className?: string
}

/** Плавающие действия над баннером: поиск, тема, корзина. */
export function FloatingActions({ onSearch, onCart, cartVisible, className }: Props) {
  const { count } = useCartTotals()

  return (
    <div className={cn("absolute top-4 right-4 z-20 flex items-center gap-2", className)}>
      <button
        type="button"
        onClick={onSearch}
        aria-label="Поиск по меню"
        className="grid size-11 cursor-pointer place-items-center rounded-[var(--r-md)] border border-line bg-surface text-fg shadow-[var(--shadow-card)] transition-colors hover:border-brand-border hover:text-brand"
      >
        <Search size={18} strokeWidth={2.4} />
      </button>

      <ThemeToggle className="shadow-[var(--shadow-card)]" />

      {!cartVisible ? (
        <button
          type="button"
          onClick={onCart}
          aria-label={`Корзина, позиций: ${count}`}
          className="relative grid size-11 cursor-pointer place-items-center rounded-[var(--r-md)] border border-line bg-surface text-brand shadow-[var(--shadow-card)] transition-colors hover:border-brand-border"
        >
          <ShoppingCart size={18} strokeWidth={2.4} />
          {count > 0 ? (
            <span className="absolute -top-1.5 -right-1.5 grid size-5 place-items-center rounded-full bg-brand text-[10px] font-extrabold text-on-brand tabular-nums">
              {count}
            </span>
          ) : null}
        </button>
      ) : null}
    </div>
  )
}
