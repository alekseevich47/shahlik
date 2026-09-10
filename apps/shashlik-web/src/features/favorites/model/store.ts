import { create } from "zustand"
import { persist } from "zustand/middleware"

import { getAccount } from "@/entities/account/api"

type FavoritesState = {
  ids: Record<string, true>
  toggle: (productId: string) => void
  add: (productId: string) => void
  remove: (productId: string) => void
  has: (productId: string) => boolean
  list: () => string[]
  mergeFromGuest: (guestIds: string[]) => void
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      ids: {},
      toggle: (productId) => {
        if (!productId) return
        set((state) => {
          const next = { ...state.ids }
          if (next[productId]) delete next[productId]
          else next[productId] = true
          return { ids: next }
        })
      },
      add: (productId) => {
        if (!productId) return
        set((state) => ({ ids: { ...state.ids, [productId]: true } }))
      },
      remove: (productId) => {
        set((state) => {
          const next = { ...state.ids }
          delete next[productId]
          return { ids: next }
        })
      },
      has: (productId) => Boolean(get().ids[productId]),
      list: () => Object.keys(get().ids),
      mergeFromGuest: (guestIds) => {
        if (!guestIds.length) return
        set((state) => {
          const next = { ...state.ids }
          for (const id of guestIds) next[id] = true
          return { ids: next }
        })
      },
    }),
    {
      name: "shashlik:favorites:v1:guest",
      partialize: (s) => ({ ids: s.ids }),
    },
  ),
)

/** Переключить persist-ключ при логине и смержить гостевое избранное. */
export function rebindFavoritesForAccount(): void {
  const user = getAccount()
  const guestRaw = localStorage.getItem("shashlik:favorites:v1:guest")
  let guestIds: string[] = []
  try {
    const parsed = guestRaw ? (JSON.parse(guestRaw) as { state?: { ids?: Record<string, true> } }) : null
    guestIds = Object.keys(parsed?.state?.ids ?? {})
  } catch {
    guestIds = []
  }

  if (!user) {
    useFavoritesStore.persist.setOptions({ name: "shashlik:favorites:v1:guest" })
    void Promise.resolve(useFavoritesStore.persist.rehydrate())
    return
  }

  const userKey = `shashlik:favorites:v1:${user.id}`
  useFavoritesStore.persist.setOptions({ name: userKey })
  void Promise.resolve(useFavoritesStore.persist.rehydrate()).then(() => {
    if (guestIds.length) {
      useFavoritesStore.getState().mergeFromGuest(guestIds)
    }
  })
}

export function useFavoriteIds(): string[] {
  return useFavoritesStore((s) => Object.keys(s.ids))
}

export function useIsFavorite(productId: string): boolean {
  return useFavoritesStore((s) => Boolean(s.ids[productId]))
}
