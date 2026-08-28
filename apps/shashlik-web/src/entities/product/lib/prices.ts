import { articleFor, skuMatrix } from "@/entities/product/lib"
import type { Product } from "@/entities/product/model"

/** Алгоритм дублируется в pb_hooks/lib/prices.js — менять оба. */

export type StockPriceMap = Map<string, number>

export type CashPriceStatus = "match" | "ready" | "blocked"

export type CashPriceCell = {
  variantId: string | null
  variantLabel: string
  sizeId: string
  sizeLabel: string
  article: string
  ourPrice: number
  cashPrice: number | null
}

export type CashPricePlan = {
  productId: string
  name: string
  status: CashPriceStatus
  reason?: string
  cells: CashPriceCell[]
}

export type ApplyPricesJobResult = {
  ok: boolean
  applied: boolean
  priceSource: "site" | "frontpad"
  updated: number
  skipped: number
  unchanged: number
  skippedRows?: { id: string; name: string; reason: string }[]
  updatedRows?: { id: string; name: string }[]
}

export function roundPrice(value: number): number {
  return Math.round(value)
}

export function stockPriceMap(
  rows: ReadonlyArray<{ article: string; price: number }>,
): StockPriceMap {
  const map: StockPriceMap = new Map()
  for (const row of rows) {
    const article = row.article.trim()
    if (!article) continue
    map.set(article, roundPrice(row.price))
  }
  return map
}

function variantLabel(product: Product, variantId: string | null): string {
  if (!variantId) return product.variants.length ? "—" : "Без варианта"
  return product.variants.find((v) => v.id === variantId)?.label ?? "—"
}

function buildCells(product: Product, stock: StockPriceMap): CashPriceCell[] {
  return skuMatrix(product).map((cell) => {
    const article = cell.article.trim()
    const cash = article ? stock.get(article) : undefined
    const variant = cell.variantId
      ? product.variants.find((v) => v.id === cell.variantId)
      : undefined
    const size = product.sizes.find((s) => s.id === cell.sizeId)
    return {
      variantId: cell.variantId,
      variantLabel: variant?.label ?? variantLabel(product, cell.variantId),
      sizeId: cell.sizeId,
      sizeLabel: size?.label ?? cell.sizeId,
      article,
      ourPrice: roundPrice(cell.price),
      cashPrice: cash === undefined ? null : roundPrice(cash),
    }
  })
}

export function planCashPrices(product: Product, stock: StockPriceMap): CashPricePlan {
  const cells = buildCells(product, stock)
  const base = { productId: product.id, name: product.name, cells }

  if (!product.sizes.length) {
    return { ...base, status: "blocked", reason: "нет размеров" }
  }

  const rows = product.variants.length ? product.variants : [null]

  for (const variant of rows) {
    for (const size of product.sizes) {
      const article = (articleFor(product, size.id, variant?.id) ?? "").trim()
      const label = `${variant?.label ?? "без варианта"} × ${size.label}`
      if (!article) {
        return { ...base, status: "blocked", reason: `нет артикула: ${label}` }
      }
      if (!stock.has(article)) {
        return { ...base, status: "blocked", reason: `нет в кассе: ${article}` }
      }
    }
  }

  let changed = false
  for (const cell of cells) {
    if (cell.cashPrice === null) continue
    if (roundPrice(cell.ourPrice) !== roundPrice(cell.cashPrice)) {
      changed = true
      break
    }
  }

  return { ...base, status: changed ? "ready" : "match" }
}

export function planAllCashPrices(
  products: readonly Product[],
  stock: StockPriceMap,
): CashPricePlan[] {
  return products.map((product) => planCashPrices(product, stock))
}

export function cellDelta(cell: CashPriceCell): number | null {
  return cell.cashPrice === null ? null : cell.cashPrice - cell.ourPrice
}

function asRowList(raw: unknown): { id: string; name: string; reason?: string }[] {
  if (!Array.isArray(raw)) return []
  const out: { id: string; name: string; reason?: string }[] = []
  for (const item of raw) {
    if (!item || typeof item !== "object") continue
    const row = item as Record<string, unknown>
    if (typeof row.id !== "string" || typeof row.name !== "string") continue
    out.push({
      id: row.id,
      name: row.name,
      reason: typeof row.reason === "string" ? row.reason : undefined,
    })
  }
  return out
}

export function parseApplyPricesResult(raw: unknown): ApplyPricesJobResult | null {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null
  const o = raw as Record<string, unknown>
  if (typeof o.ok !== "boolean") return null
  return {
    ok: o.ok,
    applied: Boolean(o.applied),
    priceSource: o.priceSource === "frontpad" ? "frontpad" : "site",
    updated: Number(o.updated) || 0,
    skipped: Number(o.skipped) || 0,
    unchanged: Number(o.unchanged) || 0,
    skippedRows: asRowList(o.skippedRows).map((row) => ({
      id: row.id,
      name: row.name,
      reason: row.reason ?? "",
    })),
    updatedRows: asRowList(o.updatedRows).map((row) => ({ id: row.id, name: row.name })),
  }
}

