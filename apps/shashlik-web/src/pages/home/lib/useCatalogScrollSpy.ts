import { useCallback, useEffect, useRef } from "react"

import { CATALOG_SCROLL_SPY_MARGIN, catalogSectionId } from "./catalogSection"
import { useVitrineScroll } from "./VitrineScroll"

const SCROLL_LOCK_FALLBACK_MS = 1200

type Options = {
  sectionIds: string[]
  activeCategory: string
  onCategoryChange: (id: string) => void
  enabled?: boolean
  /** Mobile sticky высота для spy rootMargin. */
  scrollMargin?: number
}

/**
 * Подсветка категории по скроллу секций каталога.
 * scrollToCategory временно блокирует spy — иначе промежуточные секции
 * перебивают выбор при программном скролле Lenis.
 */
export function useCatalogScrollSpy({
  sectionIds,
  activeCategory,
  onCategoryChange,
  enabled = true,
  scrollMargin,
}: Options) {
  const vitrineScroll = useVitrineScroll()
  const activeRef = useRef(activeCategory)
  const lockRef = useRef(false)
  const lockTimerRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    activeRef.current = activeCategory
  }, [activeCategory])

  const scrollToCategory = useCallback(
    (id: string) => {
      lockRef.current = true
      window.clearTimeout(lockTimerRef.current)

      const unlock = () => {
        lockRef.current = false
      }

      lockTimerRef.current = window.setTimeout(unlock, SCROLL_LOCK_FALLBACK_MS)

      const finish = () => {
        window.clearTimeout(lockTimerRef.current)
        unlock()
      }

      const node = document.getElementById(catalogSectionId(id))
      if (!node) {
        finish()
        return
      }

      // Заголовок секции — под sticky (CSS scroll-margin-top на секции).
      if (vitrineScroll) {
        vitrineScroll.scrollTo(node, {
          duration: 1,
          onComplete: finish,
        })
        return
      }

      node.scrollIntoView({ behavior: "smooth", block: "start" })
      finish()
    },
    [vitrineScroll],
  )

  useEffect(() => {
    if (!enabled || sectionIds.length === 0) return

    const visible = new Map<string, number>()
    const rootMargin =
      scrollMargin !== undefined
        ? `-${scrollMargin}px 0px -55% 0px`
        : CATALOG_SCROLL_SPY_MARGIN

    const pickActive = () => {
      if (lockRef.current || visible.size === 0) return
      const next = [...visible.entries()].sort((a, b) => a[1] - b[1])[0]?.[0]
      if (next && next !== activeRef.current) {
        activeRef.current = next
        onCategoryChange(next)
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.getAttribute("data-category-id")
          if (!id) continue
          if (entry.isIntersecting) visible.set(id, entry.boundingClientRect.top)
          else visible.delete(id)
        }
        pickActive()
      },
      { rootMargin, threshold: [0, 0.25, 0.5, 0.75, 1] },
    )

    for (const id of sectionIds) {
      const node = document.getElementById(catalogSectionId(id))
      if (node) observer.observe(node)
    }

    return () => {
      observer.disconnect()
      window.clearTimeout(lockTimerRef.current)
    }
  }, [sectionIds, onCategoryChange, enabled, scrollMargin])

  return { scrollToCategory }
}
