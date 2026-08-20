import { ChevronDown, ChevronUp } from "lucide-react"
import * as m from "motion/react-m"
import type { ReactNode } from "react"

import { cn } from "@/shared/lib/cn"
import { Button } from "@/shared/ui/button"

type Props<T> = {
  items: T[]
  keyOf: (item: T) => string
  onReorder: (next: T[]) => void
  renderItem: (item: T, index: number) => ReactNode
  className?: string
  disabled?: boolean
}

function move<T>(list: T[], from: number, to: number): T[] {
  if (to < 0 || to >= list.length) return list
  const next = list.slice()
  const [item] = next.splice(from, 1)
  next.splice(to, 0, item)
  return next
}

export function SortableList<T>({
  items,
  keyOf,
  onReorder,
  renderItem,
  className,
  disabled,
}: Props<T>) {
  return (
    <ul className={cn("flex flex-col gap-1.5", className)}>
      {items.map((item, index) => (
        <m.li
          key={keyOf(item)}
          layout
          className="flex items-center gap-2 rounded-[var(--r-md)] border border-line bg-surface-2 px-2 py-1.5"
        >
          <div className="flex shrink-0 flex-col">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="Выше"
              disabled={disabled || index === 0}
              className="size-7"
              onClick={() => onReorder(move(items, index, index - 1))}
            >
              <ChevronUp size={14} strokeWidth={2.5} />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="Ниже"
              disabled={disabled || index === items.length - 1}
              className="size-7"
              onClick={() => onReorder(move(items, index, index + 1))}
            >
              <ChevronDown size={14} strokeWidth={2.5} />
            </Button>
          </div>
          <div className="min-w-0 flex-1">{renderItem(item, index)}</div>
        </m.li>
      ))}
    </ul>
  )
}
