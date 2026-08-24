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
  PRODUCTS_SYNC_INTERVAL_MS,
  type FrontpadSettings,
  type PriceSource,
} from "@/entities/settings/model"
import { useCollectionRealtime } from "@/shared/api/realtime"
import { formatDateTime, formatPrice } from "@/shared/lib/format"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import { Field, Input } from "@/shared/ui/input"
import { Segmented } from "@/shared/ui/segmented"
import { Select } from "@/shared/ui/select"
import { Switch } from "@/shared/ui/switch"

const DIGITS = /^\d+$/

const PRICE_SOURCE_OPTIONS: { value: PriceSource; label: string }[] = [
  { value: "site", label: "Сайт" },
  { value: "frontpad", label: "Касса" },
]

function splitTokens(raw: string): string[] {
  return raw
    .split(/[\s,;]+/)
    .map((t) => t.trim())
    .filter(Boolean)
}

function parseDigitCodes(raw: string): { kept: string[]; discarded: string[] } {
  const kept: string[] = []
  const discarded: string[] = []
  for (const token of splitTokens(raw)) {
    if (DIGITS.test(token)) kept.push(token)
    else discarded.push(token)
  }
  return { kept, discarded }
}

function toastDiscarded(label: string, discarded: string[]) {
  if (discarded.length === 0) return
  toast.error(`${label}: ${discarded.join(", ")}`)
}

function productsSyncGate(lastAt: string | null, now: number) {
  if (!lastAt) return { allowed: true, remainingMs: 0 }
  const last = new Date(lastAt).getTime()
  if (!Number.isFinite(last)) return { allowed: true, remainingMs: 0 }
  const remainingMs = PRODUCTS_SYNC_INTERVAL_MS - (now - last)
  if (remainingMs <= 0) return { allowed: true, remainingMs: 0 }
  return { allowed: false, remainingMs }
}

