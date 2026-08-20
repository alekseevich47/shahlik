import { useEffect, useState } from "react"
import { toast } from "sonner"

import {
  useCreateCoupon,
  useUpdateCoupon,
} from "@/entities/coupon/api"
import {
  COUPON_CODE_PATTERN,
  type Coupon,
  type CouponKind,
} from "@/entities/coupon/model"
import { Button } from "@/shared/ui/button"
import { Field, Input } from "@/shared/ui/input"
import { Segmented } from "@/shared/ui/segmented"
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/shared/ui/sheet"
import { Switch } from "@/shared/ui/switch"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  coupon?: Coupon | null
}

const KIND_OPTIONS = [
  { value: "percent" as const, label: "Процент" },
  { value: "amount" as const, label: "Сумма ₽" },
]

function toDateInput(iso: string | null): string {
  if (!iso) return ""
  return iso.slice(0, 10)
}

function fromDateInput(value: string): string | null {
  const trimmed = value.trim()
  return trimmed ? trimmed : null
}

export function CouponForm({ open, onOpenChange, coupon }: Props) {
  const isEdit = Boolean(coupon)
  const createCoupon = useCreateCoupon()
  const updateCoupon = useUpdateCoupon()
  const busy = createCoupon.isPending || updateCoupon.isPending

  const [code, setCode] = useState("")
  const [kind, setKind] = useState<CouponKind>("percent")
  const [value, setValue] = useState("")
  const [description, setDescription] = useState("")
  const [minTotal, setMinTotal] = useState("")
  const [startsAt, setStartsAt] = useState("")
  const [endsAt, setEndsAt] = useState("")
  const [usesLimit, setUsesLimit] = useState("0")
  const [perCustomer, setPerCustomer] = useState("0")
  const [active, setActive] = useState(true)

  useEffect(() => {
    if (!open) return
    setCode(coupon?.code ?? "")
    setKind(coupon?.kind ?? "percent")
    setValue(coupon ? String(coupon.value) : "")
    setDescription(coupon?.description ?? "")
    setMinTotal(coupon?.minTotal ? String(coupon.minTotal) : "")
    setStartsAt(toDateInput(coupon?.startsAt ?? null))
    setEndsAt(toDateInput(coupon?.endsAt ?? null))
    setUsesLimit(String(coupon?.usesLimit ?? 0))
    setPerCustomer(String(coupon?.perCustomer ?? 0))
    setActive(coupon?.active ?? true)
  }, [open, coupon])

  async function submit() {
    const trimmedCode = code.trim().toUpperCase()
    if (!COUPON_CODE_PATTERN.test(trimmedCode)) {
      toast.error("Код — латиница/цифры, 3–32 символа")
      return
    }

    const valueNum = Number(value.replace(",", "."))
    if (!Number.isFinite(valueNum) || valueNum <= 0) {
      toast.error("Значение скидки — число > 0")
      return
    }
    if (kind === "percent" && valueNum > 100) {
      toast.error("Процент не больше 100")
      return
    }

    const minTotalNum = minTotal.trim() ? Number(minTotal.replace(",", ".")) : 0
    if (!Number.isFinite(minTotalNum) || minTotalNum < 0) {
      toast.error("Мин. сумма — число ≥ 0")
      return
    }

    const usesLimitNum = Number(usesLimit.replace(",", "."))
    const perCustomerNum = Number(perCustomer.replace(",", "."))
    if (!Number.isFinite(usesLimitNum) || usesLimitNum < 0) {
      toast.error("Лимит использований — число ≥ 0")
      return
    }
    if (!Number.isFinite(perCustomerNum) || perCustomerNum < 0) {
      toast.error("Лимит на клиента — число ≥ 0")
      return
    }

    const start = fromDateInput(startsAt)
    const end = fromDateInput(endsAt)
    if (start && end && start > end) {
      toast.error("Дата окончания раньше начала")
      return
    }

    const payload = {
      code: trimmedCode,
      kind,
      value: valueNum,
      description: description.trim().slice(0, 200),
      minTotal: minTotalNum,
      startsAt: start,
      endsAt: end,
      usesLimit: usesLimitNum,
      perCustomer: perCustomerNum,
      active,
    }

    try {
      if (isEdit && coupon) {
        await updateCoupon.mutateAsync({ id: coupon.id, data: payload })
      } else {
        await createCoupon.mutateAsync(payload)
      }
      toast.success(isEdit ? "Сохранено" : "Купон создан")
      onOpenChange(false)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Не удалось сохранить")
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="gap-0 p-0">
        <div className="border-b border-line px-5 py-4 pr-14">
          <SheetTitle className="text-[16px] font-extrabold text-fg">
            {isEdit ? "Редактировать купон" : "Новый купон"}
          </SheetTitle>
          <SheetDescription className="mt-1 text-[12.5px] text-fg-muted">
            Ровно один вид скидки: процент или сумма. Коды наружу не отдаются.
          </SheetDescription>
        </div>

        <div className="scrollbar-slim flex flex-1 flex-col gap-4 overflow-y-auto px-5 py-4">
          <Field label="Код">
            <Input
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="BOSS10"
              maxLength={32}
              autoComplete="off"
              spellCheck={false}
            />
          </Field>

          <Field label="Тип скидки">
            <Segmented
              value={kind}
              onChange={setKind}
              options={KIND_OPTIONS}
              ariaLabel="Тип скидки"
            />
          </Field>

          <Field label={kind === "percent" ? "Процент" : "Сумма, ₽"}>
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              inputMode="decimal"
              placeholder={kind === "percent" ? "10" : "200"}
            />
          </Field>

          <Field label="Описание">
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="На первый заказ"
              maxLength={200}
            />
          </Field>

          <Field label="Мин. сумма товаров, ₽">
            <Input
              value={minTotal}
              onChange={(e) => setMinTotal(e.target.value)}
              inputMode="decimal"
              placeholder="0"
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Начало">
              <Input
                type="date"
                value={startsAt}
                onChange={(e) => setStartsAt(e.target.value)}
              />
            </Field>
            <Field label="Окончание">
              <Input type="date" value={endsAt} onChange={(e) => setEndsAt(e.target.value)} />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Лимит использований">
              <Input
                value={usesLimit}
                onChange={(e) => setUsesLimit(e.target.value)}
                inputMode="numeric"
                placeholder="0 = ∞"
              />
            </Field>
            <Field label="На одного клиента">
              <Input
                value={perCustomer}
                onChange={(e) => setPerCustomer(e.target.value)}
                inputMode="numeric"
                placeholder="0 = ∞"
              />
            </Field>
          </div>

          {isEdit && coupon ? (
            <Field label="Использовано">
              <Input value={String(coupon.uses)} readOnly disabled />
            </Field>
          ) : null}

          <div className="flex items-center justify-between gap-3 rounded-[var(--r-md)] border border-line bg-surface-2 px-3 py-2.5">
            <span className="text-[13px] font-bold text-fg">Активен</span>
            <Switch checked={active} onCheckedChange={setActive} disabled={busy} />
          </div>
        </div>

        <div className="flex gap-2 border-t border-line px-5 py-4">
          <Button variant="ghost" className="flex-1" onClick={() => onOpenChange(false)}>
            Отмена
          </Button>
          <Button className="flex-1" disabled={busy} onClick={() => void submit()}>
            {isEdit ? "Сохранить" : "Создать"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
