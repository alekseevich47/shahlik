import { ChevronRight, MapPin, ShoppingBag, TicketPercent, X, Zap } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import { checkPromo } from "@/entities/coupon/api"
import { formatCouponValue } from "@/entities/coupon/model"
import { subscribeOrderStatus, useCreateOrder } from "@/entities/order/api"
import type { OrderAddressParts } from "@/entities/order/model"
import { ORDER_STATUS_LABEL } from "@/entities/order/model"
import { articleFor } from "@/entities/product/lib"
import { useSettings } from "@/entities/settings/api"
import { settingsFallback } from "@/entities/settings/model"
import { useCartTotals } from "@/features/cart/model/selectors"
import { useCartStore } from "@/features/cart/model/store"
import { pbErrorMessage } from "@/shared/api/crud"
import { cn } from "@/shared/lib/cn"
import { formatPrice } from "@/shared/lib/format"
import { Button } from "@/shared/ui/button"
import { Field, Input, Textarea } from "@/shared/ui/input"
import { Segmented } from "@/shared/ui/segmented"

import { CartLineRow } from "./CartLineRow"

const MODE_OPTIONS = [
  { value: "pickup", label: "Заберу сам" },
  { value: "delivery", label: "Надо привезти" },
] as const

function formatAddressLine(parts: OrderAddressParts): string {
  const chunks = [parts.street?.trim(), parts.home?.trim()].filter(Boolean)
  const extra = [
    parts.pod?.trim() ? `подъезд ${parts.pod.trim()}` : "",
    parts.et?.trim() ? `эт. ${parts.et.trim()}` : "",
    parts.apart?.trim() ? `кв. ${parts.apart.trim()}` : "",
  ].filter(Boolean)
  if (extra.length) chunks.push(extra.join(", "))
  return chunks.join(", ")
}

