import { create } from "zustand"

type CheckoutDialogState = {
  open: boolean
  setOpen: (open: boolean) => void
}

export const useCheckoutDialogStore = create<CheckoutDialogState>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}))
