import { useState } from "react"
import { ClientResponseError } from "pocketbase"

import { loginWithOAuth } from "@/entities/account/api"
import type { OAuthProvider } from "@/entities/account/model"
import { SITE } from "@/shared/config/site"
import { Button } from "@/shared/ui/button"

const PROVIDERS: ReadonlyArray<{ id: OAuthProvider; label: string }> = [
  { id: "vk", label: "Войти через VK" },
  { id: "yandex", label: "Войти через Яндекс" },
]

function oauthErrorMessage(err: unknown): string {
  if (err instanceof ClientResponseError) {
    const msg = String(err.response?.message || err.message || "").trim()
    if (err.status === 0 || /realtime|abort|interrupted/i.test(msg)) {
      return "Связь с сервером оборвалась (часто WebSocket /api/). Проверь Nginx Upgrade."
    }
    if (msg && msg !== "Something went wrong.") return msg
    if (err.status) return `Ошибка входа (${err.status})`
    return "Не удалось завершить вход"
  }
  if (err instanceof Error && err.message) return err.message
  return "Не удалось войти"
}

export function LoginPanel() {
  const [pending, setPending] = useState<OAuthProvider | null>(null)
  const [error, setError] = useState("")

  async function onLogin(provider: OAuthProvider) {
    setError("")
    setPending(provider)
    try {
      await loginWithOAuth(provider)
    } catch (err) {
      setError(oauthErrorMessage(err))
    } finally {
      setPending(null)
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-4 rounded-[var(--r-2xl)] border border-line bg-surface p-6 shadow-card">
      <div className="flex flex-col gap-1 text-center items-center">
        <img src={SITE.brandLogo} alt={SITE.name} className="h-14 w-auto object-contain" />
        <h1 className="text-[18px] font-extrabold text-fg">Личный кабинет</h1>
        <p className="text-[12.5px] leading-[1.45] text-fg-muted">
          По телефону заказать можно без входа. Баллы, история и сохранённые адреса — только после
          авторизации.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {PROVIDERS.map((provider) => (
          <Button
            key={provider.id}
            type="button"
            variant={provider.id === "vk" ? "brand" : "outline"}
            block
            disabled={pending !== null}
            onClick={() => void onLogin(provider.id)}
          >
            {pending === provider.id ? "Открываем…" : provider.label}
          </Button>
        ))}
      </div>

      {error ? <p className="text-[12.5px] font-semibold text-red">{error}</p> : null}
    </div>
  )
}
