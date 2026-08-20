import { useEffect, useRef } from "react"

import { pb } from "./pb"
import { queryClient } from "./query-client"

type QueryKey = readonly unknown[]

/**
 * Подписка на `*` коллекции → инвалидация переданных query-ключей.
 * Корректная отписка при StrictMode (двойной mount).
 */
export function useCollectionRealtime(
  collection: string,
  keys: readonly QueryKey[],
  enabled = true,
) {
  const keysRef = useRef(keys)
  keysRef.current = keys

  useEffect(() => {
    if (!enabled || !collection) return

    let cancelled = false

    void pb.collection(collection).subscribe("*", () => {
      if (cancelled) return
      for (const key of keysRef.current) {
        void queryClient.invalidateQueries({ queryKey: key })
      }
    })

    return () => {
      cancelled = true
      void pb.collection(collection).unsubscribe("*")
    }
  }, [collection, enabled])
}
