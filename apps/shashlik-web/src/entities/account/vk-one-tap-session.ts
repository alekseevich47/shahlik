import { completeVkOneTap } from "@/entities/account/api"
import { createVkPkce, pkceChallengeFromVerifier, resolveVkAppId } from "@/entities/account/vk-id"
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

type VkWidgetChain = {
  on: (event: string, handler: (payload: unknown) => void) => VkWidgetChain
  close?: () => void
}

let pkce: { codeVerifier: string; state: string } | null = null
let configReady = false
let widgetChain: VkWidgetChain | null = null
let mountedContainer: HTMLElement | null = null
let mountGeneration = 0
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

function teardownWidget(): void {
  try {
    widgetChain?.close?.()
  } catch {
    // ignore
  }
  widgetChain = null
  if (mountedContainer) {
    mountedContainer.replaceChildren()
    mountedContainer = null
  }
}

async function mountWidget(container: HTMLElement, handlers: VkOneTapHandlers): Promise<void> {
  const generation = ++mountGeneration
  teardownWidget()

  const VKID = await loadVkSdkFromCdn()
  if (generation !== mountGeneration || !container.isConnected) return

  const session = getPkce()
  const codeChallenge = await pkceChallengeFromVerifier(session.codeVerifier)
  if (generation !== mountGeneration || !container.isConnected) return

  ensurePbBaseUrl(pbClient)
  const config = {
    app: resolveVkAppId(),
    redirectUrl: `${resolvePbBaseUrl()}/api/auth/vk/callback`,
    state: session.state,
    codeVerifier: session.codeVerifier,
    codeChallenge,
    scope: "email phone",
    mode: VKID.ConfigAuthMode.InNewTab,
    responseMode: VKID.ConfigResponseMode.Callback,
  }

  if (!configReady) {
    VKID.Config.init(config)
    configReady = true
  } else if (VKID.Config.update) {
    VKID.Config.update(config)
  } else {
    VKID.Config.init(config)
  }

  if (generation !== mountGeneration || !container.isConnected) return

  const oneTap = new VKID.OneTap()
  const chain = oneTap.render({
    container,
    showAlternativeLogin: false,
  }) as VkWidgetChain

  widgetChain = chain
  mountedContainer = container

  chain
    .on(VKID.WidgetEvents.ERROR, (error: unknown) => {
      const message = vkWidgetErrorMessage(error)
      if (isBenignVkError(message)) return
      if (loginInflight) return
      handlers.onError(message)
    })
    .on(VKID.OneTapInternalEvents.START_AUTHORIZE, () => {
      loginInflight = true
    })
    .on(VKID.OneTapInternalEvents.NOT_AUTHORIZED, () => {
      loginInflight = false
    })
    .on(VKID.OneTapInternalEvents.LOGIN_SUCCESS, (payload: unknown) => {
      const row = (payload ?? {}) as VkLoginPayload
      const code = row.code?.trim()
      const deviceId = row.device_id?.trim()
      if (!code || !deviceId) {
        loginInflight = false
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

export function detachVkOneTap(): void {
  mountGeneration += 1
  loginInflight = false
  teardownWidget()
}
