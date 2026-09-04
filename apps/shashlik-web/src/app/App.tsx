import { QueryClientProvider } from "@tanstack/react-query"
import { MotionConfig } from "motion/react"
import { BrowserRouter } from "react-router-dom"
import { Toaster } from "sonner"

import { EngagementHost } from "@/features/engagement/ui/EngagementHost"
import { AdminAuthProvider } from "@/shared/api/auth"
import { queryClient } from "@/shared/api/query-client"
import { GlassDefs } from "@/shared/ui/glass"
import { TooltipProvider } from "@/shared/ui/tooltip"

import { AccountProvider } from "./providers/account"
import { ThemeProvider } from "./providers/theme"
import { AppRoutes } from "./router"
import { ScrollToTop } from "./ScrollToTop"

export default function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AdminAuthProvider>
          <AccountProvider>
            <GlassDefs />
            <TooltipProvider delayDuration={200}>
              <MotionConfig reducedMotion="user">
                <BrowserRouter>
                  <ScrollToTop />
                  <AppRoutes />
                  <EngagementHost />
                </BrowserRouter>
              </MotionConfig>
              <Toaster
                position="bottom-right"
                toastOptions={{
                  className:
                    "!rounded-[var(--r-md)] !border !border-line !bg-surface !text-fg !font-semibold !text-[13px] !shadow-[var(--shadow-pop)]",
                }}
              />
            </TooltipProvider>
          </AccountProvider>
        </AdminAuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
