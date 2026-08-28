import {
  Config,
  ConfigResponseMode,
  OneTap,
  OneTapInternalEvents,
  WidgetEvents,
  type OneTap as OneTapWidget,
} from "@vkid/sdk"

import { completeVkOneTap } from "@/entities/account/api"
import { createVkPkce, resolveVkAppId } from "@/entities/account/vk-id"
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

/** Один PKCE/state на загрузку страницы — иначе popup после consent не совпадает с Config. */
const pkce = createVkPkce()
let configReady = false
let widget: OneTapWidget | null = null
let hostEl: HTMLDivElement | null = null
let loginInflight = false

function ensureVkConfig(): void {
  if (configReady) return
  ensurePbBaseUrl(pbClient)
  Config.init({
    app: resolveVkAppId(),
    redirectUrl: `${resolvePbBaseUrl()}/api/auth/vk/callback`,
    state: pkce.state,
    codeVerifier: pkce.codeVerifier,
    scope: "email phone",
    responseMode: ConfigResponseMode.Callback,
  })
  configReady = true
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
  return message === "Event is not supported" || message === "New tab has been closed"
}

function ensureWidget(handlers: VkOneTapHandlers): HTMLDivElement {
  ensureVkConfig()
  if (!hostEl) {
    hostEl = document.createElement("div")
    hostEl.className = "min-h-11 w-full"
  }
  if (widget) return hostEl

  widget = new OneTap()
  widget
    .render({
      container: hostEl,
      showAlternativeLogin: false,
    })
    .on(WidgetEvents.ERROR, (error: unknown) => {
      const message = vkWidgetErrorMessage(error)
      if (loginInflight && isBenignVkError(message)) return
      handlers.onError(message)
    })
    .on(OneTapInternalEvents.LOGIN_SUCCESS, (payload: VkLoginPayload) => {
      const code = payload.code?.trim()
      const deviceId = payload.device_id?.trim()
      if (!code || !deviceId) {
        handlers.onError("VK ID вернул неполный ответ")
        return
      }

      loginInflight = true
      void completeVkOneTap({
        code,
        deviceId,
        codeVerifier: pkce.codeVerifier,
        state: payload.state?.trim() || pkce.state,
      })
        .then(() => {
          loginInflight = false
        })
        .catch((err: unknown) => {
          loginInflight = false
          handlers.onError(err instanceof Error ? err.message : "Не удалось войти через VK ID")
        })
    })

  return hostEl
}

/** Переносит один и тот же iframe One Tap между контейнерами (StrictMode-safe). */
export function attachVkOneTap(container: HTMLElement, handlers: VkOneTapHandlers): void {
  const host = ensureWidget(handlers)
  if (host.parentElement !== container) {
    container.replaceChildren(host)
  }
}

export function detachVkOneTapHost(): void {
  hostEl?.remove()
}
