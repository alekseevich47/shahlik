export function resolveVkAppId(): number {
  const raw = import.meta.env.VITE_VK_APP_ID?.trim() || "54734207"
  const appId = Number(raw)
  if (!Number.isFinite(appId) || appId <= 0) {
    throw new Error("VITE_VK_APP_ID не задан")
  }
  return appId
}
