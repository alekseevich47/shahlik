import { Menu, ShoppingCart } from "lucide-react"
import { Link } from "react-router-dom"

import { useCartTotals } from "@/features/cart/model/selectors"
import { ThemeToggle } from "@/features/theme-toggle/ThemeToggle"
import { SITE } from "@/shared/config/site"

type Props = {
  onOpenMenu: () => void
  onOpenCart: () => void
}

export function MobileHeader({ onOpenMenu, onOpenCart }: Props) {
  const { count } = useCartTotals()

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-2 border-b border-line bg-surface/88 px-4 backdrop-blur-xl lg:hidden">
      <button
        type="button"
        onClick={onOpenMenu}
        aria-label="Категории"
        className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-[var(--r-sm)] text-fg-soft transition-colors hover:bg-surface-3"
      >
        <Menu size={21} strokeWidth={2.2} />
      </button>

      <Link to="/" className="mx-auto" aria-label={SITE.name}>
        <img src={SITE.brandLogo} alt={SITE.name} className="h-11 w-auto object-contain" />
      </Link>

      <ThemeToggle className="size-10 shrink-0 border-0 bg-transparent" />

      <button
        type="button"
        onClick={onOpenCart}
        aria-label={`Корзина, позиций: ${count}`}
        className="relative grid size-10 shrink-0 cursor-pointer place-items-center rounded-[var(--r-sm)] text-fg transition-colors hover:bg-surface-3"
      >
        <ShoppingCart size={21} strokeWidth={2.2} />
        {count > 0 ? <CartBadge count={count} /> : null}
      </button>
    </header>
  )
}

export function CartBadge({ count }: { count: number }) {
  return (
    <span className="absolute -top-0.5 -right-0.5 grid size-4.5 place-items-center rounded-full bg-brand text-[10px] font-extrabold text-on-brand tabular-nums">
      {count}
    </span>
  )
}
