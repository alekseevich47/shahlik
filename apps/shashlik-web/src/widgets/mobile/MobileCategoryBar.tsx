import { useEffect, useRef, useState } from "react"
import * as m from "motion/react-m"

import { CategoryTiles } from "@/widgets/catalog/CategoryTiles"
import { cn } from "@/shared/lib/cn"

/** Высота плавающей шапки категорий (mobile). */
export const MOBILE_CATEGORY_STICKY_H = 76

type Props = {
  value: string
  onChange: (id: string) => void
  firstCategoryId?: string
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
        <div className="px-0 py-2">
          <CategoryTiles value={value} onChange={onChange} />
        </div>
      </m.div>
    </>
  )
}
