/** Канон баннера витрины: широкий hero под колонку каталога (до 1680px). */
export const BANNER_WIDTH = 1680
export const BANNER_HEIGHT = 720
export const BANNER_ASPECT = BANNER_WIDTH / BANNER_HEIGHT
/** Для inline `aspect-ratio` в JSX — один источник с Tailwind-превью. */
export const BANNER_ASPECT_RATIO = `${BANNER_WIDTH} / ${BANNER_HEIGHT}` as const

/** Мягкий минимум исходника до обрезки (экспорт 1680×720 всё равно возможен, но будет апскейл). */
export const BANNER_MIN_SOURCE_WIDTH = 840
export const BANNER_MIN_SOURCE_HEIGHT = 360

export const BANNER_FORMAT_LABEL = `${BANNER_WIDTH}×${BANNER_HEIGHT}`
