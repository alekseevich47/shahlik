const REG_SESSION_KEY = "shashlik:reg-modal:shown"
const PWA_SESSION_KEY = "shashlik:pwa-modal:shown"
const PWA_DISMISS_KEY = "shashlik:pwa-modal:dismissed"
const PWA_INSTALLED_KEY = "shashlik:pwa:installed"
const PWA_SOFT_DISMISS_KEY = "shashlik:pwa-modal:soft-dismiss-at"

/** Задержка перед показом PWA-модалки авторизованному. */
export const ENGAGEMENT_DELAY_MS = 10_000

/** Повтор после обычного закрытия (не «Больше не показывать»). */
export const PWA_SOFT_COOLDOWN_MS = 2 * 24 * 60 * 60 * 1000

export function wasSessionShown(key: string): boolean {
  try {
    return sessionStorage.getItem(key) === "1"
  } catch {
    return true
  }
}

export function markSessionShown(key: string) {
  try {
    sessionStorage.setItem(key, "1")
  } catch {
    // ignore
  }
}

export function isPwaDismissedForever(): boolean {
  try {
    return localStorage.getItem(PWA_DISMISS_KEY) === "1"
  } catch {
    return true
  }
}

export function dismissPwaForever() {
  try {
    localStorage.setItem(PWA_DISMISS_KEY, "1")
  } catch {
    // ignore
  }
}

export function markPwaSoftDismissed() {
  try {
    localStorage.setItem(PWA_SOFT_DISMISS_KEY, String(Date.now()))
  } catch {
    // ignore
  }
}

/** false — ещё в cooldown после обычного закрытия. */
export function isPwaSoftCooldownActive(): boolean {
  try {
    const raw = localStorage.getItem(PWA_SOFT_DISMISS_KEY)
    if (!raw) return false
    const at = Number(raw)
    if (!Number.isFinite(at) || at <= 0) return false
    return Date.now() - at < PWA_SOFT_COOLDOWN_MS
  } catch {
    return true
  }
}

export function markPwaInstalledOnDevice() {
  try {
    localStorage.setItem(PWA_INSTALLED_KEY, "1")
  } catch {
    // ignore
  }
}

export function wasPwaInstalledOnDevice(): boolean {
  if (isStandaloneDisplay()) {
    markPwaInstalledOnDevice()
    return true
  }
  try {
    return localStorage.getItem(PWA_INSTALLED_KEY) === "1"
  } catch {
    return true
  }
}

export { REG_SESSION_KEY, PWA_SESSION_KEY, PWA_DISMISS_KEY, PWA_INSTALLED_KEY, PWA_SOFT_DISMISS_KEY }

export function detectInstallPlatform(): "ios" | "android" | "desktop" {
  if (typeof navigator === "undefined") return "desktop"
  const ua = navigator.userAgent
  if (/iPhone|iPad|iPod/i.test(ua)) return "ios"
  if (/Android/i.test(ua)) return "android"
  return "desktop"
}

export function isStandaloneDisplay(): boolean {
  if (typeof window === "undefined") return false
  const mq = window.matchMedia("(display-mode: standalone)").matches
  const iosStandalone = "standalone" in navigator && Boolean((navigator as { standalone?: boolean }).standalone)
  return mq || iosStandalone
}
