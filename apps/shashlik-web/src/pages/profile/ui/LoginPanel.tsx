import { useState } from "react"
import { useSearchParams } from "react-router-dom"

import { AuthButtons } from "@/features/engagement/ui/AuthButtons"
import { SITE } from "@/shared/config/site"

export function LoginPanel() {
  const [searchParams] = useSearchParams()
  const [error] = useState(() => searchParams.get("auth_error")?.trim() || "")

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

      <AuthButtons />

      {error ? <p className="text-[12.5px] font-semibold text-red">{error}</p> : null}
    </div>
  )
}
