export type DeliveryMode = "pickup" | "delivery"

export type OrderStatus =
  | "pending"
  | "new"
  | "cooking"
  | "delivering"
  | "done"
  | "canceled"

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
  userId?: string | null
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
  bonusSpent?: number
  bonusEarned?: number
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

/** Заказ ушёл в кассу, `frontpadError` — warning API, не отказ. */
export function isFrontpadWarning(order: Pick<Order, "frontpadOrderId" | "frontpadError">) {
  return Boolean(order.frontpadOrderId) && Boolean(order.frontpadError)
}

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  pending: "Ожидает подтверждения",
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
  pending: ["new", "canceled"],
  new: ["cooking", "canceled"],
  cooking: ["delivering", "done", "canceled"],
  delivering: ["done", "canceled"],
  done: [],
  canceled: [],
}

/** Заказ ещё в работе (для «Текущий заказ» и гостевого трекинга). */
export function isActiveOrderStatus(status: OrderStatus): boolean {
  return status !== "done" && status !== "canceled"
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

export type FrontpadJobKind =
  | "sync_products"
  | "sync_stops"
  | "send_order"
  | "resend_order"
  | "check_client"
  | "apply_prices"

export type FrontpadJob = {
  id: string
  kind: FrontpadJobKind
  payload?: { orderId?: string } | null
  status: FrontpadJobStatus
  error?: string
  result?: unknown
  createdAt: string
}
