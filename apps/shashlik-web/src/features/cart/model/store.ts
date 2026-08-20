import { create } from "zustand"
import { persist } from "zustand/middleware"

import type { DeliveryMode } from "@/entities/order/model"

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
  customer: string
  phone: string
  promo: string | null
  add: (payload: AddPayload) => void
  setQuantity: (lineId: string, quantity: number) => void
  remove: (lineId: string) => void
  clear: () => void
  /** Добавка кладётся к последней товарной строке, а не отдельной позицией. */
  bumpAddon: (addonId: string, delta: number, lineId?: string) => void
  setMode: (mode: DeliveryMode) => void
  setAddress: (address: string) => void
  setCustomer: (customer: string) => void
  setPhone: (phone: string) => void
  applyPromo: (code: string | null) => void
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
      customer: "",
      phone: "",
      promo: null,

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

      clear: () => set({ items: [], promo: null }),

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
      setCustomer: (customer) => set({ customer }),
      setPhone: (phone) => set({ phone }),
      applyPromo: (promo) => set({ promo }),
    }),
    { name: "shashlik:cart:v1" },
  ),
)
