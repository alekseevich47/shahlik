import { create } from "zustand"

type CartPanelState = {
  /** Desktop ≥1280: колонка «Мой заказ» видна. По умолчанию открыта — как раньше. */
  open: boolean
  toggle: () => void
  setOpen: (open: boolean) => void
}

export const CART_PANEL_WIDTH = 340
export const CART_PANEL_GAP = 20
export const CART_PANEL_TRACK = CART_PANEL_WIDTH + CART_PANEL_GAP

export const useCartPanelStore = create<CartPanelState>((set) => ({
  open: true,
  toggle: () => set((s) => ({ open: !s.open })),
  setOpen: (open) => set({ open }),
}))
