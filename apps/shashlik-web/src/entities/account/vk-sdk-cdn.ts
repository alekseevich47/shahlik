declare global {
  interface Window {
    VKIDSDK?: VkSdkGlobal
  }
}

export type VkSdkGlobal = {
  Config: {
    init: (data: Record<string, unknown>) => void
    update?: (data: Record<string, unknown>) => void
  }
  ConfigAuthMode: {
    InNewTab: string
  }
  ConfigResponseMode: {
    Callback: string
  }
  OneTap: new () => {
    render: (params: Record<string, unknown>) => {
      on: (event: string, handler: (payload: unknown) => void) => unknown
      close?: () => void
    }
  }
  OneTapInternalEvents: {
    LOGIN_SUCCESS: string
    START_AUTHORIZE: string
    NOT_AUTHORIZED: string
  }
  WidgetEvents: {
    ERROR: string
  }
}

/** Same-origin — unpkg на проде часто недоступен / блокируется. */
const VK_SDK_SELF = "/vk/vkid-sdk.js"
const VK_SDK_CDN = "https://unpkg.com/@vkid/sdk@2.6.8/dist-sdk/umd/index.js"

let sdkPromise: Promise<VkSdkGlobal> | null = null

function loadScript(url: string): Promise<VkSdkGlobal> {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script")
    script.src = url
    script.async = true
    script.onload = () => {
      if (window.VKIDSDK) {
        resolve(window.VKIDSDK)
        return
      }
      reject(new Error("VK ID SDK не инициализировался"))
    }
    script.onerror = () => reject(new Error(`Не удалось загрузить VK ID SDK (${url})`))
    document.head.appendChild(script)
  })
}

export function loadVkSdkFromCdn(): Promise<VkSdkGlobal> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("VK ID доступен только в браузере"))
  }
  if (window.VKIDSDK) {
    return Promise.resolve(window.VKIDSDK)
  }
  if (sdkPromise) return sdkPromise

  sdkPromise = loadScript(VK_SDK_SELF).catch(() => loadScript(VK_SDK_CDN))

  return sdkPromise
}
