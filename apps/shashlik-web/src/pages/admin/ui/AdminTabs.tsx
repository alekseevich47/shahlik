import type { AdminTabId } from "@/pages/admin/model"
import { cn } from "@/shared/lib/cn"

type Props = {
  value: AdminTabId
  onChange: (tab: AdminTabId) => void
  counts: Record<AdminTabId, number>
}

const TABS: ReadonlyArray<{ id: AdminTabId; label: string }> = [
  { id: "products", label: "Товары" },
  { id: "categories", label: "Категории" },
  { id: "banners", label: "Баннеры" },
  { id: "addons", label: "Добавки" },
  { id: "orders", label: "Заказы" },
  { id: "reviews", label: "Отзывы" },
]

export function AdminTabs({ value, onChange, counts }: Props) {
  return (
    <div className="scrollbar-none flex gap-2 overflow-x-auto">
      {TABS.map((tab) => {
        const active = tab.id === value
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              "inline-flex h-9 shrink-0 cursor-pointer items-center gap-2 rounded-[var(--r-sm)] px-3.5",
              "text-[12.5px] font-bold transition-colors",
              active
                ? "bg-brand text-on-brand shadow-brand"
                : "border border-line bg-surface text-fg-muted hover:text-fg",
            )}
          >
            {tab.label}
            <span
              className={cn(
                "rounded-[5px] px-1.5 py-0.5 text-[10.5px] font-extrabold tabular-nums",
                active ? "bg-white/22" : "bg-surface-3 text-fg-faint",
              )}
            >
              {counts[tab.id]}
            </span>
          </button>
        )
      })}
    </div>
  )
}
