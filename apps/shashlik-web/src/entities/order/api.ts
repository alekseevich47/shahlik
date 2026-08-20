import { useMutation, useQuery } from "@tanstack/react-query"

import { pb } from "@/shared/api/pb"
import { queryClient } from "@/shared/api/query-client"

import type { DeliveryMode, Order, OrderStatus, Review } from "./model"

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
  addons: {
    id: string
    name: string
    quantity: number
    price: number
    article?: string
    kind: string
  }[]
  total: number
}

export type CreateOrderInput = {
  customer: string
  phone: string
  mode: DeliveryMode
  address?: string
  positions: number
  total: number
  lines: OrderLineSnapshot[]
  promo?: string | null
}

type OrderRecord = {
  id: string
  number: string
  customer: string
  phone: string
  mode: DeliveryMode
  address?: string
  status: OrderStatus
  positions: number
  total: number
  lines?: OrderLineSnapshot[]
  promo?: string
  frontpadError?: string
  created: string
}

type ReviewRecord = {
  id: string
  author: string
  productName: string
  score: number
  text: string
  published: boolean
  created: string
}

function mapOrder(record: OrderRecord): Order {
  return {
    id: record.id,
    number: record.number,
    createdAt: record.created,
    customer: record.customer,
    phone: record.phone,
    mode: record.mode,
    address: record.address,
    status: record.status,
    positions: record.positions,
    total: record.total,
  }
}

function mapReview(record: ReviewRecord): Review {
  return {
    id: record.id,
    author: record.author,
    productName: record.productName,
    createdAt: record.created,
    score: record.score,
    text: record.text,
    published: record.published,
  }
}

export const orderKeys = {
  all: ["orders"] as const,
  detail: (id: string) => ["orders", id] as const,
}

export const reviewKeys = {
  all: ["reviews"] as const,
  detail: (id: string) => ["reviews", id] as const,
}

export async function fetchOrders(): Promise<Order[]> {
  const records = await pb.collection("orders").getFullList<OrderRecord>({
    sort: "-created",
  })
  return records.map(mapOrder)
}

export async function fetchOrderById(id: string): Promise<Order | null> {
  try {
    const record = await pb.collection("orders").getOne<OrderRecord>(id)
    return mapOrder(record)
  } catch {
    return null
  }
}

export async function fetchReviews(): Promise<Review[]> {
  const records = await pb.collection("reviews").getFullList<ReviewRecord>({
    sort: "-created",
  })
  return records.map(mapReview)
}

export async function fetchReviewById(id: string): Promise<Review | null> {
  try {
    const record = await pb.collection("reviews").getOne<ReviewRecord>(id)
    return mapReview(record)
  } catch {
    return null
  }
}

export function useOrders() {
  return useQuery({
    queryKey: orderKeys.all,
    queryFn: fetchOrders,
  })
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: orderKeys.detail(id),
    queryFn: () => fetchOrderById(id),
    enabled: Boolean(id),
  })
}

export function useReviews() {
  return useQuery({
    queryKey: reviewKeys.all,
    queryFn: fetchReviews,
  })
}

export function useReview(id: string) {
  return useQuery({
    queryKey: reviewKeys.detail(id),
    queryFn: () => fetchReviewById(id),
    enabled: Boolean(id),
  })
}

export async function createOrder(input: CreateOrderInput): Promise<Order> {
  const record = await pb.collection("orders").create<OrderRecord>({
    number: `№ ${Date.now().toString().slice(-6)}`,
    customer: input.customer,
    phone: input.phone,
    mode: input.mode,
    address: input.address ?? "",
    status: "new",
    positions: input.positions,
    total: input.total,
    lines: input.lines,
    promo: input.promo ?? "",
  })
  return mapOrder(record)
}

export function useCreateOrder() {
  return useMutation({
    mutationFn: createOrder,
    onSuccess: (order) => {
      void queryClient.invalidateQueries({ queryKey: orderKeys.all })
      queryClient.setQueryData(orderKeys.detail(order.id), order)
    },
  })
}

/** Realtime-статус заказа. Отписка — возвращённая функция. */
export function subscribeOrderStatus(orderId: string, cb: (order: Order) => void): () => void {
  let cancelled = false
  void pb.collection("orders").subscribe<OrderRecord>(orderId, (e) => {
    if (!cancelled) cb(mapOrder(e.record))
  })
  return () => {
    cancelled = true
    void pb.collection("orders").unsubscribe(orderId)
  }
}
