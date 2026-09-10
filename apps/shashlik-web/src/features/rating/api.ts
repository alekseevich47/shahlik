import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { productKeys } from "@/entities/product/api"
import { DEFAULT_CRITERIA } from "@/entities/product/model"
import { pbClient } from "@/shared/api/pb-client"
import { pbErrorMessage } from "@/shared/api/crud"

export type CriteriaScores = Record<string, number>

export type SubmitRatingInput = {
  orderId: string
  productId: string
  criteria: CriteriaScores
}

export const ratingKeys = {
  order: (orderId: string) => ["ratings", "order", orderId] as const,
}

export async function fetchRatedProductIds(orderId: string): Promise<string[]> {
  const data = await pbClient.send<{ productIds?: string[] }>(
    `/api/ratings/order/${encodeURIComponent(orderId)}`,
    { method: "GET" },
  )
  return Array.isArray(data?.productIds) ? data.productIds : []
}

export function useOrderRatedProducts(orderId: string | undefined, enabled = true) {
  return useQuery({
    queryKey: ratingKeys.order(orderId ?? ""),
    queryFn: () => fetchRatedProductIds(orderId!),
    enabled: Boolean(orderId) && enabled,
    staleTime: 30_000,
  })
}

export async function submitProductRating(input: SubmitRatingInput): Promise<void> {
  const criteria: CriteriaScores = {}
  for (const c of DEFAULT_CRITERIA) {
    const v = Number(input.criteria[c.id])
    if (!Number.isInteger(v) || v < 0 || v > 5) {
      throw new Error(`Оценка «${c.label}» должна быть от 0 до 5`)
    }
    criteria[c.id] = v
  }
  await pbClient.send("/api/ratings/submit", {
    method: "POST",
    body: {
      orderId: input.orderId,
      productId: input.productId,
      criteria,
    },
  })
}

export function useSubmitProductRating() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: submitProductRating,
    onSuccess: (_data, vars) => {
      void qc.invalidateQueries({ queryKey: ratingKeys.order(vars.orderId) })
      void qc.invalidateQueries({ queryKey: productKeys.all })
      void qc.invalidateQueries({ queryKey: productKeys.detail(vars.productId) })
    },
  })
}

export function ratingSubmitError(err: unknown): string {
  return pbErrorMessage(err, "Не удалось отправить оценку")
}
