import { useQuery } from "@tanstack/react-query"

import type { Addon } from "@/entities/addon/model"
import { frontpadStockKeys } from "@/entities/product/api"
import { articleFor, skuMatrix } from "@/entities/product/lib"
import type { Product } from "@/entities/product/model"
import { pb } from "@/shared/api/pb"
import { useCollectionRealtime } from "@/shared/api/realtime"

const stoppedArticlesKey = [...frontpadStockKeys.all, "stopped"] as const

export async function fetchStoppedArticles(): Promise<Set<string>> {
  const rows = await pb.collection("frontpad_stock").getFullList<{ article: string }>({
    filter: "stopped = true",
    fields: "article",
  })
  return new Set(rows.map((row) => row.article.trim()).filter(Boolean))
}

/** PB subscribe → инвалидация кэша стоп-листа (один раз на экран витрины). */
export function useFrontpadStockRealtime() {
  useCollectionRealtime("frontpad_stock", [frontpadStockKeys.all])
}

export function useStoppedArticles() {
  return useQuery({
    queryKey: stoppedArticlesKey,
    queryFn: fetchStoppedArticles,
    staleTime: 60_000,
  })
}

export function isSkuStopped(
  product: Product,
  sizeId: string,
  variantId: string | undefined,
  stopped: Set<string>,
): boolean {
  const article = articleFor(product, sizeId, variantId)
  if (!article) return false
  return stopped.has(article)
}

export function isProductStopped(product: Product, stopped: Set<string>): boolean {
  const cells = skuMatrix(product).filter((cell) => cell.article.trim())
  if (!cells.length) return false
  return cells.every((cell) => stopped.has(cell.article.trim()))
}

export function isAddonStopped(addon: Addon, stopped: Set<string>): boolean {
  const article = addon.article?.trim()
  if (!article) return false
  return stopped.has(article)
}

/** Вариант недоступен, если все размеры с этим вариантом в стопе. */
export function isVariantStopped(product: Product, variantId: string, stopped: Set<string>): boolean {
  const cells = skuMatrix(product).filter(
    (cell) => cell.variantId === variantId && cell.article.trim(),
  )
  if (!cells.length) return false
  return cells.every((cell) => stopped.has(cell.article.trim()))
}

/** Размер недоступен для текущего варианта. */
export function isSizeStopped(
  product: Product,
  sizeId: string,
  variantId: string | undefined,
  stopped: Set<string>,
): boolean {
  return isSkuStopped(product, sizeId, variantId, stopped)
}
