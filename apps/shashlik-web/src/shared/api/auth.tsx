import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { ClientResponseError, type RecordModel } from "pocketbase"

import { pb } from "./pb"

export type StaffRole = "admin" | "manager"

export type StaffAction = "view" | "create" | "update" | "delete"

export type StaffSection =
  | "dashboard"
  | "products"
  | "addons"
  | "categories"
  | "banners"
  | "orders"
  | "reviews"
  | "customers"
  | "staff"
  | "coupons"
  | "settings"

export type AdminAuth = {
  user: RecordModel | null
  role: StaffRole | null
  isAdmin: boolean
  isManager: boolean
  /** false пока идёт первичная проверка токена */
  ready: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

/** Разделы, доступные менеджеру на просмотр (остальные — только admin). */
const MANAGER_VIEW: ReadonlySet<StaffSection> = new Set([
  "dashboard",
  "products",
  "addons",
  "categories",
  "banners",
  "orders",
  "reviews",
  "customers",
])

/** Update, который менеджер может делать по правилам PB. */
const MANAGER_UPDATE: ReadonlySet<StaffSection> = new Set([
  "orders",
  "reviews",
  "customers",
])

function staffRole(record: RecordModel | null): StaffRole | null {
  if (!record) return null
  if (record.role === "admin" || record.role === "manager") return record.role
  return null
}

function isStaffRecord(record: RecordModel | null): boolean {
  return staffRole(record) !== null
}

function readUser(): RecordModel | null {
  return pb.authStore.isValid ? pb.authStore.record : null
}

function isAbortError(err: unknown): boolean {
  if (err instanceof ClientResponseError) {
    const abort = (err as ClientResponseError & { isAbort?: boolean }).isAbort
    if (abort || err.status === 0) return true
  }
  if (err instanceof DOMException && err.name === "AbortError") return true
  return false
}

/** Один refresh на всё приложение — параллельные хуки не сбивают сессию. */
let refreshInflight: Promise<void> | null = null

function refreshAuth(): Promise<void> {
  if (!pb.authStore.isValid) return Promise.resolve()
  if (refreshInflight) return refreshInflight

  refreshInflight = pb
    .collection("users")
    .authRefresh({ requestKey: "admin-auth-refresh" })
    .then(() => undefined)
    .catch((err: unknown) => {
      if (isAbortError(err)) return
      pb.authStore.clear()
    })
    .finally(() => {
      refreshInflight = null
    })

  return refreshInflight
}

/** Права текущего пользователя по разделу и действию. */
export function can(section: StaffSection, action: StaffAction): boolean {
  const role = staffRole(readUser())
  if (!role) return false
  if (role === "admin") return true

  if (action === "view") return MANAGER_VIEW.has(section)
  if (action === "update") return MANAGER_UPDATE.has(section)
  return false
}

export function isManager(record: RecordModel | null = readUser()): boolean {
  return staffRole(record) === "manager"
}

const AdminAuthContext = createContext<AdminAuth | null>(null)

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<RecordModel | null>(readUser)
  const [ready, setReady] = useState(() => !pb.authStore.isValid)

  useEffect(() => {
    const unsubscribe = pb.authStore.onChange(() => {
      const next = readUser()
      if (next && !isStaffRecord(next)) {
        pb.authStore.clear()
        setUser(null)
        return
      }
      setUser(next)
    })

    let cancelled = false
    void (async () => {
      if (pb.authStore.isValid) {
        await refreshAuth()
      }
      if (!cancelled) setReady(true)
    })()

    return () => {
      cancelled = true
      unsubscribe()
    }
  }, [])

  async function login(email: string, password: string) {
    const auth = await pb.collection("users").authWithPassword(email, password, {
      requestKey: "admin-auth-login",
    })
    if (!isStaffRecord(auth.record)) {
      pb.authStore.clear()
      throw new Error("Нет доступа к админке")
    }
  }

  function logout() {
    pb.authStore.clear()
  }

  const role = staffRole(user)

  const value: AdminAuth = {
    user,
    role,
    isAdmin: role === "admin",
    isManager: role === "manager",
    ready,
    login,
    logout,
  }

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
}

export function useAdminAuth(): AdminAuth {
  const ctx = useContext(AdminAuthContext)
  if (!ctx) {
    throw new Error("useAdminAuth вне AdminAuthProvider")
  }
  return ctx
}

export function authErrorMessage(err: unknown): string {
  if (err instanceof ClientResponseError) {
    return err.response?.message || err.message || "Не удалось войти"
  }
  if (err instanceof Error) return err.message
  return "Не удалось войти"
}