export function CartPanel({ className }: { className?: string }) {
  const {
    lines,
    count,
    goods,
    packFee,
    deliveryFee,
    discount,
    total,
    freeDeliveryLeft,
    minOrder,
    acceptingOrders,
    stopMessage,
  } = useCartTotals()
  const mode = useCartStore((s) => s.mode)
  const setMode = useCartStore((s) => s.setMode)
  const addressParts = useCartStore((s) => s.addressParts)
  const setAddressPart = useCartStore((s) => s.setAddressPart)
  const comment = useCartStore((s) => s.comment)
  const setComment = useCartStore((s) => s.setComment)
  const customer = useCartStore((s) => s.customer)
  const setCustomer = useCartStore((s) => s.setCustomer)
  const phone = useCartStore((s) => s.phone)
  const setPhone = useCartStore((s) => s.setPhone)
  const appliedCoupon = useCartStore((s) => s.appliedCoupon)
  const applyCoupon = useCartStore((s) => s.applyCoupon)
  const clearCart = useCartStore((s) => s.clear)
  const createOrder = useCreateOrder()
  const { data: settings = settingsFallback() } = useSettings()
  const [promoOpen, setPromoOpen] = useState(false)
  const [promoInput, setPromoInput] = useState("")
  const [promoBusy, setPromoBusy] = useState(false)

  const empty = lines.length === 0
  const belowMinOrder = minOrder > 0 && goods < minOrder
  const checkoutBlocked = !acceptingOrders || belowMinOrder

  async function submitPromo() {
    const code = promoInput.trim().toUpperCase()
    if (!code) {
      toast.error("Введите промокод")
      return
    }
    if (empty) {
      toast.error("Добавьте товары в корзину")
      return
    }
    setPromoBusy(true)
    try {
      const result = await checkPromo(code, goods)
      if (!result.ok) {
        toast.error(result.message || "Промокод не подходит")
        return
      }
      applyCoupon({ code, kind: result.kind, value: result.value })
      setPromoInput("")
      toast.success(`Промокод ${code} применён`)
    } finally {
      setPromoBusy(false)
    }
  }

  function checkout() {
    if (!acceptingOrders) {
      toast.error(stopMessage || "Сейчас заказы не принимаем")
      return
    }
    if (belowMinOrder) {
      toast.error(`Минимальная сумма заказа ${formatPrice(minOrder)}`)
      return
    }
    const name = customer.trim()
    const tel = phone.trim()
    if (!name || !tel) {
      toast.error("Укажите имя и телефон")
      return
    }
    if (mode === "delivery") {
      const street = addressParts.street?.trim() ?? ""
      const home = addressParts.home?.trim() ?? ""
      if (!street || !home) {
        toast.error("Укажите улицу и дом для доставки")
        return
      }
    }
    const deliveryAddress =
      mode === "delivery" ? formatAddressLine(addressParts) : undefined
    createOrder.mutate(
      {
        customer: name,
        phone: tel,
        mode,
        address: deliveryAddress,
        addressParts: mode === "delivery" ? addressParts : null,
        comment: comment.trim(),
        positions: count,
        goods,
        packFee,
        deliveryFee,
        discount,
        total,
        couponCode: appliedCoupon?.code ?? null,
        lines: lines.map((line) => ({
          productId: line.product.id,
          variantId: line.line.variantId,
          sizeId: line.line.sizeId,
          article: articleFor(line.product, line.line.sizeId, line.line.variantId),
          quantity: line.line.quantity,
          name: line.product.name,
          variantLabel: line.variantLabel,
          sizeLabel: line.sizeLabel,
          unitPrice: line.unitPrice,
          addons: line.addons.map((a) => ({
            id: a.addon.id,
            name: a.addon.name,
            quantity: a.quantity,
            price: a.addon.price,
            article: a.addon.article,
            kind: a.addon.kind,
          })),
          total: line.total,
        })),
      },
      {
        onSuccess: (order) => {
          clearCart()
          const toastId = `order-${order.id}`
          toast.success(`Заказ ${order.number} принят`, {
            id: toastId,
            description: ORDER_STATUS_LABEL[order.status],
            duration: Infinity,
          })
          const stop = subscribeOrderStatus(order.id, (next) => {
            const terminal = next.status === "done" || next.status === "canceled"
            toast.message(`Заказ ${next.number}`, {
              id: toastId,
              description: ORDER_STATUS_LABEL[next.status],
              duration: terminal ? 6000 : Infinity,
            })
            if (terminal) stop()
          })
        },
        onError: (err) => toast.error(pbErrorMessage(err, "Не удалось оформить заказ")),
      },
    )
  }

  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-[var(--r-2xl)] border border-line bg-surface shadow-[var(--shadow-card)]",
        className,
      )}
    >
      <div className="flex flex-col gap-3 p-4 pb-3">
        <h2 className="text-[20px] leading-none font-extrabold tracking-[-0.01em] text-fg">
          Мой заказ
        </h2>
        <Segmented
          value={mode}
          onChange={setMode}
          options={MODE_OPTIONS}
          ariaLabel="Способ получения"
        />
        {mode === "delivery" ? (
          <div className="flex flex-col gap-2">
            <Input
              value={addressParts.street ?? ""}
              onChange={(e) => setAddressPart("street", e.target.value)}
              placeholder="Улица"
              autoComplete="address-line1"
              maxLength={50}
            />
            <div className="grid grid-cols-2 gap-2">
              <Input
                value={addressParts.home ?? ""}
                onChange={(e) => setAddressPart("home", e.target.value)}
                placeholder="Дом"
                autoComplete="address-line2"
                maxLength={50}
              />
              <Input
                value={addressParts.pod ?? ""}
                onChange={(e) => setAddressPart("pod", e.target.value)}
                placeholder="Подъезд"
                maxLength={2}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Input
                value={addressParts.et ?? ""}
                onChange={(e) => setAddressPart("et", e.target.value)}
                placeholder="Этаж"
                maxLength={2}
              />
              <Input
                value={addressParts.apart ?? ""}
                onChange={(e) => setAddressPart("apart", e.target.value)}
                placeholder="Квартира"
                maxLength={50}
              />
            </div>
          </div>
        ) : (
          <div className="flex h-11 items-center gap-2 rounded-[var(--r-md)] border border-line bg-surface-2 px-3">
            <MapPin size={15} className="shrink-0 text-fg-faint" strokeWidth={2.3} />
            <span className="truncate text-[13px] font-semibold text-fg">
              Заберу сам — {settings.address}
            </span>
          </div>
        )}
        <Field label="Комментарий">
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Пожелания к заказу"
            rows={2}
            maxLength={100}
          />
        </Field>
        <Input
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
          placeholder="Имя"
          autoComplete="name"
          maxLength={100}
        />
        <Input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Телефон"
          type="tel"
          autoComplete="tel"
          maxLength={20}
        />
      </div>

      <div className="scrollbar-slim flex-1 overflow-y-auto px-4">
        {empty ? (
          <div className="flex h-full min-h-40 flex-col items-center justify-center gap-2 py-8 text-center">
            <ShoppingBag size={30} className="text-fg-faint" strokeWidth={1.6} />
            <p className="text-[13px] font-bold text-fg-soft">Корзина пуста</p>
            <p className="max-w-45 text-[11.5px] text-fg-muted">
              Добавьте шаурму или шашлык — соберём заказ за пару минут
            </p>
          </div>
        ) : (
          <>
            <ul className="divide-y divide-line">
              {lines.map((line) => (
                <CartLineRow key={line.line.id} line={line} />
              ))}
            </ul>
          </>
        )}
      </div>

      <div className="flex flex-col gap-3 border-t border-line p-4">
        <div className="rounded-[var(--r-md)] border border-line">
          <button
            type="button"
            onClick={() => setPromoOpen((v) => !v)}
            className="flex h-10 w-full cursor-pointer items-center gap-2 px-3 text-left"
          >
            <TicketPercent size={15} className="shrink-0 text-fg-faint" strokeWidth={2.3} />
            <span className="flex-1 text-[12.5px] font-bold text-fg-soft">
              Скидки и промокоды
            </span>
            <ChevronRight
              size={15}
              className={cn(
                "shrink-0 text-fg-faint transition-transform duration-200",
                promoOpen && "rotate-90",
              )}
              strokeWidth={2.4}
            />
          </button>
          {promoOpen ? (
            <div className="border-t border-line p-2">
              {appliedCoupon ? (
                <div className="flex items-center justify-between gap-2 rounded-[var(--r-xs)] bg-brand-soft px-2.5 py-1.5">
                  <span className="text-[12px] font-extrabold tracking-[0.05em] text-brand">
                    {appliedCoupon.code}
                  </span>
                  <span className="text-[12px] font-extrabold text-success">
                    −{formatCouponValue(appliedCoupon.kind, appliedCoupon.value)}
                  </span>
                  <button
                    type="button"
                    aria-label="Убрать промокод"
                    onClick={() => applyCoupon(null)}
                    className="grid size-5 cursor-pointer place-items-center rounded-[var(--r-xs)] text-fg-faint hover:text-red"
                  >
                    <X size={12} strokeWidth={3} />
                  </button>
                </div>
              ) : (
                <form
                  className="flex gap-1.5"
                  onSubmit={(e) => {
                    e.preventDefault()
                    void submitPromo()
                  }}
                >
                  <Input
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                    placeholder="Промокод"
                    maxLength={32}
                    autoComplete="off"
                    spellCheck={false}
                    className="h-9 flex-1 text-[12.5px]"
                  />
                  <Button
                    type="submit"
                    size="sm"
                    variant="soft"
                    disabled={promoBusy}
                    className="shrink-0"
                  >
                    ОК
                  </Button>
                </form>
              )}
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <p className="text-[12px] font-extrabold text-brand">Доставка и оплата</p>
          <SumRow label="Стоимость товаров" value={formatPrice(goods)} />
          <SumRow label="Упаковка заказа" value={formatPrice(packFee)} />
          {mode === "delivery" ? (
            <SumRow
              label="Доставка"
              value={deliveryFee ? formatPrice(deliveryFee) : "Бесплатно"}
              tone={deliveryFee ? "default" : "success"}
            />
          ) : null}
          {discount ? (
            <SumRow label="Скидка" value={`−${formatPrice(discount)}`} tone="success" />
          ) : null}
          {mode === "delivery" && freeDeliveryLeft > 0 && !empty ? (
            <p className="text-[11px] text-fg-muted">
              До бесплатной доставки {formatPrice(freeDeliveryLeft)}
            </p>
          ) : null}
          {belowMinOrder && !empty ? (
            <p className="text-[11px] text-fg-muted">
              Мин. заказ {formatPrice(minOrder)} — ещё {formatPrice(minOrder - goods)}
            </p>
          ) : null}
          {!acceptingOrders ? (
            <p className="text-[12px] font-bold text-red">{stopMessage}</p>
          ) : null}
        </div>

        <div className="flex items-end justify-between gap-3">
          <span className="flex flex-col">
            <span className="text-[12px] font-semibold text-fg-muted">Итого</span>
            <span className="text-[26px] leading-none font-extrabold text-fg tabular-nums">
              {formatPrice(total)}
            </span>
          </span>
          <Button
            size="lg"
            disabled={empty || checkoutBlocked || createOrder.isPending}
            onClick={checkout}
            className="flex-1"
          >
            <Zap size={17} strokeWidth={2.6} fill="currentColor" />
            Оформить заказ
          </Button>
        </div>
      </div>
    </div>
  )
}

function SumRow({
  label,
  value,
  tone = "default",
}: {
  label: string
  value: string
  tone?: "default" | "success"
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-[12px] text-fg-muted">{label}</span>
      <span
        className={cn(
          "text-[12px] font-bold tabular-nums",
          tone === "success" ? "text-success" : "text-fg",
        )}
      >
        {value}
      </span>
    </div>
  )
}
