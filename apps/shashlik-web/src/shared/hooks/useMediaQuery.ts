import { useSyncExternalStore } from "react"

/** Реактивный media-query без ререндера всего дерева на resize. */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query)
      mql.addEventListener("change", onChange)
      return () => mql.removeEventListener("change", onChange)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

export const useIsDesktop = () => useMediaQuery("(min-width: 1024px)")
export const useIsWide = () => useMediaQuery("(min-width: 1280px)")
