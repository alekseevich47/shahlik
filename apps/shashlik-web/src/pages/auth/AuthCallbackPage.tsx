import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { useAccount } from "@/app/providers/account"

/** После OAuth (VK / Яндекс) провайдер возвращает сюда — уводим в профиль. */
export default function AuthCallbackPage() {
  const navigate = useNavigate()
  const { ready, user } = useAccount()

  useEffect(() => {
    if (!ready) return
    navigate("/profile", { replace: true })
  }, [ready, user, navigate])

  return (
    <div className="grid min-h-dvh place-items-center bg-canvas">
      <span className="size-8 animate-spin rounded-full border-2 border-line border-t-brand" />
    </div>
  )
}
