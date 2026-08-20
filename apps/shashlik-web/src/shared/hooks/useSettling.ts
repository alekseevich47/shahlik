import { useEffect, useRef, useState } from "react"

/** Самый длинный переход витрины — 0.55s (треки сайдбара/корзины). */
const DEFAULT_DURATION = 600

/**
 * `true`, пока идёт переход, вызванный сменой `key`. Нужен, чтобы включать
 * дорогие эффекты только в покое: преломление стекла и `will-change` стоят
 * дорого именно на кадрах анимации, а не в статике.
 *
 * `key` — строка состояния, а не объект: сравнение идёт по значению.
 */
export function useSettling(key: string, duration = DEFAULT_DURATION) {
  const [settling, setSettling] = useState(false)
  const mounted = useRef(false)

  useEffect(() => {
    // Первый рендер — не переход, а начальное состояние.
    if (!mounted.current) {
      mounted.current = true
      return
    }

    setSettling(true)
    const timer = window.setTimeout(() => setSettling(false), duration)
    return () => window.clearTimeout(timer)
  }, [key, duration])

  return settling
}
