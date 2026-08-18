export type DeliveryMode = "pickup" | "delivery"

export type OrderStatus = "new" | "cooking" | "delivering" | "done" | "canceled"

export type Order = {
  id: string
  number: string
  createdAt: string
  customer: string
  phone: string
  mode: DeliveryMode
  address?: string
  status: OrderStatus
  positions: number
  total: number
}

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  new: "Новый",
  cooking: "Готовится",
  delivering: "В доставке",
  done: "Выполнен",
  canceled: "Отменён",
}

export type Review = {
  id: string
  author: string
  productName: string
  createdAt: string
  score: number
  text: string
  published: boolean
}
