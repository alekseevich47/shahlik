import { useEffect } from "react"
import { useLocation } from "react-router-dom"

/** Сброс скролла при смене маршрута. */
export function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [pathname])
  return null
}
