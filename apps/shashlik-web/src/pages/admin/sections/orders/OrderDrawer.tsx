import { toast } from "sonner"

import {
  useOrder,
  useOrderJobs,
  useResendOrder,
  useUpdateOrderStatus,
} from "@/entities/order/api"
import {
  ORDER_STATUS_FLOW,
  ORDER_STATUS_LABEL,
  ORDER_STATUS_SOURCE_LABEL,
  isFrontpadWarning,
  type Order,
  type OrderStatus,
} from "@/entities/order/model"
import { useAdminAuth } from "@/shared/api/auth"
import { formatDateTime, formatPrice } from "@/shared/lib/format"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import { Select } from "@/shared/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/shared/ui/sheet"

type Props = {
  order: Order | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

function formatAddress(order: Order): string {
  const parts = order.addressParts
  if (parts && (parts.street || parts.home)) {
    const chunks = [
      parts.street,
      parts.home ? `д. ${parts.home}` : null,
      parts.pod ? `под. ${parts.pod}` : null,
      parts.et ? `эт. ${parts.et}` : null,
      parts.apart ? `кв. ${parts.apart}` : null,
    ].filter(Boolean)
    return chunks.join(", ")
  }
  return order.address?.trim() || "—"
}

function moneyRow(label: string, value: number | undefined, muted = false) {
  if (value == null || (value === 0 && muted)) return null
  return (
    <div className="flex items-center justify-between gap-3 text-[13px]">
      <span className={muted ? "text-fg-muted" : "text-fg-soft"}>{label}</span>
      <span className="tabular-nums font-semibold text-fg">{formatPrice(value)}</span>
    </div>
  )
}

export function OrderDrawer({ order: seed, open, onOpenChange }: Props) {
  const { isAdmin } = useAdminAuth()
  const { data: live } = useOrder(seed?.id ?? "")
  const order = live ?? seed
  const updateStatus = useUpdateOrderStatus()
  const resend = useResendOrder()
  const { data: jobs = [] } = useOrderJobs(isAdmin && open)

  const busy = updateStatus.isPending || resend.isPending
  const activeJob = order
    ? jobs.find((j) => j.payload?.orderId === order.id)
    : undefined
  const alreadySent = Boolean(order?.frontpadOrderId)
  const nextStatuses: OrderStatus[] = order ? ORDER_STATUS_FLOW[order.status] : []

  const handleStatus = async (status: OrderStatus) => {
    if (!order) return
    try {
      await updateStatus.mutateAsync({ id: order.id, status })
      toast.success(`Статус → ${ORDER_STATUS_LABEL[status]}`)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Не удалось сменить статус")
    }
  }

  const handleResend = async () => {
    if (!order) return
    try {
      await resend.mutateAsync(order.id)
      toast.success("Переотправка в очередь")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Не удалось поставить джоб")
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-[min(480px,100vw)] gap-0 overflow-y-auto p-0"
        aria-describedby={undefined}
      >
        {order ? (
          <>
            <div className="border-b border-line px-5 pt-5 pr-14 pb-4">
              <SheetTitle className="text-[18px] font-extrabold text-fg">
                {order.number}
              </SheetTitle>
              <SheetDescription className="mt-1 text-[12.5px] text-fg-muted">
                {formatDateTime(order.createdAt)} · {order.customer} · {order.phone}
              </SheetDescription>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Badge
                  variant={
                    order.status === "done"
                      ? "success"
                      : order.status === "canceled"
                        ? "outline"
                        : "soft"
                  }
                >
                  {ORDER_STATUS_LABEL[order.status]}
                </Badge>
                {order.statusSource ? (
                  <span className="text-[11.5px] font-semibold text-fg-faint">
                    источник: {ORDER_STATUS_SOURCE_LABEL[order.statusSource]}
                  </span>
                ) : null}
              </div>
            </div>

            <div className="flex flex-col gap-5 px-5 py-4">
              {order.statusSource === "manual" || order.statusSource === "hook" ? (
                <p className="rounded-[var(--r-sm)] bg-warning/15 px-3 py-2 text-[12px] leading-snug font-medium text-fg">
                  Статус в кассе через API не меняется. Локальный статус — зеркало и может быть
                  перезаписан вебхуком.
                </p>
              ) : null}

              <section className="flex flex-col gap-2">
                <h3 className="text-[12px] font-bold tracking-wide text-fg-faint uppercase">
                  Получение
                </h3>
                <p className="text-[13.5px] font-semibold text-fg">
                  {order.mode === "delivery" ? "Доставка" : "Самовывоз"}
                </p>
                {order.mode === "delivery" ? (
                  <p className="text-[13px] text-fg-muted">{formatAddress(order)}</p>
                ) : null}
                {order.comment ? (
                  <p className="text-[13px] text-fg-soft">Комментарий: {order.comment}</p>
                ) : null}
              </section>

              <section className="flex flex-col gap-2.5">
                <h3 className="text-[12px] font-bold tracking-wide text-fg-faint uppercase">
                  Состав
                </h3>
                {order.lines.length ? (
                  <ul className="flex flex-col gap-2.5">
                    {order.lines.map((line, i) => (
                      <li
                        key={`${line.productId}-${line.sizeId}-${i}`}
                        className="rounded-[var(--r-sm)] border border-line bg-surface-2 px-3 py-2.5"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-[13.5px] font-bold text-fg">
                              {line.name}
                              {line.variantLabel ? ` · ${line.variantLabel}` : ""}
                              {` · ${line.sizeLabel}`}
                              <span className="text-fg-muted"> ×{line.quantity}</span>
                            </p>
                            {line.article ? (
                              <p className="mt-0.5 text-[11.5px] tabular-nums text-fg-faint">
                                арт. {line.article}
                              </p>
                            ) : null}
                          </div>
                          <span className="shrink-0 tabular-nums text-[13px] font-bold text-fg">
                            {formatPrice(line.total)}
                          </span>
                        </div>
                        {line.addons.length ? (
                          <ul className="mt-1.5 flex flex-col gap-0.5 border-t border-line/60 pt-1.5">
                            {line.addons.map((a) => (
                              <li
                                key={`${a.id}-${a.kind}`}
                                className="flex justify-between gap-2 text-[12px] text-fg-muted"
                              >
                                <span>
                                  + {a.name} ×{a.quantity}
                                  {a.article ? (
                                    <span className="text-fg-faint"> · арт. {a.article}</span>
                                  ) : null}
                                </span>
                                <span className="tabular-nums">
                                  {formatPrice(a.price * a.quantity)}
                                </span>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-[13px] text-fg-muted">Состав не сохранён</p>
                )}
              </section>

              <section className="flex flex-col gap-1.5 rounded-[var(--r-sm)] border border-line px-3 py-2.5">
                <h3 className="mb-1 text-[12px] font-bold tracking-wide text-fg-faint uppercase">
                  Деньги
                </h3>
                {moneyRow("Товары", order.goods ?? order.total, true)}
                {moneyRow("Упаковка", order.packFee, true)}
                {moneyRow("Доставка", order.deliveryFee, true)}
                {order.discount ? moneyRow("Скидка", -Math.abs(order.discount)) : null}
                {order.couponCode ? (
                  <p className="text-[12px] text-fg-faint">Купон: {order.couponCode}</p>
                ) : null}
                <div className="mt-1 flex items-center justify-between border-t border-line pt-2 text-[14px] font-extrabold">
                  <span>Итого</span>
                  <span className="tabular-nums">{formatPrice(order.total)}</span>
                </div>
              </section>

              {nextStatuses.length ? (
                <section className="flex flex-col gap-2">
                  <h3 className="text-[12px] font-bold tracking-wide text-fg-faint uppercase">
                    Сменить статус
                  </h3>
                  <Select
                    value=""
                    disabled={busy}
                    onChange={(e) => {
                      const next = e.target.value as OrderStatus
                      if (next) void handleStatus(next)
                    }}
                    aria-label="Новый статус"
                  >
                    <option value="" disabled>
                      Выберите…
                    </option>
                    {nextStatuses.map((s) => (
                      <option key={s} value={s}>
                        {ORDER_STATUS_LABEL[s]}
                      </option>
                    ))}
                  </Select>
                </section>
              ) : null}

              {isAdmin ? (
                <section className="flex flex-col gap-2 rounded-[var(--r-sm)] border border-line px-3 py-3">
                  <h3 className="text-[12px] font-bold tracking-wide text-fg-faint uppercase">
                    Касса (Frontpad)
                  </h3>
                  <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-[12.5px]">
                    <dt className="text-fg-faint">order_id</dt>
                    <dd className="tabular-nums font-semibold text-fg">
                      {order.frontpadOrderId ?? "—"}
                    </dd>
                    <dt className="text-fg-faint">order_number</dt>
                    <dd className="font-semibold text-fg">
                      {order.frontpadOrderNumber || "—"}
                    </dd>
                    <dt className="text-fg-faint">sentAt</dt>
                    <dd className="font-semibold text-fg">
                      {order.sentAt ? formatDateTime(order.sentAt) : "—"}
                    </dd>
                    {order.frontpadStatus != null ? (
                      <>
                        <dt className="text-fg-faint">status</dt>
                        <dd className="tabular-nums font-semibold text-fg">
                          {order.frontpadStatus}
                        </dd>
                      </>
                    ) : null}
                  </dl>
                  {order.frontpadError ? (
                    <p
                      className={
                        isFrontpadWarning(order)
                          ? "rounded-[var(--r-xs)] bg-brand-soft px-2.5 py-2 text-[12.5px] leading-snug font-medium text-brand"
                          : "rounded-[var(--r-xs)] bg-red-soft px-2.5 py-2 text-[12.5px] leading-snug font-medium text-red"
                      }
                    >
                      {order.frontpadError}
                    </p>
                  ) : null}
                  {activeJob ? (
                    <p className="text-[12px] font-semibold text-fg-muted">
                      Джоб:{" "}
                      {activeJob.status === "queued"
                        ? "в очереди"
                        : activeJob.status === "running"
                          ? "отправляется…"
                          : activeJob.status}
                    </p>
                  ) : null}
                  {alreadySent ? (
                    <p className="text-[12px] text-fg-muted">
                      Заказ уже в кассе — повторная отправка заблокирована, иначе будет дубль на
                      кухне.
                    </p>
                  ) : null}
                  <Button
                    type="button"
                    variant="soft"
                    size="sm"
                    disabled={busy || Boolean(activeJob) || alreadySent}
                    onClick={() => void handleResend()}
                  >
                    Переотправить в кассу
                  </Button>
                </section>
              ) : null}
            </div>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  )
}
