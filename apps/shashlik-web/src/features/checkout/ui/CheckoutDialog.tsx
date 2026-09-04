import type { ReactNode } from "react"
import {
  Lock,
  MapPin,
  MessageSquare,
  Pencil,
  Phone,
  User,
  Wallet,
  Zap,
} from "lucide-react"

import { useSettings } from "@/entities/settings/api"
import { settingsFallback } from "@/entities/settings/model"
import { useCartTotals } from "@/features/cart/model/selectors"
import { CartTotals } from "@/features/cart/ui/CartTotals"
import { useCheckout } from "@/features/checkout/model/useCheckout"
import { AddressSection } from "@/features/checkout/ui/AddressSection"
import { CheckoutLineRow } from "@/features/checkout/ui/CheckoutLineRow"
import { CheckoutModeToggle } from "@/features/checkout/ui/CheckoutModeToggle"
import { CheckoutPromoField } from "@/features/checkout/ui/CheckoutPromoField"
import { CheckoutTrustBadges } from "@/features/checkout/ui/CheckoutTrustBadges"
import { SafePaymentBanner } from "@/features/checkout/ui/SafePaymentBanner"
import { formatPrice } from "@/shared/lib/format"
import { Button } from "@/shared/ui/button"
import { CoinIcon } from "@/shared/ui/coin-icon"
import { FloatingField } from "@/shared/ui/floating-field"
import { IconTextarea } from "@/shared/ui/icon-input"
import { Modal, ModalDescription, ModalTitle } from "@/shared/ui/modal"
import { Select } from "@/shared/ui/select"
import { Switch } from "@/shared/ui/switch"

type CheckoutDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const PAYMENT_OPTIONS = [
  { value: "cash", label: "При получении" },
  { value: "online", label: "Онлайн-оплата" },
] as const

