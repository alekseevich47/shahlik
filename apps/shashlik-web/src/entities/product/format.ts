/** Канон фото товара: карточка витрины, PDP и загрузка в админке. */
export const PRODUCT_WIDTH = 1536
export const PRODUCT_HEIGHT = 1024
export const PRODUCT_ASPECT = PRODUCT_WIDTH / PRODUCT_HEIGHT
/** Для inline `aspect-ratio` в JSX — один источник с Tailwind-превью. */
export const PRODUCT_ASPECT_RATIO = `${PRODUCT_WIDTH} / ${PRODUCT_HEIGHT}` as const

/** Мягкий минимум исходника до обрезки (экспорт 1536×1024 всё равно возможен, но будет апскейл). */
export const PRODUCT_MIN_SOURCE_WIDTH = 768
export const PRODUCT_MIN_SOURCE_HEIGHT = 512

export const PRODUCT_FORMAT_LABEL = `${PRODUCT_WIDTH}×${PRODUCT_HEIGHT}`
