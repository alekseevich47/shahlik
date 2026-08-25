import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

import { useAccount } from "@/app/providers/account"
import { acceptAuthToken } from "@/entities/account/api"

/** После OAuth: Яндекс (попап) или VK ID (`?token=` с хука) — уводим в профиль. */
export default function AuthCallbackPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { ready, user } = useAccount()
  const [error, setError] = useState("")

  useEffect(() => {
    const token = searchParams.get("token")?.trim()
    if (!token) return

    let cancelled = false
    void (async () => {
      try {
        await acceptAuthToken(token)
        if (!cancelled) navigate("/profile", { replace: true })
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Не удалось войти")
        }
      }
    })()

    return () => {
      cancelled = true
    }
  }, [searchParams, navigate])

  useEffect(() => {
    if (searchParams.get("token")) return
    if (!ready) return
    navigate("/profile", { replace: true })
  }, [ready, user, navigate, searchParams])

  if (error) {
    return (
      <div className="grid min-h-dvh place-items-center bg-canvas px-4">
        <div className="max-w-sm text-center">
          <p className="text-[14px] font-semibold text-red">{error}</p>
          <button
            type="button"
            className="mt-4 text-[13px] font-bold text-brand"
            onClick={() => navigate("/profile", { replace: true })}
          >
            В личный кабинет
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="grid min-h-dvh place-items-center bg-canvas">
      <span className="size-8 animate-spin rounded-full border-2 border-line border-t-brand" />
    </div>
  )
}
