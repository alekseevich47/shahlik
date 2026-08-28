/** Шаблон размера (`size_templates`): название + весовка для быстрого выбора в редакторе товара. */
export type SizeTemplate = {
  id: string
  label: string
  weight: string
  order: number
}

export const DEFAULT_SIZE_TEMPLATES: ReadonlyArray<Omit<SizeTemplate, "id">> = [
  { label: "S", weight: "200 г", order: 1 },
  { label: "M", weight: "300 г", order: 2 },
  { label: "L", weight: "400 г", order: 3 },
  { label: "XL", weight: "500 г", order: 4 },
]
