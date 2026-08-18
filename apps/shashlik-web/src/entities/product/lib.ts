import type { Product, ProductSize, ProductVariant } from "./model"

export function priceOf(size: ProductSize, variant?: ProductVariant): number {
  return size.price + (variant?.priceDelta ?? 0)
}

/** Минимальная цена по всем комбинациям — «от 340₽» на карточке. */
export function minPrice(product: Product): number {
  const deltas = product.variants.length ? product.variants.map((v) => v.priceDelta) : [0]
  const prices = product.sizes.flatMap((s) => deltas.map((d) => s.price + d))
  return Math.min(...prices)
}

/** Карточке нужен выбор, если есть больше одного варианта или размера. */
export function needsChooser(product: Product): boolean {
  return product.variants.length > 1 || product.sizes.length > 1
}

export function findVariant(product: Product, id?: string): ProductVariant | undefined {
  return product.variants.find((v) => v.id === id) ?? product.variants[0]
}

export function findSize(product: Product, id?: string): ProductSize {
  return product.sizes.find((s) => s.id === id) ?? product.sizes[0]
}

/** Подпись строки корзины: «Арабская • Курица • L». */
export function cartLineTitle(product: Product, variantId?: string, sizeId?: string): string {
  const variant = findVariant(product, variantId)
  const size = findSize(product, sizeId)
  return [product.name, variant?.label, size?.label].filter(Boolean).join(" • ")
}
