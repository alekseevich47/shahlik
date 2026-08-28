import { useQuery } from "@tanstack/react-query"
import type { RecordModel } from "pocketbase"
import { useSyncExternalStore } from "react"

import { ensurePbBaseUrl } from "@/shared/api/pb"
import { pbClient } from "@/shared/api/pb-client"
import { queryClient } from "@/shared/api/query-client"

import type {
  AppUser,
  NewSavedAddress,
  OAuthProvider,
  ProfileBonus,
  SavedAddress,
  UpdateAccountInput,
} from "./model"

export const accountKeys = {
  bonus: ["account", "bonus"] as const,
}

const COLLECTION = "app_users"

function asString(value: unknown): string {
  return typeof value === "string" ? value : ""
}

function asId(value: unknown): string | null {
  if (typeof value === "string" && value) return value
  return null
}

function mapAddress(raw: unknown): SavedAddress | null {
  if (!raw || typeof raw !== "object") return null
  const row = raw as Record<string, unknown>
  const id = asString(row.id)
  if (!id) return null
  return {
    id,
    label: asString(row.label),
    street: asString(row.street),
    home: asString(row.home),
    pod: asString(row.pod),
    et: asString(row.et),
    apart: asString(row.apart),
    isDefault: Boolean(row.isDefault),
  }
}

function mapAddresses(raw: unknown): SavedAddress[] {
  if (!Array.isArray(raw)) return []
  const out: SavedAddress[] = []
  for (const item of raw) {
    const address = mapAddress(item)
    if (address) out.push(address)
  }
  return out
}

function mapExtraEmails(raw: unknown): string[] {
  if (!Array.isArray(raw)) return []
  const out: string[] = []
  for (const item of raw) {
    if (typeof item === "string" && item.trim()) out.push(item.trim())
  }
  return out
}

export function mapAppUser(record: RecordModel): AppUser {
  return {
    id: record.id,
    email: asString(record.email),
    extraEmails: mapExtraEmails(record.extraEmails),
    phone: asString(record.phone),
    firstName: asString(record.firstName),
    lastName: asString(record.lastName),
    birthday: asString(record.birthday) || null,
    addresses: mapAddresses(record.addresses),
    customerId: asId(record.customerId),
    blocked: Boolean(record.blocked),
  }
}

export function isAppUserRecord(record: RecordModel | null): boolean {
  return record?.collectionName === COLLECTION
}

/** Инкремент при logout — отменяет поздний authRefresh, который иначе восстанавливает сессию. */
let clientAuthEpoch = 0

export function getClientAuthEpoch(): number {
  return clientAuthEpoch
}

function resetAccountCache(): void {
  accountSnapshotKey = ""
  accountSnapshot = null
}

/** Кэш снапшота: useSyncExternalStore требует стабильную ссылку, иначе React #185. */
let accountSnapshot: AppUser | null = null
let accountSnapshotKey = ""

function accountCacheKey(): string {
  if (!pbClient.authStore.isValid) return ""
  const record = pbClient.authStore.record
  if (!record || !isAppUserRecord(record)) return ""
  return `${pbClient.authStore.token}:${record.id}:${String(record.updated ?? "")}`
}

export function getAccount(): AppUser | null {
  const key = accountCacheKey()
  if (key === accountSnapshotKey) return accountSnapshot
  accountSnapshotKey = key
  if (!key) {
    accountSnapshot = null
    return null
  }
  const record = pbClient.authStore.record
  accountSnapshot = record && isAppUserRecord(record) ? mapAppUser(record) : null
  return accountSnapshot
}

function subscribeAccount(onStoreChange: () => void) {
  return pbClient.authStore.onChange(() => {
    resetAccountCache()
    onStoreChange()
  })
}

export function useAccount(): AppUser | null {
  return useSyncExternalStore(subscribeAccount, getAccount, getAccount)
}

function requireAccountId(): string {
  const id = pbClient.authStore.record?.id
  if (!id || !pbClient.authStore.isValid) {
    throw new Error("Нужно войти")
  }
  return id
}

