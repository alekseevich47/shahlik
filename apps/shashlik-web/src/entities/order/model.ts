export type DeliveryMode = "pickup" | "delivery"

export type OrderStatus = "new" | "cooking" | "delivering" | "done" | "canceled"

export type OrderStatusSource = "client" | "hook" | "manual"

export type OrderAddressParts = {
  street?: string
  home?: string
  pod?: string
  et?: string
  apart?: string
}

export type OrderLineAddon = {
  id: string
  name: string
  quantity: number
  price: number
  article?: string
  kind: string
}

export type OrderLineSnapshot = {
  productId: string
  variantId?: string
  sizeId: string
  article?: string
  quantity: number
  name: string
  variantLabel?: string
  sizeLabel: string
  unitPrice: number
  addons: OrderLineAddon[]
  total: number
}

export type Order = {
  id: string
  number: string
  createdAt: string
  customer: string
  phone: string
  customerId?: string | null
  mode: DeliveryMode
  address?: string
  addressParts?: OrderAddressParts | null
  status: OrderStatus
  statusSource?: OrderStatusSource | null
  positions: number
  goods?: number
  packFee?: number
  deliveryFee?: number
  discount?: number
  total: number
  couponCode?: string
  comment?: string
  lines: OrderLineSnapshot[]
  frontpadOrderId?: number | null
  frontpadOrderNumber?: string
  frontpadError?: string
  frontpadStatus?: number | null
  sentAt?: string | null
}

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  new: "Новый",
  cooking: "Готовится",
  delivering: "В доставке",
  done: "Выполнен",
  canceled: "Отменён",
}

export const ORDER_STATUS_SOURCE_LABEL: Record<OrderStatusSource, string> = {
  client: "клиент",
  hook: "касса",
  manual: "вручную",
}

/** Допустимые переходы статуса из текущего. */
export const ORDER_STATUS_FLOW: Record<OrderStatus, OrderStatus[]> = {
  new: ["cooking", "canceled"],
  cooking: ["delivering", "done", "canceled"],
  delivering: ["done", "canceled"],
  done: [],
  canceled: [],
}

export type Review = {
  id: string
  author: string
  productName: string
  productId?: string | null
  createdAt: string
  score: number
  text: string
  reply?: string
  published: boolean
}

export type FrontpadJobStatus = "queued" | "running" | "done" | "error"

export type FrontpadJobKind = "sync_products" | "sync_stops" | "resend_order" | "check_client"

export type FrontpadJob = {
  id: string
  kind: FrontpadJobKind
  payload?: { orderId?: string } | null
  status: FrontpadJobStatus
  error?: string
  createdAt: string
}
