import PocketBase, { LocalAuthStore } from "pocketbase"

import { resolvePbBaseUrl } from "./pb"

/** Сессия клиентов витрины (`app_users`). Отдельный store, чтобы не затирать админку. */
export const pbClient = new PocketBase(
  resolvePbBaseUrl(),
  new LocalAuthStore("shashlik:client:auth"),
)
