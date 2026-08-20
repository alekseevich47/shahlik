import { keepPreviousData, useQuery } from "@tanstack/react-query"

import { collectionMutations } from "@/shared/api/crud"
import { pb } from "@/shared/api/pb"

import type { Customer, CustomerSortKey } from "./model"

type CustomerRecord = {
  id: string
  phone: string
  name?: string
  street?: string
  home?: string
  pod?: string
  et?: string
  apart?: string
  card?: string
  sale?: number
  score?: number
  comment?: string
  blocked?: boolean
  ordersCount?: number
  totalSpent?: number
  lastOrderAt?: string | null
  created: string
}

export type CustomersPageParams = {
  page: number
  perPage: number
  query?: string
  sortKey?: CustomerSortKey
  sortDir?: "asc" | "desc"
}

export type CustomersPageResult = {
  items: Customer[]
  totalItems: number
  totalPages: number
  page: number
  perPage: number
}

export type UpdateCustomerInput = {
  name?: string
  street?: string
  home?: string
  pod?: string
  et?: string
  apart?: string
  card?: string
  sale?: number
  score?: number
  comment?: string
  blocked?: boolean
}

function mapCustomer(record: CustomerRecord): Customer {
  return {
    id: record.id,
    phone: record.phone,
    name: record.name ?? "",
    street: record.street ?? "",
    home: record.home ?? "",
    pod: record.pod ?? "",
    et: record.et ?? "",
    apart: record.apart ?? "",
    card: record.card ?? "",
    sale: record.sale ?? 0,
    score: record.score ?? 0,
    comment: record.comment ?? "",
    blocked: Boolean(record.blocked),
    ordersCount: record.ordersCount ?? 0,
    totalSpent: record.totalSpent ?? 0,
    lastOrderAt: record.lastOrderAt ?? null,
    createdAt: record.created,
  }
}

function buildCustomersFilter(params: CustomersPageParams): string {
  const q = params.query?.trim()
  if (!q) return ""
  return pb.filter("phone ~ {:q} || name ~ {:q}", { q })
}

function buildCustomersSort(params: CustomersPageParams): string {
  const key = params.sortKey ?? "lastOrderAt"
  const dir = params.sortDir ?? "desc"
  const prefix = dir === "asc" ? "" : "-"
  return `${prefix}${key}`
}

export const customerKeys = {
  all: ["customers"] as const,
  page: (params: CustomersPageParams) => ["customers", "page", params] as const,
  detail: (id: string) => ["customers", id] as const,
}

const customerMutations = collectionMutations<
  CustomerRecord,
  Customer,
  UpdateCustomerInput,
  UpdateCustomerInput
>({
  collection: "customers",
  map: mapCustomer,
  keys: {
    all: customerKeys.all,
    detail: customerKeys.detail,
  },
})

export async function fetchCustomersPage(
  params: CustomersPageParams,
): Promise<CustomersPageResult> {
  const filter = buildCustomersFilter(params)
  const result = await pb.collection("customers").getList<CustomerRecord>(
    params.page,
    params.perPage,
    {
      sort: buildCustomersSort(params),
      ...(filter ? { filter } : {}),
    },
  )
  return {
    items: result.items.map(mapCustomer),
    totalItems: result.totalItems,
    totalPages: result.totalPages,
    page: result.page,
    perPage: result.perPage,
  }
}

export async function fetchCustomerById(id: string): Promise<Customer | null> {
  try {
    const record = await pb.collection("customers").getOne<CustomerRecord>(id)
    return mapCustomer(record)
  } catch {
    return null
  }
}

export function useCustomersPage(params: CustomersPageParams) {
  return useQuery({
    queryKey: customerKeys.page(params),
    queryFn: () => fetchCustomersPage(params),
    placeholderData: keepPreviousData,
  })
}

export function useCustomer(id: string) {
  return useQuery({
    queryKey: customerKeys.detail(id),
    queryFn: () => fetchCustomerById(id),
    enabled: Boolean(id),
  })
}

export function useUpdateCustomer() {
  return customerMutations.useUpdate()
}
