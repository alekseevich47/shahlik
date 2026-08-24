import { useQuery } from "@tanstack/react-query"
import type { RecordModel } from "pocketbase"
import { useSyncExternalStore } from "react"

import { pbClient } from "@/shared/api/pb-client"

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

export function mapAppUser(record: RecordModel): AppUser {
  return {
    id: record.id,
    email: asString(record.email),
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

export function getAccount(): AppUser | null {
  if (!pbClient.authStore.isValid) return null
  const record = pbClient.authStore.record
  if (!record || !isAppUserRecord(record)) return null
  return mapAppUser(record)
}

function subscribeAccount(onStoreChange: () => void) {
  return pbClient.authStore.onChange(() => onStoreChange())
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

export async function loginWithOAuth(provider: OAuthProvider): Promise<AppUser> {
  const auth = await pbClient.collection(COLLECTION).authWithOAuth2({ provider })
  if (!isAppUserRecord(auth.record)) {
    pbClient.authStore.clear()
    throw new Error("Нет доступа к профилю")
  }
  return mapAppUser(auth.record)
}

export function logout(): void {
  pbClient.authStore.clear()
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
export async function linkPhone(phone: string): Promise<void> {
  await pbClient.send("/api/profile/link", {
    method: "POST",
    body: { phone },
  })
}
