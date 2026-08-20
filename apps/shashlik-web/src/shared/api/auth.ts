import { useEffect, useState } from "react"
import { ClientResponseError, type RecordModel } from "pocketbase"

import { pb } from "./pb"

export type AdminAuth = {
  user: RecordModel | null
  isAdmin: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

function isAdminRecord(record: RecordModel | null): boolean {
  return Boolean(record && record.role === "admin")
}

function readUser(): RecordModel | null {
  return pb.authStore.isValid ? pb.authStore.record : null
}

export function useAdminAuth(): AdminAuth {
  const [user, setUser] = useState<RecordModel | null>(readUser)

  useEffect(() => {
    const unsubscribe = pb.authStore.onChange(() => {
      const next = readUser()
      if (next && !isAdminRecord(next)) {
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
    if (!isAdminRecord(auth.record)) {
      pb.authStore.clear()
      throw new Error("Нет доступа к админке")
    }
  }

  function logout() {
    pb.authStore.clear()
  }

  return { user, isAdmin: isAdminRecord(user), login, logout }
}

export function authErrorMessage(err: unknown): string {
  if (err instanceof ClientResponseError) {
    return err.response?.message || err.message || "Не удалось войти"
  }
  if (err instanceof Error) return err.message
  return "Не удалось войти"
}
