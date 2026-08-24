import { lazy, Suspense } from "react"
import { AnimatePresence, LazyMotion } from "motion/react"
import * as m from "motion/react-m"
import { Navigate, Route, Routes, useLocation } from "react-router-dom"

import HomePage from "@/pages/home/HomePage"
import ProductPage, { ProductModal } from "@/pages/product/ProductPage"
import { useAdminAuth } from "@/shared/api/auth"
import { backgroundOf } from "@/shared/lib/background-location"

const AdminPage = lazy(() => import("@/pages/admin/AdminPage"))
const AdminLogin = lazy(() => import("@/pages/admin/AdminLogin"))
const ProfilePage = lazy(() => import("@/pages/profile/ProfilePage"))
const OrderTrackPage = lazy(() => import("@/pages/order/OrderTrackPage"))
const AuthCallbackPage = lazy(() => import("@/pages/auth/AuthCallbackPage"))

/** Движок анимаций подгружается асинхронно; до загрузки переход просто мгновенный. */
const loadMotionFeatures = () => import("@/app/motion-features").then((mod) => mod.default)

const EASE = [0.22, 1, 0.36, 1] as const

/** Клип уходящего маршрута, чтобы высокий Home не держал скроллбар до unmount. */
const EXIT_ABS = {
  position: "absolute" as const,
  inset: 0,
  overflow: "hidden",
}

export function AppRoutes() {
  const location = useLocation()
  const background = backgroundOf(location)
  const displayLocation = background ?? location
  const isProduct = !background && displayLocation.pathname.startsWith("/product/")
  const routeKey = displayLocation.pathname.startsWith("/admin")
    ? "/admin"
    : displayLocation.pathname

  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <div className="relative min-h-dvh">
        <div
          className="relative min-h-dvh"
          data-modal-open={background ? "1" : "0"}
          {...(background ? { inert: true as const } : {})}
        >
          <AnimatePresence initial={false}>
            <m.div
              key={routeKey}
              className="min-h-dvh w-full overflow-x-clip"
              initial={isProduct ? { opacity: 0, y: 28 } : { opacity: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={isProduct ? { opacity: 0, y: 16, ...EXIT_ABS } : { opacity: 0, ...EXIT_ABS }}
              transition={{ duration: isProduct ? 0.36 : 0.2, ease: EASE }}
            >
              <Suspense fallback={<RouteFallback />}>
                <Routes location={displayLocation}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/product/:slug" element={<ProductPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/order/:id" element={<OrderTrackPage />} />
                  <Route path="/auth/callback" element={<AuthCallbackPage />} />
                  <Route path="/admin/*" element={<AdminGate />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
            </m.div>
          </AnimatePresence>
        </div>

        {background ? (
          <Routes>
            <Route path="/product/:slug" element={<ProductModal />} />
          </Routes>
        ) : null}
      </div>
    </LazyMotion>
  )
}

function AdminGate() {
  const { user, ready } = useAdminAuth()
  if (!ready) return <RouteFallback />
  return user ? <AdminPage /> : <AdminLogin />
}

function RouteFallback() {
  return (
    <div className="grid min-h-dvh place-items-center bg-canvas">
      <span className="size-8 animate-spin rounded-full border-2 border-line border-t-brand" />
    </div>
  )
}
