import type { Order } from "@/entities/order/model"
import { useCartStore } from "@/features/cart/model/store"

/** Кладёт снапшот заказа в корзину (без очистки контактов/режима — только позиции). */
export function repeatOrderIntoCart(order: Order): void {
  const store = useCartStore.getState()
  store.clear()
  for (const line of order.lines) {
    store.add({
      productId: line.productId,
      variantId: line.variantId,
      sizeId: line.sizeId,
      quantity: line.quantity,
      addons: line.addons.map((addon) => ({
        addonId: addon.id,
        quantity: addon.quantity,
      })),
    })
  }
  store.setMode(order.mode)
  if (order.mode === "delivery" && order.addressParts) {
    store.setAddressParts({
      street: order.addressParts.street ?? "",
      home: order.addressParts.home ?? "",
      pod: order.addressParts.pod ?? "",
      et: order.addressParts.et ?? "",
      apart: order.addressParts.apart ?? "",
    })
  }
}
