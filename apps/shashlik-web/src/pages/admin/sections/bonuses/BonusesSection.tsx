import { useEffect, useState } from "react"
import { toast } from "sonner"

import {
  useBonusSettings,
  useBulkBonusPercent,
  useUpdateBonusSettings,
} from "@/entities/bonus/api"
import { Button } from "@/shared/ui/button"
import { Field, Input } from "@/shared/ui/input"
import { Switch } from "@/shared/ui/switch"

import { SectionShell } from "../../ui/SectionShell"

export function BonusesSection() {
  const { data, isPending } = useBonusSettings()
  const update = useUpdateBonusSettings()
  const bulk = useBulkBonusPercent()

  const [enabled, setEnabled] = useState(true)
  const [defaultEarnPercent, setDefaultEarnPercent] = useState("5")
  const [birthdayAmount, setBirthdayAmount] = useState("300")
  const [referralInviterAmount, setReferralInviterAmount] = useState("200")
  const [referralInviteeAmount, setReferralInviteeAmount] = useState("100")
  const [pwaInstallAmount, setPwaInstallAmount] = useState("150")
  const [registrationAmount, setRegistrationAmount] = useState("100")
  const [maxSpendPercent, setMaxSpendPercent] = useState("50")
  const [bulkPercent, setBulkPercent] = useState("5")

  useEffect(() => {
    if (!data) return
    setEnabled(data.enabled)
    setDefaultEarnPercent(String(data.defaultEarnPercent))
    setBirthdayAmount(String(data.birthdayAmount))
    setReferralInviterAmount(String(data.referralInviterAmount))
    setReferralInviteeAmount(String(data.referralInviteeAmount))
    setPwaInstallAmount(String(data.pwaInstallAmount))
    setRegistrationAmount(String(data.registrationAmount))
    setMaxSpendPercent(String(data.maxSpendPercent))
  }, [data])

  async function save() {
    const num = (raw: string) => Number(raw.replace(",", "."))
    const values = {
      enabled,
      defaultEarnPercent: num(defaultEarnPercent),
      birthdayAmount: num(birthdayAmount),
      referralInviterAmount: num(referralInviterAmount),
      referralInviteeAmount: num(referralInviteeAmount),
      pwaInstallAmount: num(pwaInstallAmount),
      registrationAmount: num(registrationAmount),
      maxSpendPercent: num(maxSpendPercent),
    }
    const nums = [
      values.defaultEarnPercent,
      values.birthdayAmount,
      values.referralInviterAmount,
      values.referralInviteeAmount,
      values.pwaInstallAmount,
      values.registrationAmount,
      values.maxSpendPercent,
    ]
    if (nums.some((value) => !Number.isFinite(value) || value < 0)) {
      toast.error("Все суммы и проценты — числа ≥ 0")
      return
    }
    if (values.defaultEarnPercent > 100 || values.maxSpendPercent > 100) {
      toast.error("Проценты не больше 100")
      return
    }
    try {
      await update.mutateAsync(values)
      toast.success("Настройки бонусов сохранены")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Не удалось сохранить")
    }
  }

  async function applyBulk() {
    const percent = Number(bulkPercent.replace(",", "."))
    if (!Number.isFinite(percent) || percent < 0 || percent > 100) {
      toast.error("Процент 0…100")
      return
    }
    try {
      const result = await bulk.mutateAsync(percent)
      toast.success(`Обновлено товаров: ${result.updated}`)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Не удалось применить")
    }
  }

  const busy = update.isPending || bulk.isPending

  return (
    <SectionShell
      title="Бонусы"
      description="Своя программа лояльности: начисление, ДР, рефералы, лимит списания."
    >
      {isPending && !data ? (
        <p className="text-[13px] text-fg-muted">Загрузка…</p>
      ) : (
        <div className="mx-auto flex max-w-xl flex-col gap-5">
          <div className="flex items-center justify-between gap-3 rounded-[var(--r-lg)] border border-line bg-surface px-4 py-3">
            <div>
              <p className="text-[14px] font-bold text-fg">Программа включена</p>
              <p className="text-[12px] text-fg-muted">Выключает авто-начисления и списание</p>
            </div>
            <Switch checked={enabled} onCheckedChange={setEnabled} disabled={busy} />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Начисление по умолчанию, %">
              <Input
                value={defaultEarnPercent}
                onChange={(e) => setDefaultEarnPercent(e.target.value)}
                inputMode="decimal"
                disabled={busy}
                className="tabular-nums"
              />
            </Field>
            <Field label="Макс. списание от суммы, %">
              <Input
                value={maxSpendPercent}
                onChange={(e) => setMaxSpendPercent(e.target.value)}
                inputMode="decimal"
                disabled={busy}
                className="tabular-nums"
              />
            </Field>
            <Field label="Регистрация, бонусы">
              <Input
                value={registrationAmount}
                onChange={(e) => setRegistrationAmount(e.target.value)}
                inputMode="decimal"
                disabled={busy}
                className="tabular-nums"
              />
            </Field>
            <Field label="День рождения, бонусы">
              <Input
                value={birthdayAmount}
                onChange={(e) => setBirthdayAmount(e.target.value)}
                inputMode="decimal"
                disabled={busy}
                className="tabular-nums"
              />
            </Field>
            <Field label="PWA-установка, бонусы">
              <Input
                value={pwaInstallAmount}
                onChange={(e) => setPwaInstallAmount(e.target.value)}
                inputMode="decimal"
                disabled={busy}
                className="tabular-nums"
              />
            </Field>
            <Field label="Реферал — пригласившему">
              <Input
                value={referralInviterAmount}
                onChange={(e) => setReferralInviterAmount(e.target.value)}
                inputMode="decimal"
                disabled={busy}
                className="tabular-nums"
              />
            </Field>
            <Field label="Реферал — приглашённому">
              <Input
                value={referralInviteeAmount}
                onChange={(e) => setReferralInviteeAmount(e.target.value)}
                inputMode="decimal"
                disabled={busy}
                className="tabular-nums"
              />
            </Field>
          </div>

          <Button type="button" variant="soft" disabled={busy} onClick={() => void save()}>
            Сохранить настройки
          </Button>

          <div className="rounded-[var(--r-lg)] border border-line bg-surface-2 p-4">
            <p className="text-[14px] font-bold text-fg">% на все товары</p>
            <p className="mt-1 text-[12px] text-fg-muted">
              Проставит bonusPercent у всех карточек сразу
            </p>
            <div className="mt-3 flex flex-wrap items-end gap-2">
              <Field label="Процент">
                <Input
                  value={bulkPercent}
                  onChange={(e) => setBulkPercent(e.target.value)}
                  inputMode="decimal"
                  disabled={busy}
                  className="tabular-nums"
                />
              </Field>
              <Button type="button" disabled={busy} onClick={() => void applyBulk()}>
                Применить ко всем
              </Button>
            </div>
          </div>
        </div>
      )}
    </SectionShell>
  )
}
