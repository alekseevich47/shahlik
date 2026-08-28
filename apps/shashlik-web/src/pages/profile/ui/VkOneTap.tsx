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

    let cancelled = false
    const frame = requestAnimationFrame(() => {
      void import("@/entities/account/vk-one-tap-session")
        .then(({ attachVkOneTap }) => {
          if (cancelled) return
          return attachVkOneTap(container, {
            onError: (message) => onErrorRef.current(message),
          })
        })
        .catch((err: unknown) => {
          if (!cancelled) {
            onErrorRef.current(err instanceof Error ? err.message : "VK ID недоступен")
          }
        })
    })

    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
    }
  }, [disabled])

  return <div ref={containerRef} className="min-h-11 w-full" />
}
