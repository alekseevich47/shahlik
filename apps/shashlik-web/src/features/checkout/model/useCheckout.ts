import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

import { addAddress, getAccount, useAccount, useProfileBonus } from "@/entities/account/api"
import type { SavedAddress } from "@/entities/account/model"
import { usePublicBonusSettings } from "@/entities/bonus/api"
import { calcBonusSpendCap, calcCartEarn } from "@/entities/bonus/lib/earn"
import { publicBonusSettingsFallback } from "@/entities/bonus/model"
import { useCreateOrder, type CreateOrderInput } from "@/entities/order/api"
import type { OrderAddressParts } from "@/entities/order/model"
import { articleFor } from "@/entities/product/lib"
import { useCartTotals } from "@/features/cart/model/selectors"
import { EMPTY_ADDRESS_PARTS, useCartStore } from "@/features/cart/model/store"
import { rememberLocalOrder } from "@/features/order-tracking/model/localOrders"
import { pbErrorMessage } from "@/shared/api/crud"
import { formatPrice } from "@/shared/lib/format"

export const NEW_ADDRESS = "new"

export type PaymentMethod = "cash" | "online"

export function formatAddressLine(parts: OrderAddressParts): string {
  const chunks = [parts.street?.trim(), parts.home?.trim()].filter(Boolean)
  const extra = [
    parts.pod?.trim() ? `подъезд ${parts.pod.trim()}` : "",
    parts.et?.trim() ? `эт. ${parts.et.trim()}` : "",
    parts.apart?.trim() ? `кв. ${parts.apart.trim()}` : "",
  ].filter(Boolean)
  if (extra.length) chunks.push(extra.join(", "))
  return chunks.join(", ")
}

function savedToParts(address: SavedAddress): OrderAddressParts {
  return {
    street: address.street,
    home: address.home,
    pod: address.pod,
    et: address.et,
    apart: address.apart,
  }
}

