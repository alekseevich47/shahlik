import type { Addon } from "@/entities/addon/model"
import { skuMatrix } from "@/entities/product/lib"
import type { Product } from "@/entities/product/model"
import { pb } from "@/shared/api/pb"

export type ArticleRef = {
  article: string
  kind: "product" | "addon"
  ownerId: string
  ownerLabel: string
  detail?: string
}

export type ArticleExclude = {
  addonId?: string
  productId?: string
  sizeId?: string
  variantId?: string | null
}

export const ARTICLE_PATTERN = /^\d+$/

function cellLabel(product: Product, sizeId: string, variantId: string | null): string {
  const size = product.sizes.find((s) => s.id === sizeId)
  const variant = variantId ? product.variants.find((v) => v.id === variantId) : undefined
  return [variant?.label, size?.label].filter(Boolean).join(" × ") || sizeId
}

function isExcludedCell(
  exclude: ArticleExclude | undefined,
  productId: string,
  sizeId: string,
  variantId: string | null,
): boolean {
  if (!exclude?.productId || exclude.productId !== productId) return false
  if (exclude.sizeId === undefined) return true
  if (exclude.sizeId !== sizeId) return false
  const exVariant = exclude.variantId ?? null
  return exVariant === variantId
}

/** Все артикулы товаров и добавок; в Map только те, у кого больше одного владельца. */
export function collectArticleConflicts(
  products: Product[],
  addons: Addon[],
): Map<string, ArticleRef[]> {
  const byArticle = new Map<string, ArticleRef[]>()

  const push = (ref: ArticleRef) => {
    const list = byArticle.get(ref.article) ?? []
    list.push(ref)
    byArticle.set(ref.article, list)
  }

  for (const addon of addons) {
    const article = addon.article?.trim()
    if (!article) continue
    push({
      article,
      kind: "addon",
      ownerId: addon.id,
      ownerLabel: addon.name,
    })
  }

  for (const product of products) {
    for (const cell of skuMatrix(product)) {
      const article = cell.article.trim()
      if (!article) continue
      push({
        article,
        kind: "product",
        ownerId: product.id,
        ownerLabel: product.name,
        detail: cellLabel(product, cell.sizeId, cell.variantId),
      })
    }
  }

  const conflicts = new Map<string, ArticleRef[]>()
  for (const [article, refs] of byArticle) {
    if (refs.length > 1) conflicts.set(article, refs)
  }
  return conflicts
}

/** Сообщение о конфликте артикула, исключая текущую ячейку/запись. */
export function articleConflictMessage(
  article: string,
  products: Product[],
  addons: Addon[],
  exclude?: ArticleExclude,
): string | null {
  const trimmed = article.trim()
  if (!trimmed) return null

  for (const addon of addons) {
    if (exclude?.addonId && addon.id === exclude.addonId) continue
    if (addon.article?.trim() === trimmed) {
      return `Артикул ${trimmed} уже у добавки «${addon.name}»`
    }
  }

  for (const product of products) {
    for (const cell of skuMatrix(product)) {
      if (isExcludedCell(exclude, product.id, cell.sizeId, cell.variantId)) continue
      if (cell.article.trim() !== trimmed) continue
      const detail = cellLabel(product, cell.sizeId, cell.variantId)
      return detail
        ? `Артикул ${trimmed} уже у товара «${product.name}» (${detail})`
        : `Артикул ${trimmed} уже у товара «${product.name}»`
    }
  }

  return null
}

/** Множество артикулов из `frontpad_stock` (есть в кассе). */
export async function fetchFrontpadArticleSet(): Promise<Set<string>> {
  const rows = await pb.collection("frontpad_stock").getFullList<{ article: string }>({
    fields: "article",
  })
  return new Set(rows.map((row) => row.article.trim()).filter(Boolean))
}
