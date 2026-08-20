import { useMutation, useQuery } from "@tanstack/react-query"

import type {
  FrontpadJob,
  FrontpadJobKind,
  FrontpadJobStatus,
  OrderStatus,
} from "@/entities/order/model"
import { pbErrorMessage } from "@/shared/api/crud"
import { pb } from "@/shared/api/pb"
import { queryClient } from "@/shared/api/query-client"

import {
  DEFAULT_STATUS_MAP,
  SETTINGS_ID,
  frontpadSettingsFallback,
  settingsFallback,
  type FrontpadSettings,
  type FrontpadStockItem,
  type Settings,
} from "./model"

type SettingsRecord = {
  id: string
  packFee?: number
  deliveryFee?: number
  freeDeliveryFrom?: number
  minOrder?: number
  phoneDisplay?: string
  phoneTel?: string
  address?: string
  workHours?: string
  deliveryFrom?: string
  promoTitle?: string
  promoSubtitle?: string
  promoCode?: string
  acceptingOrders?: boolean
  stopMessage?: string
}

type FrontpadSettingsRecord = {
  id: string
  sendEnabled?: boolean
  payCodePickup?: string
  payCodeDelivery?: string
  channel?: string
  affiliate?: string
  point?: string
  orderTags?: unknown
  hookStatuses?: unknown
  statusMap?: unknown
  syncEnabled?: boolean
  lastProductsSyncAt?: string | null
  lastStopsSyncAt?: string | null
}

type FrontpadStockRecord = {
  id: string
  article: string
  name?: string
  price: number
  sale: boolean
  stopped: boolean
}

type FrontpadJobRecord = {
  id: string
  kind: FrontpadJobKind
  status: FrontpadJobStatus
  error?: string
  created: string
}

export type UpdateSettingsInput = Partial<Omit<Settings, "id">>
export type UpdateFrontpadSettingsInput = Partial<Omit<FrontpadSettings, "id">>

export const settingsKeys = {
  all: ["settings"] as const,
  detail: (id: string) => ["settings", id] as const,
}

export const frontpadSettingsKeys = {
  all: ["frontpad_settings"] as const,
  detail: (id: string) => ["frontpad_settings", id] as const,
}

export const stoppedStockKeys = {
  all: ["frontpad_stock"] as const,
  stopped: ["frontpad_stock", "stopped"] as const,
}

export const syncJobKeys = {
  all: ["frontpad_jobs", "sync"] as const,
}

const ORDER_STATUSES = new Set<OrderStatus>([
  "new",
  "cooking",
  "delivering",
  "done",
  "canceled",
])

function asStringList(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return value
    .map((item) => (typeof item === "string" || typeof item === "number" ? String(item).trim() : ""))
    .filter(Boolean)
}

function asNumberList(value: unknown): number[] {
  if (!Array.isArray(value)) return []
  const out: number[] = []
  for (const item of value) {
    const n = typeof item === "number" ? item : Number(String(item).trim())
    if (Number.isFinite(n)) out.push(n)
  }
  return out
}

function asStatusMap(value: unknown): Record<string, OrderStatus> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return { ...DEFAULT_STATUS_MAP }
  }
  const out: Record<string, OrderStatus> = {}
  for (const [key, raw] of Object.entries(value as Record<string, unknown>)) {
    if (typeof raw === "string" && ORDER_STATUSES.has(raw as OrderStatus)) {
      out[key] = raw as OrderStatus
    }
  }
  return Object.keys(out).length ? out : { ...DEFAULT_STATUS_MAP }
}

function mapSettings(record: SettingsRecord): Settings {
  const fallback = settingsFallback()
  return {
    id: record.id,
    packFee: record.packFee ?? fallback.packFee,
    deliveryFee: record.deliveryFee ?? fallback.deliveryFee,
    freeDeliveryFrom: record.freeDeliveryFrom ?? fallback.freeDeliveryFrom,
    minOrder: record.minOrder ?? fallback.minOrder,
    phoneDisplay: record.phoneDisplay || fallback.phoneDisplay,
    phoneTel: record.phoneTel || fallback.phoneTel,
    address: record.address || fallback.address,
    workHours: record.workHours ?? fallback.workHours,
    deliveryFrom: record.deliveryFrom || fallback.deliveryFrom,
    promoTitle: record.promoTitle || fallback.promoTitle,
    promoSubtitle: record.promoSubtitle || fallback.promoSubtitle,
    promoCode: record.promoCode || fallback.promoCode,
    acceptingOrders: record.acceptingOrders ?? fallback.acceptingOrders,
    stopMessage: record.stopMessage || fallback.stopMessage,
  }
}

function mapFrontpadSettings(record: FrontpadSettingsRecord): FrontpadSettings {
  return {
    id: record.id,
    sendEnabled: Boolean(record.sendEnabled),
    payCodePickup: record.payCodePickup ?? "",
    payCodeDelivery: record.payCodeDelivery ?? "",
    channel: record.channel ?? "",
    affiliate: record.affiliate ?? "",
    point: record.point ?? "",
    orderTags: asStringList(record.orderTags),
    hookStatuses: asNumberList(record.hookStatuses),
    statusMap: asStatusMap(record.statusMap),
    syncEnabled: Boolean(record.syncEnabled),
    lastProductsSyncAt: record.lastProductsSyncAt ?? null,
    lastStopsSyncAt: record.lastStopsSyncAt ?? null,
  }
}

