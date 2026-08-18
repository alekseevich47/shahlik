import { useState } from "react"

import type { Product } from "@/entities/product/model"
import { addons } from "@/mocks/addons"
import { banners } from "@/mocks/banners"
import { categories } from "@/mocks/categories"
import { orders, reviews } from "@/mocks/orders"
import { products } from "@/mocks/products"

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

const COUNTS: Record<AdminTabId, number> = {
  products: products.length,
  categories: categories.length,
  banners: banners.length,
  addons: addons.length,
  orders: orders.length,
  reviews: reviews.length,
}

export default function AdminPage() {
  const [nav, setNav] = useState("products")
  const [tab, setTab] = useState<AdminTabId>("products")
  const [editing, setEditing] = useState<Product | null>(products[3] ?? null)

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
          <AdminTabs value={tab} onChange={selectTab} counts={COUNTS} />
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
