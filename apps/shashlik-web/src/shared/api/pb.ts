import PocketBase from "pocketbase"

export function resolvePbBaseUrl(): string {
  const fromEnv = import.meta.env.VITE_PB_URL?.trim()
  if (fromEnv) return fromEnv.replace(/\/$/, "")
  // Прод: same-origin через Nginx `/api/` → PB. SDK сам добавляет `/api/` к base —
  // base = origin, не `/api` (иначе `/api/api/...`) и не `""` (иначе на `/admin` → `/admin/api/...`).
  if (typeof window !== "undefined") return window.location.origin
  return ""
}

/**
 * SDK при `baseUrl === ""` собирает oauth redirect как
 * `origin + pathname + /api/oauth2-redirect` → на `/profile` получается мусор,
 * VK отвечает Security Error. Перед OAuth всегда выставляем абсолютный origin.
 */
export function ensurePbBaseUrl(client: PocketBase): string {
  const url = resolvePbBaseUrl()
  if (url && client.baseUrl !== url) client.baseUrl = url
  return client.baseUrl
}

/** Сессия персонала (`users`). Прод: same-origin. Dev: `VITE_PB_URL` в `.env.local`. */
export const pb = new PocketBase(resolvePbBaseUrl())
