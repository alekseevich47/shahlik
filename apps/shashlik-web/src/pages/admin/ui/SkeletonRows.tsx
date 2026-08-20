import { cn } from "@/shared/lib/cn"

type Props = {
  rows?: number
  cols?: number
  className?: string
}

export function SkeletonRows({ rows = 5, cols = 4, className }: Props) {
  return (
    <div className={cn("flex flex-col gap-2", className)} aria-hidden>
      {Array.from({ length: rows }, (_, row) => (
        <div
          key={row}
          className="grid gap-3 rounded-[var(--r-sm)] border border-line bg-surface-2 px-3 py-3"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: cols }, (_, col) => (
            <div
              key={col}
              className="h-3 animate-pulse rounded-sm bg-surface-3"
              style={{ width: `${55 + ((row + col) % 4) * 10}%` }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
