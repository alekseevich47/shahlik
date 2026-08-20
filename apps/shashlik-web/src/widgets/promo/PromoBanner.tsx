import { ChevronRight, Gift } from "lucide-react"

import { useSettings } from "@/entities/settings/api"
import { settingsFallback } from "@/entities/settings/model"
import { cn } from "@/shared/lib/cn"

export function PromoBanner({
  className,
  onClick,
}: {
  className?: string
  onClick?: () => void
}) {
  const { data: settings = settingsFallback() } = useSettings()
  const subtitle = settings.promoSubtitle.replace(/^на /, "на ")

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
          {settings.promoTitle} {subtitle}
        </span>
        <span className="block text-[12px] text-fg-muted">
          промокод{" "}
          <span className="font-extrabold tracking-[0.05em] text-brand">
            {settings.promoCode}
          </span>
        </span>
      </span>
      <ChevronRight size={17} className="shrink-0 text-brand" strokeWidth={2.4} />
    </button>
  )
}
