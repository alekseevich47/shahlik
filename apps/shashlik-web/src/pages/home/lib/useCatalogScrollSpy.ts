import { useCallback, useEffect, useRef } from "react"

import { CATALOG_SCROLL_MARGIN, CATALOG_SCROLL_SPY_MARGIN, catalogSectionId } from "./catalogSection"
import { useVitrineScroll } from "./VitrineScroll"

const SCROLL_LOCK_FALLBACK_MS = 1200

type Options = {
  sectionIds: string[]
  activeCategory: string
  onCategoryChange: (id: string) => void
  enabled?: boolean
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
      const node = document.getElementById(catalogSectionId(id))
      if (!node) return

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

      if (vitrineScroll) {
        vitrineScroll.scrollTo(node, {
          offset: -CATALOG_SCROLL_MARGIN,
          duration: 1,
          onComplete: finish,
        })
        return
      }

      node.scrollIntoView({ behavior: "smooth", block: "start" })
    },
    [vitrineScroll],
  )

  useEffect(() => {
    if (!enabled || sectionIds.length === 0) return

    const visible = new Map<string, number>()

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
      { rootMargin: CATALOG_SCROLL_SPY_MARGIN, threshold: [0, 0.25, 0.5, 0.75, 1] },
    )

    for (const id of sectionIds) {
      const node = document.getElementById(catalogSectionId(id))
      if (node) observer.observe(node)
    }

    return () => {
      observer.disconnect()
      window.clearTimeout(lockTimerRef.current)
    }
  }, [sectionIds, onCategoryChange, enabled])

  return { scrollToCategory }
}
