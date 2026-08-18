import { MapPin } from "lucide-react"
import { toast } from "sonner"

import { SITE } from "@/shared/config/site"
import { cn } from "@/shared/lib/cn"

export function AddressBar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 rounded-[var(--r-md)] border border-line bg-surface-2 px-3 py-2.5",
        className,
      )}
    >
      <MapPin size={17} className="shrink-0 text-brand" strokeWidth={2.3} />
      <span className="min-w-0 flex-1 leading-tight">
        <span className="block truncate text-[13px] font-bold text-fg">{SITE.address}</span>
        <span className="block truncate text-[11px] text-fg-muted">
          Доставка {SITE.deliveryFrom}
        </span>
      </span>
      <button
        type="button"
        onClick={() => toast("Смена адреса появится после интеграции с картой")}
        className="shrink-0 cursor-pointer text-[12px] font-bold text-brand"
      >
        Изменить
      </button>
    </div>
  )
}
