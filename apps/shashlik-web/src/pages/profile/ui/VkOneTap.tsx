import { useEffect, useRef } from "react"

type VkOneTapProps = {
  disabled?: boolean
  onError: (message: string) => void
}

/** VK ID One Tap: SDK грузится отдельным чанком, чтобы не ронять /profile в prod. */
export function VkOneTap({ disabled, onError }: VkOneTapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const onErrorRef = useRef(onError)
  onErrorRef.current = onError

  useEffect(() => {
    const container = containerRef.current
    if (!container || disabled) return

    let active = true
    let detach: (() => void) | null = null

    const timer = window.setTimeout(() => {
      void import("@/entities/account/vk-one-tap-session")
        .then((session) => {
          detach = session.detachVkOneTap
          if (!active) return
          return session.attachVkOneTap(container, {
            onError: (message) => onErrorRef.current(message),
          })
        })
        .catch((err: unknown) => {
          if (active) {
            onErrorRef.current(err instanceof Error ? err.message : "VK ID недоступен")
          }
        })
    }, 50)

    return () => {
      active = false
      window.clearTimeout(timer)
      detach?.()
    }
  }, [disabled])

  return <div ref={containerRef} className="min-h-11 w-full" />
}
