import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { ClientResponseError } from "pocketbase"

import {
  isAppUserRecord,
  loginWithOAuth as loginWithOAuthApi,
  logout as logoutApi,
  useAccount as useAccountRecord,
} from "@/entities/account/api"
import type { AppUser, OAuthProvider } from "@/entities/account/model"
import { pbClient } from "@/shared/api/pb-client"

export type AccountAuth = {
  user: AppUser | null
  /** false пока идёт первичная проверка токена */
  ready: boolean
  loginWithOAuth: (provider: OAuthProvider) => Promise<void>
  logout: () => void
}

function isAbortError(err: unknown): boolean {
  if (err instanceof ClientResponseError) {
    const abort = (err as ClientResponseError & { isAbort?: boolean }).isAbort
    if (abort || err.status === 0) return true
  }
  if (err instanceof DOMException && err.name === "AbortError") return true
  return false
}

let refreshInflight: Promise<void> | null = null

function refreshAuth(): Promise<void> {
  if (!pbClient.authStore.isValid) return Promise.resolve()
  if (refreshInflight) return refreshInflight

  refreshInflight = pbClient
    .collection("app_users")
    .authRefresh({ requestKey: "client-auth-refresh" })
    .then(() => undefined)
    .catch((err: unknown) => {
      if (isAbortError(err)) return
      pbClient.authStore.clear()
    })
    .finally(() => {
      refreshInflight = null
    })

  return refreshInflight
}

const AccountContext = createContext<AccountAuth | null>(null)

export function AccountProvider({ children }: { children: ReactNode }) {
  const user = useAccountRecord()
  const [ready, setReady] = useState(() => !pbClient.authStore.isValid)

  useEffect(() => {
    const unsubscribe = pbClient.authStore.onChange(() => {
      const record = pbClient.authStore.record
      if (record && pbClient.authStore.isValid && !isAppUserRecord(record)) {
        pbClient.authStore.clear()
      }
    })

    let cancelled = false
    void (async () => {
      if (pbClient.authStore.isValid) {
        await refreshAuth()
      }
      if (!cancelled) setReady(true)
    })()

    return () => {
      cancelled = true
      unsubscribe()
    }
  }, [])

  async function loginWithOAuth(provider: OAuthProvider) {
    await loginWithOAuthApi(provider)
  }

  function logout() {
    logoutApi()
  }

  const value: AccountAuth = {
    user,
    ready,
    loginWithOAuth,
    logout,
  }

  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
}

export function useAccount(): AccountAuth {
  const ctx = useContext(AccountContext)
  if (!ctx) {
    throw new Error("useAccount вне AccountProvider")
  }
  return ctx
}
