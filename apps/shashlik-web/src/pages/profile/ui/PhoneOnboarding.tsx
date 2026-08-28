import { useState, type FormEvent } from "react"
import { toast } from "sonner"

import { linkPhone } from "@/entities/account/api"
import { Button } from "@/shared/ui/button"
import { Field, Input } from "@/shared/ui/input"

type PhoneOnboardingProps = {
  onLinked?: () => void
}

/** Обязательный шаг, если OAuth не отдал телефон. */
export function PhoneOnboarding({ onLinked }: PhoneOnboardingProps) {
  const [phone, setPhone] = useState("")
  const [pending, setPending] = useState(false)

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    const trimmed = phone.trim()
    if (!trimmed) {
      toast.error("Укажите телефон")
      return
    }
    setPending(true)
    try {
      await linkPhone(trimmed)
      toast.success("Телефон привязан")
      onLinked?.()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Не удалось привязать телефон")
    } finally {
      setPending(false)
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-3 rounded-[var(--r-2xl)] border border-brand-border bg-brand-soft p-5"
    >
      <div>
        <p className="text-[15px] font-extrabold text-fg">Укажите телефон</p>
        <p className="mt-1 text-[12.5px] leading-[1.45] text-fg-muted">
          Нужен для бонусов, истории заказов и объединения входов через VK и Яндекс. Номер
          фиксируется один раз.
        </p>
      </div>
      <Field label="Телефон">
        <Input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+7 999 123-45-67"
          autoComplete="tel"
          autoFocus
        />
      </Field>
      <Button type="submit" variant="brand" disabled={pending}>
        {pending ? "Сохраняем…" : "Продолжить"}
      </Button>
    </form>
  )
}
