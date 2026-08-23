import { ChevronDown, ChevronUp, GripVertical } from "lucide-react"
import * as m from "motion/react-m"
import { useState, type DragEvent, type ReactNode } from "react"

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
  if (from === to || to < 0 || to >= list.length) return list
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
  const [dragFrom, setDragFrom] = useState<number | null>(null)
  const [overIndex, setOverIndex] = useState<number | null>(null)

  function clearDrag() {
    setDragFrom(null)
    setOverIndex(null)
  }

  function onDragStart(index: number, e: DragEvent) {
    if (disabled) return
    setDragFrom(index)
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("text/plain", String(index))
  }

  function onDragOver(index: number, e: DragEvent) {
    if (disabled || dragFrom === null) return
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
    if (overIndex !== index) setOverIndex(index)
  }

  function onDrop(index: number, e: DragEvent) {
    e.preventDefault()
    if (disabled || dragFrom === null) {
      clearDrag()
      return
    }
    onReorder(move(items, dragFrom, index))
    clearDrag()
  }

  return (
    <ul className={cn("flex flex-col gap-1.5", className)}>
      {items.map((item, index) => {
        const isDragging = dragFrom === index
        const isOver = overIndex === index && dragFrom !== null && dragFrom !== index
        return (
          <m.li
            key={keyOf(item)}
            layout
            transition={{ type: "spring", stiffness: 520, damping: 38, mass: 0.65 }}
            onDragOver={(e) => onDragOver(index, e)}
            onDrop={(e) => onDrop(index, e)}
            onDragEnd={clearDrag}
            className={cn(
              "flex items-center gap-2 rounded-[var(--r-md)] border bg-surface-2 px-2 py-1.5 transition-colors",
              isDragging && "border-brand bg-brand-soft/35 opacity-60",
              isOver && "border-brand bg-brand-soft/20",
              !isDragging && !isOver && "border-line",
            )}
          >
            <button
              type="button"
              draggable={!disabled}
              aria-label="Перетащить"
              disabled={disabled}
              className="shrink-0 cursor-grab touch-none text-fg-faint active:cursor-grabbing disabled:cursor-not-allowed disabled:opacity-40"
              onDragStart={(e) => onDragStart(index, e)}
              onDragEnd={clearDrag}
            >
              <GripVertical size={16} strokeWidth={2.2} />
            </button>
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
        )
      })}
    </ul>
  )
}
