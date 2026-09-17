import { createContext, use, useCallback, useEffect, useState } from "react"

export type GraphicsQuality = "normal" | "ultra"

const STORAGE_KEY = "shashlik:graphics:v1"

type GraphicsContextValue = {
  quality: GraphicsQuality
  setQuality: (next: GraphicsQuality) => void
}

const GraphicsContext = createContext<GraphicsContextValue | null>(null)

function readInitialQuality(): GraphicsQuality {
  if (typeof document === "undefined") return "ultra"
  const attr = document.documentElement.getAttribute("data-graphics")
  if (attr === "normal" || attr === "ultra") return attr
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === "normal" || stored === "ultra") return stored
  } catch {
    /* private mode */
  }
  return "ultra"
}

function applyQuality(quality: GraphicsQuality) {
  document.documentElement.setAttribute("data-graphics", quality)
  try {
    localStorage.setItem(STORAGE_KEY, quality)
  } catch {
    /* private mode */
  }
}

export function GraphicsProvider({ children }: { children: React.ReactNode }) {
  const [quality, setQualityState] = useState<GraphicsQuality>(readInitialQuality)

  useEffect(() => {
    applyQuality(quality)
  }, [quality])

  const setQuality = useCallback((next: GraphicsQuality) => setQualityState(next), [])

  return (
    <GraphicsContext value={{ quality, setQuality }}>{children}</GraphicsContext>
  )
}

export function useGraphics(): GraphicsContextValue {
  const ctx = use(GraphicsContext)
  if (!ctx) throw new Error("useGraphics должен вызываться внутри GraphicsProvider")
  return ctx
}
