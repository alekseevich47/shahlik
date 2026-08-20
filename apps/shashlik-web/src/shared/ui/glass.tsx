import type { ComponentProps, ReactNode } from "react"

import { cn } from "@/shared/lib/cn"

/** id карты преломления; должен совпадать с `filter: url(...)` в globals.css. */
export const GLASS_FILTER_ID = "glass-refraction"

/** Сторона тайла `glass-noise.png`; менять только вместе с `SIZE` в генераторе. */
const NOISE_TILE = 256

/**
 * Карта шума для преломления стекла. Монтируется один раз в `App`:
 * `filter: url(#glass-refraction)` ссылается на неё по документу.
 *
 * Карта — готовый бесшовный тайл (`scripts/gen-glass-noise.mjs`), а не
 * `feTurbulence`: Chromium растеризует SVG-фильтры на CPU и пересчитывает
 * турбулентность при каждой смене области фильтра, то есть на каждом кадре
 * скролла и раскрытия плашки. feImage + feTile — это блиты по готовой битмапе.
 *
 * Область фильтра держим минимальной: она умножается на площадь растеризации
 * каждый кадр. Смещение не превышает `scale/2`, запаса в несколько процентов
 * от бокса хватает.
 */
export function GlassDefs() {
  return (
    <svg aria-hidden focusable="false" className="pointer-events-none absolute size-0">
      <defs>
        <filter
          id={GLASS_FILTER_ID}
          x="-3%"
          y="-14%"
          width="106%"
          height="128%"
          colorInterpolationFilters="sRGB"
        >
          <feImage
            href="/pattern/glass-noise.png"
            x="0"
            y="0"
            width={NOISE_TILE}
            height={NOISE_TILE}
            preserveAspectRatio="none"
            result="tile"
          />
          <feTile in="tile" result="noise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="20"
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
