import type { ProductTag } from "@/entities/product/model"
import { TAG_FILTERS } from "@/shared/config/site"
import { cn } from "@/shared/lib/cn"
import { Chip } from "@/shared/ui/chip"

type Props = {
  value: ProductTag | "all"
  onChange: (tag: ProductTag | "all") => void
  className?: string
}

export function TagFilters({ value, onChange, className }: Props) {
  return (
    <div className={cn("scrollbar-none flex gap-2 overflow-x-auto", className)}>
      {TAG_FILTERS.map((filter) => (
        <Chip
          key={filter.id}
          active={filter.id === value}
          onClick={() => onChange(filter.id)}
        >
          {filter.label}
          {filter.emoji ? <span>{filter.emoji}</span> : null}
        </Chip>
      ))}
    </div>
  )
}