function formatRemaining(ms: number): string {
  const minutes = Math.max(1, Math.ceil(ms / 60_000))
  if (minutes < 60) return `${minutes} мин`
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60
  return rest ? `${hours} ч ${rest} мин` : `${hours} ч`
}

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
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    if (settings) setDraft(settings)
  }, [settings])

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 30_000)
    return () => window.clearInterval(id)
  }, [])

  const busy = updateSettings.isPending || enqueueSync.isPending
  const productsBusy = syncJobs.some((j) => j.kind === "sync_products")
  const stopsBusy = syncJobs.some((j) => j.kind === "sync_stops")

  if (isPending || !draft) {
    return <p className="text-[13px] text-fg-muted">Загрузка настроек кассы…</p>
  }

  const productsGate = productsSyncGate(draft.lastProductsSyncAt, now)

  const patch = <K extends keyof FrontpadSettings>(key: K, value: FrontpadSettings[K]) => {
    setDraft((prev) => (prev ? { ...prev, [key]: value } : prev))
  }

  const addTag = () => {
    const { kept, discarded } = parseDigitCodes(tagInput)
    toastDiscarded("Отброшены нечисловые отметки", discarded)
    if (kept.length === 0) {
      if (discarded.length === 0) toast.error("Введите числовой код из справочника Frontpad")
      return
    }
    const unique = kept.filter((tag) => !draft.orderTags.includes(tag))
    if (unique.length === 0) {
      toast.error("Такие отметки уже есть")
      setTagInput("")
      return
    }
    const room = MAX_ORDER_TAGS - draft.orderTags.length
    if (room <= 0) {
      toast.error(`Не больше ${MAX_ORDER_TAGS} отметок`)
      return
    }
    const accepted = unique.slice(0, room)
    const overflow = unique.slice(room)
    toastDiscarded(`Лимит ${MAX_ORDER_TAGS}, не добавлено`, overflow)
    patch("orderTags", [...draft.orderTags, ...accepted])
    setTagInput("")
  }

  const addHookStatus = () => {
    const { kept, discarded } = parseDigitCodes(statusInput)
    toastDiscarded("Отброшены нечисловые коды webhook", discarded)
    if (kept.length === 0) {
      if (discarded.length === 0) toast.error("Введите числовой код статуса кассы")
      return
    }
    const numbers = kept.map((t) => Number(t))
    const unique = numbers.filter((n) => !draft.hookStatuses.includes(n))
    if (unique.length === 0) {
      toast.error("Такие статусы уже есть")
      setStatusInput("")
      return
    }
    const room = MAX_HOOK_STATUSES - draft.hookStatuses.length
    if (room <= 0) {
      toast.error(`Не больше ${MAX_HOOK_STATUSES} статусов webhook`)
      return
    }
    const accepted = unique.slice(0, room)
    const overflow = unique.slice(room).map(String)
    toastDiscarded(`Лимит ${MAX_HOOK_STATUSES}, не добавлено`, overflow)
    patch("hookStatuses", [...draft.hookStatuses, ...accepted])
    setStatusInput("")
  }

  const addStatusMapRow = () => {
    const key = mapKey.trim()
    if (!key) {
      toast.error("Укажите код статуса кассы")
      return
    }
    if (!DIGITS.test(key)) {
      toast.error(`Отброшен нечисловой код: ${key}`)
      return
    }
    patch("statusMap", { ...draft.statusMap, [key]: mapValue })
    setMapKey("")
  }

  const save = async () => {
    const badTags = draft.orderTags.filter((t) => !DIGITS.test(t))
    const goodTags = draft.orderTags.filter((t) => DIGITS.test(t)).slice(0, MAX_ORDER_TAGS)
    toastDiscarded("Отброшены нечисловые отметки", badTags)
    if (draft.orderTags.length > MAX_ORDER_TAGS) {
      toastDiscarded(
        `Лимит ${MAX_ORDER_TAGS}, лишние отметки`,
        draft.orderTags.filter((t) => DIGITS.test(t)).slice(MAX_ORDER_TAGS),
      )
    }

    const goodHooks = draft.hookStatuses
      .filter((n) => Number.isInteger(n) && n >= 0)
      .slice(0, MAX_HOOK_STATUSES)
    const badHooks = draft.hookStatuses
      .filter((n) => !Number.isInteger(n) || n < 0)
      .map(String)
    toastDiscarded("Отброшены некорректные webhook-статусы", badHooks)
    if (draft.hookStatuses.length > MAX_HOOK_STATUSES) {
      toastDiscarded(
        `Лимит ${MAX_HOOK_STATUSES}, лишние статусы`,
        draft.hookStatuses.slice(MAX_HOOK_STATUSES).map(String),
      )
    }

    const cleanedMap: Record<string, OrderStatus> = {}
    const badMapKeys: string[] = []
    for (const [code, status] of Object.entries(draft.statusMap)) {
      if (DIGITS.test(code)) cleanedMap[code] = status
      else badMapKeys.push(code)
    }
    toastDiscarded("Отброшены нечисловые ключи statusMap", badMapKeys)

    try {
      await updateSettings.mutateAsync({
        sendEnabled: draft.sendEnabled,
        hookUrl: draft.hookUrl.trim(),
        sendPrices: draft.sendPrices,
        priceSource: draft.priceSource,
        articlePack: draft.articlePack.trim(),
        articleDelivery: draft.articleDelivery.trim(),
        retryLimit: Math.max(1, draft.retryLimit),
        syncEnabled: draft.syncEnabled,
        payCodePickup: draft.payCodePickup.trim(),
        payCodeDelivery: draft.payCodeDelivery.trim(),
        channel: draft.channel.trim(),
        affiliate: draft.affiliate.trim(),
        point: draft.point.trim(),
        orderTags: goodTags,
        hookStatuses: goodHooks,
        statusMap: cleanedMap,
      })
      setDraft((prev) =>
        prev
          ? {
              ...prev,
              orderTags: goodTags,
              hookStatuses: goodHooks,
              statusMap: cleanedMap,
            }
          : prev,
      )
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
        <Field
          label="URL вебхука (без токена)"
          hint="Токен подставит сервер из env. Пустой hook_status — касса webhook не вызовет."
          className="sm:col-span-2"
        >
          <Input
            value={draft.hookUrl}
            onChange={(e) => patch("hookUrl", e.target.value)}
            placeholder="https://shashlik.loomixx.ru/api/webhooks/frontpad/status"
            disabled={busy}
          />
        </Field>
        <Field
          label="Передавать цены в кассу"
          hint="Добавляет product_price[] в new_order. Включать только если в кассе разрешено изменение цены — иначе касса игнорирует цены или вернёт ошибку."
          className="sm:col-span-2"
        >
          <label className="flex items-center gap-2.5 text-[13px] font-bold text-fg">
            <Switch
              checked={draft.sendPrices}
              onCheckedChange={(v) => patch("sendPrices", v)}
              disabled={busy}
            />
            product_price в заказе
          </label>
        </Field>
        <Field
          label="Источник справочника цен"
          hint="Касса не принимает запись цен в свой каталог. «Касса» — джоб apply_prices пишет цены в products; «Сайт» — только отчёт расхождений."
          className="sm:col-span-2"
        >
          <Segmented
            value={draft.priceSource}
            onChange={(v) => patch("priceSource", v)}
            options={PRICE_SOURCE_OPTIONS}
            ariaLabel="Источник цен"
            className={busy ? "pointer-events-none opacity-50" : undefined}
          />
        </Field>
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
          <p className="mb-2 text-[11px] leading-snug text-fg-muted">
            Параметр <code className="font-mono text-[10px]">tags[]</code> в{" "}
            <code className="font-mono text-[10px]">new_order</code> — числовые коды из Frontpad →
            Настройки → Отметки заказа, не более {MAX_ORDER_TAGS}. Нечисловые значения сервер
            отбрасывает — UI покажет их явно.
          </p>
          <div className="mb-2 flex flex-wrap gap-1.5">
            {draft.orderTags.length === 0 ? (
              <span className="text-[12px] text-fg-muted">Пусто</span>
            ) : (
              draft.orderTags.map((tag) => (
                <Badge
                  key={tag}
                  className={`gap-1 pr-1 ${DIGITS.test(tag) ? "" : "border-red/40 text-red"}`}
                >
                  {tag}
                  {!DIGITS.test(tag) ? (
                    <span className="text-[9px] font-bold uppercase">не число</span>
                  ) : null}
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
              placeholder="Код или несколько через запятую"
              maxLength={64}
              disabled={busy || draft.orderTags.length >= MAX_ORDER_TAGS}
              className="h-9"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  addTag()
                }
              }}
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
          <p className="mb-2 text-[11px] leading-snug text-fg-muted">
            <code className="font-mono text-[10px]">hook_status[]</code> — коды статусов кассы, при
            которых она дернёт наш webhook (≤ {MAX_HOOK_STATUSES}). Пусто = webhook не придёт.
            Перевод кода в наш статус — таблица ниже.
          </p>
          <div className="mb-2 flex flex-wrap gap-1.5">
            {draft.hookStatuses.length === 0 ? (
              <span className="text-[12px] text-fg-muted">Пусто — webhook не придёт</span>
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
              placeholder="Код или несколько через запятую"
              inputMode="numeric"
              disabled={busy || draft.hookStatuses.length >= MAX_HOOK_STATUSES}
              className="h-9"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  addHookStatus()
                }
              }}
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
        <h3 className="mb-1 text-[13px] font-extrabold text-fg">Маппинг статусов кассы</h3>
        <p className="mb-3 text-[11px] leading-snug text-fg-muted">
          Код статуса из webhook → наш статус заказа. Дефолт: 1→готовится, 3→в доставке, 5→выполнен,
          9→отменён.
        </p>
        <ul className="mb-3 divide-y divide-line">
          {Object.entries(draft.statusMap).map(([code, status]) => (
            <li key={code} className="flex items-center gap-2 py-2">
              <span
                className={`w-12 text-[13px] font-extrabold tabular-nums ${
                  DIGITS.test(code) ? "text-fg" : "text-red"
                }`}
              >
                {code}
              </span>
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
        <h3 className="mb-1 text-[13px] font-extrabold text-fg">Синхронизация</h3>
        <p className="mb-3 text-[11px] leading-snug text-fg-muted">
          «Товары» — <code className="font-mono text-[10px]">get_products</code> →{" "}
          <code className="font-mono text-[10px]">frontpad_stock</code>, жёсткий гейт{" "}
          <strong>1 раз в час</strong> (иначе касса банит IP). «Стоп-лист» —{" "}
          <code className="font-mono text-[10px]">get_stops</code>, авто раз в 15 мин.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="soft"
            disabled={busy || productsBusy || !draft.syncEnabled || !productsGate.allowed}
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
        <ul className="mt-2 space-y-1 text-[11px] text-fg-muted">
          <li>
            Товары:{" "}
            {draft.lastProductsSyncAt ? formatDateTime(draft.lastProductsSyncAt) : "ещё не было"}
            {productsGate.allowed ? (
              <span className="font-bold text-fg"> · гейт свободен</span>
            ) : (
              <span className="font-bold text-brand">
                {" "}
                · доступно через {formatRemaining(productsGate.remainingMs)}
              </span>
            )}
          </li>
          <li>
            Стоп-лист:{" "}
            {draft.lastStopsSyncAt ? formatDateTime(draft.lastStopsSyncAt) : "ещё не было"}
            <span className="text-fg-faint"> · авто каждые 15 мин</span>
          </li>
        </ul>
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
