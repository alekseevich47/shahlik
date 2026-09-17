import { create } from "zustand"

type PdpChromeState = {
  /**
   * Снять blur/inert/Lenis до `navigate(-1)`.
   * Пока `false` — chrome следует за background-локацией (модалка поверх текущего экрана).
   */
  released: boolean
  release: () => void
  reset: () => void
}

export const usePdpChromeStore = create<PdpChromeState>((set) => ({
  released: false,
  release: () => set({ released: true }),
  reset: () => set({ released: false }),
}))
