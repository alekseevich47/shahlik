import { useEffect, useRef, type RefObject } from "react"

/**
 * Горизонтальный nested-scroll без глушения вертикали страницы (Lenis / native).
 * Wheel: перехватываем только при доминирующем deltaX (или Shift) и если лента
 * реально может сдвинуться.
 * Touch: нативная инерция через `touch-action: pan-x` (без preventDefault / ручного scrollLeft).
 */
export function useAxisLockedHorizontalScroll<T extends HTMLElement>(): RefObject<T | null> {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    el.style.touchAction = "pan-x"
    ;(el.style as CSSStyleDeclaration & { webkitOverflowScrolling?: string }).webkitOverflowScrolling =
      "touch"

    const canScrollBy = (delta: number) => {
      const max = el.scrollWidth - el.clientWidth
      if (max <= 0) return false
      if (delta > 0) return el.scrollLeft < max - 0.5
      if (delta < 0) return el.scrollLeft > 0.5
      return false
    }

    const onWheel = (event: WheelEvent) => {
      const dominantX = Math.abs(event.deltaX) > Math.abs(event.deltaY)
      const shiftVertical = event.shiftKey && !dominantX
      if (!dominantX && !shiftVertical) return

      const delta = shiftVertical ? event.deltaY : event.deltaX
      if (!canScrollBy(delta)) return

      event.preventDefault()
      el.scrollLeft += delta
    }

    el.addEventListener("wheel", onWheel, { passive: false })

    return () => {
      el.removeEventListener("wheel", onWheel)
    }
  }, [])

  return ref
}
