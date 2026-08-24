import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"

import { useAccount } from "@/app/providers/account"
import {
  addAddress,
  linkPhone,
  removeAddress,
  setDefaultAddress,
  updateAccount,
  useProfileBonus,
} from "@/entities/account/api"
import type { NewSavedAddress, SavedAddress } from "@/entities/account/model"
import { useMyOrders } from "@/entities/order/api"
import { isActiveOrderStatus, ORDER_STATUS_LABEL, type Order } from "@/entities/order/model"
import { formatAddressLine } from "@/features/checkout/model/useCheckout"
import { getLatestLocalOrderId, listLocalOrderIds } from "@/features/order-tracking/model/localOrders"
import { useLiveOrder } from "@/features/order-tracking/model/useLiveOrder"
import { repeatOrderIntoCart } from "@/features/order-tracking/lib/repeatOrder"
import { OrderDetails } from "@/features/order-tracking/ui/OrderDetails"
import { SITE } from "@/shared/config/site"
import { formatDateTime, formatPrice } from "@/shared/lib/format"
import { cn } from "@/shared/lib/cn"
import { Button } from "@/shared/ui/button"
import { Field, Input } from "@/shared/ui/input"
import { Segmented } from "@/shared/ui/segmented"

import { LoginPanel } from "./ui/LoginPanel"

type Tab = "current" | "history" | "data" | "addresses" | "bonus"

const TABS_GUEST: ReadonlyArray<{ value: Tab; label: string }> = [
  { value: "current", label: "Текущий заказ" },
]

const TABS_USER: ReadonlyArray<{ value: Tab; label: string }> = [
  { value: "current", label: "Текущий заказ" },
  { value: "history", label: "История" },
  { value: "data", label: "Данные" },
  { value: "addresses", label: "Адреса" },
  { value: "bonus", label: "Бонусы" },
]

export default function ProfilePage() {
  const navigate = useNavigate()
  const { user, ready, logout } = useAccount()
  const [tab, setTab] = useState<Tab>("current")
  const tabs = user ? TABS_USER : TABS_GUEST

  useEffect(() => {
    if (!user && tab !== "current") setTab("current")
  }, [user, tab])

  if (!ready) {
    return (
      <div className="grid min-h-dvh place-items-center bg-canvas">
        <span className="size-8 animate-spin rounded-full border-2 border-line border-t-brand" />
      </div>
    )
  }

  return (
    <div className="min-h-dvh bg-canvas">
      <header className="border-b border-line bg-surface">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-4">
          <Link to="/" className="flex items-center gap-2">
            <img src={SITE.brandLogo} alt={SITE.name} className="h-10 w-auto object-contain" />
          </Link>
          {user ? (
            <Button type="button" variant="ghost" size="sm" onClick={() => logout()}>
              Выйти
            </Button>
          ) : (
            <Link to="/" className="text-[13px] font-bold text-fg-muted hover:text-brand">
              На сайт
            </Link>
          )}
        </div>
      </header>

      <main className="mx-auto flex max-w-3xl flex-col gap-5 px-4 py-6 pb-16">
        {!user ? (
          <>
            <LoginPanel />
            <section className="flex flex-col gap-3">
              <h2 className="text-[15px] font-extrabold text-fg">Текущий заказ</h2>
              <GuestCurrentOrder />
            </section>
          </>
        ) : (
          <>
            <div>
              <h1 className="text-[22px] font-extrabold tracking-[-0.02em] text-fg">
                {user.firstName || user.lastName
                  ? [user.firstName, user.lastName].filter(Boolean).join(" ")
                  : "Профиль"}
              </h1>
              {user.phone ? (
                <p className="mt-1 text-[13px] text-fg-muted">{user.phone}</p>
              ) : null}
            </div>

            <Segmented value={tab} onChange={setTab} options={tabs} ariaLabel="Разделы профиля" />

            {tab === "current" ? <CurrentOrderTab /> : null}
            {tab === "history" ? <HistoryTab onOpen={(id) => navigate(`/order/${id}`)} /> : null}
            {tab === "data" ? <DataTab /> : null}
            {tab === "addresses" ? <AddressesTab /> : null}
            {tab === "bonus" ? <BonusTab /> : null}
          </>
        )}
      </main>
    </div>
  )
}

