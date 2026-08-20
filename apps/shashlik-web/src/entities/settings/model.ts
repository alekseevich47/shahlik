import type { OrderStatus } from "@/entities/order/model"
import { ORDER_RULES, SITE } from "@/shared/config/site"

export const SETTINGS_ID = "main"

export const MAX_HOOK_STATUSES = 5
export const MAX_ORDER_TAGS = 10

export type Settings = {
  id: string
  packFee: number
  deliveryFee: number
  freeDeliveryFrom: number
  minOrder: number
  phoneDisplay: string
  phoneTel: string
  address: string
  workHours: string
  deliveryFrom: string
  promoTitle: string
  promoSubtitle: string
  promoCode: string
  acceptingOrders: boolean
  stopMessage: string
}

export type FrontpadSettings = {
  id: string
  sendEnabled: boolean
  payCodePickup: string
  payCodeDelivery: string
  channel: string
  affiliate: string
  point: string
  /** Коды отметок заказа, ≤ 10 */
  orderTags: string[]
  /** Статусы для webhook, ≤ 5 */
  hookStatuses: number[]
  /** Код статуса кассы → наш OrderStatus */
  statusMap: Record<string, OrderStatus>
  syncEnabled: boolean
  lastProductsSyncAt: string | null
  lastStopsSyncAt: string | null
}

export type FrontpadStockItem = {
  id: string
  article: string
  name: string
  price: number
  sale: boolean
  stopped: boolean
}

export const DEFAULT_STATUS_MAP: Record<string, OrderStatus> = {
  "1": "cooking",
  "3": "delivering",
  "5": "done",
  "9": "canceled",
}

/** Fallback, если PB недоступен или запись ещё не создана. */
export function settingsFallback(): Settings {
  return {
    id: SETTINGS_ID,
    packFee: ORDER_RULES.packFee,
    deliveryFee: ORDER_RULES.deliveryFee,
    freeDeliveryFrom: ORDER_RULES.freeDeliveryFrom,
    minOrder: 0,
    phoneDisplay: SITE.phoneDisplay,
    phoneTel: SITE.phoneTel,
    address: SITE.address,
    workHours: "",
    deliveryFrom: SITE.deliveryFrom,
    promoTitle: ORDER_RULES.promo.title,
    promoSubtitle: ORDER_RULES.promo.subtitle,
    promoCode: ORDER_RULES.promo.code,
    acceptingOrders: true,
    stopMessage: "Сейчас заказы не принимаем",
  }
}

export function frontpadSettingsFallback(): FrontpadSettings {
  return {
    id: SETTINGS_ID,
    sendEnabled: false,
    payCodePickup: "",
    payCodeDelivery: "",
    channel: "",
    affiliate: "",
    point: "",
    orderTags: [],
    hookStatuses: [],
    statusMap: { ...DEFAULT_STATUS_MAP },
    syncEnabled: false,
    lastProductsSyncAt: null,
    lastStopsSyncAt: null,
  }
}
