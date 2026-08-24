import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query"

import { useAccount } from "@/entities/account/api"
import { adminProductKeys, productKeys } from "@/entities/product/api"
import { adminCountKeys } from "@/shared/api/counts"
import { collectionMutations, pbErrorMessage } from "@/shared/api/crud"
import { pb } from "@/shared/api/pb"
import { pbClient } from "@/shared/api/pb-client"
import { queryClient } from "@/shared/api/query-client"

import type {
  DeliveryMode,
  FrontpadJob,
  FrontpadJobKind,
  FrontpadJobStatus,
  Order,
  OrderAddressParts,
  OrderLineSnapshot,
  OrderStatus,
  OrderStatusSource,
  Review,
} from "./model"

export type { OrderLineSnapshot }

export type CreateOrderInput = {
  customer: string
  phone: string
  mode: DeliveryMode
  address?: string
  addressParts?: OrderAddressParts | null
  comment?: string
  positions: number
  /** Справочно — сервер пересчитывает в хуке. */
  goods: number
  packFee: number
  deliveryFee: number
  discount: number
  total: number
  couponCode?: string | null
  lines: OrderLineSnapshot[]
}

export type OrdersPageParams = {
  page: number
  perPage: number
  status?: OrderStatus | "all"
  query?: string
  from?: string
  to?: string
  customerId?: string
  /** Только заказы с непустой ошибкой отправки в кассу. */
  hasFrontpadError?: boolean
}

export type OrdersPageResult = {
  items: Order[]
  totalItems: number
  totalPages: number
  page: number
  perPage: number
}

type OrderRecord = {
  id: string
  number: string
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
  total: number
  couponCode?: string
  comment?: string
  lines?: OrderLineSnapshot[]
  promo?: string
  frontpadOrderId?: number | null
  frontpadOrderNumber?: string
  frontpadError?: string
  frontpadStatus?: number | null
  sentAt?: string | null
  created: string
}

type ReviewRecord = {
  id: string
  author: string
  productName: string
  productId?: string | null
  score: number
  text: string
  reply?: string
  published: boolean
  created: string
}

export type CreateReviewInput = {
  author: string
  productName: string
  productId?: string | null
  score: number
  text: string
  reply?: string
  published?: boolean
}

export type UpdateReviewInput = {
  author?: string
  productName?: string
  productId?: string | null
  score?: number
  text?: string
  reply?: string | null
  published?: boolean
}

type FrontpadJobRecord = {
  id: string
  kind: FrontpadJobKind
  payload?: { orderId?: string } | null
  status: FrontpadJobStatus
  error?: string
  created: string
}

function mapOrder(record: OrderRecord): Order {
  return {
    id: record.id,
    number: record.number,
    createdAt: record.created,
    customer: record.customer,
    phone: record.phone,
    customerId: record.customerId ?? null,
    userId: record.userId ?? null,
    mode: record.mode,
    address: record.address,
    addressParts: record.addressParts ?? null,
    status: record.status,
    statusSource: record.statusSource ?? null,
    positions: record.positions,
    goods: record.goods,
    packFee: record.packFee,
    deliveryFee: record.deliveryFee,
    discount: record.discount,
    total: record.total,
    couponCode: record.couponCode || undefined,
    comment: record.comment || undefined,
    lines: record.lines ?? [],
    frontpadOrderId: record.frontpadOrderId ?? null,
    frontpadOrderNumber: record.frontpadOrderNumber || undefined,
    frontpadError: record.frontpadError || undefined,
    frontpadStatus: record.frontpadStatus ?? null,
    sentAt: record.sentAt ?? null,
  }
}

function mapReview(record: ReviewRecord): Review {
  return {
    id: record.id,
    author: record.author,
    productName: record.productName,
    productId: record.productId ?? null,
    createdAt: record.created,
    score: record.score,
    text: record.text,
    reply: record.reply || undefined,
    published: record.published,
  }
}

function mapJob(record: FrontpadJobRecord): FrontpadJob {
  return {
    id: record.id,
    kind: record.kind,
    payload: record.payload ?? null,
    status: record.status,
    error: record.error || undefined,
    createdAt: record.created,
  }
}

function buildOrdersFilter(params: OrdersPageParams): string {
  const parts: string[] = []
  const bindings: Record<string, string> = {}

  if (params.status && params.status !== "all") {
    parts.push("status = {:status}")
    bindings.status = params.status
  }

  const q = params.query?.trim()
  if (q) {
    parts.push("(number ~ {:q} || phone ~ {:q})")
    bindings.q = q
  }

  if (params.from) {
    parts.push("created >= {:from}")
    bindings.from = `${params.from} 00:00:00`
  }

  if (params.to) {
    parts.push("created <= {:to}")
    bindings.to = `${params.to} 23:59:59`
  }

  if (params.customerId) {
    parts.push("customerId = {:customerId}")
    bindings.customerId = params.customerId
  }

  if (params.hasFrontpadError) {
    parts.push('frontpadError != "" && frontpadOrderId = 0')
  }

  if (!parts.length) return ""
  return pb.filter(parts.join(" && "), bindings)
}