function GuestCurrentOrder() {
  const localId = getLatestLocalOrderId()
  if (!localId) {
    return (
      <EmptyBlock>
        Нет активного заказа. Оформите заказ — статус появится здесь и по ссылке после оформления.
      </EmptyBlock>
    )
  }
  return <LiveOrderBlock id={localId} />
}

function CurrentOrderTab() {
  const { data: orders = [], isLoading } = useMyOrders()
  const active = useMemo(
    () => orders.find((order) => isActiveOrderStatus(order.status)) ?? null,
    [orders],
  )
  const localId = getLatestLocalOrderId()

  if (isLoading) return <LoadingBlock />
  if (active) return <LiveOrderBlock id={active.id} />
  if (localId) return <LiveOrderBlock id={localId} onlyIfActive />
  return <EmptyBlock>Сейчас нет активного заказа</EmptyBlock>
}

function LiveOrderBlock({ id, onlyIfActive }: { id: string; onlyIfActive?: boolean }) {
  const navigate = useNavigate()
  const { data: order, isLoading, isError } = useLiveOrder(id)

  if (isLoading) return <LoadingBlock />
  if (isError || !order) {
    return <EmptyBlock>Заказ не найден</EmptyBlock>
  }
  if (onlyIfActive && !isActiveOrderStatus(order.status)) {
    return <EmptyBlock>Сейчас нет активного заказа</EmptyBlock>
  }

  return (
    <OrderDetails
      order={order}
      actions={
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button type="button" variant="outline" block onClick={() => navigate(`/order/${order.id}`)}>
            Открыть трекинг
          </Button>
          <RepeatButton order={order} />
        </div>
      }
    />
  )
}

function HistoryTab({ onOpen }: { onOpen: (id: string) => void }) {
  const { data: orders = [], isLoading } = useMyOrders()
  const localIds = listLocalOrderIds()

  if (isLoading) return <LoadingBlock />
  if (orders.length === 0 && localIds.length === 0) {
    return <EmptyBlock>История пуста</EmptyBlock>
  }

  return (
    <ul className="flex flex-col gap-2">
      {orders.map((order) => (
        <li key={order.id}>
          <button
            type="button"
            onClick={() => onOpen(order.id)}
            className="flex w-full cursor-pointer items-center justify-between gap-3 rounded-[var(--r-lg)] border border-line bg-surface px-4 py-3 text-left transition-colors hover:border-brand-border"
          >
            <span className="min-w-0">
              <span className="block text-[14px] font-bold text-fg">
                {order.number || order.id.slice(0, 8)}
              </span>
              <span className="text-[11px] text-fg-faint">{formatDateTime(order.createdAt)}</span>
            </span>
            <span className="flex shrink-0 flex-col items-end gap-1">
              <span className="text-[12px] font-extrabold text-brand">
                {ORDER_STATUS_LABEL[order.status]}
              </span>
              <span className="text-[13px] font-bold tabular-nums text-fg">
                {formatPrice(order.total)}
              </span>
            </span>
          </button>
        </li>
      ))}
    </ul>
  )
}

