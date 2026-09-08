import { PanelRightClose, ShoppingCart } from "lucide-react"

import { cn } from "@/shared/lib/cn"

type Props = {
  onClick: () => void
  count: number
  /** Итог заказа; 0 — сумма скрыта, кнопка квадратная. */
  total: number
  /** Задан — кнопка как ThemeToggle (pressed = колонка открыта). Иначе Sheet. */
  pressed?: boolean
  /** `glass` — на стеклянной плашке: тёмный фон, белая сумма, иконка остаётся brand. */
  tone?: "solid" | "glass"
  className?: string
}

function formatOrderSum(value: number): { amount: string; label: string } {
  const amount = Math.round(value).toLocaleString("ru-RU")
  return { amount, label: `${amount}\u00a0р.` }
}

export function CartToggle({ onClick, count, total, pressed, tone = "solid", className }: Props) {
  const isToggle = pressed !== undefined
  const open = pressed === true
  const showSum = total > 0
  const sum = formatOrderSum(total)
  const glass = tone === "glass"
  const btnH = glass ? "h-10" : "h-11"
  const iconBox = glass ? "size-10" : "size-11"

  const aria = (() => {
    const qty = count > 0 ? `, позиций: ${count}` : ""
    const money = showSum ? `, сумма ${sum.label}` : ""
    if (isToggle) return open ? "Скрыть корзину" : `Показать корзину${money}${qty}`
    return `Корзина${money}${qty}`
  })()

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isToggle ? open : undefined}
      aria-label={aria}
      className={cn(
        "relative inline-flex cursor-pointer items-center rounded-[var(--r-md)] border transition-colors",
        btnH,
        glass
          ? "text-brand shadow-none hover:border-[var(--glass-btn-border)]"
          : "border-line bg-surface text-brand shadow-[var(--shadow-card)] hover:border-brand-border",
        className,
      )}
    >
      <span className="cart-toggle-sum" data-open={showSum ? "1" : "0"} aria-hidden={!showSum}>
        <span className="min-w-0 overflow-hidden">
          <span
            className={cn(
              "flex items-center gap-0.5 pr-0.5 pl-3 whitespace-nowrap",
              btnH,
            )}
          >
            <span
              className={cn(
                "text-[13px] leading-none font-extrabold tracking-tight tabular-nums",
                glass ? "text-white" : "text-fg",
              )}
            >
              {sum.amount}
            </span>
            <span
              className={cn(
                "text-[11px] leading-none font-bold",
                glass ? "text-white/75" : "text-fg-muted",
              )}
            >
              р.
            </span>
          </span>
        </span>
      </span>

      <span className={cn("relative grid shrink-0 place-items-center", iconBox)}>
        {isToggle ? (
          <>
            <ShoppingCart
              size={18}
              strokeWidth={2.4}
              className={cn(
                "absolute inset-0 m-auto transition-all duration-300",
                open ? "scale-50 -rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100",
              )}
            />
            <PanelRightClose
              size={18}
              strokeWidth={2.4}
              className={cn(
                "absolute inset-0 m-auto transition-all duration-300",
                open ? "scale-100 rotate-0 opacity-100" : "scale-50 rotate-90 opacity-0",
              )}
            />
          </>
        ) : (
          <ShoppingCart size={18} strokeWidth={2.4} />
        )}
        {count > 0 ? (
          <span
            className={cn(
              "absolute grid size-5 place-items-center rounded-full bg-brand text-[10px] font-extrabold text-on-brand tabular-nums",
              glass ? "-top-1 -right-1" : "-top-1.5 -right-1.5",
            )}
          >
            {count}
          </span>
        ) : null}
      </span>
    </button>
  )
}
