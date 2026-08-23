export type Banner = {
  id: string
  image: string
  /** Плашка «Контроль качества» в правом нижнем углу баннера. */
  note?: { title: string; text: string }
  order: number
}
