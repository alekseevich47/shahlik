import {
  Config,
  ConfigResponseMode,
  OneTap,
  OneTapInternalEvents,
  WidgetEvents,
  type OneTap as OneTapWidget,
} from "@vkid/sdk"
import { useEffect, useRef } from "react"

import { completeVkOneTap } from "@/entities/account/api"
import { createVkPkce, resolveVkAppId } from "@/entities/account/vk-id"
import { ensurePbBaseUrl, resolvePbBaseUrl } from "@/shared/api/pb"
import { pbClient } from "@/shared/api/pb-client"

type VkOneTapProps = {
  disabled?: boolean
  onError: (message: string) => void
}

type VkLoginPayload = {
  code?: string
  device_id?: string
  state?: string
}

function vkWidgetErrorMessage(error: unknown): string {
  if (!error || typeof error !== "object") return "Ошибка VK ID"
  const row = error as { text?: string; error?: string; message?: string }
  return String(row.text || row.error || row.message || "Ошибка VK ID").trim()
}

/** VK ID One Tap: callback mode, обмен code на сессию через POST /api/auth/vk/complete. */
export function VkOneTap({ disabled, onError }: VkOneTapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetRef = useRef<OneTapWidget | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container || disabled) return

    let cancelled = false

    try {
      ensurePbBaseUrl(pbClient)
      const { codeVerifier, state } = createVkPkce()

      Config.init({
        app: resolveVkAppId(),
        redirectUrl: `${resolvePbBaseUrl()}/api/auth/vk/callback`,
        state,
        codeVerifier,
        scope: "email phone",
        responseMode: ConfigResponseMode.Callback,
      })

      const oneTap = new OneTap()
      widgetRef.current = oneTap

      oneTap
        .render({
          container,
          showAlternativeLogin: false,
        })
        .on(WidgetEvents.ERROR, (error: unknown) => {
          if (!cancelled) onError(vkWidgetErrorMessage(error))
        })
        .on(OneTapInternalEvents.LOGIN_SUCCESS, (payload: VkLoginPayload) => {
          const code = payload.code?.trim()
          const deviceId = payload.device_id?.trim()
          if (!code || !deviceId) {
            if (!cancelled) onError("VK ID вернул неполный ответ")
            return
          }

          void completeVkOneTap({
            code,
            deviceId,
            codeVerifier,
            state: payload.state?.trim() || state,
          }).catch((err: unknown) => {
            if (!cancelled) {
              onError(err instanceof Error ? err.message : "Не удалось войти через VK ID")
            }
          })
        })
    } catch (err) {
      onError(err instanceof Error ? err.message : "VK ID не настроен")
    }

    return () => {
      cancelled = true
      widgetRef.current = null
      container.replaceChildren()
    }
  }, [disabled, onError])

  return <div ref={containerRef} className="min-h-11 w-full" />
}
