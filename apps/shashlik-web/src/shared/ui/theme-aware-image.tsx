import { useEffect, useRef, useState, type ImgHTMLAttributes } from "react"

import { useTheme } from "@/app/providers/theme"
import { cn } from "@/shared/lib/cn"
import { oppositeThemeSrc, resolveThemeSrc } from "@/shared/lib/theme-image"

type ThemeAwareImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  lightSrc: string
  darkSrc?: string
}

function prefetch(url: string) {
  if (!url || typeof window === "undefined") return
  const img = new Image()
  img.src = url
}

function scheduleIdle(fn: () => void): () => void {
  if (typeof window === "undefined") return () => {}
  const ric = window.requestIdleCallback?.bind(window)
  if (ric) {
    const id = ric(() => fn(), { timeout: 2000 })
    return () => window.cancelIdleCallback?.(id)
  }
  const id = window.setTimeout(fn, 400)
  return () => window.clearTimeout(id)
}

/**
 * Фото под тему: light / optional dark.
 * Prefetch opposite на idle; смена темы — короткий fade без page-loader.
 */
export function ThemeAwareImage({
  lightSrc,
  darkSrc,
  alt,
  className,
  loading = "lazy",
  onLoad,
  ...rest
}: ThemeAwareImageProps) {
  const { theme } = useTheme()
  const src = resolveThemeSrc(lightSrc, darkSrc, theme)
  const [displaySrc, setDisplaySrc] = useState(src)
  const [fading, setFading] = useState(false)
  const [opaque, setOpaque] = useState(true)
  const loadedRef = useRef(new Set<string>(src ? [src] : []))
  const displaySrcRef = useRef(displaySrc)
  displaySrcRef.current = displaySrc

  useEffect(() => {
    const opposite = oppositeThemeSrc(lightSrc, darkSrc, theme)
    if (!opposite) return
    return scheduleIdle(() => prefetch(opposite))
  }, [lightSrc, darkSrc, theme])

  useEffect(() => {
    if (src === displaySrcRef.current) return

    if (loadedRef.current.has(src)) {
      setDisplaySrc(src)
      setOpaque(true)
      setFading(false)
      return
    }

    let cancelled = false
    setFading(true)
    setOpaque(false)

    const img = new Image()
    img.onload = () => {
      if (cancelled) return
      loadedRef.current.add(src)
      setDisplaySrc(src)
      requestAnimationFrame(() => {
        if (!cancelled) {
          setOpaque(true)
          setFading(false)
        }
      })
    }
    img.onerror = () => {
      if (cancelled) return
      setDisplaySrc(src)
      setOpaque(true)
      setFading(false)
    }
    img.src = src

    return () => {
      cancelled = true
    }
  }, [src])

  return (
    <img
      {...rest}
      src={displaySrc || lightSrc}
      alt={alt}
      loading={loading}
      className={cn(
        "transition-opacity duration-[180ms] ease-[var(--ease-out-soft)]",
        opaque ? "opacity-100" : "opacity-0",
        fading && "bg-surface-3",
        className,
      )}
      onLoad={(e) => {
        loadedRef.current.add(displaySrc || lightSrc)
        onLoad?.(e)
      }}
    />
  )
}
