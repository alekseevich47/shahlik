import { completeVkOneTap } from "@/entities/account/api"
import { createVkPkce, resolveVkAppId } from "@/entities/account/vk-id"
import { loadVkSdkFromCdn } from "@/entities/account/vk-sdk-cdn"
import { ensurePbBaseUrl, resolvePbBaseUrl } from "@/shared/api/pb"
import { pbClient } from "@/shared/api/pb-client"

export type VkLoginPayload = {
  code?: string
  device_id?: string
  state?: string
}

type VkOneTapHandlers = {
  onError: (message: string) => void
}

let pkce: { codeVerifier: string; state: string } | null = null
let configReady = false
let widget: { render: (params: Record<string, unknown>) => { on: (event: string, handler: (payload: unknown) => void) => unknown } } | null = null
let mountedContainer: HTMLElement | null = null
let loginInflight = false

function getPkce() {
  pkce ??= createVkPkce()
  return pkce
}

function vkWidgetErrorMessage(error: unknown): string {
  if (!error || typeof error !== "object") return "Ошибка VK ID"
  const row = error as { text?: string; error?: string; message?: string; code?: number }
  if (row.code === 100 || row.error === "Event is not supported") {
    return "Event is not supported"
  }
  return String(row.text || row.error || row.message || "Ошибка VK ID").trim()
}

function isBenignVkError(message: string): boolean {
  const lower = message.toLowerCase()
  return (
    message === "Event is not supported" ||
    message === "New tab has been closed" ||
    lower === "timeout"
  )
}

async function mountWidget(container: HTMLElement, handlers: VkOneTapHandlers): Promise<void> {
  if (widget && mountedContainer === container) return

  const VKID = await loadVkSdkFromCdn()
  const session = getPkce()

  if (!configReady) {
    ensurePbBaseUrl(pbClient)
    VKID.Config.init({
      app: resolveVkAppId(),
      redirectUrl: `${resolvePbBaseUrl()}/api/auth/vk/callback`,
      state: session.state,
      codeVerifier: session.codeVerifier,
      scope: "email phone",
      responseMode: VKID.ConfigResponseMode.Callback,
    })
    configReady = true
  }

  if (!container.isConnected) return

  const oneTap = new VKID.OneTap()
  widget = oneTap
  mountedContainer = container

  type OneTapChain = {
    on: (event: string, handler: (payload: unknown) => void) => OneTapChain
  }

  const chain = oneTap.render({
      container,
      showAlternativeLogin: false,
    }) as OneTapChain

  chain
    .on(VKID.WidgetEvents.ERROR, (error: unknown) => {
      const message = vkWidgetErrorMessage(error)
      if (loginInflight && isBenignVkError(message)) return
      handlers.onError(message)
    })
    .on(VKID.OneTapInternalEvents.LOGIN_SUCCESS, (payload: unknown) => {
      const row = (payload ?? {}) as VkLoginPayload
      const code = row.code?.trim()
      const deviceId = row.device_id?.trim()
      if (!code || !deviceId) {
        handlers.onError("VK ID вернул неполный ответ")
        return
      }

      loginInflight = true
      void completeVkOneTap({
        code,
        deviceId,
        codeVerifier: session.codeVerifier,
        state: row.state?.trim() || session.state,
      })
        .then(() => {
          loginInflight = false
        })
        .catch((err: unknown) => {
          loginInflight = false
          handlers.onError(err instanceof Error ? err.message : "Не удалось войти через VK ID")
        })
    })
}

export async function attachVkOneTap(container: HTMLElement, handlers: VkOneTapHandlers): Promise<void> {
  await mountWidget(container, handlers)
}