export const orderKeys = {
  all: ["orders"] as const,
  mine: ["orders", "mine"] as const,
  page: (params: OrdersPageParams) => ["orders", "page", params] as const,
  detail: (id: string) => ["orders", id] as const,
  public: (id: string) => ["orders", "public", id] as const,
}

export const reviewKeys = {
  all: ["reviews"] as const,
  detail: (id: string) => ["reviews", id] as const,
}

export const adminReviewKeys = {
  all: ["admin", "reviews"] as const,
}

export const orderJobKeys = {
  all: ["frontpad_jobs", "resend_order"] as const,
}

const reviewMutations = collectionMutations<
  ReviewRecord,
  Review,
  CreateReviewInput,
  UpdateReviewInput
>({
  collection: "reviews",
  map: mapReview,
  keys: {
    all: [adminReviewKeys.all, reviewKeys.all, adminCountKeys.all],
    detail: reviewKeys.detail,
  },
})

function invalidateProductRatings() {
  void queryClient.invalidateQueries({ queryKey: productKeys.all })
  void queryClient.invalidateQueries({ queryKey: adminProductKeys.all })
}

export async function fetchOrders(): Promise<Order[]> {
  const records = await pb.collection("orders").getFullList<OrderRecord>({
    sort: "-created",
  })
  return records.map(mapOrder)
}

export async function fetchOrdersPage(params: OrdersPageParams): Promise<OrdersPageResult> {
  const filter = buildOrdersFilter(params)
  const result = await pb.collection("orders").getList<OrderRecord>(params.page, params.perPage, {
    sort: "-created",
    ...(filter ? { filter } : {}),
  })
  return {
    items: result.items.map(mapOrder),
    totalItems: result.totalItems,
    totalPages: result.totalPages,
    page: result.page,
    perPage: result.perPage,
  }
}

export async function fetchOrderById(id: string): Promise<Order | null> {
  try {
    const record = await pb.collection("orders").getOne<OrderRecord>(id)
    return mapOrder(record)
  } catch {
    return null
  }
}

/** Публичный просмотр по id (viewRule пустой). Для трекинга гостя. */
export async function fetchPublicOrder(id: string): Promise<Order | null> {
  return fetchOrderById(id)
}

export async function fetchMyOrders(): Promise<Order[]> {
  const userId = pbClient.authStore.record?.id
  if (!userId || !pbClient.authStore.isValid) return []
  const records = await pbClient.collection("orders").getFullList<OrderRecord>({
    filter: pb.filter("userId = {:userId}", { userId }),
    sort: "-created",
  })
  return records.map(mapOrder)
}

export async function fetchReviews(): Promise<Review[]> {
  const records = await pb.collection("reviews").getFullList<ReviewRecord>({
    filter: "published = true",
    sort: "-created",
  })
  return records.map(mapReview)
}

export async function fetchAdminReviews(): Promise<Review[]> {
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

export async function fetchActiveResendJobs(): Promise<FrontpadJob[]> {
  const records = await pb.collection("frontpad_jobs").getFullList<FrontpadJobRecord>({
    filter: 'kind = "resend_order" && (status = "queued" || status = "running")',
    sort: "-created",
  })
  return records.map(mapJob)
}

export function useOrders() {
  return useQuery({
    queryKey: orderKeys.all,
    queryFn: fetchOrders,
  })
}

export function useOrdersPage(params: OrdersPageParams, enabled = true) {
  return useQuery({
    queryKey: orderKeys.page(params),
    queryFn: () => fetchOrdersPage(params),
    placeholderData: keepPreviousData,
    enabled,
  })
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: orderKeys.detail(id),
    queryFn: () => fetchOrderById(id),
    enabled: Boolean(id),
  })
}

export function usePublicOrder(id: string) {
  return useQuery({
    queryKey: orderKeys.public(id),
    queryFn: () => fetchPublicOrder(id),
    enabled: Boolean(id),
  })
}

export function useMyOrders(enabled = true) {
  const account = useAccount()
  return useQuery({
    queryKey: [...orderKeys.mine, account?.id ?? ""],
    queryFn: fetchMyOrders,
    enabled: enabled && Boolean(account),
  })
}

export function useReviews() {
  return useQuery({
    queryKey: reviewKeys.all,
    queryFn: fetchReviews,
  })
}

export function useAdminReviews() {
  return useQuery({
    queryKey: adminReviewKeys.all,
    queryFn: fetchAdminReviews,
  })
}

