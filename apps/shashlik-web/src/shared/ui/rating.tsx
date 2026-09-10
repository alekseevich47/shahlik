import { Star } from "lucide-react"

import { cn } from "@/shared/lib/cn"

/**
 * Цвет числовой оценки: красный → жёлтый → зелёный.
 * На шкале 0–5 зелёная зона ≈ 4–5.
 */
export function scoreColor(value: number, max: number = 5): string {
  const t = Math.min(Math.max(value / max, 0), 1)
  const hue = 4 + t * t * 118
  const sat = 62 - t * 14
  const light = 44 - t * 6
  return `hsl(${hue.toFixed(0)} ${sat.toFixed(0)}% ${light.toFixed(0)}%)`
}

export function ScoreValue({
  value,
  max = 5,
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

function StarGlyph({
  fill,
  size,
}: {
  fill: number
  size: number
}) {
  return (
    <span className="relative inline-block" style={{ width: size, height: size }}>
      <Star size={size} className="absolute inset-0 text-star-empty" fill="currentColor" strokeWidth={0} />
      {fill > 0 ? (
        <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
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
}

/** Пять звёзд с шагом ½ (или 0.1 при дробном value). */
export function Stars({
  value,
  max = 5,
  size = 15,
  className,
  interactive,
  onChange,
}: {
  value: number
  max?: number
  size?: number
  className?: string
  interactive?: boolean
  onChange?: (next: number) => void
}) {
  return (
    <span
      className={cn("inline-flex items-center gap-[3px]", className)}
      aria-hidden={!interactive}
      role={interactive ? "radiogroup" : undefined}
    >
      {Array.from({ length: max }, (_, i) => {
        const fill = Math.min(Math.max(value - i, 0), 1)
        const starValue = i + 1
        if (!interactive || !onChange) {
          return <StarGlyph key={i} fill={fill} size={size} />
        }
        return (
          <button
            key={i}
            type="button"
            role="radio"
            aria-checked={Math.round(value) === starValue}
            aria-label={`${starValue} из ${max}`}
            className="cursor-pointer rounded-sm p-0.5 transition-transform hover:scale-110"
            onClick={() => onChange(Math.round(value) === starValue ? 0 : starValue)}
          >
            <StarGlyph fill={fill} size={size} />
          </button>
        )
      })}
    </span>
  )
}

/** Ряд: n заполненных + (5−n) контурных звёзд. */
export function StarsOutlineRow({
  filled,
  max = 5,
  size = 12,
  className,
}: {
  filled: number
  max?: number
  size?: number
  className?: string
}) {
  const n = Math.min(Math.max(Math.round(filled), 0), max)
  return (
    <span className={cn("inline-flex items-center gap-[2px]", className)} aria-hidden>
      {Array.from({ length: max }, (_, i) => (
        <Star
          key={i}
          size={size}
          className={i < n ? "text-gold" : "text-star-empty"}
          fill={i < n ? "currentColor" : "none"}
          strokeWidth={i < n ? 0 : 1.6}
        />
      ))}
    </span>
  )
}
