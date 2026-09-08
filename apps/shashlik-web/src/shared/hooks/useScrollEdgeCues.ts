import { useCallback, useEffect, useRef, useState, type RefObject } from "react"

const EDGE_EPS = 0.5
const PEEK_PX = 28
const PAGE_FRACTION = 0.55
const ANIM_MS = 220

type EdgeSide = "left" | "right"

type Edges = {
  canScrollLeft: boolean
  canScrollRight: boolean
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function clampScroll(el: HTMLElement, left: number) {
  const max = Math.max(0, el.scrollWidth - el.clientWidth)
  return Math.min(max, Math.max(0, left))
}

function readEdges(el: HTMLElement): Edges {
  const max = el.scrollWidth - el.clientWidth
  if (max <= EDGE_EPS) {
    return { canScrollLeft: false, canScrollRight: false }
  }
  return {
    canScrollLeft: el.scrollLeft > EDGE_EPS,
    canScrollRight: el.scrollLeft < max - EDGE_EPS,
  }
}

/**
 * Edge-стрелки для горизонтальной ленты: overflow-флаги + hover-peek с откатом
 * и page-scroll по клику. Анимация scrollLeft через rAF (без scroll-behavior на html).
 */
export function useScrollEdgeCues(scrollRef: RefObject<HTMLElement | null>) {
  const [edges, setEdges] = useState<Edges>({
    canScrollLeft: false,
    canScrollRight: false,
  })

  const baselineRef = useRef(0)
  const committedRef = useRef(false)
  const peekSideRef = useRef<EdgeSide | null>(null)
  const rafRef = useRef(0)

  const syncEdges = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const next = readEdges(el)
    setEdges((prev) =>
      prev.canScrollLeft === next.canScrollLeft && prev.canScrollRight === next.canScrollRight
        ? prev
        : next,
    )
  }, [scrollRef])

  const cancelAnim = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = 0
    }
  }, [])

  const animateTo = useCallback(
    (target: number, onDone?: () => void) => {
      const el = scrollRef.current
      if (!el) return

      cancelAnim()
      const dest = clampScroll(el, target)

      if (prefersReducedMotion()) {
        el.scrollLeft = dest
        syncEdges()
        onDone?.()
        return
      }

      const from = el.scrollLeft
      const delta = dest - from
      if (Math.abs(delta) < 0.5) {
        syncEdges()
        onDone?.()
        return
      }

      const start = performance.now()

      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / ANIM_MS)
        // ease-out-soft ≈ cubic-bezier(0.22, 1, 0.36, 1) — аппроксимация easeOutCubic
        const eased = 1 - (1 - t) ** 3
        el.scrollLeft = from + delta * eased
        if (t < 1) {
          rafRef.current = requestAnimationFrame(tick)
          return
        }
        rafRef.current = 0
        el.scrollLeft = dest
        syncEdges()
        onDone?.()
      }

      rafRef.current = requestAnimationFrame(tick)
    },
    [cancelAnim, scrollRef, syncEdges],
  )

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const update = () => syncEdges()

    const ro = new ResizeObserver(update)
    ro.observe(el)
    for (const child of el.children) ro.observe(child)

    const mo = new MutationObserver(() => {
      for (const child of el.children) ro.observe(child)
      update()
    })
    mo.observe(el, { childList: true })

    el.addEventListener("scroll", update, { passive: true })
    update()

    return () => {
      cancelAnim()
      ro.disconnect()
      mo.disconnect()
      el.removeEventListener("scroll", update)
    }
  }, [cancelAnim, scrollRef, syncEdges])

  const onPeekEnter = useCallback(
    (side: EdgeSide) => {
      const el = scrollRef.current
      if (!el) return

      committedRef.current = false
      peekSideRef.current = side
      baselineRef.current = el.scrollLeft

      if (prefersReducedMotion()) return

      const delta = side === "left" ? -PEEK_PX : PEEK_PX
      animateTo(baselineRef.current + delta)
    },
    [animateTo, scrollRef],
  )

  const onPeekLeave = useCallback(() => {
    if (committedRef.current || peekSideRef.current === null) {
      peekSideRef.current = null
      return
    }
    peekSideRef.current = null
    animateTo(baselineRef.current)
  }, [animateTo])

  const onPageScroll = useCallback(
    (side: EdgeSide) => {
      const el = scrollRef.current
      if (!el) return

      const origin = peekSideRef.current !== null ? baselineRef.current : el.scrollLeft
      committedRef.current = true
      peekSideRef.current = null

      const page = Math.max(80, el.clientWidth * PAGE_FRACTION)
      const delta = side === "left" ? -page : page
      animateTo(origin + delta)
    },
    [animateTo, scrollRef],
  )

  return {
    canScrollLeft: edges.canScrollLeft,
    canScrollRight: edges.canScrollRight,
    onPeekEnter,
    onPeekLeave,
    onPageScroll,
  }
}
