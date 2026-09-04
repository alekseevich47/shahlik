import { useState } from "react"
import { ClientResponseError } from "pocketbase"

import { loginWithOAuth } from "@/entities/account/api"
import { VkOneTap } from "@/entities/account/ui/VkOneTap"
import { Button } from "@/shared/ui/button"

function oauthErrorMessage(err: unknown): string {
  if (err instanceof ClientResponseError) {
    const msg = String(err.response?.message || err.message || "").trim()
    if (err.status === 0 || /realtime|abort|interrupted/i.test(msg)) {
      return "Связь с сервером оборвалась. Попробуйте ещё раз."
    }
    if (msg && msg !== "Something went wrong.") return msg
    if (err.status) return `Ошибка входа (${err.status})`
    return "Не удалось завершить вход"
  }
  if (err instanceof Error && err.message) return err.message
  return "Не удалось войти"
}

type AuthButtonsProps = {
  className?: string
}

/** Компактный блок VK One Tap + Яндекс ID для модалок и профиля. */
export function AuthButtons({ className }: AuthButtonsProps) {
  const [pendingYandex, setPendingYandex] = useState(false)
  const [error, setError] = useState("")

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
    <div className={className}>
      <div className="flex flex-col gap-2.5">
        <VkOneTap disabled={pendingYandex} onError={setError} />
        <Button
          type="button"
          variant="outline"
          className="w-full"
          disabled={pendingYandex}
          onClick={() => void onYandexLogin()}
        >
          {pendingYandex ? "Открываем…" : "Яндекс ID"}
        </Button>
      </div>
      {error ? <p className="mt-2 text-[12.5px] font-semibold text-red">{error}</p> : null}
    </div>
  )
}
