import { useEffect, useRef } from "react"

import { attachVkOneTap, detachVkOneTapHost } from "@/entities/account/vk-one-tap-session"

type VkOneTapProps = {
  disabled?: boolean
  onError: (message: string) => void
}

/** VK ID One Tap: callback mode, без редиректа основной вкладки. */
export function VkOneTap({ disabled, onError }: VkOneTapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const onErrorRef = useRef(onError)
  onErrorRef.current = onError

  useEffect(() => {
    const container = containerRef.current
    if (!container || disabled) return

    attachVkOneTap(container, {
      onError: (message) => onErrorRef.current(message),
    })

    return () => {
      detachVkOneTapHost()
    }
  }, [disabled])

  return <div ref={containerRef} className="min-h-11 w-full" />
}
