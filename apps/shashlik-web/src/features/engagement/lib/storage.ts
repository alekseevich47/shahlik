const REG_SESSION_KEY = "shashlik:reg-modal:shown"
const PWA_SESSION_KEY = "shashlik:pwa-modal:shown"
const PWA_DISMISS_KEY = "shashlik:pwa-modal:dismissed"

export const ENGAGEMENT_DELAY_MS = 45_000

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

export { REG_SESSION_KEY, PWA_SESSION_KEY, PWA_DISMISS_KEY }

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
