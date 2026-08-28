import { completeVkOneTap, createVkOneTapSession } from "@/entities/account/api"
import { resolveVkAppId } from "@/entities/account/vk-id"
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

type VkServerSession = {
  state: string
  codeChallenge: string
}

let configReady = false
let widgetChain: VkWidgetChain | null = null
let mountedContainer: HTMLElement | null = null
let mountGeneration = 0
let loginInflight = false
let detachTimer: ReturnType<typeof setTimeout> | null = null
let lastAttach: { container: HTMLElement; handlers: VkOneTapHandlers } | null = null

function vkWidgetErrorMessage(error: unknown): string {
  if (!error || typeof error !== "object") return "Ошибка VK ID"
  const row = error as { text?: string; error?: string; message?: string; code?: number }
  if (row.code === 100 || row.error === "Event is not supported") {
    return "Event is not supported"
  }
  if (row.code === 104 || row.error === "State Mismatch") {
    return "State Mismatch"
  }
  return String(row.text || row.error || row.message || "Ошибка VK ID").trim()
}

function isBenignVkError(message: string): boolean {
  const lower = message.toLowerCase()
  return (
    message === "Event is not supported" ||
    message === "State Mismatch" ||
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

async function remountWidget(): Promise<void> {
  if (!lastAttach?.container.isConnected) return
  await mountWidget(lastAttach.container, lastAttach.handlers)
}

async function mountWidget(container: HTMLElement, handlers: VkOneTapHandlers): Promise<void> {
  const generation = ++mountGeneration
  teardownWidget()

  let session: VkServerSession
  try {
    session = await createVkOneTapSession()
  } catch (err: unknown) {
    if (generation !== mountGeneration) return
    handlers.onError(err instanceof Error ? err.message : "Не удалось подготовить VK ID")
    return
  }

  const VKID = await loadVkSdkFromCdn()
  if (generation !== mountGeneration || !container.isConnected) return

  ensurePbBaseUrl(pbClient)
  const config = {
    app: resolveVkAppId(),
    redirectUrl: `${resolvePbBaseUrl()}/api/auth/vk/callback`,
    state: session.state,
    codeChallenge: session.codeChallenge,
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
      void remountWidget()
    })
    .on(VKID.OneTapInternalEvents.START_AUTHORIZE, () => {
      loginInflight = true
    })
    .on(VKID.OneTapInternalEvents.NOT_AUTHORIZED, () => {
      loginInflight = false
      void remountWidget()
    })
    .on(VKID.OneTapInternalEvents.LOGIN_SUCCESS, (payload: unknown) => {
      const row = (payload ?? {}) as VkLoginPayload
      const code = row.code?.trim()
      const deviceId = row.device_id?.trim()
      const state = row.state?.trim() || session.state
      if (!code || !deviceId) {
        loginInflight = false
        handlers.onError("VK ID вернул неполный ответ")
        void remountWidget()
        return
      }

      loginInflight = true
      void completeVkOneTap({ code, deviceId, state })
        .then(() => {
          loginInflight = false
        })
        .catch((err: unknown) => {
          loginInflight = false
          handlers.onError(err instanceof Error ? err.message : "Не удалось войти через VK ID")
          void remountWidget()
        })
    })
}

export async function attachVkOneTap(container: HTMLElement, handlers: VkOneTapHandlers): Promise<void> {
  if (detachTimer) {
    clearTimeout(detachTimer)
    detachTimer = null
  }
  lastAttach = { container, handlers }
  await mountWidget(container, handlers)
}

export function detachVkOneTap(): void {
  if (detachTimer) clearTimeout(detachTimer)
  detachTimer = setTimeout(() => {
    mountGeneration += 1
    loginInflight = false
    teardownWidget()
    detachTimer = null
  }, 200)
}
