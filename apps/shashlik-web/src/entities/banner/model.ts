export type Banner = {
  id: string
  title: string
  subtitle: string
  image: string
  /** Плашка «Контроль качества» в правом нижнем углу баннера. */
  note?: { title: string; text: string }
  order: number
}
