import { CART_PANEL_GAP, CART_PANEL_WIDTH, useCartPanelStore } from "@/features/cart/model/panel"

import { CartPanel } from "./CartPanel"

/**
 * Sticky-колонка в треке `--cart-track`. Translate — на внутреннем слое:
 * сам aside остаётся sticky, иначе transform срывает прилипание.
 */
export function CartDock() {
  const open = useCartPanelStore((s) => s.open)

  return (
    <aside
      className="sticky top-5 z-10 h-[calc(100dvh-40px)] shrink-0 self-start justify-self-start"
      style={{ width: CART_PANEL_WIDTH, marginLeft: CART_PANEL_GAP }}
      inert={!open}
      aria-hidden={!open}
    >
      <div className="cart-dock h-full">
        <CartPanel className="h-full" />
      </div>
    </aside>
  )
}
