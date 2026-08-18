import { ChefHat } from "lucide-react"

import { cn } from "@/shared/lib/cn"

const TEXT = "• СВЕЖЕ ПРИГОТОВЛЕНО • СВЕЖЕ ПРИГОТОВЛЕНО "

/** Круглый штамп «свеже приготовлено» из макета карточки товара. */
export function FreshStamp({ className, size = 84 }: { className?: string; size?: number }) {
  const r = size / 2 - 9
  return (
    <div
      className={cn("relative shrink-0 text-fg-muted", className)}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <svg viewBox={`0 0 ${size} ${size}`} className="size-full animate-[spin_28s_linear_infinite]">
        <defs>
          <path
            id="fresh-stamp-path"
            d={`M ${size / 2} ${size / 2} m -${r} 0 a ${r} ${r} 0 1 1 ${r * 2} 0 a ${r} ${r} 0 1 1 -${r * 2} 0`}
            fill="none"
          />
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 1}
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.35"
        />
        <text fontSize={size * 0.088} fontWeight={800} letterSpacing="0.9" fill="currentColor">
          <textPath href="#fresh-stamp-path">{TEXT}</textPath>
        </text>
      </svg>
      <ChefHat
        size={size * 0.3}
        strokeWidth={1.7}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  )
}
