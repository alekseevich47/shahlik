import { Plus, Search } from "lucide-react"
import { useDeferredValue, useEffect, useRef, useState, type ReactNode } from "react"

import { cn } from "@/shared/lib/cn"
import { Button } from "@/shared/ui/button"
import { Chip } from "@/shared/ui/chip"
import { Input } from "@/shared/ui/input"

export type ToolbarFilter = {
  id: string
  label: string
}

type Props = {
  searchPlaceholder?: string
  /** Вызывается с отложенным значением поиска (`useDeferredValue`). */
  onSearchChange?: (query: string) => void
  filters?: ToolbarFilter[]
  activeFilter?: string
  onFilterChange?: (id: string) => void
  createLabel?: string
  onCreate?: () => void
  actions?: ReactNode
  className?: string
}

export function Toolbar({
  searchPlaceholder = "Поиск…",
  onSearchChange,
  filters,
  activeFilter,
  onFilterChange,
  createLabel = "Создать",
  onCreate,
  actions,
  className,
}: Props) {
  const [query, setQuery] = useState("")
  const deferredQuery = useDeferredValue(query)
  const onSearchRef = useRef(onSearchChange)
  onSearchRef.current = onSearchChange

  useEffect(() => {
    onSearchRef.current?.(deferredQuery)
  }, [deferredQuery])

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-[200px] flex-1">
          <Search
            size={16}
            strokeWidth={2.4}
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-fg-faint"
          />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="pl-9"
            aria-label="Поиск"
          />
        </div>
        {actions}
        {onCreate ? (
          <Button variant="soft" size="sm" onClick={onCreate}>
            <Plus size={16} strokeWidth={2.5} />
            {createLabel}
          </Button>
        ) : null}
      </div>
      {filters?.length ? (
        <div className="flex flex-wrap gap-1.5">
          {filters.map((filter) => (
            <Chip
              key={filter.id}
              active={activeFilter === filter.id}
              onClick={() => onFilterChange?.(filter.id)}
            >
              {filter.label}
            </Chip>
          ))}
        </div>
      ) : null}
    </div>
  )
}
