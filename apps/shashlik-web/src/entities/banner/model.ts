export type Banner = {
  id: string
  image: string
  /** Фото тёмной темы (PB `imageDark`); нет → fallback на `image`. */
  imageDark?: string
  /** Плашка «Контроль качества» в правом нижнем углу баннера. */
  note?: { title: string; text: string }
  order: number
}