function DataTab() {
  const { user } = useAccount()
  const [firstName, setFirstName] = useState(user?.firstName ?? "")
  const [lastName, setLastName] = useState(user?.lastName ?? "")
  const [phone, setPhone] = useState(user?.phone ?? "")
  const [birthday, setBirthday] = useState(user?.birthday?.slice(0, 10) ?? "")
  const [pending, setPending] = useState(false)
  const birthdayLocked = Boolean(user?.birthday)

  useEffect(() => {
    setFirstName(user?.firstName ?? "")
    setLastName(user?.lastName ?? "")
    setPhone(user?.phone ?? "")
    setBirthday(user?.birthday?.slice(0, 10) ?? "")
  }, [user])

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    if (!user) return
    setPending(true)
    try {
      const nextPhone = phone.trim()
      await updateAccount({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: nextPhone,
        ...(birthdayLocked || !birthday.trim() ? {} : { birthday: birthday.trim() }),
      })
      if (nextPhone && nextPhone !== user.phone) {
        await linkPhone(nextPhone)
      }
      toast.success("Данные сохранены")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Не удалось сохранить")
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 rounded-[var(--r-xl)] border border-line bg-surface p-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Имя">
          <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} maxLength={50} />
        </Field>
        <Field label="Фамилия">
          <Input value={lastName} onChange={(e) => setLastName(e.target.value)} maxLength={50} />
        </Field>
      </div>
      <Field label="Телефон" hint="Нужен для бонусов и привязки заказов">
        <Input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+7…"
          autoComplete="tel"
        />
      </Field>
      <Field
        label="День рождения"
        hint={birthdayLocked ? "Уже сохранён и больше не меняется" : "Можно указать один раз"}
      >
        <Input
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          disabled={birthdayLocked}
        />
      </Field>
      <Button type="submit" variant="brand" disabled={pending}>
        {pending ? "Сохраняем…" : "Сохранить"}
      </Button>
    </form>
  )
}

function AddressesTab() {
  const { user } = useAccount()
  const addresses = user?.addresses ?? []
  const [draft, setDraft] = useState<NewSavedAddress>({
    label: "",
    street: "",
    home: "",
    pod: "",
    et: "",
    apart: "",
    isDefault: addresses.length === 0,
  })
  const [pending, setPending] = useState(false)

  async function onAdd(event: FormEvent) {
    event.preventDefault()
    if (!draft.street.trim() || !draft.home.trim()) {
      toast.error("Укажите улицу и дом")
      return
    }
    setPending(true)
    try {
      await addAddress({
        ...draft,
        label: draft.label.trim(),
        street: draft.street.trim(),
        home: draft.home.trim(),
        pod: draft.pod.trim(),
        et: draft.et.trim(),
        apart: draft.apart.trim(),
      })
      setDraft({
        label: "",
        street: "",
        home: "",
        pod: "",
        et: "",
        apart: "",
        isDefault: false,
      })
      toast.success("Адрес добавлен")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Не удалось добавить")
    } finally {
      setPending(false)
    }
  }

  async function onRemove(id: string) {
    try {
      await removeAddress(id)
      toast.success("Адрес удалён")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Не удалось удалить")
    }
  }

  async function onDefault(id: string) {
    try {
      await setDefaultAddress(id)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Не удалось сделать основным")
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {addresses.length === 0 ? (
        <EmptyBlock>Пока нет сохранённых адресов</EmptyBlock>
      ) : (
        <ul className="flex flex-col gap-2">
          {addresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              onRemove={() => void onRemove(address.id)}
              onDefault={() => void onDefault(address.id)}
            />
          ))}
        </ul>
      )}

      <form
        onSubmit={onAdd}
        className="flex flex-col gap-2 rounded-[var(--r-xl)] border border-line bg-surface p-4"
      >
        <p className="text-[13px] font-extrabold text-fg">Новый адрес</p>
        <Input
          value={draft.label}
          onChange={(e) => setDraft((s) => ({ ...s, label: e.target.value }))}
          placeholder="Подпись (дом, работа…)"
          maxLength={50}
        />
        <Input
          value={draft.street}
          onChange={(e) => setDraft((s) => ({ ...s, street: e.target.value }))}
          placeholder="Улица"
          maxLength={50}
        />
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Input
            value={draft.home}
            onChange={(e) => setDraft((s) => ({ ...s, home: e.target.value }))}
            placeholder="Дом"
            maxLength={50}
          />
          <Input
            value={draft.pod}
            onChange={(e) => setDraft((s) => ({ ...s, pod: e.target.value }))}
            placeholder="Подъезд"
            maxLength={2}
          />
          <Input
            value={draft.et}
            onChange={(e) => setDraft((s) => ({ ...s, et: e.target.value }))}
            placeholder="Этаж"
            maxLength={2}
          />
          <Input
            value={draft.apart}
            onChange={(e) => setDraft((s) => ({ ...s, apart: e.target.value }))}
            placeholder="Кв."
            maxLength={50}
          />
        </div>
        <label className="flex cursor-pointer items-center gap-2 text-[13px] font-semibold text-fg-soft">
          <input
            type="checkbox"
            checked={draft.isDefault}
            onChange={(e) => setDraft((s) => ({ ...s, isDefault: e.target.checked }))}
            className="size-4 accent-[var(--brand)]"
          />
          Сделать основным
        </label>
        <Button type="submit" variant="brand" disabled={pending}>
          {pending ? "Добавляем…" : "Добавить адрес"}
        </Button>
      </form>
    </div>
  )
}

