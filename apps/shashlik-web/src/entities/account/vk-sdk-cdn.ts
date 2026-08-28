declare global {
  interface Window {
    VKIDSDK?: VkSdkGlobal
  }
}

export type VkSdkGlobal = {
  Config: {
    init: (data: Record<string, unknown>) => void
  }
  ConfigResponseMode: {
    Callback: string
  }
  OneTap: new () => {
    render: (params: Record<string, unknown>) => {
      on: (event: string, handler: (payload: unknown) => void) => unknown
    }
  }
  OneTapInternalEvents: {
    LOGIN_SUCCESS: string
  }
  WidgetEvents: {
    ERROR: string
  }
}

const VK_SDK_URL = "https://unpkg.com/@vkid/sdk@2.6.8/dist-sdk/umd/index.js"

let sdkPromise: Promise<VkSdkGlobal> | null = null

export function loadVkSdkFromCdn(): Promise<VkSdkGlobal> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("VK ID доступен только в браузере"))
  }
  if (window.VKIDSDK) {
    return Promise.resolve(window.VKIDSDK)
  }
  if (sdkPromise) return sdkPromise

  sdkPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script")
    script.src = VK_SDK_URL
    script.async = true
    script.onload = () => {
      if (window.VKIDSDK) {
        resolve(window.VKIDSDK)
        return
      }
      reject(new Error("VK ID SDK не инициализировался"))
    }
    script.onerror = () => reject(new Error("Не удалось загрузить VK ID SDK"))
    document.head.appendChild(script)
  })

  return sdkPromise
}
