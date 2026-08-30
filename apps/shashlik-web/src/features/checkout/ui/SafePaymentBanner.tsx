import { ShieldCheck } from "lucide-react"

import { cn } from "@/shared/lib/cn"

type SafePaymentBannerProps = {
  visible: boolean
  className?: string
}

export function SafePaymentBanner({ visible, className }: SafePaymentBannerProps) {
  return (
    <div
      className={cn(
        "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
        visible ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        className,
      )}
      aria-hidden={!visible}
    >
      <div className="overflow-hidden">
        <div className="flex gap-3 rounded-[var(--r-md)] border border-success/25 bg-success/8 px-3.5 py-3">
          <ShieldCheck size={20} className="mt-0.5 shrink-0 text-success" strokeWidth={2.2} />
          <div className="min-w-0">
            <p className="text-[13px] font-extrabold text-fg">Безопасная оплата</p>
            <p className="mt-0.5 text-[11px] leading-snug font-medium text-fg-muted">
              Ваши данные защищены. Оплата проходит через защищённое соединение.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
