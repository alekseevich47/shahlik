import { useState } from "react"
import { ClientResponseError } from "pocketbase"
import { useSearchParams } from "react-router-dom"

import { loginWithOAuth } from "@/entities/account/api"
import { SITE } from "@/shared/config/site"
import { Button } from "@/shared/ui/button"

import { VkOneTap } from "./VkOneTap"

function oauthErrorMessage(err: unknown): string {
  if (err instanceof ClientResponseError) {
    const msg = String(err.response?.message || err.message || "").trim()
    if (err.status === 0 || /realtime|abort|interrupted/i.test(msg)) {
      return "Связь с сервером оборвалась (realtime /api/). Проверь Nginx (SSE без buffering)."
    }
    if (msg && msg !== "Something went wrong.") return msg
    if (err.status) return `Ошибка входа (${err.status})`
    return "Не удалось завершить вход"
  }
  if (err instanceof Error && err.message) return err.message
  return "Не удалось войти"
}

export function LoginPanel() {
  const [searchParams] = useSearchParams()
  const [pendingYandex, setPendingYandex] = useState(false)
  const [error, setError] = useState(() => searchParams.get("auth_error")?.trim() || "")

  async function onYandexLogin() {
    setError("")
    setPendingYandex(true)
    try {
      await loginWithOAuth("yandex")
    } catch (err) {
      setError(oauthErrorMessage(err))
    } finally {
      setPendingYandex(false)
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-4 rounded-[var(--r-2xl)] border border-line bg-surface p-6 shadow-card">
      <div className="flex flex-col items-center gap-1 text-center">
        <img src={SITE.brandLogo} alt={SITE.name} className="h-14 w-auto object-contain" />
        <h1 className="text-[18px] font-extrabold text-fg">Личный кабинет</h1>
        <p className="text-[12.5px] leading-[1.45] text-fg-muted">
          По телефону заказать можно без входа. Баллы, история и сохранённые адреса — только после
          авторизации.
        </p>
      </div>

      <VkOneTap disabled={pendingYandex} onError={setError} />

      <Button
        type="button"
        variant="outline"
        block
        disabled={pendingYandex}
        onClick={() => void onYandexLogin()}
      >
        {pendingYandex ? "Открываем…" : "Яндекс ID"}
      </Button>

      {error ? <p className="text-[12.5px] font-semibold text-red">{error}</p> : null}
    </div>
  )
}