export function CheckoutDialog({ open, onOpenChange }: CheckoutDialogProps) {
  const { lines } = useCartTotals()
  const { data: settings = settingsFallback() } = useSettings()
  const checkout = useCheckout({ open, onOpenChange })

  function backToVitrine() {
    onOpenChange(false)
  }

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      className="w-[min(1060px,calc(100vw-1.5rem))]"
    >
      <div className="flex max-h-[92vh] flex-col">
        <header className="shrink-0 border-b border-line px-5 pt-5 pr-14 pb-4">
          <ModalTitle className="text-[20px] leading-tight font-extrabold tracking-[-0.02em] text-fg">
            Оформление заказа
          </ModalTitle>
          <ModalDescription className="mt-1 text-[13px] font-medium text-fg-muted">
            Заполните данные для доставки и оплаты
          </ModalDescription>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto md:grid md:grid-cols-2 md:overflow-hidden">
          <section className="flex min-h-0 flex-col gap-4 overflow-y-auto p-5 scrollbar-slim md:border-r md:border-line">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-[15px] font-extrabold text-fg">Ваш заказ</h3>
              <button
                type="button"
                onClick={backToVitrine}
                className="inline-flex cursor-pointer items-center gap-1.5 text-[13px] font-bold text-brand transition-opacity hover:opacity-80"
              >
                <Pencil size={14} strokeWidth={2.4} />
                Изменить
              </button>
            </div>

            {lines.length === 0 ? (
              <p className="py-8 text-center text-[13px] font-semibold text-fg-muted">Корзина пуста</p>
            ) : (
              <ul className="divide-y divide-line">
                {lines.map((line) => (
                  <CheckoutLineRow
                    key={line.line.id}
                    line={line}
                    earnDisabled={checkout.spendBonus}
                  />
                ))}
              </ul>
            )}

            <CheckoutPromoField />

            <BonusSpendBlock
              visible={checkout.canSpendBonus}
              score={checkout.bonusScore}
              spendAmount={checkout.bonusDiscount}
              checked={checkout.spendBonus}
              onChange={checkout.setSpendBonus}
            />

            <FieldBlock label="Способ оплаты">
              <Select
                value={checkout.paymentMethod}
                onChange={(e) => checkout.setPaymentMethod(e.target.value as "cash" | "online")}
                aria-label="Способ оплаты"
                formatOption={(opt) => (
                  <span className="flex items-center gap-2">
                    <Wallet size={15} strokeWidth={2.3} className="shrink-0 text-fg-faint" />
                    {opt.label}
                  </span>
                )}
              >
                {PAYMENT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Select>
            </FieldBlock>

            <CartTotals
              bonusDiscount={checkout.bonusDiscount}
              bonusEarned={checkout.bonusEarnedPreview}
            />

            <div className="flex items-end justify-between gap-3 pt-1">
              <span className="text-[26px] leading-none font-extrabold text-fg tabular-nums">
                Итого {formatPrice(checkout.total)}
              </span>
            </div>

            <SafePaymentBanner visible={checkout.paymentMethod === "online"} />
          </section>

          <section className="flex min-h-0 flex-col gap-4 overflow-y-auto p-5 scrollbar-slim">
            <CheckoutModeToggle value={checkout.mode} onChange={checkout.setMode} />

            {checkout.mode === "delivery" ? (
              checkout.user && checkout.user.addresses.length > 0 ? (
                <AddressSection
                  addresses={checkout.user.addresses}
                  addressId={checkout.addressId}
                  onSelectAddress={checkout.selectSavedAddress}
                  parts={checkout.addressParts}
                  onPartChange={checkout.setAddressPart}
                />
              ) : (
                <AddressSection
                  addresses={[]}
                  addressId={checkout.addressId}
                  onSelectAddress={checkout.selectSavedAddress}
                  parts={checkout.addressParts}
                  onPartChange={checkout.setAddressPart}
                />
              )
            ) : (
              <FloatingField
                label="Заберу сам"
                icon={<MapPin size={16} strokeWidth={2.3} />}
                value={settings.address}
                readOnly
                tabIndex={-1}
                aria-label={`Заберу сам — ${settings.address}`}
              />
            )}

            <div className="flex flex-col gap-2">
              <FloatingField
                label="Имя"
                icon={<User size={16} strokeWidth={2.3} />}
                value={checkout.customer}
                onChange={(e) => checkout.setCustomer(e.target.value)}
                autoComplete="name"
                maxLength={50}
              />
              <FloatingField
                label="Телефон"
                icon={<Phone size={16} strokeWidth={2.3} />}
                value={checkout.phone}
                onChange={(e) => checkout.setPhone(e.target.value)}
                type="tel"
                autoComplete="tel"
                maxLength={20}
              />
            </div>

            <FieldBlock label="Комментарий к заказу">
              <IconTextarea
                icon={<MessageSquare size={16} strokeWidth={2.3} />}
                value={checkout.comment}
                onChange={(e) => checkout.setComment(e.target.value)}
                placeholder="Пожелания к заказу…"
                rows={3}
                maxLength={200}
              />
            </FieldBlock>

            {checkout.user && checkout.mode === "delivery" && checkout.isNewAddress ? (
              <CheckRow
                checked={checkout.saveAddress}
                onChange={checkout.setSaveAddress}
                label="Сохранить новый адрес"
              />
            ) : null}

            <div className="mt-auto flex flex-col gap-2.5 pt-2">
              <Button
                size="lg"
                disabled={checkout.blocked || checkout.pending}
                onClick={() => void checkout.submit()}
                className="w-full"
              >
                <Zap size={17} strokeWidth={2.6} fill="currentColor" />
                Оформить заказ · {formatPrice(checkout.total)}
              </Button>
              <p className="flex items-start justify-center gap-1.5 text-center text-[10.5px] leading-snug font-medium text-fg-faint">
                <Lock size={12} className="mt-0.5 shrink-0" strokeWidth={2.2} />
                Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
              </p>
            </div>
          </section>
        </div>

        <CheckoutTrustBadges />
      </div>
    </Modal>
  )
}

function FieldBlock({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[12px] font-bold text-fg-muted">{label}</p>
      {children}
    </div>
  )
}

function BonusSpendBlock({
  visible,
  score,
  spendAmount,
  checked,
  onChange,
}: {
  visible: boolean
  score: number
  spendAmount: number
  checked: boolean
  onChange: (next: boolean) => void
}) {
  if (!visible) return null

  return (
    <div className="flex flex-col gap-2 rounded-[var(--r-md)] border border-line bg-surface-2 px-3 py-2.5">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="inline-flex items-center gap-1 text-[12px] font-bold text-fg-muted">
            Списание бонусов
            <CoinIcon className="size-3.5 opacity-80" />
          </p>
          <p className="mt-0.5 text-[13px] font-extrabold text-fg tabular-nums">
            Доступно {score}
          </p>
        </div>
        <Switch checked={checked} onCheckedChange={onChange} aria-label="Списать бонусы" />
      </div>
      {checked ? (
        <div className="flex flex-col gap-0.5 border-t border-line/80 pt-2">
          <p className="text-[12px] font-semibold text-fg tabular-nums">
            Спишем {spendAmount} · −{formatPrice(spendAmount)}
          </p>
          <p className="text-[11px] leading-snug text-fg-muted">
            При списании бонусы за этот заказ не начисляются
          </p>
        </div>
      ) : null}
    </div>
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
        className="size-4 shrink-0 cursor-pointer rounded-[4px] border border-line-strong accent-[var(--brand)]"
      />
      {label}
    </label>
  )
}
