import { useState } from "react"

import { useAddons } from "@/entities/addon/api"
import { useBanners } from "@/entities/banner/api"
import { useCategories } from "@/entities/category/api"
import { useOrders, useReviews } from "@/entities/order/api"
import { useProducts } from "@/entities/product/api"
import type { Product } from "@/entities/product/model"

import type { AdminTabId } from "./model"
import { ADMIN_NAV } from "./model"
import { ProductEditor } from "./sections/ProductEditor"
import {
  AddonsTable,
  BannersTable,
  CategoriesTable,
  OrdersTable,
  ProductsTable,
  ReviewsTable,
} from "./sections/CatalogTables"
import { AdminSidebar } from "./ui/AdminSidebar"
import { AdminTabs } from "./ui/AdminTabs"
import { AdminTopbar } from "./ui/AdminTopbar"

export default function AdminPage() {
  const { data: products = [] } = useProducts()
  const { data: categories = [] } = useCategories()
  const { data: banners = [] } = useBanners()
  const { data: addons = [] } = useAddons()
  const { data: orders = [] } = useOrders()
  const { data: reviews = [] } = useReviews()

  const [nav, setNav] = useState("products")
  const [tab, setTab] = useState<AdminTabId>("products")
  const [editing, setEditing] = useState<Product | null>(null)

  const counts: Record<AdminTabId, number> = {
    products: products.length,
    categories: categories.length,
    banners: banners.length,
    addons: addons.length,
    orders: orders.length,
    reviews: reviews.length,
  }

  const selectNav = (id: string) => {
    setNav(id)
    const target = ADMIN_NAV.find((item) => item.id === id)?.tab
    if (target) {
      setTab(target)
      setEditing(null)
    }
  }

  const selectTab = (next: AdminTabId) => {
    setTab(next)
    setEditing(null)
    const target = ADMIN_NAV.find((item) => item.tab === next)
    if (target) setNav(target.id)
  }

  return (
    <div className="flex min-h-dvh bg-canvas">
      <AdminSidebar active={nav} onSelect={selectNav} />

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar />

        <div className="border-b border-line bg-surface-2 px-4 py-3">
          <AdminTabs value={tab} onChange={selectTab} counts={counts} />
        </div>

        <main className="flex-1 p-4">
          {tab === "products" ? (
            editing ? (
              <ProductEditor product={editing} onBack={() => setEditing(null)} />
            ) : (
              <ProductsTable onOpen={setEditing} />
            )
          ) : null}
          {tab === "categories" ? <CategoriesTable /> : null}
          {tab === "banners" ? <BannersTable /> : null}
          {tab === "addons" ? <AddonsTable /> : null}
          {tab === "orders" ? <OrdersTable /> : null}
          {tab === "reviews" ? <ReviewsTable /> : null}
        </main>
      </div>
    </div>
  )
}
