import type { Theme } from "@/app/providers/theme"

/** URL для текущей темы: dark при наличии, иначе light. */
export function resolveThemeSrc(
  lightSrc: string,
  darkSrc: string | undefined,
  theme: Theme,
): string {
  if (theme === "dark" && darkSrc) return darkSrc
  return lightSrc
}

/** Альтернативный URL для prefetch (противоположная тема). */
export function oppositeThemeSrc(
  lightSrc: string,
  darkSrc: string | undefined,
  theme: Theme,
): string | undefined {
  if (theme === "dark") return lightSrc || undefined
  return darkSrc || undefined
}
