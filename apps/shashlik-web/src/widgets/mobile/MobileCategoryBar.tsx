import { useEffect, useRef, useState } from "react"
import * as m from "motion/react-m"

import { CategoryTiles } from "@/widgets/catalog/CategoryTiles"
import { cn } from "@/shared/lib/cn"

/** Высота плавающей шапки категорий (mobile), без safe-area. */
export const MOBILE_CATEGORY_STICKY_H = 76

/** scroll-margin секций каталога: sticky + gap + safe-area (заголовок под шапкой). */
export const MOBILE_CATEGORY_SCROLL_MARGIN = `calc(${MOBILE_CATEGORY_STICKY_H + 8}px + env(safe-area-inset-top, 0px))`

type Props = {
  value: string
  onChange: (id: string) => void
  className?: string
}

/**
 * Inline-лента + плавная fixed-шапка, когда лента уходит из вида.
 */
export function MobileCategoryBar({ value, onChange, className }: Props) {
  const sentinelRef = useRef<HTMLDivElement>(null)
  const [pinned, setPinned] = useState(false)

  useEffect(() => {
    const node = sentinelRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setPinned(!entry.isIntersecting)
      },
      { threshold: 0, rootMargin: "-1px 0px 0px 0px" },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div ref={sentinelRef} className={cn("relative", className)} data-mobile-category-inline>
        <CategoryTiles value={value} onChange={onChange} />
      </div>

      <m.div
        aria-hidden={!pinned}
        initial={false}
        animate={{
          y: pinned ? 0 : -12,
          opacity: pinned ? 1 : 0,
          pointerEvents: pinned ? "auto" : "none",
        }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-40 border-b border-line bg-surface/95 pt-[env(safe-area-inset-top)] shadow-[var(--shadow-card)] backdrop-blur-xl lg:hidden"
      >
        <div className="py-2">
          <CategoryTiles value={value} onChange={onChange} edgeBleed={false} />
        </div>
      </m.div>
    </>
  )
}
