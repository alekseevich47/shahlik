import { useMemo, useState } from "react"

import { ALL_CATEGORY } from "@/entities/category/model"
import { useProducts } from "@/entities/product/api"
import { ALL_TAG, type TagFilterId } from "@/entities/tag/model"
import { CartPanel } from "@/features/cart/ui/CartPanel"
import { SearchDialog } from "@/features/search/SearchDialog"
import { useIsDesktop } from "@/shared/hooks/useMediaQuery"
import { Sheet, SheetContent, SheetTitle } from "@/shared/ui/sheet"
import { CategoryTiles } from "@/widgets/catalog/CategoryTiles"
import { MobileHeader } from "@/widgets/mobile/MobileHeader"
import { MobileTabBar, type MobileTab } from "@/widgets/mobile/MobileTabBar"

import { DesktopHome } from "./ui/DesktopHome"
import { MobileHome } from "./ui/MobileHome"

export default function HomePage() {
  const { data: products = [] } = useProducts()
  const [category, setCategory] = useState<string>(ALL_CATEGORY)
  const [tag, setTag] = useState<TagFilterId>(ALL_TAG)
  const [searchOpen, setSearchOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [tab, setTab] = useState<MobileTab>("home")
  const isDesktop = useIsDesktop()

  const items = useMemo(() => {
    const list = products.filter((p) => {
      if (!p.active) return false
      if (category !== ALL_CATEGORY && p.categoryId !== category) return false
      if (tag !== ALL_TAG && !p.tags.includes(tag)) return false
      return true
    })
    return list
  }, [products, category, tag])

  const selectCategory = (id: string) => {
    setCategory(id)
    setTag(ALL_TAG)
    setMenuOpen(false)
  }

  const handleTab = (next: MobileTab) => {
    setTab(next)
    if (next === "cart") setCartOpen(true)
    if (next === "menu") setMenuOpen(true)
    if (next === "home") window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-dvh bg-canvas">
      {!isDesktop ? (
        <MobileHeader onOpenMenu={() => setMenuOpen(true)} onOpenCart={() => setCartOpen(true)} />
      ) : null}

      {isDesktop ? (
        <DesktopHome
          category={category}
          onCategoryChange={selectCategory}
          tag={tag}
          onTagChange={setTag}
          items={items}
          onOpenSearch={() => setSearchOpen(true)}
          onOpenCart={() => setCartOpen(true)}
        />
      ) : (
        <MobileHome
          category={category}
          onCategoryChange={selectCategory}
          tag={tag}
          onTagChange={setTag}
          items={items}
        />
      )}

      {!isDesktop ? <MobileTabBar value={tab} onChange={handleTab} /> : null}

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />

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
