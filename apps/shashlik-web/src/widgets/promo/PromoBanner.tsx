import { ChevronRight, Gift } from "lucide-react"

import { ORDER_RULES } from "@/shared/config/site"
import { cn } from "@/shared/lib/cn"

export function PromoBanner({
  className,
  onClick,
}: {
  className?: string
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full cursor-pointer items-center gap-3 rounded-[var(--r-lg)] border border-brand-border/40 bg-brand-soft px-3.5 py-3 text-left transition-colors hover:bg-brand-soft-hover",
        className,
      )}
    >
      <Gift size={20} className="shrink-0 text-brand" strokeWidth={2.2} />
      <span className="min-w-0 flex-1">
        <span className="block text-[13px] font-extrabold text-fg">
          {ORDER_RULES.promo.title} {ORDER_RULES.promo.subtitle.replace(/^на /, "на ")}
        </span>
        <span className="block text-[12px] text-fg-muted">
          промокод{" "}
          <span className="font-extrabold tracking-[0.05em] text-brand">
            {ORDER_RULES.promo.code}
          </span>
        </span>
      </span>
      <ChevronRight size={17} className="shrink-0 text-brand" strokeWidth={2.4} />
    </button>
  )
}
