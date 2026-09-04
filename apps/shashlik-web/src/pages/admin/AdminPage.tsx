import { LazyMotion } from "motion/react"
import { type ReactNode, useEffect, useState } from "react"
import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom"

import { useAdminProducts } from "@/entities/product/api"
import type { AdminSectionId } from "./model"
import { ADMIN_NAV } from "./model"
import { ProductEditor } from "./sections/ProductEditor"
import { AddonsSection } from "./sections/addons/AddonsSection"
import { BannersSection } from "./sections/banners/BannersSection"
import { CategoriesSection } from "./sections/categories/CategoriesSection"
import { BonusesSection } from "./sections/bonuses/BonusesSection"
import { CouponsSection } from "./sections/coupons/CouponsSection"
import { CustomersSection } from "./sections/customers/CustomersSection"
import { DashboardSection } from "./sections/dashboard/DashboardSection"
import { LogsSection } from "./sections/activity-logs/LogsSection"
import { OrdersSection } from "./sections/orders/OrdersSection"
import { ProductsSection } from "./sections/products/ProductsSection"
import { ReviewsSection } from "./sections/reviews/ReviewsSection"
import { SettingsSection } from "./sections/settings/SettingsSection"
import { StaffSection } from "./sections/staff/StaffSection"
import { AdminSidebar } from "./ui/AdminSidebar"
import { AdminTopbar } from "./ui/AdminTopbar"
import { can, useAdminAuth } from "@/shared/api/auth"
import { useAdminCounts } from "@/shared/api/counts"
import { useIsDesktop } from "@/shared/hooks/useMediaQuery"
import { Sheet, SheetContent, SheetTitle } from "@/shared/ui/sheet"

const loadDomMax = () => import("@/app/motion-features-max").then((mod) => mod.default)

export default function AdminPage() {
  const { role } = useAdminAuth()
  const { data: countsData } = useAdminCounts()
  const isDesktop = useIsDesktop()
  const location = useLocation()
  const [navOpen, setNavOpen] = useState(false)

  useEffect(() => {
    setNavOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (isDesktop) setNavOpen(false)
  }, [isDesktop])

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
        {isDesktop ? (
          <AdminSidebar role={role ?? "manager"} counts={counts} />
        ) : (
          <Sheet open={navOpen} onOpenChange={setNavOpen}>
            <SheetContent
              side="left"
              hideClose
              overlayClassName="backdrop-blur-md"
              className="gap-0 border-0 bg-surface-2 p-0 shadow-[var(--shadow-panel)]"
            >
              <SheetTitle className="sr-only">Навигация админ-панели</SheetTitle>
              <AdminSidebar
                role={role ?? "manager"}
                counts={counts}
                mode="drawer"
                onNavigate={() => setNavOpen(false)}
              />
            </SheetContent>
          </Sheet>
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          <AdminTopbar
            showMenu={!isDesktop}
            onMenuClick={() => setNavOpen(true)}
          />

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
                path="bonuses"
                element={
                  <GuardedSection id="bonuses">
                    <BonusesSection />
                  </GuardedSection>
                }
              />
              <Route
                path="logs"
                element={
                  <GuardedSection id="logs">
                    <LogsSection />
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
