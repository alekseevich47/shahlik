import { useEffect, useState } from "react"
import { toast } from "sonner"

import {
  frontpadSettingsKeys,
  settingsKeys,
  useSettings,
  useUpdateSettings,
} from "@/entities/settings/api"
import { settingsFallback, type Settings } from "@/entities/settings/model"
import { FrontpadPanel } from "@/pages/admin/sections/settings/FrontpadPanel"
import { SectionShell } from "@/pages/admin/ui/SectionShell"
import { useCollectionRealtime } from "@/shared/api/realtime"
import { Button } from "@/shared/ui/button"
import { Field, Input, Textarea } from "@/shared/ui/input"
import { Segmented } from "@/shared/ui/segmented"
import { Switch } from "@/shared/ui/switch"

type TabId = "venue" | "economy" | "cashier"

const TABS = [
  { value: "venue" as const, label: "Заведение" },
  { value: "economy" as const, label: "Экономика" },
  { value: "cashier" as const, label: "Касса" },
]

function parseNonNeg(raw: string, label: string): number | null {
  const n = Number(raw.replace(",", "."))
  if (!Number.isFinite(n) || n < 0) {
    toast.error(`${label} — число ≥ 0`)
    return null
  }
  return n
}

export function SettingsSection() {
  const { data: settings = settingsFallback(), isPending } = useSettings()
  const updateSettings = useUpdateSettings()
  const [tab, setTab] = useState<TabId>("venue")
  const [draft, setDraft] = useState<Settings>(settings)

  useCollectionRealtime("settings", [settingsKeys.all])
  useCollectionRealtime("frontpad_settings", [frontpadSettingsKeys.all], tab === "cashier")

  useEffect(() => {
    setDraft(settings)
  }, [settings])

  const busy = updateSettings.isPending

  const patch = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setDraft((prev) => ({ ...prev, [key]: value }))
  }

  const saveVenue = async () => {
    try {
      await updateSettings.mutateAsync({
        phoneDisplay: draft.phoneDisplay.trim(),
        phoneTel: draft.phoneTel.trim(),
        address: draft.address.trim(),
        workHours: draft.workHours.trim(),
        deliveryFrom: draft.deliveryFrom.trim(),
        promoTitle: draft.promoTitle.trim(),
        promoSubtitle: draft.promoSubtitle.trim(),
        promoCode: draft.promoCode.trim().toUpperCase(),
        acceptingOrders: draft.acceptingOrders,
        stopMessage: draft.stopMessage.trim(),
      })
      toast.success("Сохранено")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Не удалось сохранить")
    }
  }

  const saveEconomy = async () => {
    const packFee = parseNonNeg(String(draft.packFee), "Упаковка")
    const deliveryFee = parseNonNeg(String(draft.deliveryFee), "Доставка")
    const freeDeliveryFrom = parseNonNeg(String(draft.freeDeliveryFrom), "Бесплатная доставка от")
    const minOrder = parseNonNeg(String(draft.minOrder), "Мин. заказ")
    if (
      packFee === null ||
      deliveryFee === null ||
      freeDeliveryFrom === null ||
      minOrder === null
    ) {
      return
    }
    try {
      await updateSettings.mutateAsync({
        packFee,
        deliveryFee,
        freeDeliveryFrom,
        minOrder,
      })
      toast.success("Экономика обновлена")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Не удалось сохранить")
    }
  }

  return (
    <SectionShell
      title="Настройки"
      description="Заведение, экономика заказа и параметры кассы. Секрет Frontpad только на сервере."
    >
      <Segmented value={tab} onChange={setTab} options={TABS} ariaLabel="Разделы настроек" />

      {isPending ? (
        <p className="text-[13px] text-fg-muted">Загрузка…</p>
      ) : tab === "venue" ? (
        <div className="flex flex-col gap-4 rounded-[var(--r-md)] border border-line bg-surface p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Телефон (отображение)">
              <Input
                value={draft.phoneDisplay}
                onChange={(e) => patch("phoneDisplay", e.target.value)}
                maxLength={50}
                disabled={busy}
              />
            </Field>
            <Field label="Телефон (tel:)" hint="Напр. tel:+79991234567">
              <Input
                value={draft.phoneTel}
                onChange={(e) => patch("phoneTel", e.target.value)}
                maxLength={50}
                disabled={busy}
              />
            </Field>
            <Field label="Адрес" className="sm:col-span-2">
              <Input
                value={draft.address}
                onChange={(e) => patch("address", e.target.value)}
                maxLength={200}
                disabled={busy}
              />
            </Field>
            <Field label="Часы работы">
              <Input
                value={draft.workHours}
                onChange={(e) => patch("workHours", e.target.value)}
                maxLength={100}
                disabled={busy}
              />
            </Field>
            <Field label="Доставка с">
              <Input
                value={draft.deliveryFrom}
                onChange={(e) => patch("deliveryFrom", e.target.value)}
                maxLength={100}
                disabled={busy}
                placeholder="сегодня с 11:30"
              />
            </Field>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Промо: заголовок">
              <Input
                value={draft.promoTitle}
                onChange={(e) => patch("promoTitle", e.target.value)}
                maxLength={200}
                disabled={busy}
              />
            </Field>
            <Field label="Промо: код (баннер)">
              <Input
                value={draft.promoCode}
                onChange={(e) => patch("promoCode", e.target.value.toUpperCase())}
                maxLength={32}
                disabled={busy}
                className="tracking-[0.06em]"
              />
            </Field>
            <Field label="Промо: подзаголовок" className="sm:col-span-2">
              <Input
                value={draft.promoSubtitle}
                onChange={(e) => patch("promoSubtitle", e.target.value)}
                maxLength={300}
                disabled={busy}
              />
            </Field>
          </div>

          <div className="flex flex-col gap-3 rounded-[var(--r-md)] border border-line bg-surface-2 px-4 py-3">
            <label className="flex items-center gap-2.5 text-[13px] font-bold text-fg">
              <Switch
                checked={draft.acceptingOrders}
                onCheckedChange={(v) => patch("acceptingOrders", v)}
                disabled={busy}
              />
              Принимаем заказы
            </label>
            {!draft.acceptingOrders ? (
              <Field label="Сообщение при остановке" hint="Покажется в корзине вместо оформления">
                <Textarea
                  value={draft.stopMessage}
                  onChange={(e) => patch("stopMessage", e.target.value)}
                  maxLength={200}
                  rows={2}
                  disabled={busy}
                />
              </Field>
            ) : null}
          </div>

          <div className="flex justify-end">
            <Button type="button" disabled={busy} onClick={() => void saveVenue()}>
              Сохранить
            </Button>
          </div>
        </div>
      ) : tab === "economy" ? (
        <div className="flex flex-col gap-4 rounded-[var(--r-md)] border border-line bg-surface p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Упаковка, ₽">
              <Input
                type="number"
                min={0}
                step={1}
                value={draft.packFee}
                onChange={(e) => patch("packFee", Number(e.target.value) || 0)}
                disabled={busy}
              />
            </Field>
            <Field label="Доставка, ₽">
              <Input
                type="number"
                min={0}
                step={1}
                value={draft.deliveryFee}
                onChange={(e) => patch("deliveryFee", Number(e.target.value) || 0)}
                disabled={busy}
              />
            </Field>
            <Field label="Бесплатная доставка от, ₽">
              <Input
                type="number"
                min={0}
                step={1}
                value={draft.freeDeliveryFrom}
                onChange={(e) => patch("freeDeliveryFrom", Number(e.target.value) || 0)}
                disabled={busy}
              />
            </Field>
            <Field label="Мин. сумма заказа, ₽" hint="0 — без ограничения">
              <Input
                type="number"
                min={0}
                step={1}
                value={draft.minOrder}
                onChange={(e) => patch("minOrder", Number(e.target.value) || 0)}
                disabled={busy}
              />
            </Field>
          </div>
          <div className="flex justify-end">
            <Button type="button" disabled={busy} onClick={() => void saveEconomy()}>
              Сохранить
            </Button>
          </div>
        </div>
      ) : (
        <div className="rounded-[var(--r-md)] border border-line bg-surface p-4">
          <FrontpadPanel enabled />
        </div>
      )}
    </SectionShell>
  )
}
