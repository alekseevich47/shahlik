import { useCallback, useEffect, useMemo, useState } from "react"

import { useProducts } from "@/entities/product/api"
import { useFrontpadStockRealtime } from "@/entities/product/lib/stock"
import { CartPanel } from "@/features/cart/ui/CartPanel"
import { useCheckoutDialogStore } from "@/features/checkout/model/dialog"
import { CheckoutDialog } from "@/features/checkout/ui/CheckoutDialog"
import { SearchDialog } from "@/features/search/SearchDialog"
import { useIsDesktop } from "@/shared/hooks/useMediaQuery"
import { Sheet, SheetContent, SheetTitle } from "@/shared/ui/sheet"
import { CategoryTiles } from "@/widgets/catalog/CategoryTiles"
import { MobileHeader } from "@/widgets/mobile/MobileHeader"
import { MobileTabBar, type MobileTab } from "@/widgets/mobile/MobileTabBar"

import { VitrineScrollProvider, useVitrineScroll } from "./lib/VitrineScroll"
import { DesktopHome } from "./ui/DesktopHome"
import { MobileHome } from "./ui/MobileHome"

function HomeMobileTabBar({
  value,
  onTab,
  onOpenCart,
  onOpenMenu,
}: {
  value: MobileTab
  onTab: (tab: MobileTab) => void
  onOpenCart: () => void
  onOpenMenu: () => void
}) {
  const vitrineScroll = useVitrineScroll()

  const handleTab = (next: MobileTab) => {
    onTab(next)
    if (next === "cart") onOpenCart()
    if (next === "menu") onOpenMenu()
    if (next === "home") vitrineScroll?.scrollToTop()
  }

  return <MobileTabBar value={value} onChange={handleTab} />
}

export default function HomePage() {
  useFrontpadStockRealtime()
  const { data: products = [] } = useProducts()
  const [category, setCategory] = useState("shawarma")
  const [searchOpen, setSearchOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [tab, setTab] = useState<MobileTab>("home")
  const isDesktop = useIsDesktop()
  const checkoutOpen = useCheckoutDialogStore((s) => s.open)
  const setCheckoutOpen = useCheckoutDialogStore((s) => s.setOpen)

  useEffect(() => {
    if (checkoutOpen) setCartOpen(false)
  }, [checkoutOpen])

  const items = useMemo(() => products.filter((p) => p.active), [products])

  const selectCategory = useCallback((id: string) => {
    setCategory(id)
    setMenuOpen(false)
  }, [])

  const scrollPaused = cartOpen || menuOpen || checkoutOpen

  return (
    <div className="min-h-dvh bg-canvas">
      {!isDesktop ? (
        <MobileHeader onOpenMenu={() => setMenuOpen(true)} onOpenCart={() => setCartOpen(true)} />
      ) : null}

      <VitrineScrollProvider paused={scrollPaused}>
        {isDesktop ? (
          <DesktopHome
            category={category}
            onCategoryChange={selectCategory}
            items={items}
            onOpenSearch={() => setSearchOpen(true)}
            onOpenCart={() => setCartOpen(true)}
          />
        ) : (
          <MobileHome category={category} onCategoryChange={selectCategory} items={items} />
        )}

        {!isDesktop ? (
          <HomeMobileTabBar
            value={tab}
            onTab={setTab}
            onOpenCart={() => setCartOpen(true)}
            onOpenMenu={() => setMenuOpen(true)}
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

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="bottom" className="gap-4 p-5">
          <SheetTitle className="text-[18px] font-extrabold text-fg">Категории</SheetTitle>
          <CategoryTiles value={category} onChange={selectCategory} className="-mx-5 px-5" />
        </SheetContent>
      </Sheet>
    </div>
  )
}
