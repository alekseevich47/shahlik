import { useEffect, useRef, type RefObject } from "react"

const LOCK_THRESHOLD_PX = 7

type AxisLock = "x" | "y" | null

/**
 * Горизонтальный nested-scroll без глушения вертикали страницы (Lenis / native).
 * Wheel: перехватываем только при доминирующем deltaX (или Shift) и если лента
 * реально может сдвинуться. Touch: после порога лочим ось — X двигает scrollLeft,
 * Y отпускаем жест странице.
 */
export function useAxisLockedHorizontalScroll<T extends HTMLElement>(): RefObject<T | null> {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

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

    let lock: AxisLock = null
    let startX = 0
    let startY = 0
    let lastX = 0

    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) return
      const touch = event.touches[0]
      startX = lastX = touch.clientX
      startY = touch.clientY
      lock = null
    }

    const onTouchMove = (event: TouchEvent) => {
      if (event.touches.length !== 1) return
      const touch = event.touches[0]
      const dx = touch.clientX - startX
      const dy = touch.clientY - startY

      if (!lock) {
        if (Math.abs(dx) < LOCK_THRESHOLD_PX && Math.abs(dy) < LOCK_THRESHOLD_PX) return
        lock = Math.abs(dx) >= Math.abs(dy) ? "x" : "y"
      }

      if (lock === "y") return

      const step = lastX - touch.clientX
      lastX = touch.clientX
      if (!canScrollBy(step)) return

      event.preventDefault()
      el.scrollLeft += step
    }

    const onTouchEnd = () => {
      lock = null
    }

    el.addEventListener("wheel", onWheel, { passive: false })
    el.addEventListener("touchstart", onTouchStart, { passive: true })
    el.addEventListener("touchmove", onTouchMove, { passive: false })
    el.addEventListener("touchend", onTouchEnd, { passive: true })
    el.addEventListener("touchcancel", onTouchEnd, { passive: true })

    return () => {
      el.removeEventListener("wheel", onWheel)
      el.removeEventListener("touchstart", onTouchStart)
      el.removeEventListener("touchmove", onTouchMove)
      el.removeEventListener("touchend", onTouchEnd)
      el.removeEventListener("touchcancel", onTouchEnd)
    }
  }, [])

  return ref
}
