/** Канон баннера витрины: широкий hero под колонку каталога (до 1680px). */
export const BANNER_WIDTH = 1680
export const BANNER_HEIGHT = 360
export const BANNER_ASPECT = BANNER_WIDTH / BANNER_HEIGHT

/** Мягкий минимум исходника до обрезки (экспорт 1680×360 всё равно возможен, но будет апскейл). */
export const BANNER_MIN_SOURCE_WIDTH = 840
export const BANNER_MIN_SOURCE_HEIGHT = 180

export const BANNER_FORMAT_LABEL = `${BANNER_WIDTH}×${BANNER_HEIGHT}`
