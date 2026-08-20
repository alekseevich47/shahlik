import { ChevronRight, MapPin, ShoppingBag, TicketPercent, X, Zap } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import { subscribeOrderStatus, useCreateOrder } from "@/entities/order/api"
import { ORDER_STATUS_LABEL } from "@/entities/order/model"
import { findSize } from "@/entities/product/lib"
import { useCartTotals } from "@/features/cart/model/selectors"
import { useCartStore } from "@/features/cart/model/store"
import { ORDER_RULES } from "@/shared/config/site"
import { cn } from "@/shared/lib/cn"
import { formatPrice } from "@/shared/lib/format"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { Segmented } from "@/shared/ui/segmented"

import { CartLineRow } from "./CartLineRow"

const MODE_OPTIONS = [
  { value: "pickup", label: "Заберу сам" },
  { value: "delivery", label: "Надо привезти" },
] as const

export function CartPanel({ className }: { className?: string }) {
  const { lines, count, goods, packFee, deliveryFee, discount, total, freeDeliveryLeft } =
    useCartTotals()
  const mode = useCartStore((s) => s.mode)
  const setMode = useCartStore((s) => s.setMode)
  const address = useCartStore((s) => s.address)
  const customer = useCartStore((s) => s.customer)
  const setCustomer = useCartStore((s) => s.setCustomer)
  const phone = useCartStore((s) => s.phone)
  const setPhone = useCartStore((s) => s.setPhone)
  const promo = useCartStore((s) => s.promo)
  const applyPromo = useCartStore((s) => s.applyPromo)
  const clearCart = useCartStore((s) => s.clear)
  const createOrder = useCreateOrder()
  const [promoOpen, setPromoOpen] = useState(false)

  const empty = lines.length === 0

  function checkout() {
    const name = customer.trim()
    const tel = phone.trim()
    if (!name || !tel) {
      toast.error("Укажите имя и телефон")
      return
    }
    createOrder.mutate(
      {
        customer: name,
        phone: tel,
        mode,
        address: address.trim() || undefined,
        positions: count,
        total,
        promo,
        lines: lines.map((line) => ({
          productId: line.product.id,
          variantId: line.line.variantId,
          sizeId: line.line.sizeId,
          article: findSize(line.product, line.line.sizeId).article,
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
        onError: () => toast.error("Не удалось оформить заказ"),
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
        <button
          type="button"
          onClick={() => toast("Выбор адреса появится после интеграции с картой")}
          className="flex h-11 cursor-pointer items-center gap-2 rounded-[var(--r-md)] border border-line bg-surface-2 px-3 text-left transition-colors hover:border-line-strong"
        >
          <MapPin size={15} className="shrink-0 text-fg-faint" strokeWidth={2.3} />
          <span
            className={cn(
              "flex-1 truncate text-[13px] font-semibold",
              address ? "text-fg" : "text-fg-faint",
            )}
          >
            {address || (mode === "delivery" ? "Укажите адрес" : "Заберу сам — ул. Ленина, 123")}
          </span>
          <ChevronRight size={15} className="shrink-0 text-fg-faint" strokeWidth={2.4} />
        </button>
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
              {promo ? (
                <div className="flex items-center justify-between gap-2 rounded-[var(--r-xs)] bg-brand-soft px-2.5 py-1.5">
                  <span className="text-[12px] font-extrabold tracking-[0.05em] text-brand">
                    {promo}
                  </span>
                  <span className="text-[12px] font-extrabold text-success">
                    −{ORDER_RULES.promo.percent}%
                  </span>
                  <button
                    type="button"
                    aria-label="Убрать промокод"
                    onClick={() => applyPromo(null)}
                    className="grid size-5 cursor-pointer place-items-center rounded-[var(--r-xs)] text-fg-faint hover:text-red"
                  >
                    <X size={12} strokeWidth={3} />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    applyPromo(ORDER_RULES.promo.code)
                    toast.success(`Промокод ${ORDER_RULES.promo.code} применён`)
                  }}
                  className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-[var(--r-xs)] px-2.5 py-1.5 text-left transition-colors hover:bg-surface-3"
                >
                  <span className="text-[12px] font-bold text-fg-soft">
                    Применить {ORDER_RULES.promo.code}
                  </span>
                  <span className="text-[12px] font-extrabold text-brand">
                    −{ORDER_RULES.promo.percent}%
                  </span>
                </button>
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
            disabled={empty || createOrder.isPending}
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