type UseCheckoutArgs = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function useCheckout({ open, onOpenChange }: UseCheckoutArgs) {
  const user = useAccount()
  const {
    lines,
    count,
    goods,
    packFee,
    deliveryFee,
    discount,
    minOrder,
    acceptingOrders,
    stopMessage,
  } = useCartTotals()

  const mode = useCartStore((s) => s.mode)
  const setMode = useCartStore((s) => s.setMode)
  const addressParts = useCartStore((s) => s.addressParts)
  const setAddressPart = useCartStore((s) => s.setAddressPart)
  const setAddressParts = useCartStore((s) => s.setAddressParts)
  const comment = useCartStore((s) => s.comment)
  const setComment = useCartStore((s) => s.setComment)
  const customer = useCartStore((s) => s.customer)
  const setCustomer = useCartStore((s) => s.setCustomer)
  const phone = useCartStore((s) => s.phone)
  const setPhone = useCartStore((s) => s.setPhone)
  const appliedCoupon = useCartStore((s) => s.appliedCoupon)
  const clearCart = useCartStore((s) => s.clear)

  const createOrder = useCreateOrder()
  const navigate = useNavigate()
  const bonusQuery = useProfileBonus(open && Boolean(user))
  const { data: bonusSettings = publicBonusSettingsFallback() } = usePublicBonusSettings()

  const [addressId, setAddressId] = useState(NEW_ADDRESS)
  const [saveAddress, setSaveAddress] = useState(false)
  const [spendBonus, setSpendBonus] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash")

  const empty = lines.length === 0
  const belowMinOrder = minOrder > 0 && goods < minOrder
  const blocked = empty || !acceptingOrders || belowMinOrder
  const bonus = bonusQuery.data
  const canSpendBonus = Boolean(
    user && bonusSettings.enabled && bonus && bonus.score > 0,
  )
  const spendCap =
    canSpendBonus && bonus
      ? calcBonusSpendCap({
          score: bonus.score,
          goods,
          discount,
          maxSpendPercent: bonusSettings.maxSpendPercent,
        })
      : 0
  const bonusDiscount = spendBonus && spendCap > 0 ? spendCap : 0
  const bonusEarnedPreview =
    spendBonus || !bonusSettings.enabled
      ? 0
      : calcCartEarn(
          lines.map((line) => ({
            total: line.total,
            bonusPercent: line.product.bonusPercent,
          })),
          bonusSettings.defaultEarnPercent,
          true,
        )
  const checkoutTotal = Math.max(goods + packFee + deliveryFee - discount - bonusDiscount, 0)
  const isNewAddress =
    addressId === NEW_ADDRESS || !user?.addresses.length

  useEffect(() => {
    if (!open) {
      setSpendBonus(false)
      setPaymentMethod("cash")
      return
    }
    const account = getAccount()
    if (!account) {
      setAddressId(NEW_ADDRESS)
      return
    }
    const state = useCartStore.getState()
    if (!state.customer.trim()) {
      const name = [account.firstName, account.lastName].filter(Boolean).join(" ")
      if (name) state.setCustomer(name)
    }
    if (!state.phone.trim() && account.phone) {
      state.setPhone(account.phone)
    }
    const fallback = account.addresses.find((item) => item.isDefault) ?? account.addresses[0]
    if (!fallback) {
      setAddressId(NEW_ADDRESS)
      setSaveAddress(true)
      return
    }
    const street = state.addressParts.street?.trim() ?? ""
    const home = state.addressParts.home?.trim() ?? ""
    if (!street && !home) {
      state.setAddressParts(savedToParts(fallback))
      setAddressId(fallback.id)
    }
  }, [open])

  function selectSavedAddress(id: string) {
    setAddressId(id)
    if (id === NEW_ADDRESS) {
      setAddressParts(EMPTY_ADDRESS_PARTS)
      setSaveAddress(true)
      return
    }
    const found = user?.addresses.find((item) => item.id === id)
    if (!found) return
    setAddressParts(savedToParts(found))
    setSaveAddress(false)
  }

  function buildInput(): CreateOrderInput {
    const deliveryAddress = mode === "delivery" ? formatAddressLine(addressParts) : undefined
    return {
      customer: customer.trim(),
      phone: phone.trim(),
      mode,
      address: deliveryAddress,
      addressParts: mode === "delivery" ? addressParts : null,
      comment: comment.trim(),
      positions: count,
      goods,
      packFee,
      deliveryFee,
      discount,
      total: checkoutTotal,
      couponCode: appliedCoupon?.code ?? null,
      spendBonus,
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
    }
  }

  function validate(): string | null {
    if (!acceptingOrders) return stopMessage || "Сейчас заказы не принимаем"
    if (belowMinOrder) return `Минимальная сумма заказа ${formatPrice(minOrder)}`
    if (empty) return "Добавьте товары в корзину"
    if (!phone.trim()) return "Укажите телефон"
    if (mode === "delivery") {
      const street = addressParts.street?.trim() ?? ""
      const home = addressParts.home?.trim() ?? ""
      if (!street || !home) return "Укажите улицу и дом для доставки"
    }
    return null
  }

  async function persistNewAddress() {
    if (!user || !saveAddress || mode !== "delivery" || !isNewAddress) return
    const street = addressParts.street?.trim() ?? ""
    const home = addressParts.home?.trim() ?? ""
    if (!street || !home) return
    try {
      await addAddress({
        label: street,
        street,
        home,
        pod: addressParts.pod?.trim() ?? "",
        et: addressParts.et?.trim() ?? "",
        apart: addressParts.apart?.trim() ?? "",
        isDefault: user.addresses.length === 0,
      })
    } catch {
      // заказ уже принят
    }
  }

  async function submit() {
    const error = validate()
    if (error) {
      toast.error(error)
      return
    }
    try {
      const order = await createOrder.mutateAsync(buildInput())
      rememberLocalOrder(order.id)
      await persistNewAddress()
      onOpenChange(false)
      clearCart()
      toast.success(`Заказ ${order.number} принят`)
      navigate(`/order/${order.id}`)
    } catch (err) {
      toast.error(pbErrorMessage(err, "Не удалось оформить заказ"))
    }
  }

  return {
    user,
    mode,
    setMode,
    addressParts,
    setAddressPart,
    comment,
    setComment,
    customer,
    setCustomer,
    phone,
    setPhone,
    total: checkoutTotal,
    bonusDiscount,
    totalDiscount: discount + bonusDiscount,
    blocked,
    pending: createOrder.isPending,
    addressId,
    selectSavedAddress,
    saveAddress,
    setSaveAddress,
    isNewAddress,
    spendBonus,
    setSpendBonus,
    canSpendBonus,
    bonusScore: bonus?.score ?? 0,
    bonusEarnedPreview,
    paymentMethod,
    setPaymentMethod,
    submit,
  }
}
