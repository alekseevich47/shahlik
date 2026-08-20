import { useEffect, useState } from "react"
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

export function useAdminAuth(): AdminAuth {
  const [user, setUser] = useState<RecordModel | null>(readUser)

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

    if (pb.authStore.isValid) {
      pb.collection("users")
        .authRefresh()
        .catch(() => pb.authStore.clear())
    }

    return unsubscribe
  }, [])

  async function login(email: string, password: string) {
    const auth = await pb.collection("users").authWithPassword(email, password)
    if (!isStaffRecord(auth.record)) {
      pb.authStore.clear()
      throw new Error("Нет доступа к админке")
    }
  }

  function logout() {
    pb.authStore.clear()
  }

  const role = staffRole(user)

  return {
    user,
    role,
    isAdmin: role === "admin",
    isManager: role === "manager",
    login,
    logout,
  }
}

export function authErrorMessage(err: unknown): string {
  if (err instanceof ClientResponseError) {
    return err.response?.message || err.message || "Не удалось войти"
  }
  if (err instanceof Error) return err.message
  return "Не удалось войти"
}
