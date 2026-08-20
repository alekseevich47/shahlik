import { LazyMotion } from "motion/react"
import type { ReactNode } from "react"
import { Navigate, Route, Routes, useNavigate, useParams } from "react-router-dom"

import { useAdminProducts } from "@/entities/product/api"
import type { AdminSectionId } from "./model"
import { ADMIN_NAV } from "./model"
import { ProductEditor } from "./sections/ProductEditor"
import { AddonsSection } from "./sections/addons/AddonsSection"
import { BannersSection } from "./sections/banners/BannersSection"
import { CategoriesSection } from "./sections/categories/CategoriesSection"
import { CouponsSection } from "./sections/coupons/CouponsSection"
import { CustomersSection } from "./sections/customers/CustomersSection"
import { DashboardSection } from "./sections/dashboard/DashboardSection"
import { OrdersSection } from "./sections/orders/OrdersSection"
import { ProductsSection } from "./sections/products/ProductsSection"
import { ReviewsSection } from "./sections/reviews/ReviewsSection"
import { SettingsSection } from "./sections/settings/SettingsSection"
import { StaffSection } from "./sections/staff/StaffSection"
import { AdminSidebar } from "./ui/AdminSidebar"
import { AdminTopbar } from "./ui/AdminTopbar"
import { can, useAdminAuth } from "@/shared/api/auth"
import { useAdminCounts } from "@/shared/api/counts"

const loadDomMax = () => import("@/app/motion-features-max").then((mod) => mod.default)

export default function AdminPage() {
  const { role } = useAdminAuth()
  const { data: countsData } = useAdminCounts()

  const counts: Partial<Record<AdminSectionId, number>> = {
    products: countsData?.products,
    addons: countsData?.addons,
    categories: countsData?.categories,
    banners: countsData?.banners,
    orders: countsData?.orders,
    reviews: countsData?.reviews,
  }

  return (
    <LazyMotion features={loadDomMax} strict>
      <div className="flex min-h-dvh bg-canvas">
        <AdminSidebar role={role ?? "manager"} counts={counts} />

        <div className="flex min-w-0 flex-1 flex-col">
          <AdminTopbar />

          <main className="flex-1 p-4">
            <Routes>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<DashboardSection />} />
              <Route path="products" element={<ProductsSection />} />
              <Route path="products/:id" element={<ProductEditorRoute />} />
              <Route path="addons" element={<AddonsSection />} />
              <Route path="categories" element={<CategoriesSection />} />
              <Route path="banners" element={<BannersSection />} />
              <Route path="orders" element={<OrdersSection />} />
              <Route path="reviews" element={<ReviewsSection />} />
              <Route
                path="customers"
                element={
                  <GuardedSection id="customers">
                    <CustomersSection />
                  </GuardedSection>
                }
              />
              <Route
                path="coupons"
                element={
                  <GuardedSection id="coupons">
                    <CouponsSection />
                  </GuardedSection>
                }
              />
              <Route
                path="staff"
                element={
                  <GuardedSection id="staff">
                    <StaffSection />
                  </GuardedSection>
                }
              />
              <Route
                path="settings"
                element={
                  <GuardedSection id="settings">
                    <SettingsSection />
                  </GuardedSection>
                }
              />
              <Route path="*" element={<Navigate to="dashboard" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </LazyMotion>
  )
}

function GuardedSection({
  id,
  children,
}: {
  id: AdminSectionId
  children?: ReactNode
}) {
  if (!can(id, "view")) return <Navigate to="/admin/dashboard" replace />
  return <>{children ?? <SectionStub id={id} />}</>
}

function ProductEditorRoute() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: products = [], isPending } = useAdminProducts()
  const product = products.find((item) => item.id === id)

  if (isPending) return null
  if (!product) return <Navigate to="/admin/products" replace />

  return <ProductEditor product={product} onBack={() => navigate("/admin/products")} />
}

function SectionStub({ id }: { id: AdminSectionId }) {
  const label = ADMIN_NAV.find((item) => item.id === id)?.label ?? id
  return (
    <div className="rounded-[var(--r-md)] border border-dashed border-line bg-surface px-5 py-8 text-[13px] text-fg-muted">
      {label}
    </div>
  )
}
