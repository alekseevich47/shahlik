import { lazy, Suspense } from "react"
import { Navigate, Route, Routes } from "react-router-dom"

const HomePage = lazy(() => import("@/pages/home/HomePage"))
const ProductPage = lazy(() => import("@/pages/product/ProductPage"))
const AdminPage = lazy(() => import("@/pages/admin/AdminPage"))

export function AppRoutes() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:slug" element={<ProductPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}

function RouteFallback() {
  return (
    <div className="grid min-h-dvh place-items-center bg-canvas">
      <span className="size-8 animate-spin rounded-full border-2 border-line border-t-brand" />
    </div>
  )
}
