import Lenis from "lenis"
import { createContext, useContext, useEffect, useMemo, useRef, type ReactNode } from "react"

type VitrineScrollTarget = number | string | HTMLElement

type ScrollOptions = {
  offset?: number
  duration?: number
  onComplete?: () => void
}

export type VitrineScrollApi = {
  scrollTo: (target: VitrineScrollTarget, options?: ScrollOptions) => void
  scrollToTop: (options?: Pick<ScrollOptions, "onComplete">) => void
}

const VitrineScrollContext = createContext<VitrineScrollApi | null>(null)

const LENIS_OPTIONS = {
  /** Небольшая инерция: ниже дефолта 0.1, но без «ватного» хвоста. */
  lerp: 0.088,
  smoothWheel: true,
  syncTouch: false,
  wheelMultiplier: 0.9,
  autoRaf: true,
  respectReducedMotion: true,
} as const

type Props = {
  children: ReactNode
  /** Sheet/диалог — нативный lock скролла, Lenis останавливаем синхронно. */
  paused?: boolean
}

export function VitrineScrollProvider({ children, paused = false }: Props) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis(LENIS_OPTIONS)
    lenisRef.current = lenis
    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  useEffect(() => {
    const lenis = lenisRef.current
    if (!lenis) return
    if (paused) lenis.stop()
    else lenis.start()
  }, [paused])

  const api = useMemo<VitrineScrollApi>(
    () => ({
      scrollTo: (target, options) => {
        const lenis = lenisRef.current
        const onComplete = options?.onComplete

        if (!lenis) {
          if (typeof target === "number") {
            window.scrollTo({ top: target, behavior: "smooth" })
          } else if (target instanceof HTMLElement) {
            target.scrollIntoView({ behavior: "smooth", block: "start" })
          }
          onComplete?.()
          return
        }

        lenis.scrollTo(target, {
          offset: options?.offset ?? 0,
          duration: options?.duration ?? 1,
          onComplete: () => onComplete?.(),
        })
      },
      scrollToTop: (options) => {
        const lenis = lenisRef.current
        const onComplete = options?.onComplete

        if (!lenis) {
          window.scrollTo({ top: 0, behavior: "smooth" })
          onComplete?.()
          return
        }

        lenis.scrollTo(0, {
          duration: 0.85,
          onComplete: () => onComplete?.(),
        })
      },
    }),
    [],
  )

  return <VitrineScrollContext.Provider value={api}>{children}</VitrineScrollContext.Provider>
}

export function useVitrineScroll() {
  return useContext(VitrineScrollContext)
}
