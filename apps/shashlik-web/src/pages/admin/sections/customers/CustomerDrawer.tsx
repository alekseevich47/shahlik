import { useEffect, useState } from "react"
import { toast } from "sonner"

import { useCustomer, useUpdateCustomer } from "@/entities/customer/api"
import {
  CUSTOMER_FIELD_LIMITS,
  type Customer,
} from "@/entities/customer/model"
import { useOrdersPage } from "@/entities/order/api"
import {
  ORDER_STATUS_LABEL,
  type Order,
} from "@/entities/order/model"
import { formatDate, formatDateTime, formatPrice } from "@/shared/lib/format"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import { Field, Input, Textarea } from "@/shared/ui/input"
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/shared/ui/sheet"
import { Switch } from "@/shared/ui/switch"

type Props = {
  customer: Customer | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

type FormState = {
  name: string
  street: string
  home: string
  pod: string
  et: string
  apart: string
  card: string
  sale: string
  score: string
  comment: string
  blocked: boolean
}

function toForm(c: Customer): FormState {
  return {
    name: c.name,
    street: c.street,
    home: c.home,
    pod: c.pod,
    et: c.et,
    apart: c.apart,
    card: c.card,
    sale: String(c.sale || 0),
    score: String(c.score || 0),
    comment: c.comment,
    blocked: c.blocked,
  }
}

function parseNonNeg(raw: string): number | null {
  const n = Number(raw.replace(",", "."))
  if (!Number.isFinite(n) || n < 0) return null
  return n
}

function digitsOnly(value: string, max: number): string {
  return value.replace(/\D/g, "").slice(0, max)
}

export function CustomerDrawer({ customer: seed, open, onOpenChange }: Props) {
  const { data: live } = useCustomer(seed?.id ?? "")
  const customer = live ?? seed
  const update = useUpdateCustomer()
  const { data: ordersPage, isPending: ordersPending } = useOrdersPage(
    {
      page: 1,
      perPage: 30,
      customerId: customer?.id,
    },
    open && Boolean(customer?.id),
  )

  const [form, setForm] = useState<FormState | null>(null)

  useEffect(() => {
    if (customer && open) setForm(toForm(customer))
    if (!open) setForm(null)
  }, [customer, open])

  const busy = update.isPending
  const orders = ordersPage?.items ?? []

  const set =
    <K extends keyof FormState>(key: K) =>
    (value: FormState[K]) =>
      setForm((prev) => (prev ? { ...prev, [key]: value } : prev))

  const handleSave = async () => {
    if (!customer || !form) return

    if (form.card && !/^\d*$/.test(form.card)) {
      toast.error("Карта — только цифры")
      return
    }
    if (form.card.length > CUSTOMER_FIELD_LIMITS.card) {
      toast.error(`Карта ≤ ${CUSTOMER_FIELD_LIMITS.card} цифр`)
      return
    }

    const sale = parseNonNeg(form.sale)
    const score = parseNonNeg(form.score)
    if (sale == null || sale > 100) {
      toast.error("Скидка — число 0–100")
      return
    }
    if (score == null) {
      toast.error("Баллы — неотрицательное число")
      return
    }

    try {
      await update.mutateAsync({
        id: customer.id,
        data: {
          name: form.name.trim().slice(0, CUSTOMER_FIELD_LIMITS.name),
          street: form.street.trim().slice(0, CUSTOMER_FIELD_LIMITS.street),
          home: form.home.trim().slice(0, CUSTOMER_FIELD_LIMITS.home),
          pod: form.pod.trim().slice(0, CUSTOMER_FIELD_LIMITS.pod),
          et: form.et.trim().slice(0, CUSTOMER_FIELD_LIMITS.et),
          apart: form.apart.trim().slice(0, CUSTOMER_FIELD_LIMITS.apart),
          card: form.card.trim(),
          sale,
          score,
          comment: form.comment.trim().slice(0, CUSTOMER_FIELD_LIMITS.comment),
          blocked: form.blocked,
        },
      })
      toast.success("Сохранено")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Не удалось сохранить")
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-[min(480px,100vw)] gap-0 overflow-y-auto p-0"
        aria-describedby={undefined}
      >
        {customer && form ? (
          <>
            <div className="border-b border-line px-5 pt-5 pr-14 pb-4">
              <SheetTitle className="text-[18px] font-extrabold text-fg">
                {customer.name || "Без имени"}
              </SheetTitle>
              <SheetDescription className="mt-1 text-[12.5px] tabular-nums text-fg-muted">
                {customer.phone}
              </SheetDescription>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {customer.blocked ? (
                  <Badge variant="outline">Заблокирован</Badge>
                ) : (
                  <Badge variant="success">Активен</Badge>
                )}
                <span className="text-[11.5px] font-semibold text-fg-faint">
                  {customer.ordersCount} зак. · {formatPrice(customer.totalSpent)}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-5 px-5 py-4">
              <section className="flex flex-col gap-3">
                <h3 className="text-[12px] font-bold tracking-wide text-fg-faint uppercase">
                  Контакты
                </h3>
                <Field label="Имя">
                  <Input
                    value={form.name}
                    maxLength={CUSTOMER_FIELD_LIMITS.name}
                    disabled={busy}
                    onChange={(e) => set("name")(e.target.value)}
                  />
                </Field>
                <Field label="Телефон" hint="Меняется только хуком при заказе">
                  <Input value={customer.phone} disabled readOnly className="tabular-nums" />
                </Field>
              </section>

              <section className="flex flex-col gap-3">
                <h3 className="text-[12px] font-bold tracking-wide text-fg-faint uppercase">
                  Адрес
                </h3>
                <Field label="Улица">
                  <Input
                    value={form.street}
                    maxLength={CUSTOMER_FIELD_LIMITS.street}
                    disabled={busy}
                    onChange={(e) => set("street")(e.target.value)}
                  />
                </Field>
                <div className="grid grid-cols-2 gap-2.5">
                  <Field label="Дом">
                    <Input
                      value={form.home}
                      maxLength={CUSTOMER_FIELD_LIMITS.home}
                      disabled={busy}
                      onChange={(e) => set("home")(e.target.value)}
                    />
                  </Field>
                  <Field label="Кв.">
                    <Input
                      value={form.apart}
                      maxLength={CUSTOMER_FIELD_LIMITS.apart}
                      disabled={busy}
                      onChange={(e) => set("apart")(e.target.value)}
                    />
                  </Field>
                  <Field label="Подъезд">
                    <Input
                      value={form.pod}
                      maxLength={CUSTOMER_FIELD_LIMITS.pod}
                      disabled={busy}
                      onChange={(e) => set("pod")(e.target.value)}
                    />
                  </Field>
                  <Field label="Этаж">
                    <Input
                      value={form.et}
                      maxLength={CUSTOMER_FIELD_LIMITS.et}
                      disabled={busy}
                      onChange={(e) => set("et")(e.target.value)}
                    />
                  </Field>
                </div>
              </section>

              <section className="flex flex-col gap-3">
                <h3 className="text-[12px] font-bold tracking-wide text-fg-faint uppercase">
                  Карта и скидка
                </h3>
                <Field label="Карта" hint="До 16 цифр">
                  <Input
                    value={form.card}
                    inputMode="numeric"
                    maxLength={CUSTOMER_FIELD_LIMITS.card}
                    disabled={busy}
                    className="tabular-nums"
                    onChange={(e) =>
                      set("card")(digitsOnly(e.target.value, CUSTOMER_FIELD_LIMITS.card))
                    }
                  />
                </Field>
                <div className="grid grid-cols-2 gap-2.5">
                  <Field label="Скидка, %">
                    <Input
                      value={form.sale}
                      inputMode="decimal"
                      disabled={busy}
                      className="tabular-nums"
                      onChange={(e) => set("sale")(e.target.value)}
                    />
                  </Field>
                  <Field label="Баллы">
                    <Input
                      value={form.score}
                      inputMode="decimal"
                      disabled={busy}
                      className="tabular-nums"
                      onChange={(e) => set("score")(e.target.value)}
                    />
                  </Field>
                </div>
                <Field label="Комментарий">
                  <Textarea
                    value={form.comment}
                    maxLength={CUSTOMER_FIELD_LIMITS.comment}
                    rows={3}
                    disabled={busy}
                    onChange={(e) => set("comment")(e.target.value)}
                  />
                </Field>
                <div className="flex items-center justify-between gap-3 rounded-[var(--r-sm)] border border-line px-3 py-2.5">
                  <div>
                    <p className="text-[13px] font-bold text-fg">Блокировка</p>
                    <p className="text-[11.5px] text-fg-faint">Клиент виден в списке как заблокированный</p>
                  </div>
                  <Switch
                    checked={form.blocked}
                    disabled={busy}
                    onCheckedChange={set("blocked")}
                    aria-label="Заблокировать клиента"
                  />
                </div>
              </section>

              <div className="flex gap-2">
                <Button type="button" variant="soft" disabled={busy} onClick={() => void handleSave()}>
                  Сохранить
                </Button>
              </div>

              <section className="flex flex-col gap-2.5">
                <h3 className="text-[12px] font-bold tracking-wide text-fg-faint uppercase">
                  История заказов
                </h3>
                {customer.lastOrderAt ? (
                  <p className="text-[12px] text-fg-muted">
                    Последний: {formatDateTime(customer.lastOrderAt)}
                  </p>
                ) : null}
                {ordersPending && !ordersPage ? (
                  <p className="text-[13px] text-fg-muted">Загрузка…</p>
                ) : !orders.length ? (
                  <p className="text-[13px] text-fg-muted">Заказов с привязкой к клиенту нет</p>
                ) : (
                  <ul className="flex flex-col gap-2">
                    {orders.map((order) => (
                      <OrderHistoryRow key={order.id} order={order} />
                    ))}
                  </ul>
                )}
              </section>
            </div>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  )
}

function OrderHistoryRow({ order }: { order: Order }) {
  return (
    <li className="rounded-[var(--r-sm)] border border-line bg-surface-2 px-3 py-2.5">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[13.5px] font-bold text-fg">{order.number}</p>
          <p className="mt-0.5 text-[11.5px] text-fg-faint">{formatDate(order.createdAt)}</p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <span className="tabular-nums text-[13px] font-bold text-fg">
            {formatPrice(order.total)}
          </span>
          <Badge
            variant={
              order.status === "done" ? "success" : order.status === "canceled" ? "outline" : "soft"
            }
          >
            {ORDER_STATUS_LABEL[order.status]}
          </Badge>
        </div>
      </div>
    </li>
  )
}
