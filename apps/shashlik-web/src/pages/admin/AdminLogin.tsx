import { type FormEvent, useState } from "react"
import { Link } from "react-router-dom"

import { authErrorMessage, useAdminAuth } from "@/shared/api/auth"
import { SITE } from "@/shared/config/site"
import { Button } from "@/shared/ui/button"
import { Field, Input } from "@/shared/ui/input"

export default function AdminLogin() {
  const { login } = useAdminAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [pending, setPending] = useState(false)

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    setError("")
    setPending(true)
    try {
      await login(email.trim(), password)
    } catch (err) {
      setError(authErrorMessage(err))
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="grid min-h-dvh place-items-center bg-canvas px-4">
      <form
        onSubmit={onSubmit}
        className="flex w-full max-w-sm flex-col gap-4 rounded-[var(--r-2xl)] border border-line bg-surface p-6 shadow-card"
      >
        <div className="flex flex-col items-center gap-1">
          <img src={SITE.brandLogo} alt={SITE.name} className="h-14 w-auto object-contain" />
          <h1 className="text-[18px] font-extrabold text-fg">Вход в админку</h1>
        </div>

        <Field label="Почта">
          <Input
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>

        <Field label="Пароль">
          <Input
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>

        {error ? <p className="text-[12.5px] font-semibold text-red">{error}</p> : null}

        <Button type="submit" variant="brand" block disabled={pending}>
          {pending ? "Входим…" : "Войти"}
        </Button>

        <Link
          to="/"
          className="text-center text-[12.5px] font-bold text-fg-muted transition-colors hover:text-brand"
        >
          На сайт
        </Link>
      </form>
    </div>
  )
}
