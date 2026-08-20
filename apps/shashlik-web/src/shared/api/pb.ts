import PocketBase from "pocketbase"

function resolvePbBaseUrl(): string {
  const fromEnv = import.meta.env.VITE_PB_URL?.trim()
  if (fromEnv) return fromEnv.replace(/\/$/, "")
  // Прод: same-origin через Nginx `/api/` → PB. SDK сам добавляет `/api/` к base —
  // base = origin, не `/api` (иначе `/api/api/...`) и не `""` (иначе на `/admin` → `/admin/api/...`).
  if (typeof window !== "undefined") return window.location.origin
  return ""
}

/** Прод: same-origin. Dev: `VITE_PB_URL` в `.env.local`. */
export const pb = new PocketBase(resolvePbBaseUrl())
