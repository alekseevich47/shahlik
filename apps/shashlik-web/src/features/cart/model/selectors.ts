import type { Addon } from "@/entities/addon/model"
import type { Product } from "@/entities/product/model"
import { findSize, findVariant, priceOf } from "@/entities/product/lib"
import { addonById } from "@/mocks/addons"
import { productById } from "@/mocks/products"
import { ORDER_RULES } from "@/shared/config/site"

import type { CartItem } from "./store"
import { useCartStore } from "./store"

export type ResolvedAddon = { addon: Addon; quantity: number }

export type ResolvedLine = {
  line: CartItem
  product: Product
  variantLabel?: string
  sizeLabel: string
  unitPrice: number
  addons: ResolvedAddon[]
  /** Цена строки с добавками и количеством. */
  total: number
}

export function resolveLine(line: CartItem): ResolvedLine | null {
  const product = productById(line.productId)
  if (!product) return null
  const variant = findVariant(product, line.variantId)
  const size = findSize(product, line.sizeId)
  const unitPrice = priceOf(size, variant)
  const addons = line.addons
    .map((a) => {
      const addon = addonById(a.addonId)
      return addon ? { addon, quantity: a.quantity } : null
    })
    .filter((a): a is ResolvedAddon => a !== null)
  const addonsTotal = addons.reduce((sum, a) => sum + a.addon.price * a.quantity, 0)
  return {
    line,
    product,
    variantLabel: product.variants.length > 1 ? variant?.label : variant?.label,
    sizeLabel: size.label,
    unitPrice,
    addons,
    total: unitPrice * line.quantity + addonsTotal,
  }
}

export type CartTotals = {
  lines: ResolvedLine[]
  count: number
  goods: number
  packFee: number
  deliveryFee: number
  freeDeliveryLeft: number
  discount: number
  total: number
}

export function useCartTotals(): CartTotals {
  const items = useCartStore((s) => s.items)
  const mode = useCartStore((s) => s.mode)
  const promo = useCartStore((s) => s.promo)

  const lines = items.map(resolveLine).filter((l): l is ResolvedLine => l !== null)
  const count = lines.reduce((sum, l) => sum + l.line.quantity, 0)
  const goods = lines.reduce((sum, l) => sum + l.total, 0)

  const packFee = lines.length ? ORDER_RULES.packFee : 0
  const freeDeliveryLeft = Math.max(ORDER_RULES.freeDeliveryFrom - goods, 0)
  const deliveryFee =
    mode === "delivery" && lines.length && freeDeliveryLeft > 0 ? ORDER_RULES.deliveryFee : 0
  const discount =
    promo === ORDER_RULES.promo.code ? Math.round((goods * ORDER_RULES.promo.percent) / 100) : 0

  return {
    lines,
    count,
    goods,
    packFee,
    deliveryFee,
    freeDeliveryLeft,
    discount,
    total: Math.max(goods + packFee + deliveryFee - discount, 0),
  }
}
