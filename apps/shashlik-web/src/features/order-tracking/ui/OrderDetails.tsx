import type { ReactNode } from "react"

import {
  ORDER_STATUS_LABEL,
  type Order,
  type OrderLineSnapshot,
} from "@/entities/order/model"
import { formatDateTime, formatPrice } from "@/shared/lib/format"
import { cn } from "@/shared/lib/cn"

function formatAddress(order: Order): string {
  const parts = order.addressParts
  if (parts && (parts.street || parts.home)) {
    return [
      parts.street,
      parts.home ? `д. ${parts.home}` : null,
      parts.pod ? `под. ${parts.pod}` : null,
      parts.et ? `эт. ${parts.et}` : null,
      parts.apart ? `кв. ${parts.apart}` : null,
    ]
      .filter(Boolean)
      .join(", ")
  }
  return order.address?.trim() || "—"
}

function LineRow({ line }: { line: OrderLineSnapshot }) {
  return (
    <li className="flex flex-col gap-1 py-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[14px] font-bold text-fg">{line.name}</p>
          <p className="text-[12px] text-fg-muted">
            {[line.variantLabel, line.sizeLabel].filter(Boolean).join(" · ")}
            {line.quantity > 1 ? ` · ×${line.quantity}` : ""}
          </p>
        </div>
        <span className="shrink-0 text-[14px] font-extrabold tabular-nums text-fg">
          {formatPrice(line.total)}
        </span>
      </div>
      {line.addons.length > 0 ? (
        <ul className="flex flex-col gap-0.5 pl-2">
          {line.addons.map((addon) => (
            <li key={`${addon.id}-${addon.name}`} className="text-[12px] text-fg-muted">
              + {addon.name}
              {addon.quantity > 1 ? ` ×${addon.quantity}` : ""}
              {" · "}
              {formatPrice(addon.price * addon.quantity)}
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  )
}

type Props = {
  order: Order
  className?: string
  /** Кнопка/действия под итогами. */
  actions?: ReactNode
}

export function OrderDetails({ order, className, actions }: Props) {
  const modeLabel = order.mode === "delivery" ? "Доставка" : "Самовывоз"

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="rounded-[var(--r-xl)] border border-line bg-surface p-4">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <p className="text-[12px] font-semibold text-fg-muted">
              Заказ {order.number || order.id.slice(0, 8)}
            </p>
            <p className="mt-0.5 text-[11px] text-fg-faint">{formatDateTime(order.createdAt)}</p>
          </div>
          <span className="rounded-[var(--r-sm)] bg-brand-soft px-2.5 py-1 text-[12px] font-extrabold text-brand">
            {ORDER_STATUS_LABEL[order.status]}
          </span>
        </div>
        <p className="mt-3 text-[13px] font-semibold text-fg-soft">
          {modeLabel}
          {order.mode === "delivery" ? ` · ${formatAddress(order)}` : ""}
        </p>
        <p className="mt-1 text-[11px] text-fg-faint">
          Состав уточняет оператор — на сайте зафиксирован снимок на момент оформления
        </p>
      </div>

      <ul className="divide-y divide-line rounded-[var(--r-xl)] border border-line bg-surface px-4">
        {order.lines.map((line, index) => (
          <LineRow key={`${line.productId}-${line.sizeId}-${index}`} line={line} />
        ))}
      </ul>

      <div className="flex flex-col gap-1.5 rounded-[var(--r-xl)] border border-line bg-surface p-4">
        <div className="flex justify-between text-[13px] text-fg-soft">
          <span>Товары</span>
          <span className="tabular-nums font-semibold text-fg">
            {formatPrice(order.goods ?? order.total)}
          </span>
        </div>
        {(order.packFee ?? 0) > 0 ? (
          <div className="flex justify-between text-[13px] text-fg-soft">
            <span>Упаковка</span>
            <span className="tabular-nums font-semibold text-fg">
              {formatPrice(order.packFee ?? 0)}
            </span>
          </div>
        ) : null}
        {order.mode === "delivery" ? (
          <div className="flex justify-between text-[13px] text-fg-soft">
            <span>Доставка</span>
            <span className="tabular-nums font-semibold text-fg">
              {(order.deliveryFee ?? 0) > 0 ? formatPrice(order.deliveryFee ?? 0) : "Бесплатно"}
            </span>
          </div>
        ) : null}
        {(order.discount ?? 0) > 0 ? (
          <div className="flex justify-between text-[13px] text-fg-soft">
            <span>Скидка</span>
            <span className="tabular-nums font-semibold text-brand">
              −{formatPrice(order.discount ?? 0)}
            </span>
          </div>
        ) : null}
        <div className="mt-1 flex items-end justify-between gap-3 border-t border-line pt-3">
          <span className="text-[12px] font-semibold text-fg-muted">Итого</span>
          <span className="text-[22px] leading-none font-extrabold tabular-nums text-fg">
            {formatPrice(order.total)}
          </span>
        </div>
      </div>

      {actions}
    </div>
  )
}