async function persistRecord(record: RecordModel): Promise<AppUser> {
  pbClient.authStore.save(pbClient.authStore.token, record)
  return mapAppUser(record)
}

/** Scope перезаписывает дефолт PB — перечисляем все нужные, включая телефон. */
const YANDEX_SCOPES = [
  "login:email",
  "login:avatar",
  "login:info",
  "login:default_phone",
] as const

const YANDEX_OAUTH_POPUP = "width=520,height=680,resizable=yes,scrollbars=yes"

/**
 * PocketBase в authURL Яндекса подставляет только login:email|avatar|info.
 * SDK не перезаписывает scope, если в URL нет плейсхолдера {scope}.
 */
function withYandexPhoneScope(authUrl: string): string {
  const url = new URL(authUrl.includes("://") ? authUrl : `https://oauth.yandex.ru${authUrl}`)
  url.searchParams.set("scope", YANDEX_SCOPES.join(" "))
  return url.toString()
}

function openYandexOAuthPopup(authUrl: string): void {
  const popup = window.open(withYandexPhoneScope(authUrl), "pb_oauth2", YANDEX_OAUTH_POPUP)
  if (!popup) {
    throw new Error("Не удалось открыть окно входа. Разрешите всплывающие окна.")
  }
}

function normalizeClientPhone(raw: unknown): string {
  let digits = String(raw ?? "").replace(/\D/g, "")
  if (digits.length === 11 && digits.startsWith("8")) digits = `7${digits.slice(1)}`
  if (digits.length === 10 && digits.startsWith("9")) digits = `7${digits}`
  if (digits.length !== 11 || !digits.startsWith("7")) return ""
  return `+${digits}`
}

function phoneFromYandexMeta(meta: unknown): string {
  if (!meta || typeof meta !== "object") return ""
  const row = meta as Record<string, unknown>
  const raw = (row.rawUser ?? row) as Record<string, unknown>
  const dp = raw.default_phone
  if (typeof dp === "string" || typeof dp === "number") {
    const fromDp = normalizeClientPhone(dp)
    if (fromDp) return fromDp
  }
  if (dp && typeof dp === "object") {
    const phoneRow = dp as Record<string, unknown>
    const fromObj = normalizeClientPhone(phoneRow.number ?? phoneRow.phone ?? phoneRow.value)
    if (fromObj) return fromObj
  }
  return normalizeClientPhone(raw.phone ?? row.phone)
}

function splitClientFullName(full: string): { firstName: string; lastName: string } {
  const parts = full.trim().split(/\s+/).filter(Boolean)
  if (!parts.length) return { firstName: "", lastName: "" }
  if (parts.length === 1) return { firstName: parts[0].slice(0, 50), lastName: "" }
  return {
    firstName: parts[0].slice(0, 50),
    lastName: parts.slice(1).join(" ").slice(0, 50),
  }
}

function yandexNamePairClient(firstRaw: string, lastRaw: string): { firstName: string; lastName: string } {
  let first = firstRaw.trim()
  const last = lastRaw.trim()
  if (first && last) {
    const parts = first.split(/\s+/).filter(Boolean)
    if (parts.length > 1) first = parts[0]
    return { firstName: first.slice(0, 50), lastName: last.slice(0, 50) }
  }
  if (first) return splitClientFullName(first)
  if (last) return { firstName: "", lastName: last.slice(0, 50) }
  return { firstName: "", lastName: "" }
}

function namesFromYandexMeta(meta: unknown): { firstName: string; lastName: string } {
  if (!meta || typeof meta !== "object") return { firstName: "", lastName: "" }
  const row = meta as Record<string, unknown>
  const raw = (row.rawUser ?? row) as Record<string, unknown>
  const first = asString(raw.first_name ?? raw.firstName)
  const last = asString(raw.last_name ?? raw.lastName)
  if (first || last) return yandexNamePairClient(first, last)
  const full = asString(raw.real_name ?? raw.display_name ?? raw.name ?? row.name)
  return splitClientFullName(full)
}

