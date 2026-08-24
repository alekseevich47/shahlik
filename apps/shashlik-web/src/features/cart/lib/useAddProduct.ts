import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "sonner"

import type { Product } from "@/entities/product/model"
import { needsChooser } from "@/entities/product/lib"
import { useCartStore } from "@/features/cart/model/store"
import { withBackground } from "@/shared/lib/background-location"

/**
 * Быстрое добавление с карточки. Если у товара есть выбор варианта или размера —
 * уводим на страницу товара, где выбор сделан по макету.
 */
export function useAddProduct() {
  const add = useCartStore((s) => s.add)
  const navigate = useNavigate()
  const location = useLocation()

  return (product: Product) => {
    if (needsChooser(product)) {
      navigate(`/product/${product.slug}`, { state: withBackground(location) })
      return
    }
    add({
      productId: product.id,
      variantId: product.variants[0]?.id,
      sizeId: product.sizes[0].id,
      addons: [],
    })
    toast.success(`«${product.name}» в заказе`)
  }
}
