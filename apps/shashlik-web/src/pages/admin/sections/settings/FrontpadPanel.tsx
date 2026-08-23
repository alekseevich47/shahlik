import { Plus, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

import {
  ORDER_STATUS_LABEL,
  type OrderStatus,
} from "@/entities/order/model"
import {
  frontpadSettingsKeys,
  stoppedStockKeys,
  syncJobKeys,
  useActiveSyncJobs,
  useEnqueueSyncJob,
  useFrontpadSettings,
  useStoppedStock,
  useUpdateFrontpadSettings,
} from "@/entities/settings/api"
import {
  MAX_HOOK_STATUSES,
  MAX_ORDER_TAGS,
  type FrontpadSettings,
} from "@/entities/settings/model"
import { useCollectionRealtime } from "@/shared/api/realtime"
import { formatDateTime, formatPrice } from "@/shared/lib/format"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import { Field, Input } from "@/shared/ui/input"
import { Select } from "@/shared/ui/select"
import { Switch } from "@/shared/ui/switch"

const STATUS_OPTIONS = (Object.keys(ORDER_STATUS_LABEL) as OrderStatus[]).map((value) => ({
  value,
  label: ORDER_STATUS_LABEL[value],
}))

type Props = {
  enabled: boolean
}

export function FrontpadPanel({ enabled }: Props) {
  const { data: settings, isPending } = useFrontpadSettings(enabled)
  const updateSettings = useUpdateFrontpadSettings()
  const enqueueSync = useEnqueueSyncJob()
  const { data: syncJobs = [] } = useActiveSyncJobs(enabled)
  const { data: stopped = [] } = useStoppedStock(enabled)

  useCollectionRealtime("frontpad_settings", [frontpadSettingsKeys.all], enabled)
  useCollectionRealtime("frontpad_jobs", [syncJobKeys.all, frontpadSettingsKeys.all], enabled)
  useCollectionRealtime("frontpad_stock", [stoppedStockKeys.all], enabled)

  const [draft, setDraft] = useState<FrontpadSettings | null>(null)
  const [tagInput, setTagInput] = useState("")
  const [statusInput, setStatusInput] = useState("")
  const [mapKey, setMapKey] = useState("")
  const [mapValue, setMapValue] = useState<OrderStatus>("cooking")

  useEffect(() => {
    if (settings) setDraft(settings)
  }, [settings])

  const busy = updateSettings.isPending || enqueueSync.isPending
  const productsBusy = syncJobs.some((j) => j.kind === "sync_products")
  const stopsBusy = syncJobs.some((j) => j.kind === "sync_stops")

  if (isPending || !draft) {
    return <p className="text-[13px] text-fg-muted">Загрузка настроек кассы…</p>
  }

  const patch = <K extends keyof FrontpadSettings>(key: K, value: FrontpadSettings[K]) => {
    setDraft((prev) => (prev ? { ...prev, [key]: value } : prev))
  }

  const addTag = () => {
    const tag = tagInput.trim()
    if (!tag) return
    if (draft.orderTags.includes(tag)) {
      toast.error("Такой тег уже есть")
      return
    }
    if (draft.orderTags.length >= MAX_ORDER_TAGS) {
      toast.error(`Не больше ${MAX_ORDER_TAGS} тегов`)
      return
    }
    patch("orderTags", [...draft.orderTags, tag])
    setTagInput("")
  }

  const addHookStatus = () => {
    const n = Number(statusInput.trim())
    if (!Number.isFinite(n)) {
      toast.error("Код статуса — число")
      return
    }
    if (draft.hookStatuses.includes(n)) {
      toast.error("Такой статус уже есть")
      return
    }
    if (draft.hookStatuses.length >= MAX_HOOK_STATUSES) {
      toast.error(`Не больше ${MAX_HOOK_STATUSES} статусов webhook`)
      return
    }
    patch("hookStatuses", [...draft.hookStatuses, n])
    setStatusInput("")
  }

  const addStatusMapRow = () => {
    const key = mapKey.trim()
    if (!key) {
      toast.error("Укажите код статуса кассы")
      return
    }
    patch("statusMap", { ...draft.statusMap, [key]: mapValue })
    setMapKey("")
  }

  const save = async () => {
    if (draft.orderTags.length > MAX_ORDER_TAGS) {
      toast.error(`Тегов не больше ${MAX_ORDER_TAGS}`)
      return
    }
    if (draft.hookStatuses.length > MAX_HOOK_STATUSES) {
      toast.error(`Статусов webhook не больше ${MAX_HOOK_STATUSES}`)
      return
    }
    try {
      await updateSettings.mutateAsync({
        sendEnabled: draft.sendEnabled,
        hookUrl: draft.hookUrl.trim(),
        sendPrices: draft.sendPrices,
        articlePack: draft.articlePack.trim(),
        articleDelivery: draft.articleDelivery.trim(),
        retryLimit: Math.max(1, draft.retryLimit),
        syncEnabled: draft.syncEnabled,
        payCodePickup: draft.payCodePickup.trim(),
        payCodeDelivery: draft.payCodeDelivery.trim(),
        channel: draft.channel.trim(),
        affiliate: draft.affiliate.trim(),
        point: draft.point.trim(),
        orderTags: draft.orderTags,
        hookStatuses: draft.hookStatuses,
        statusMap: draft.statusMap,
      })
      toast.success("Настройки кассы сохранены")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Не удалось сохранить")
    }
  }

  const sync = async (kind: "sync_products" | "sync_stops") => {
    try {
      await enqueueSync.mutateAsync(kind)
      toast.success(
        kind === "sync_products" ? "Синхронизация товаров поставлена" : "Обновление стоп-листа поставлено",
      )
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Не удалось поставить задачу")
    }
  }

  return (
    <div className="flex flex-col gap-5">
      {!draft.sendEnabled ? (
        <p className="rounded-[var(--r-md)] border border-brand/30 bg-brand-soft px-4 py-3 text-[13px] leading-snug font-semibold text-fg">
          Dry-run включён: заказы в кассу не уходят, payload сохраняется в{" "}
          <code className="font-mono text-[12px]">frontpad_jobs.result</code>.
        </p>
      ) : null}

      {draft.lastError ? (
        <p className="rounded-[var(--r-md)] border border-red/30 bg-red-soft px-4 py-3 text-[13px] leading-snug font-medium text-red">
          Последняя ошибка кассы: {draft.lastError}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-4 rounded-[var(--r-md)] border border-line bg-surface-2 px-4 py-3">
        <label className="flex items-center gap-2.5 text-[13px] font-bold text-fg">
          <Switch
            checked={draft.sendEnabled}
            onCheckedChange={(v) => patch("sendEnabled", v)}
            disabled={busy}
          />
          Отправка заказов в кассу
        </label>
        <label className="flex items-center gap-2.5 text-[13px] font-bold text-fg">
          <Switch
            checked={draft.syncEnabled}
            onCheckedChange={(v) => patch("syncEnabled", v)}
            disabled={busy}
          />
          Синхронизация каталога
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="URL вебхука (без токена)" className="sm:col-span-2">
          <Input
            value={draft.hookUrl}
            onChange={(e) => patch("hookUrl", e.target.value)}
            placeholder="https://shashlik.loomixx.ru/api/webhooks/frontpad/status"
            disabled={busy}
          />
        </Field>
        <label className="flex items-center gap-2.5 text-[13px] font-bold text-fg">
          <Switch
            checked={draft.sendPrices}
            onCheckedChange={(v) => patch("sendPrices", v)}
            disabled={busy}
          />
          Передавать цены в кассу (product_price)
        </label>
        <Field label="Попыток переотправки (retryLimit)">
          <Input
            value={String(draft.retryLimit)}
            onChange={(e) => {
              const n = Number(e.target.value)
              patch("retryLimit", Number.isFinite(n) && n >= 1 ? Math.floor(n) : 1)
            }}
            inputMode="numeric"
            min={1}
            max={20}
            disabled={busy}
          />
        </Field>
        <Field label="Артикул упаковки">
          <Input
            value={draft.articlePack}
            onChange={(e) => patch("articlePack", e.target.value)}
            placeholder="Пусто — не передавать"
            maxLength={32}
            disabled={busy}
          />
        </Field>
        <Field label="Артикул доставки">
          <Input
            value={draft.articleDelivery}
            onChange={(e) => patch("articleDelivery", e.target.value)}
            placeholder="Пусто — не передавать"
            maxLength={32}
            disabled={busy}
          />
        </Field>
      </div>

      {draft.lastOrderSentAt ? (
        <p className="text-[12px] text-fg-muted">
          Последний заказ отправлен: {formatDateTime(draft.lastOrderSentAt)}
        </p>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Код оплаты (самовывоз)">
          <Input
            value={draft.payCodePickup}
            onChange={(e) => patch("payCodePickup", e.target.value)}
            maxLength={16}
            disabled={busy}
          />
        </Field>
        <Field label="Код оплаты (доставка)">
          <Input
            value={draft.payCodeDelivery}
            onChange={(e) => patch("payCodeDelivery", e.target.value)}
            maxLength={16}
            disabled={busy}
          />
        </Field>
        <Field label="Канал">
          <Input
            value={draft.channel}
            onChange={(e) => patch("channel", e.target.value)}
            maxLength={16}
            disabled={busy}
          />
        </Field>
        <Field label="Филиал">
          <Input
            value={draft.affiliate}
            onChange={(e) => patch("affiliate", e.target.value)}
            maxLength={16}
            disabled={busy}
          />
        </Field>
        <Field label="Точка">
          <Input
            value={draft.point}
            onChange={(e) => patch("point", e.target.value)}
            maxLength={16}
            disabled={busy}
          />
        </Field>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-[var(--r-md)] border border-line p-4">
          <div className="mb-2 flex items-center justify-between gap-2">
            <h3 className="text-[13px] font-extrabold text-fg">Отметки заказа</h3>
            <span className="text-[11px] text-fg-faint">
              {draft.orderTags.length}/{MAX_ORDER_TAGS}
            </span>
          </div>
          <div className="mb-2 flex flex-wrap gap-1.5">
            {draft.orderTags.length === 0 ? (
              <span className="text-[12px] text-fg-muted">Пусто</span>
            ) : (
              draft.orderTags.map((tag) => (
                <Badge key={tag} className="gap-1 pr-1">
                  {tag}
                  <button
                    type="button"
                    aria-label={`Удалить ${tag}`}
                    className="grid size-4 place-items-center rounded text-fg-faint hover:text-red"
                    onClick={() =>
                      patch(
                        "orderTags",
                        draft.orderTags.filter((t) => t !== tag),
                      )
                    }
                  >
                    <Trash2 size={10} strokeWidth={2.5} />
                  </button>
                </Badge>
              ))
            )}
          </div>
          <div className="flex gap-1.5">
            <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Код тега"
              maxLength={32}
              disabled={busy || draft.orderTags.length >= MAX_ORDER_TAGS}
              className="h-9"
            />
            <Button
              type="button"
              size="sm"
              variant="soft"
              disabled={busy || draft.orderTags.length >= MAX_ORDER_TAGS}
              onClick={addTag}
            >
              <Plus size={14} strokeWidth={2.5} />
            </Button>
          </div>
        </div>

        <div className="rounded-[var(--r-md)] border border-line p-4">
          <div className="mb-2 flex items-center justify-between gap-2">
            <h3 className="text-[13px] font-extrabold text-fg">Webhook-статусы</h3>
            <span className="text-[11px] text-fg-faint">
              {draft.hookStatuses.length}/{MAX_HOOK_STATUSES}
            </span>
          </div>
          <div className="mb-2 flex flex-wrap gap-1.5">
            {draft.hookStatuses.length === 0 ? (
              <span className="text-[12px] text-fg-muted">Пусто</span>
            ) : (
              draft.hookStatuses.map((code) => (
                <Badge key={code} className="gap-1 pr-1">
                  {code}
                  <button
                    type="button"
                    aria-label={`Удалить статус ${code}`}
                    className="grid size-4 place-items-center rounded text-fg-faint hover:text-red"
                    onClick={() =>
                      patch(
                        "hookStatuses",
                        draft.hookStatuses.filter((s) => s !== code),
                      )
                    }
                  >
                    <Trash2 size={10} strokeWidth={2.5} />
                  </button>
                </Badge>
              ))
            )}
          </div>
          <div className="flex gap-1.5">
            <Input
              value={statusInput}
              onChange={(e) => setStatusInput(e.target.value)}
              placeholder="Код"
              inputMode="numeric"
              disabled={busy || draft.hookStatuses.length >= MAX_HOOK_STATUSES}
              className="h-9"
            />
            <Button
              type="button"
              size="sm"
              variant="soft"
              disabled={busy || draft.hookStatuses.length >= MAX_HOOK_STATUSES}
              onClick={addHookStatus}
            >
              <Plus size={14} strokeWidth={2.5} />
            </Button>
          </div>
        </div>
      </div>

      <div className="rounded-[var(--r-md)] border border-line p-4">
        <h3 className="mb-3 text-[13px] font-extrabold text-fg">Маппинг статусов кассы</h3>
        <ul className="mb-3 divide-y divide-line">
          {Object.entries(draft.statusMap).map(([code, status]) => (
            <li key={code} className="flex items-center gap-2 py-2">
              <span className="w-12 text-[13px] font-extrabold tabular-nums text-fg">{code}</span>
              <Select
                value={status}
                onChange={(e) =>
                  patch("statusMap", {
                    ...draft.statusMap,
                    [code]: e.target.value as OrderStatus,
                  })
                }
                disabled={busy}
                className="h-9 flex-1"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Select>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                aria-label={`Удалить маппинг ${code}`}
                onClick={() => {
                  const next = { ...draft.statusMap }
                  delete next[code]
                  patch("statusMap", next)
                }}
              >
                <Trash2 size={14} strokeWidth={2.2} />
              </Button>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-1.5">
          <Input
            value={mapKey}
            onChange={(e) => setMapKey(e.target.value)}
            placeholder="Код кассы"
            inputMode="numeric"
            className="h-9 w-28"
            disabled={busy}
          />
          <Select
            value={mapValue}
            onChange={(e) => setMapValue(e.target.value as OrderStatus)}
            disabled={busy}
            className="h-9 min-w-36 flex-1"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Select>
          <Button type="button" size="sm" variant="soft" disabled={busy} onClick={addStatusMapRow}>
            <Plus size={14} strokeWidth={2.5} />
            Добавить
          </Button>
        </div>
      </div>

      <div className="rounded-[var(--r-md)] border border-line p-4">
        <h3 className="mb-3 text-[13px] font-extrabold text-fg">Синхронизация</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="soft"
            disabled={busy || productsBusy || !draft.syncEnabled}
            onClick={() => void sync("sync_products")}
          >
            Обновить товары кассы
          </Button>
          <Button
            type="button"
            variant="soft"
            disabled={busy || stopsBusy}
            onClick={() => void sync("sync_stops")}
          >
            Обновить стоп-лист
          </Button>
        </div>
        <p className="mt-2 text-[11px] text-fg-muted">
          Товары:{" "}
          {draft.lastProductsSyncAt ? formatDateTime(draft.lastProductsSyncAt) : "ещё не было"}
          {" · "}
          Стоп-лист:{" "}
          {draft.lastStopsSyncAt ? formatDateTime(draft.lastStopsSyncAt) : "ещё не было"}
        </p>
        {(productsBusy || stopsBusy) && (
          <p className="mt-1 text-[11px] font-bold text-brand">Синхронизация в очереди…</p>
        )}
      </div>

      <div className="rounded-[var(--r-md)] border border-line p-4">
        <div className="mb-2 flex items-center justify-between gap-2">
          <h3 className="text-[13px] font-extrabold text-fg">Стоп-лист</h3>
          <Badge>{stopped.length}</Badge>
        </div>
        {stopped.length === 0 ? (
          <p className="text-[12px] text-fg-muted">Нет позиций в стоп-листе</p>
        ) : (
          <ul className="max-h-56 divide-y divide-line overflow-y-auto">
            {stopped.map((item) => (
              <li key={item.id} className="flex items-center justify-between gap-2 py-2">
                <span className="min-w-0 flex flex-col leading-tight">
                  <span className="truncate text-[13px] font-bold text-fg">
                    {item.name || `Артикул ${item.article}`}
                  </span>
                  <span className="text-[11px] text-fg-muted">{item.article}</span>
                </span>
                <span className="shrink-0 text-[12px] font-bold tabular-nums text-fg">
                  {formatPrice(item.price)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex justify-end">
        <Button type="button" disabled={busy} onClick={() => void save()}>
          Сохранить кассу
        </Button>
      </div>
    </div>
  )
}
