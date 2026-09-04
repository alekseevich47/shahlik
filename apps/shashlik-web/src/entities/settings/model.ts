import type { OrderStatus } from "@/entities/order/model"
import { ORDER_RULES, SITE } from "@/shared/config/site"

export const SETTINGS_ID = "main"

export const MAX_HOOK_STATUSES = 5
export const MAX_ORDER_TAGS = 10
/** Лимит Frontpad на get_products — UI гейта и pb_hooks/lib/sync.js должны совпадать. */
export const PRODUCTS_SYNC_INTERVAL_MS = 60 * 60 * 1000

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
  /** Второй промо-блок (бонус за регистрацию). */
  promo2Title: string
  promo2Subtitle: string
  promo2Code: string
  acceptingOrders: boolean
  stopMessage: string
}

export type PriceSource = "site" | "frontpad"

export type FrontpadSettings = {
  id: string
  sendEnabled: boolean
  /** Публичный URL вебхука без токена — токен добавит хук из env */
  hookUrl: string
  /** Передавать product_price в new_order (только если в кассе разрешено) */
  sendPrices: boolean
  /** Артикул кассы для упаковки; пусто — не передавать */
  articlePack: string
  /** Артикул кассы для доставки; пусто — не передавать */
  articleDelivery: string
  /** Попыток на джоб resend_order, дефолт 5 */
  retryLimit: number
  /** Последняя ошибка кассы (read-only с сервера) */
  lastError: string
  /** Время последней успешной отправки (read-only) */
  lastOrderSentAt: string | null
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
  /** Откуда брать справочник цен: сайт или касса. Запись в products — только `frontpad`. */
  priceSource: PriceSource
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
    promo2Title: "Бонус за регистрацию",
    promo2Subtitle: "Подарок на счёт и бонусы с каждого заказа",
    promo2Code: "",
    acceptingOrders: true,
    stopMessage: "Сейчас заказы не принимаем",
  }
}

export function frontpadSettingsFallback(): FrontpadSettings {
  return {
    id: SETTINGS_ID,
    sendEnabled: false,
    hookUrl: "",
    sendPrices: false,
    articlePack: "",
    articleDelivery: "",
    retryLimit: 5,
    lastError: "",
    lastOrderSentAt: null,
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
    priceSource: "site",
  }
}
