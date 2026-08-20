/** Лимиты Frontpad для адресных полей клиента. */
export const CUSTOMER_FIELD_LIMITS = {
  name: 100,
  phone: 20,
  street: 50,
  home: 50,
  pod: 2,
  et: 2,
  apart: 50,
  card: 16,
  comment: 100,
} as const

export type Customer = {
  id: string
  phone: string
  name: string
  street: string
  home: string
  pod: string
  et: string
  apart: string
  card: string
  sale: number
  score: number
  comment: string
  blocked: boolean
  ordersCount: number
  totalSpent: number
  lastOrderAt: string | null
  createdAt: string
}

export type CustomerSortKey = "totalSpent" | "lastOrderAt"
