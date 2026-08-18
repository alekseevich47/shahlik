import { BrowserRouter } from "react-router-dom"
import { Toaster } from "sonner"

import { TooltipProvider } from "@/shared/ui/tooltip"

import { ThemeProvider } from "./providers/theme"
import { AppRoutes } from "./router"
import { ScrollToTop } from "./ScrollToTop"

export default function App() {
  return (
    <ThemeProvider>
      <TooltipProvider delayDuration={200}>
        <BrowserRouter>
          <ScrollToTop />
          <AppRoutes />
        </BrowserRouter>
        <Toaster
          position="bottom-right"
          toastOptions={{
            className:
              "!rounded-[var(--r-md)] !border !border-line !bg-surface !text-fg !font-semibold !text-[13px] !shadow-[var(--shadow-pop)]",
          }}
        />
      </TooltipProvider>
    </ThemeProvider>
  )
}
