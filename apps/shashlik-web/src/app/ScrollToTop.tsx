import { useEffect } from "react"
import { useLocation, useNavigationType } from "react-router-dom"

import { backgroundOf } from "@/shared/lib/background-location"

/** Сброс скролла при смене маршрута. Модалка PDP и POP не трогают позицию. */
export function ScrollToTop() {
  const location = useLocation()
  const navigationType = useNavigationType()

  useEffect(() => {
    if (backgroundOf(location)) return
    if (navigationType === "POP") return
    window.scrollTo({ top: 0 })
  }, [location, navigationType])

  return null
}
