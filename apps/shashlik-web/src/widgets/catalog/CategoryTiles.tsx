import { LayoutGrid } from "lucide-react"

import { categories } from "@/mocks/categories"
import { cn } from "@/shared/lib/cn"

type Props = {
  value: string
  onChange: (id: string) => void
  className?: string
}

/** Мобильная лента категорий: квадратные плитки с иконкой и подписью. */
export function CategoryTiles({ value, onChange, className }: Props) {
  return (
    <div className={cn("scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4", className)}>
      {categories.map((category) => {
        const active = category.id === value
        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onChange(category.id)}
            className={cn(
              "flex w-[70px] shrink-0 cursor-pointer flex-col items-center gap-1 rounded-[var(--r-md)] border px-1 py-2",
              "transition-all duration-200",
              active
                ? "border-brand-border bg-brand-soft text-brand"
                : "border-line bg-surface text-fg-muted",
            )}
          >
            {category.icon ? (
              <img
                src={category.icon}
                alt=""
                aria-hidden
                className={cn(
                  "size-6 object-contain",
                  active ? "opacity-100" : "opacity-45 grayscale",
                )}
              />
            ) : (
              <LayoutGrid size={22} strokeWidth={2} />
            )}
            <span className="w-full truncate text-center text-[10.5px] font-bold">
              {category.name}
            </span>
          </button>
        )
      })}
    </div>
  )
}