function needsYandexNameFix(
  record: RecordModel,
  names: { firstName: string; lastName: string },
): boolean {
  if (!names.firstName) return false
  const curFirst = asString(record.firstName)
  const curLast = asString(record.lastName)
  if (curFirst.includes(" ") && (!curLast || curFirst.endsWith(curLast))) return true
  return curFirst !== names.firstName || (names.lastName !== "" && curLast !== names.lastName)
}

async function syncYandexProfileFromMeta(record: RecordModel, meta: unknown): Promise<AppUser> {
  const names = namesFromYandexMeta(meta)
  const phone = phoneFromYandexMeta(meta)
  const nameFix = needsYandexNameFix(record, names)
  const needsPhone = !asString(record.phone) && Boolean(phone)

  if (nameFix && names.firstName) {
    await updateAccount({
      firstName: names.firstName,
      lastName: names.lastName,
    })
  }
  if (needsPhone && phone) {
    await linkPhone(phone)
  }
  if (!nameFix && !needsPhone) return mapAppUser(record)

  const refreshed = await pbClient.collection(COLLECTION).authRefresh()
  if (!isAppUserRecord(refreshed.record)) {
    throw new Error("Не удалось обновить профиль после входа через Яндекс")
  }
  return mapAppUser(refreshed.record)
}

export async function loginWithOAuth(provider: OAuthProvider): Promise<AppUser> {
  if (provider === "vk") {
    throw new Error("Вход через VK — кнопка One Tap на экране входа")
  }
  ensurePbBaseUrl(pbClient)
  const auth = await pbClient.collection(COLLECTION).authWithOAuth2({
    provider,
    scopes: [...YANDEX_SCOPES],
    urlCallback: (url) => openYandexOAuthPopup(url),
  })
  if (!isAppUserRecord(auth.record)) {
    pbClient.authStore.clear()
    throw new Error("Нет доступа к профилю")
  }
  const meta = (auth as { meta?: unknown }).meta
  if (!asString(auth.record.phone) || needsYandexNameFix(auth.record, namesFromYandexMeta(meta))) {
    return syncYandexProfileFromMeta(auth.record, meta)
  }
  const refreshed = await pbClient.collection(COLLECTION).authRefresh()
  if (isAppUserRecord(refreshed.record)) {
    return mapAppUser(refreshed.record)
  }
  return mapAppUser(auth.record)
}

/** PKCE/state для One Tap — verifier хранится в sealed state на сервере. */
export async function createVkOneTapSession(): Promise<{ state: string; codeChallenge: string }> {
  ensurePbBaseUrl(pbClient)
  const data = await pbClient.send<{ state?: string; codeChallenge?: string }>("/api/auth/vk/session", {
    method: "GET",
  })
  const state = data.state?.trim()
  const codeChallenge = data.codeChallenge?.trim()
  if (!state || !codeChallenge) {
    throw new Error("Сервер не выдал PKCE для VK ID")
  }
  return { state, codeChallenge }
}

/** One Tap VK ID: обмен code на сессию PocketBase без редиректа в основной вкладке. */
export async function completeVkOneTap(input: {
  code: string
  deviceId: string
  state: string
  codeVerifier?: string
}): Promise<AppUser> {
  ensurePbBaseUrl(pbClient)
  const body: Record<string, string> = {
    code: input.code,
    device_id: input.deviceId,
    state: input.state,
  }
  const verifier = input.codeVerifier?.trim()
  if (verifier) {
    body.code_verifier = verifier
  }

  const data = await pbClient.send<{ token?: string }>("/api/auth/vk/complete", {
    method: "POST",
    body,
  })
  const token = data.token?.trim()
  if (!token) throw new Error("VK ID не вернул токен сессии")
  return acceptAuthToken(token)
}