function AddressCard({
  address,
  onRemove,
  onDefault,
}: {
  address: SavedAddress
  onRemove: () => void
  onDefault: () => void
}) {
  return (
    <li className="rounded-[var(--r-lg)] border border-line bg-surface p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[14px] font-bold text-fg">
            {address.label || formatAddressLine(address)}
            {address.isDefault ? (
              <span className="ml-2 text-[11px] font-extrabold text-brand">основной</span>
            ) : null}
          </p>
          {address.label ? (
            <p className="mt-0.5 text-[12px] text-fg-muted">{formatAddressLine(address)}</p>
          ) : null}
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {!address.isDefault ? (
          <Button type="button" variant="outline" size="xs" onClick={onDefault}>
            Основной
          </Button>
        ) : null}
        <Button type="button" variant="ghost" size="xs" onClick={onRemove}>
          Удалить
        </Button>
      </div>
    </li>
  )
}

function BonusTab() {
  const { data, isLoading, isError, error, refetch, isFetching } = useProfileBonus(true)

  if (isLoading) return <LoadingBlock />
  if (isError) {
    return (
      <EmptyBlock>
        {error instanceof Error ? error.message : "Не удалось загрузить бонусы"}
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-3"
          disabled={isFetching}
          onClick={() => void refetch()}
        >
          Повторить
        </Button>
      </EmptyBlock>
    )
  }

  return (
    <div className="rounded-[var(--r-xl)] border border-line bg-surface p-5">
      <p className="text-[12px] font-semibold text-fg-muted">Баллы на карте</p>
      <p className="mt-1 text-[36px] leading-none font-extrabold tabular-nums text-fg">
        {data?.score ?? 0}
      </p>
      {(data?.sale ?? 0) > 0 ? (
        <p className="mt-3 text-[13px] font-semibold text-brand">Скидка {data?.sale}%</p>
      ) : null}
      {data?.card ? (
        <p className="mt-2 text-[12px] text-fg-muted">Карта {data.card}</p>
      ) : null}
      <p className="mt-4 text-[11px] text-fg-faint">Данные из кассы, обновляются не чаще раза в минуту</p>
    </div>
  )
}

function RepeatButton({ order }: { order: Order }) {
  const navigate = useNavigate()
  return (
    <Button
      type="button"
      variant="brand"
      block
      onClick={() => {
        repeatOrderIntoCart(order)
        toast.success("Состав добавлен в корзину")
        navigate("/")
      }}
    >
      Повторить заказ
    </Button>
  )
}

function EmptyBlock({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-[var(--r-xl)] border border-dashed border-line bg-surface px-4 py-8 text-center text-[13px] font-semibold text-fg-muted",
        className,
      )}
    >
      {children}
    </div>
  )
}

function LoadingBlock() {
  return (
    <div className="grid place-items-center rounded-[var(--r-xl)] border border-line bg-surface py-12">
      <span className="size-7 animate-spin rounded-full border-2 border-line border-t-brand" />
    </div>
  )
}