export function useReview(id: string) {
  return useQuery({
    queryKey: reviewKeys.detail(id),
    queryFn: () => fetchReviewById(id),
    enabled: Boolean(id),
  })
}

export function useOrderJobs(enabled = true) {
  return useQuery({
    queryKey: orderJobKeys.all,
    queryFn: fetchActiveResendJobs,
    enabled,
  })
}

export async function createOrder(input: CreateOrderInput): Promise<Order> {
  const record = await pbClient.collection("orders").create<OrderRecord>({
    customer: input.customer,
    phone: input.phone,
    mode: input.mode,
    address: input.address ?? "",
    addressParts: input.addressParts ?? null,
    comment: input.comment ?? "",
    positions: input.positions,
    goods: input.goods,
    packFee: input.packFee,
    deliveryFee: input.deliveryFee,
    discount: input.discount,
    total: input.total,
    couponCode: input.couponCode ?? "",
    lines: input.lines,
  })
  return mapOrder(record)
}

export function useCreateOrder() {
  return useMutation({
    mutationFn: createOrder,
    onSuccess: (order) => {
      void queryClient.invalidateQueries({ queryKey: orderKeys.all })
      queryClient.setQueryData(orderKeys.detail(order.id), order)
      queryClient.setQueryData(orderKeys.public(order.id), order)
    },
  })
}

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
  try {
    const record = await pb.collection("orders").update<OrderRecord>(id, {
      status,
      statusSource: "manual" satisfies OrderStatusSource,
    })
    return mapOrder(record)
  } catch (err) {
    throw new Error(pbErrorMessage(err, "Не удалось сменить статус"))
  }
}

export function useUpdateOrderStatus() {
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: OrderStatus }) =>
      updateOrderStatus(id, status),
    onSuccess: (order) => {
      void queryClient.invalidateQueries({ queryKey: orderKeys.all })
      queryClient.setQueryData(orderKeys.detail(order.id), order)
    },
  })
}

export async function resendOrder(orderId: string): Promise<FrontpadJob> {
  try {
    const record = await pb.collection("frontpad_jobs").create<FrontpadJobRecord>({
      kind: "resend_order" satisfies FrontpadJobKind,
      payload: { orderId },
      status: "queued" satisfies FrontpadJobStatus,
      attempts: 0,
    })
    return mapJob(record)
  } catch (err) {
    throw new Error(pbErrorMessage(err, "Не удалось поставить переотправку"))
  }
}

export function useResendOrder() {
  return useMutation({
    mutationFn: (orderId: string) => resendOrder(orderId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: orderJobKeys.all })
    },
  })
}

export function useCreateReview() {
  const mutation = reviewMutations.useCreate()
  return {
    ...mutation,
    mutateAsync: async (input: CreateReviewInput) => {
      const review = await mutation.mutateAsync(input)
      if (input.published || input.productId) {
        invalidateProductRatings()
      }
      return review
    },
  }
}

export function useUpdateReview() {
  const mutation = reviewMutations.useUpdate()
  return {
    ...mutation,
    mutateAsync: async (args: { id: string; data: UpdateReviewInput }) => {
      const review = await mutation.mutateAsync(args)
      if (args.data.published !== undefined || args.data.productId !== undefined) {
        invalidateProductRatings()
      }
      return review
    },
  }
}

export function useDeleteReview() {
  const mutation = reviewMutations.useRemove()
  return {
    ...mutation,
    mutateAsync: async (id: string) => {
      await mutation.mutateAsync(id)
      invalidateProductRatings()
    },
  }
}

export function useToggleReviewPublished() {
  return useMutation({
    mutationFn: ({ id, published }: { id: string; published: boolean }) =>
      reviewMutations.update(id, { published }),
    onMutate: async ({ id, published }) => {
      await queryClient.cancelQueries({ queryKey: adminReviewKeys.all })
      const prev = queryClient.getQueryData<Review[]>(adminReviewKeys.all)
      if (prev) {
        queryClient.setQueryData(
          adminReviewKeys.all,
          prev.map((item) => (item.id === id ? { ...item, published } : item)),
        )
      }
      const detail = queryClient.getQueryData<Review>(reviewKeys.detail(id))
      if (detail) {
        queryClient.setQueryData(reviewKeys.detail(id), { ...detail, published })
      }
      return { prev, detail }
    },
    onError: (_err, { id }, ctx) => {
      if (ctx?.prev) queryClient.setQueryData(adminReviewKeys.all, ctx.prev)
      if (ctx?.detail) queryClient.setQueryData(reviewKeys.detail(id), ctx.detail)
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: adminReviewKeys.all })
      void queryClient.invalidateQueries({ queryKey: reviewKeys.all })
      invalidateProductRatings()
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
