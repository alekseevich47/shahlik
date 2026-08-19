import type { ComponentProps, ReactNode } from "react"

import { cn } from "@/shared/lib/cn"

/** id карты преломления; должен совпадать с `filter: url(...)` в globals.css. */
export const GLASS_FILTER_ID = "glass-refraction"

/**
 * Карта шума для преломления стекла. Монтируется один раз в `App`:
 * `filter: url(#glass-refraction)` ссылается на неё по документу.
 */
export function GlassDefs() {
  return (
    <svg aria-hidden focusable="false" className="pointer-events-none absolute size-0">
      <defs>
        <filter
          id={GLASS_FILTER_ID}
          x="-15%"
          y="-40%"
          width="130%"
          height="180%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.009 0.013"
            numOctaves="2"
            seed="7"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="2.4" result="softNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="softNoise"
            scale="26"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  )
}

type GlassProps = Omit<ComponentProps<"div">, "children"> & {
  contentClassName?: string
  children: ReactNode
}

/**
 * Стеклянная поверхность: преломлённая подложка → тон → внутренний блик → контент.
 * Слои разделены, потому что backdrop-filter нельзя смешать с фоном на одном узле.
 */
export function Glass({ className, contentClassName, children, ...props }: GlassProps) {
  return (
    <div className={cn("glass", className)} {...props}>
      <span aria-hidden className="glass-refract" />
      <span aria-hidden className="glass-tint" />
      <span aria-hidden className="glass-shine" />
      <div className={cn("glass-content", contentClassName)}>{children}</div>
    </div>
  )
}