function mapStock(record: FrontpadStockRecord): FrontpadStockItem {
  return {
    id: record.id,
    article: record.article,
    name: record.name ?? "",
    price: record.price,
    sale: Boolean(record.sale),
    stopped: Boolean(record.stopped),
  }
}

function mapJob(record: FrontpadJobRecord): FrontpadJob {
  return {
    id: record.id,
    kind: record.kind,
    status: record.status,
    error: record.error || undefined,
    createdAt: record.created,
  }
}

export async function fetchSettings(): Promise<Settings> {
  try {
    const record = await pb.collection("settings").getOne<SettingsRecord>(SETTINGS_ID)
    return mapSettings(record)
  } catch {
    return settingsFallback()
  }
}

export async function fetchFrontpadSettings(): Promise<FrontpadSettings> {
  try {
    const record = await pb
      .collection("frontpad_settings")
      .getOne<FrontpadSettingsRecord>(SETTINGS_ID)
    return mapFrontpadSettings(record)
  } catch {
    return frontpadSettingsFallback()
  }
}

export async function fetchStoppedStock(): Promise<FrontpadStockItem[]> {
  const records = await pb.collection("frontpad_stock").getFullList<FrontpadStockRecord>({
    filter: "stopped = true",
    sort: "article",
  })
  return records.map(mapStock)
}

export async function fetchActiveSyncJobs(): Promise<FrontpadJob[]> {
  const records = await pb.collection("frontpad_jobs").getFullList<FrontpadJobRecord>({
    filter:
      '(kind = "sync_products" || kind = "sync_stops") && (status = "queued" || status = "running")',
    sort: "-created",
  })
  return records.map(mapJob)
}

export function useSettings() {
  return useQuery({
    queryKey: settingsKeys.detail(SETTINGS_ID),
    queryFn: fetchSettings,
    staleTime: 5 * 60 * 1000,
    placeholderData: settingsFallback(),
  })
}

export function useFrontpadSettings(enabled = true) {
  return useQuery({
    queryKey: frontpadSettingsKeys.detail(SETTINGS_ID),
    queryFn: fetchFrontpadSettings,
    staleTime: 5 * 60 * 1000,
    enabled,
    placeholderData: frontpadSettingsFallback(),
  })
}

export function useStoppedStock(enabled = true) {
  return useQuery({
    queryKey: stoppedStockKeys.stopped,
    queryFn: fetchStoppedStock,
    enabled,
  })
}

export function useActiveSyncJobs(enabled = true) {
  return useQuery({
    queryKey: syncJobKeys.all,
    queryFn: fetchActiveSyncJobs,
    enabled,
  })
}

export async function updateSettings(data: UpdateSettingsInput): Promise<Settings> {
  try {
    const record = await pb
      .collection("settings")
      .update<SettingsRecord>(SETTINGS_ID, data)
    return mapSettings(record)
  } catch (err) {
    throw new Error(pbErrorMessage(err, "Не удалось сохранить настройки"))
  }
}

export function useUpdateSettings() {
  return useMutation({
    mutationFn: updateSettings,
    onSuccess: (entity) => {
      queryClient.setQueryData(settingsKeys.detail(SETTINGS_ID), entity)
      void queryClient.invalidateQueries({ queryKey: settingsKeys.all })
    },
  })
}

export async function updateFrontpadSettings(
  data: UpdateFrontpadSettingsInput,
): Promise<FrontpadSettings> {
  try {
    const record = await pb
      .collection("frontpad_settings")
      .update<FrontpadSettingsRecord>(SETTINGS_ID, data)
    return mapFrontpadSettings(record)
  } catch (err) {
    throw new Error(pbErrorMessage(err, "Не удалось сохранить настройки кассы"))
  }
}

export function useUpdateFrontpadSettings() {
  return useMutation({
    mutationFn: updateFrontpadSettings,
    onSuccess: (entity) => {
      queryClient.setQueryData(frontpadSettingsKeys.detail(SETTINGS_ID), entity)
      void queryClient.invalidateQueries({ queryKey: frontpadSettingsKeys.all })
    },
  })
}

export async function enqueueSyncJob(
  kind: "sync_products" | "sync_stops",
): Promise<FrontpadJob> {
  try {
    const record = await pb.collection("frontpad_jobs").create<FrontpadJobRecord>({
      kind,
      payload: {},
      status: "queued" satisfies FrontpadJobStatus,
      attempts: 0,
    })
    return mapJob(record)
  } catch (err) {
    throw new Error(pbErrorMessage(err, "Не удалось поставить синхронизацию"))
  }
}

export function useEnqueueSyncJob() {
  return useMutation({
    mutationFn: enqueueSyncJob,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: syncJobKeys.all })
    },
  })
}
