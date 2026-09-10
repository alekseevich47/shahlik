import { useCallback, useEffect, useMemo, useState } from "react"
import { useLocation } from "react-router-dom"

import { useProducts } from "@/entities/product/api"
import { useFrontpadStockRealtime } from "@/entities/product/lib/stock"
import { CartPanel } from "@/features/cart/ui/CartPanel"
import { useCheckoutDialogStore } from "@/features/checkout/model/dialog"
import { CheckoutDialog } from "@/features/checkout/ui/CheckoutDialog"
import { SearchDialog } from "@/features/search/SearchDialog"
import { backgroundOf } from "@/shared/lib/background-location"
import { useIsDesktop } from "@/shared/hooks/useMediaQuery"
import { Sheet, SheetContent, SheetTitle } from "@/shared/ui/sheet"
import { MobileTabBar, type MobileTab } from "@/widgets/mobile/MobileTabBar"

import { VitrineScrollProvider, useVitrineScroll } from "./lib/VitrineScroll"
import { DesktopHome } from "./ui/DesktopHome"
import { MobileFavorites } from "./ui/MobileFavorites"
import { MobileHome } from "./ui/MobileHome"

function HomeMobileTabBar({
  value,
  onTab,
  onOpenCart,
}: {
  value: MobileTab
  onTab: (tab: MobileTab) => void
  onOpenCart: () => void
}) {
  const vitrineScroll = useVitrineScroll()

  const handleTab = (next: MobileTab) => {
    onTab(next)
    if (next === "cart") onOpenCart()
    if (next === "home") vitrineScroll?.scrollToTop()
  }

  return <MobileTabBar value={value} onChange={handleTab} />
}

export default function HomePage() {
  useFrontpadStockRealtime()
  const location = useLocation()
  const { data: products = [] } = useProducts()
  const [category, setCategory] = useState("shawarma")
  const [searchOpen, setSearchOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [tab, setTab] = useState<MobileTab>("home")
  const isDesktop = useIsDesktop()
  const checkoutOpen = useCheckoutDialogStore((s) => s.open)
  const setCheckoutOpen = useCheckoutDialogStore((s) => s.setOpen)
  const productModalOpen = Boolean(backgroundOf(location))

  useEffect(() => {
    if (checkoutOpen) setCartOpen(false)
  }, [checkoutOpen])

  const items = useMemo(() => products.filter((p) => p.active), [products])

  const selectCategory = useCallback((id: string) => {
    setCategory(id)
  }, [])

  const scrollPaused = cartOpen || checkoutOpen || searchOpen || productModalOpen

  return (
    <div className="min-h-dvh bg-canvas">
      <VitrineScrollProvider paused={scrollPaused}>
        {isDesktop ? (
          <DesktopHome
            category={category}
            onCategoryChange={selectCategory}
            items={items}
            onOpenSearch={() => setSearchOpen(true)}
            onOpenCart={() => setCartOpen(true)}
          />
        ) : tab === "favorites" ? (
          <MobileFavorites />
        ) : (
          <MobileHome category={category} onCategoryChange={selectCategory} items={items} />
        )}

        {!isDesktop ? (
          <HomeMobileTabBar
            value={tab}
            onTab={setTab}
            onOpenCart={() => setCartOpen(true)}
          />
        ) : null}
      </VitrineScrollProvider>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      <CheckoutDialog open={checkoutOpen} onOpenChange={setCheckoutOpen} />

      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetContent side="right" className="p-0">
          <SheetTitle className="sr-only">Мой заказ</SheetTitle>
          <CartPanel className="rounded-none border-0 shadow-none" />
        </SheetContent>
      </Sheet>
    </div>
  )
}