/** @deprecated Редиректный flow — оставлен для fallback callback. */
export function loginWithVkId(): void {
  ensurePbBaseUrl(pbClient)
  const base = pbClient.baseUrl.replace(/\/$/, "")
  window.location.assign(`${base}/api/auth/vk/start`)
}

/** Принимает JWT с `/auth/callback?token=` после VK ID. */
export async function acceptAuthToken(token: string): Promise<AppUser> {
  const trimmed = token.trim()
  if (!trimmed) throw new Error("Пустой токен")
  pbClient.authStore.save(trimmed, null as never)
  const auth = await pbClient.collection(COLLECTION).authRefresh()
  if (!isAppUserRecord(auth.record)) {
    pbClient.authStore.clear()
    throw new Error("Нет доступа к профилю")
  }
  return mapAppUser(auth.record)
}

export function logout(): void {
  clientAuthEpoch++
  resetAccountCache()
  pbClient.authStore.clear()
  void queryClient.removeQueries({ queryKey: accountKeys.bonus })
  void queryClient.removeQueries({ queryKey: ["orders", "mine"] })
}

export async function updateAccount(input: UpdateAccountInput): Promise<AppUser> {
  const id = requireAccountId()
  const record = await pbClient.collection(COLLECTION).update(id, input)
  return persistRecord(record)
}

async function saveAddresses(addresses: SavedAddress[]): Promise<AppUser> {
  const id = requireAccountId()
  const record = await pbClient.collection(COLLECTION).update(id, { addresses })
  return persistRecord(record)
}

function withDefault(addresses: SavedAddress[], defaultId: string): SavedAddress[] {
  return addresses.map((item) => ({ ...item, isDefault: item.id === defaultId }))
}

export async function addAddress(input: NewSavedAddress): Promise<AppUser> {
  const current = getAccount()?.addresses ?? []
  const next: SavedAddress = { ...input, id: crypto.randomUUID() }
  const addresses = next.isDefault || current.length === 0
    ? withDefault([...current, { ...next, isDefault: true }], next.id)
    : [...current, next]
  return saveAddresses(addresses)
}

export async function updateAddress(address: SavedAddress): Promise<AppUser> {
  const current = getAccount()?.addresses ?? []
  const replaced = current.map((item) => (item.id === address.id ? address : item))
  const addresses = address.isDefault ? withDefault(replaced, address.id) : replaced
  return saveAddresses(addresses)
}

export async function removeAddress(id: string): Promise<AppUser> {
  const current = getAccount()?.addresses ?? []
  const addresses = current.filter((item) => item.id !== id)
  const hasDefault = addresses.some((item) => item.isDefault)
  if (addresses.length > 0 && !hasDefault) {
    addresses[0] = { ...addresses[0], isDefault: true }
  }
  return saveAddresses(addresses)
}

export async function setDefaultAddress(id: string): Promise<AppUser> {
  return saveAddresses(withDefault(getAccount()?.addresses ?? [], id))
}

type BonusResponse = {
  score?: number
  sale?: number
  card?: string
}

export async function fetchBonus(): Promise<ProfileBonus> {
  const data = await pbClient.send<BonusResponse>("/api/profile/bonus", { method: "GET" })
  return {
    score: Number(data.score) || 0,
    sale: Number(data.sale) || 0,
    card: String(data.card ?? ""),
  }
}

/** Баллы из кассы; кэш 60 с совпадает с серверным, чтобы не дёргать get_client. */
export function useProfileBonus(enabled: boolean) {
  return useQuery({
    queryKey: accountKeys.bonus,
    queryFn: fetchBonus,
    enabled,
    staleTime: 60_000,
    retry: false,
  })
}

/** Привязка телефона к customers + userId у прошлых заказов. */
export async function linkPhone(phone: string): Promise<AppUser> {
  await pbClient.send("/api/profile/link", {
    method: "POST",
    body: { phone },
  })
  const auth = await pbClient.collection(COLLECTION).authRefresh()
  if (!isAppUserRecord(auth.record)) {
    throw new Error("Нет доступа к профилю")
  }
  return mapAppUser(auth.record)
}
