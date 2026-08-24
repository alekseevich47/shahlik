import { useEffect } from "react"

import {
  orderKeys,
  subscribeOrderStatus,
  usePublicOrder,
} from "@/entities/order/api"
import { queryClient } from "@/shared/api/query-client"

/** Публичный заказ + realtime-обновление статуса. */
export function useLiveOrder(id: string) {
  const query = usePublicOrder(id)

  useEffect(() => {
    if (!id) return
    return subscribeOrderStatus(id, (order) => {
      queryClient.setQueryData(orderKeys.public(id), order)
      queryClient.setQueryData(orderKeys.detail(id), order)
    })
  }, [id])

  return query
}
