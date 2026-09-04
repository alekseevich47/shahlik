import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"

import { useAccount } from "@/app/providers/account"
import { usePublicBonusSettings } from "@/entities/bonus/api"
import { publicBonusSettingsFallback } from "@/entities/bonus/model"
import { useCartStore } from "@/features/cart/model/store"

import {
  ENGAGEMENT_DELAY_MS,
  isPwaDismissedForever,
  isStandaloneDisplay,
  markSessionShown,
  PWA_SESSION_KEY,
  REG_SESSION_KEY,
  wasSessionShown,
} from "../lib/storage"
import { InstallAppModal } from "./InstallAppModal"
import { RegistrationBonusModal } from "./RegistrationBonusModal"

/** Сессионные модалки: гость → регистрация после первого add; юзер → установка приложения. */
export function EngagementHost() {
  const { pathname } = useLocation()
  const { user, ready } = useAccount()
  const { data: settings = publicBonusSettingsFallback() } = usePublicBonusSettings()
  const cartCount = useCartStore((s) => s.items.length)
  const prevCartCount = useRef(cartCount)

  const [regOpen, setRegOpen] = useState(false)
  const [pwaOpen, setPwaOpen] = useState(false)

  const onAdmin = pathname.startsWith("/admin")
  const onAuth = pathname.startsWith("/auth")

  // Гость: после первого добавления в корзину (0 → >0), раз за сессию.
  useEffect(() => {
    const prev = prevCartCount.current
    prevCartCount.current = cartCount

    if (!ready || onAdmin || onAuth || user) return
    if (!settings.enabled || settings.registrationAmount <= 0) return
    if (wasSessionShown(REG_SESSION_KEY)) return
    if (!(prev === 0 && cartCount > 0)) return

    markSessionShown(REG_SESSION_KEY)
    setRegOpen(true)
  }, [
    ready,
    user,
    cartCount,
    onAdmin,
    onAuth,
    settings.enabled,
    settings.registrationAmount,
  ])

  // Авторизованный: PWA через ~45 с.
  useEffect(() => {
    if (!ready || onAdmin || onAuth || !user || !settings.enabled) return
    if (isStandaloneDisplay()) return
    if (user.pwaInstallClaimed) return
    if (isPwaDismissedForever()) return
    if (wasSessionShown(PWA_SESSION_KEY)) return
    if (settings.pwaInstallAmount <= 0) return

    const timer = window.setTimeout(() => {
      if (wasSessionShown(PWA_SESSION_KEY)) return
      markSessionShown(PWA_SESSION_KEY)
      setPwaOpen(true)
    }, ENGAGEMENT_DELAY_MS)

    return () => window.clearTimeout(timer)
  }, [
    ready,
    user,
    onAdmin,
    onAuth,
    settings.enabled,
    settings.pwaInstallAmount,
  ])

  if (onAdmin) return null

  return (
    <>
      <RegistrationBonusModal
        open={regOpen}
        onOpenChange={setRegOpen}
        amount={settings.registrationAmount}
      />
      <InstallAppModal
        open={pwaOpen}
        onOpenChange={setPwaOpen}
        amount={settings.pwaInstallAmount}
      />
    </>
  )
}
