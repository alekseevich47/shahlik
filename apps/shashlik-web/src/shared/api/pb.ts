import PocketBase from "pocketbase"

/** Прод: same-origin (`/api/` через Nginx). Dev: `VITE_PB_URL` в `.env.local`. */
export const pb = new PocketBase(import.meta.env.VITE_PB_URL ?? "")
