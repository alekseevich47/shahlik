import { AnimatePresence } from "motion/react"
import * as m from "motion/react-m"
import type { ReactNode } from "react"

import { cn } from "@/shared/lib/cn"

export type SortDir = "asc" | "desc"

export type Column<T> = {
  key: string
  header: string
  render: (row: T) => ReactNode
  className?: string
  sortable?: boolean
}

type Props<T> = {
  columns: Column<T>[]
  rows: T[]
  rowKey: (row: T) => string
  onRowClick?: (row: T) => void
  empty?: string
  sort?: { key: string; dir: SortDir }
  onSort?: (key: string) => void
  busy?: boolean
}

export function DataTable<T>({
  columns,
  rows,
  rowKey,
  onRowClick,
  empty = "Нет данных",
  sort,
  onSort,
  busy,
}: Props<T>) {
  if (!rows.length) {
    return (
      <p className="py-12 text-center text-[13px] font-semibold text-fg-muted">{empty}</p>
    )
  }

  return (
    <div
      className={cn(
        "scrollbar-slim overflow-x-auto transition-opacity duration-200",
        busy && "pointer-events-none opacity-60",
      )}
    >
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-line">
            {columns.map((column) => {
              const canSort = Boolean(column.sortable && onSort)
              const active = sort?.key === column.key
              return (
                <th
                  key={column.key}
                  className={cn(
                    "px-3 py-2.5 text-[11px] font-extrabold tracking-[0.04em] text-fg-muted uppercase",
                    column.className,
                  )}
                >
                  {canSort ? (
                    <button
                      type="button"
                      onClick={() => onSort?.(column.key)}
                      className={cn(
                        "inline-flex cursor-pointer items-center gap-1 uppercase transition-colors",
                        active ? "text-fg" : "hover:text-fg",
                      )}
                    >
                      {column.header}
                      {active ? (
                        <span aria-hidden className="text-[10px] normal-case">
                          {sort?.dir === "asc" ? "↑" : "↓"}
                        </span>
                      ) : null}
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          <AnimatePresence initial={false}>
            {rows.map((row) => (
              <m.tr
                key={rowKey(row)}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={cn(
                  "border-b border-line last:border-0 transition-colors",
                  onRowClick && "cursor-pointer hover:bg-surface-3",
                )}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={cn("px-3 py-2.5 text-[12.5px] text-fg-soft", column.className)}
                  >
                    {column.render(row)}
                  </td>
                ))}
              </m.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  )
}
