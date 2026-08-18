import type { ReactNode } from "react"

import { cn } from "@/shared/lib/cn"

export type Column<T> = {
  key: string
  header: string
  render: (row: T) => ReactNode
  className?: string
}

type Props<T> = {
  columns: Column<T>[]
  rows: T[]
  rowKey: (row: T) => string
  onRowClick?: (row: T) => void
  empty?: string
}

export function DataTable<T>({
  columns,
  rows,
  rowKey,
  onRowClick,
  empty = "Нет данных",
}: Props<T>) {
  if (!rows.length) {
    return (
      <p className="py-12 text-center text-[13px] font-semibold text-fg-muted">{empty}</p>
    )
  }

  return (
    <div className="scrollbar-slim overflow-x-auto">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-line">
            {columns.map((column) => (
              <th
                key={column.key}
                className={cn(
                  "px-3 py-2.5 text-[11px] font-extrabold tracking-[0.04em] text-fg-muted uppercase",
                  column.className,
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={rowKey(row)}
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
