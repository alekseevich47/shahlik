import { MapPin, Zap } from "lucide-react"

import { useSettings } from "@/entities/settings/api"
import { settingsFallback } from "@/entities/settings/model"
import { useCartTotals } from "@/features/cart/model/selectors"
import { CartLineRow } from "@/features/cart/ui/CartLineRow"
import { CartPromo } from "@/features/cart/ui/CartPromo"
import { CartTotals } from "@/features/cart/ui/CartTotals"
import { NEW_ADDRESS, formatAddressLine, useCheckout } from "@/features/checkout/model/useCheckout"
import { formatPrice } from "@/shared/lib/format"
import { Button } from "@/shared/ui/button"
import { Field, Input, Textarea } from "@/shared/ui/input"
import { Modal, ModalDescription, ModalTitle } from "@/shared/ui/modal"
import { Segmented } from "@/shared/ui/segmented"

const MODE_OPTIONS = [
  { value: "pickup", label: "Заберу сам" },
  { value: "delivery", label: "Надо привезти" },
] as const

type CheckoutDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CheckoutDialog({ open, onOpenChange }: CheckoutDialogProps) {
  const { lines } = useCartTotals()
  const { data: settings = settingsFallback() } = useSettings()
  const checkout = useCheckout({ open, onOpenChange })

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <div className="flex max-h-[92vh] flex-col md:h-[min(680px,92vh)]">
        <header className="shrink-0 border-b border-line px-5 pt-5 pr-14 pb-4">
          <ModalTitle className="text-[18px] leading-none font-extrabold tracking-[-0.01em] text-fg">
            Оформить заказ
          </ModalTitle>
          <ModalDescription className="sr-only">
            Состав заказа, способ получения и контакты
          </ModalDescription>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto md:grid md:grid-cols-2 md:overflow-hidden">
          <section className="flex min-h-0 flex-col gap-4 overflow-y-auto p-5 scrollbar-slim md:border-r md:border-line">
            {lines.length === 0 ? (
              <p className="py-8 text-center text-[13px] font-semibold text-fg-muted">Корзина пуста</p>
            ) : (
              <ul className="divide-y divide-line">
                {lines.map((line) => (
                  <CartLineRow key={line.line.id} line={line} />
                ))}
              </ul>
            )}
            <CartPromo />
            <CartTotals />
            <div className="flex items-end justify-between gap-3 pt-1">
              <span className="flex flex-col">
                <span className="text-[12px] font-semibold text-fg-muted">Итого</span>
                <span className="text-[26px] leading-none font-extrabold text-fg tabular-nums">
                  {formatPrice(checkout.total)}
                </span>
              </span>
            </div>
          </section>

          <section className="flex min-h-0 flex-col gap-3 overflow-y-auto p-5 scrollbar-slim">
            <Segmented
              value={checkout.mode}
              onChange={checkout.setMode}
              options={MODE_OPTIONS}
              ariaLabel="Способ получения"
            />

            {checkout.mode === "delivery" ? (
              <div className="flex flex-col gap-2">
                {checkout.user && checkout.user.addresses.length > 0 ? (
                  <Field label="Адрес">
                    <select
                      value={checkout.addressId}
                      onChange={(e) => checkout.selectSavedAddress(e.target.value)}
                      className="h-11 w-full rounded-[var(--r-md)] border border-line bg-surface px-3.5 text-[14px] font-semibold text-fg outline-none focus:border-brand-border"
                    >
                      {checkout.user.addresses.map((address) => (
                        <option key={address.id} value={address.id}>
                          {address.label || formatAddressLine(address)}
                        </option>
                      ))}
                      <option value={NEW_ADDRESS}>Новый адрес</option>
                    </select>
                  </Field>
                ) : null}
                <Input
                  value={checkout.addressParts.street ?? ""}
                  onChange={(e) => checkout.setAddressPart("street", e.target.value)}
                  placeholder="Улица"
                  autoComplete="address-line1"
                  maxLength={50}
                />
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    value={checkout.addressParts.home ?? ""}
                    onChange={(e) => checkout.setAddressPart("home", e.target.value)}
                    placeholder="Дом"
                    autoComplete="address-line2"
                    maxLength={50}
                  />
                  <Input
                    value={checkout.addressParts.pod ?? ""}
                    onChange={(e) => checkout.setAddressPart("pod", e.target.value)}
                    placeholder="Подъезд"
                    maxLength={2}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    value={checkout.addressParts.et ?? ""}
                    onChange={(e) => checkout.setAddressPart("et", e.target.value)}
                    placeholder="Этаж"
                    maxLength={2}
                  />
                  <Input
                    value={checkout.addressParts.apart ?? ""}
                    onChange={(e) => checkout.setAddressPart("apart", e.target.value)}
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

            <Input
              value={checkout.customer}
              onChange={(e) => checkout.setCustomer(e.target.value)}
              placeholder="Имя"
              autoComplete="name"
              maxLength={50}
            />
            <Input
              value={checkout.phone}
              onChange={(e) => checkout.setPhone(e.target.value)}
              placeholder="Телефон"
              type="tel"
              autoComplete="tel"
              maxLength={20}
            />
            <Field label="Комментарий">
              <Textarea
                value={checkout.comment}
                onChange={(e) => checkout.setComment(e.target.value)}
                placeholder="Пожелания к заказу"
                rows={2}
                maxLength={100}
              />
            </Field>

            {checkout.canSpendBonus ? (
              <CheckRow
                checked={checkout.spendBonus}
                onChange={checkout.setSpendBonus}
                label={`Списать баллы · ${checkout.bonusScore}`}
              />
            ) : null}

            {checkout.user && checkout.mode === "delivery" ? (
              <CheckRow
                checked={checkout.saveAddress}
                onChange={checkout.setSaveAddress}
                label="Сохранить адрес"
              />
            ) : null}

            <div className="mt-auto pt-2">
              <Button
                size="lg"
                disabled={checkout.blocked || checkout.pending}
                onClick={() => void checkout.submit()}
                className="w-full"
              >
                <Zap size={17} strokeWidth={2.6} fill="currentColor" />
                Оформить заказ
              </Button>
            </div>
          </section>
        </div>
      </div>
    </Modal>
  )
}

function CheckRow({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: (next: boolean) => void
  label: string
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-[13px] font-semibold text-fg">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="size-4 shrink-0 rounded-[3px] border border-line-strong accent-[var(--brand)]"
      />
      {label}
    </label>
  )
}
