import { useEffect, useRef, useState } from "react"

type Options = {
  /** Отступ корня как в IntersectionObserver, например `"-124px 0px 0px 0px"`. */
  rootMargin?: string
  /** Значение до первого срабатывания наблюдателя. */
  initial?: boolean
}

/**
 * Виден ли элемент-маяк во вьюпорте. IntersectionObserver вместо `scroll` —
 * нет обработчика на каждом кадре и нет принудительных reflow.
 */
export function useInView<T extends Element>({ rootMargin, initial = true }: Options = {}) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(initial)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin, threshold: 0 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [rootMargin])

  return [ref, inView] as const
}
