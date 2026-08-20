import { ChefHat } from "lucide-react"

import { cn } from "@/shared/lib/cn"

const STAMP_GLYPHS = Array.from("СДЕЛАНО С ЛЮБОВЬ • 100% СВЕЖИЕ ПРОДУКТЫ • ")

/** Круглый штамп: глифы равномерно по окружности, колпак — круиз / рывок / плавный выбег. */
export function FreshStamp({ className, size = 112 }: { className?: string; size?: number }) {
  const cx = size / 2
  const cy = size / 2
  const r = size / 2 - 9
  const fontSize = ((2 * Math.PI * r) / STAMP_GLYPHS.length) * 1.35

  return (
    <div
      className={cn("relative shrink-0 select-none text-fg-muted [&_*]:select-none", className)}
      style={{ width: size, height: size, userSelect: "none" }}
      aria-hidden
      onMouseDown={(e) => e.preventDefault()}
    >
      <svg viewBox={`0 0 ${size} ${size}`} className="animate-fresh-ring size-full">
        <circle
          cx={cx}
          cy={cy}
          r={size / 2 - 1}
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.35"
        />
        {STAMP_GLYPHS.map((glyph, i) => {
          const angle = (i / STAMP_GLYPHS.length) * 360
          return (
            <text
              key={i}
              x={cx}
              y={cy - r}
              transform={`rotate(${angle} ${cx} ${cy})`}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={fontSize}
              fontWeight={800}
              fill="currentColor"
            >
              {glyph}
            </text>
          )
        })}
      </svg>
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <span className="animate-chef-hat block">
          <ChefHat size={size * 0.32} strokeWidth={1.7} />
        </span>
      </span>
    </div>
  )
}
