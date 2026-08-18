import { Star } from "lucide-react"

import { cn } from "@/shared/lib/cn"

/**
 * Цвет числовой оценки: красный → жёлтый → зелёный.
 * Совпадает с макетом: 8–9.5/10 попадают в зелёную зону.
 */
export function scoreColor(value: number, max: number): string {
  const t = Math.min(Math.max(value / max, 0), 1)
  const hue = 4 + t * t * 118
  const sat = 62 - t * 14
  const light = 44 - t * 6
  return `hsl(${hue.toFixed(0)} ${sat.toFixed(0)}% ${light.toFixed(0)}%)`
}

export function ScoreValue({
  value,
  max = 10,
  className,
}: {
  value: number
  max?: number
  className?: string
}) {
  return (
    <span
      className={cn("font-extrabold tabular-nums", className)}
      style={{ color: scoreColor(value, max) }}
    >
      {Number(value.toFixed(1))}/{max}
    </span>
  )
}

/** Пять звёзд с шагом ½. */
export function Stars({
  value,
  max = 5,
  size = 15,
  className,
}: {
  value: number
  max?: number
  size?: number
  className?: string
}) {
  return (
    <span className={cn("inline-flex items-center gap-[3px]", className)} aria-hidden>
      {Array.from({ length: max }, (_, i) => {
        const fill = Math.min(Math.max(value - i, 0), 1)
        return (
          <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
            <Star size={size} className="absolute inset-0 text-star-empty" fill="currentColor" strokeWidth={0} />
            {fill > 0 ? (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fill * 100}%` }}
              >
                <Star
                  size={size}
                  className="text-gold"
                  fill="currentColor"
                  strokeWidth={0}
                  style={{ minWidth: size }}
                />
              </span>
            ) : null}
          </span>
        )
      })}
    </span>
  )
}
