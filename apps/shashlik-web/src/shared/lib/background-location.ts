import type { Location } from "react-router-dom"

export type ProductDraft = {
  variantId?: string
  sizeId: string
  quantity: number
  addons: { addonId: string; quantity: number }[]
}

export type BackgroundLocationState = {
  background?: Location
  /** Редактирование существующей строки корзины через PDP. */
  editLineId?: string
  draft?: ProductDraft
}

/** Фоновый location витрины, если PDP открыт поверх неё. */
export function backgroundOf(location: Location): Location | undefined {
  return (location.state as BackgroundLocationState | null)?.background
}

/** state для перехода на PDP с сохранением витрины под модалкой. */
export function withBackground(location: Location): BackgroundLocationState {
  return { background: backgroundOf(location) ?? location }
}

export function productEditOf(location: Location): {
  editLineId?: string
  draft?: ProductDraft
} {
  const state = location.state as BackgroundLocationState | null
  return {
    editLineId: state?.editLineId,
    draft: state?.draft,
  }
}
