import { ChevronRight, Gift } from "lucide-react"

import { cn } from "@/shared/lib/cn"

export type PromoBannerData = {
  title: string
  subtitle: string
  code: string
}

export function PromoBanner({
  title,
  subtitle,
  code,
  className,
  onClick,
}: PromoBannerData & {
  className?: string
  onClick?: () => void
}) {
  if (!title.trim()) return null

  const sub = subtitle.replace(/^на /, "на ")
  const codeTrim = code.trim()

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
          {title} {sub}
        </span>
        {codeTrim ? (
          <span className="block text-[12px] text-fg-muted">
            {/^[A-Z0-9_-]+$/i.test(codeTrim) ? (
              <>
                промокод{" "}
                <span className="font-extrabold tracking-[0.05em] text-brand">{codeTrim}</span>
              </>
            ) : (
              <span className="font-extrabold text-brand">{codeTrim}</span>
            )}
          </span>
        ) : null}
      </span>
      <ChevronRight size={17} className="shrink-0 text-brand" strokeWidth={2.4} />
    </button>
  )
}
