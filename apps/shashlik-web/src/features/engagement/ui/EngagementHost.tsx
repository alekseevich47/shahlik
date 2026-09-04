import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

import { useAccount } from "@/app/providers/account"
import { usePublicBonusSettings } from "@/entities/bonus/api"
import { publicBonusSettingsFallback } from "@/entities/bonus/model"

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

/** Сессионные модалки: гость → регистрация; юзер → установка приложения. Не на /admin. */
export function EngagementHost() {
  const { pathname } = useLocation()
  const { user, ready } = useAccount()
  const { data: settings = publicBonusSettingsFallback() } = usePublicBonusSettings()

  const [regOpen, setRegOpen] = useState(false)
  const [pwaOpen, setPwaOpen] = useState(false)

  const onAdmin = pathname.startsWith("/admin")
  const onAuth = pathname.startsWith("/auth")

  useEffect(() => {
    if (!ready || onAdmin || onAuth || !settings.enabled) return
    if (isStandaloneDisplay()) return

    const timer = window.setTimeout(() => {
      if (!user) {
        if (wasSessionShown(REG_SESSION_KEY)) return
        if (settings.registrationAmount <= 0) return
        markSessionShown(REG_SESSION_KEY)
        setRegOpen(true)
        return
      }
      if (user.pwaInstallClaimed) return
      if (isPwaDismissedForever()) return
      if (wasSessionShown(PWA_SESSION_KEY)) return
      if (settings.pwaInstallAmount <= 0) return
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
    settings.registrationAmount,
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
