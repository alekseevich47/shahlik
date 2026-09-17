import { useSyncExternalStore } from "react"

import { useAccount } from "@/entities/account/api"
import { useMyOrders } from "@/entities/order/api"
import {
  listLocalOrderIds,
  LOCAL_ORDERS_EVENT,
} from "@/features/order-tracking/model/localOrders"

function subscribeLocalOrders(onStoreChange: () => void): () => void {
  if (typeof window === "undefined") return () => {}
  window.addEventListener(LOCAL_ORDERS_EVENT, onStoreChange)
  window.addEventListener("storage", onStoreChange)
  return () => {
    window.removeEventListener(LOCAL_ORDERS_EVENT, onStoreChange)
    window.removeEventListener("storage", onStoreChange)
  }
}

function getLocalOrderCount(): number {
  return listLocalOrderIds().length
}

/**
 * UX-гейт: на устройстве или у аккаунта уже был заказ.
 * Не заменяет серверную проверку купона (`POST /api/promo/check`).
 */
export function useHasPlacedOrder(): boolean {
  const account = useAccount()
  const localCount = useSyncExternalStore(subscribeLocalOrders, getLocalOrderCount, () => 0)
  const { data: myOrders = [] } = useMyOrders(Boolean(account))

  if (localCount > 0) return true
  return myOrders.some((order) => order.status !== "canceled")
}
