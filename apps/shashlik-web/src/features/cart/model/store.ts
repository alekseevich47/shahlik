import { create } from "zustand"
import { persist } from "zustand/middleware"

import type { AppliedCoupon } from "@/entities/coupon/model"
import type { DeliveryMode, OrderAddressParts } from "@/entities/order/model"

export const EMPTY_ADDRESS_PARTS: OrderAddressParts = {
  street: "",
  home: "",
  pod: "",
  et: "",
  apart: "",
}

export type CartAddon = { addonId: string; quantity: number }

export type CartItem = {
  /** Уникальный id строки корзины (не id товара). */
  id: string
  productId: string
  variantId?: string
  sizeId: string
  quantity: number
  addons: CartAddon[]
}

type AddPayload = Omit<CartItem, "id" | "quantity"> & { quantity?: number }

type CartState = {
  items: CartItem[]
  mode: DeliveryMode
  address: string
  addressParts: OrderAddressParts
  comment: string
  customer: string
  phone: string
  appliedCoupon: AppliedCoupon | null
  add: (payload: AddPayload) => void
  setQuantity: (lineId: string, quantity: number) => void
  remove: (lineId: string) => void
  clear: () => void
  /** Добавка кладётся к последней товарной строке, а не отдельной позицией. */
  bumpAddon: (addonId: string, delta: number, lineId?: string) => void
  setMode: (mode: DeliveryMode) => void
  setAddress: (address: string) => void
  setAddressPart: (key: keyof OrderAddressParts, value: string) => void
  setAddressParts: (parts: OrderAddressParts) => void
  setComment: (comment: string) => void
  setCustomer: (customer: string) => void
  setPhone: (phone: string) => void
  applyCoupon: (coupon: AppliedCoupon | null) => void
}

const uid = () => `ci-${Math.random().toString(36).slice(2, 9)}`

const sameLine = (a: CartItem, b: AddPayload) =>
  a.productId === b.productId &&
  a.variantId === b.variantId &&
  a.sizeId === b.sizeId &&
  a.addons.length === 0 &&
  (b.addons?.length ?? 0) === 0

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      mode: "pickup",
      address: "",
      addressParts: { ...EMPTY_ADDRESS_PARTS },
      comment: "",
      customer: "",
      phone: "",
      appliedCoupon: null,

      add: (payload) =>
        set((state) => {
          const quantity = payload.quantity ?? 1
          const existing = state.items.find((item) => sameLine(item, payload))
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.id === existing.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item,
              ),
            }
          }
          return {
            items: [...state.items, { ...payload, addons: payload.addons ?? [], id: uid(), quantity }],
          }
        }),

      setQuantity: (lineId, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((item) => item.id !== lineId)
              : state.items.map((item) =>
                  item.id === lineId ? { ...item, quantity } : item,
                ),
        })),

      remove: (lineId) =>
        set((state) => ({ items: state.items.filter((item) => item.id !== lineId) })),

      clear: () => set({ items: [], appliedCoupon: null }),

      bumpAddon: (addonId, delta, lineId) =>
        set((state) => {
          const target = lineId
            ? state.items.find((item) => item.id === lineId)
            : state.items.at(-1)
          if (!target) return state
          const current = target.addons.find((a) => a.addonId === addonId)
          const nextQty = (current?.quantity ?? 0) + delta
          const addons =
            nextQty <= 0
              ? target.addons.filter((a) => a.addonId !== addonId)
              : current
                ? target.addons.map((a) =>
                    a.addonId === addonId ? { ...a, quantity: nextQty } : a,
                  )
                : [...target.addons, { addonId, quantity: nextQty }]
          return {
            items: state.items.map((item) =>
              item.id === target.id ? { ...item, addons } : item,
            ),
          }
        }),

      setMode: (mode) => set({ mode }),
      setAddress: (address) => set({ address }),
      setAddressPart: (key, value) =>
        set((state) => ({
          addressParts: { ...state.addressParts, [key]: value },
        })),
      setAddressParts: (parts) => set({ addressParts: { ...EMPTY_ADDRESS_PARTS, ...parts } }),
      setComment: (comment) => set({ comment }),
      setCustomer: (customer) => set({ customer }),
      setPhone: (phone) => set({ phone }),
      applyCoupon: (appliedCoupon) => set({ appliedCoupon }),
    }),
    { name: "shashlik:cart:v2" },
  ),
)
