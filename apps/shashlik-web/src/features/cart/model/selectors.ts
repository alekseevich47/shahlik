import { addonKeys, useAddons } from "@/entities/addon/api"
import type { Addon } from "@/entities/addon/model"
import { calcCouponDiscount } from "@/entities/coupon/model"
import { productKeys, useProducts } from "@/entities/product/api"
import { findSize, findVariant, priceOf } from "@/entities/product/lib"
import type { Product } from "@/entities/product/model"
import { useSettings } from "@/entities/settings/api"
import { settingsFallback } from "@/entities/settings/model"
import { queryClient } from "@/shared/api/query-client"

import type { CartItem } from "./store"
import { useCartStore } from "./store"

function productFromCache(id: string): Product | undefined {
  for (const [, data] of queryClient.getQueriesData<Product | Product[] | null>({
    queryKey: productKeys.all,
  })) {
    if (Array.isArray(data)) {
      const found = data.find((p) => p.id === id)
      if (found) return found
    } else if (data && data.id === id) {
      return data
    }
  }
  return undefined
}

function addonFromCache(id: string): Addon | undefined {
  for (const [, data] of queryClient.getQueriesData<Addon | Addon[] | null>({
    queryKey: addonKeys.all,
  })) {
    if (Array.isArray(data)) {
      const found = data.find((a) => a.id === id)
      if (found) return found
    } else if (data && data.id === id) {
      return data
    }
  }
  return undefined
}

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
  const product = productFromCache(line.productId)
  if (!product) return null
  const variant = findVariant(product, line.variantId)
  const size = findSize(product, line.sizeId)
  const unitPrice = priceOf(size, variant)
  const addons = line.addons
    .map((a) => {
      const addon = addonFromCache(a.addonId)
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
  minOrder: number
  acceptingOrders: boolean
  stopMessage: string
}

export function useCartTotals(): CartTotals {
  const items = useCartStore((s) => s.items)
  const mode = useCartStore((s) => s.mode)
  const appliedCoupon = useCartStore((s) => s.appliedCoupon)
  useProducts()
  useAddons()
  const { data: settings = settingsFallback() } = useSettings()

  const lines = items.map(resolveLine).filter((l): l is ResolvedLine => l !== null)
  const count = lines.reduce((sum, l) => sum + l.line.quantity, 0)
  const goods = lines.reduce((sum, l) => sum + l.total, 0)

  const packFee = 0
  const freeDeliveryLeft = Math.max(settings.freeDeliveryFrom - goods, 0)
  const deliveryFee =
    mode === "delivery" && lines.length && freeDeliveryLeft > 0 ? settings.deliveryFee : 0
  const discount = calcCouponDiscount(goods, appliedCoupon)

  return {
    lines,
    count,
    goods,
    packFee,
    deliveryFee,
    freeDeliveryLeft,
    discount,
    total: Math.max(goods + packFee + deliveryFee - discount, 0),
    minOrder: settings.minOrder,
    acceptingOrders: settings.acceptingOrders,
    stopMessage: settings.stopMessage,
  }
}
