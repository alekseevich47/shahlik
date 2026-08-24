import type { Location } from "react-router-dom"

export type BackgroundLocationState = {
  background?: Location
}

/** Фоновый location витрины, если PDP открыт поверх неё. */
export function backgroundOf(location: Location): Location | undefined {
  return (location.state as BackgroundLocationState | null)?.background
}

/** state для перехода на PDP с сохранением витрины под модалкой. */
export function withBackground(location: Location): BackgroundLocationState {
  return { background: backgroundOf(location) ?? location }
}
