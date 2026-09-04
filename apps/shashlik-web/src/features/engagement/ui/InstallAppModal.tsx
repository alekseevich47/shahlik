import { useEffect, useState } from "react"
import { toast } from "sonner"

import { claimPwaInstallBonus } from "@/entities/bonus/api"
import { CoinIcon } from "@/shared/ui/coin-icon"
import { Button } from "@/shared/ui/button"
import { Modal, ModalDescription, ModalTitle } from "@/shared/ui/modal"

import { detectInstallPlatform, dismissPwaForever } from "../lib/storage"

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

type InstallAppModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  amount: number
}

export function InstallAppModal({ open, onOpenChange, amount }: InstallAppModalProps) {
  const [step, setStep] = useState<"cta" | "howto">("cta")
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null)
  const platform = detectInstallPlatform()

  useEffect(() => {
    if (!open) setStep("cta")
  }, [open])

  useEffect(() => {
    function onBip(e: Event) {
      e.preventDefault()
      setDeferred(e as BeforeInstallPromptEvent)
    }
    function onInstalled() {
      void claimAfterInstall()
    }
    window.addEventListener("beforeinstallprompt", onBip)
    window.addEventListener("appinstalled", onInstalled)
    return () => {
      window.removeEventListener("beforeinstallprompt", onBip)
      window.removeEventListener("appinstalled", onInstalled)
    }
  }, [])

  async function claimAfterInstall() {
    try {
      const result = await claimPwaInstallBonus()
      if (result.ok && !result.skipped) {
        toast.success(`Начислено ${result.delta ?? amount} бонусов за установку`)
      }
    } catch {
      // ignore
    }
  }

  async function handleInstall() {
    if (deferred) {
      try {
        await deferred.prompt()
        const choice = await deferred.userChoice
        setDeferred(null)
        if (choice.outcome === "accepted") {
          await claimAfterInstall()
          onOpenChange(false)
          return
        }
      } catch {
        // fall through to howto
      }
    }
    setStep("howto")
  }

  function handleClose() {
    onOpenChange(false)
  }

  function handleNever() {
    dismissPwaForever()
    onOpenChange(false)
  }

  async function confirmInstalled() {
    await claimAfterInstall()
    dismissPwaForever()
    onOpenChange(false)
  }

  return (
    <Modal open={open} onOpenChange={onOpenChange} className="w-[min(420px,calc(100vw-2rem))]">
      <div className="flex flex-col gap-4 p-6 pr-14">
        {step === "cta" ? (
          <>
            <div className="flex items-center gap-2">
              <CoinIcon className="size-8" />
              <ModalTitle className="text-[20px] leading-tight font-extrabold tracking-[-0.02em] text-fg">
                Поставьте приложение
              </ModalTitle>
            </div>
            <ModalDescription className="text-[14px] leading-relaxed font-medium text-fg-muted">
              Акции, бонусы и быстрый заказ — на домашнем экране телефона. За установку подарим{" "}
              <span className="inline-flex items-center gap-1 font-extrabold text-fg tabular-nums">
                {amount}
                <CoinIcon className="size-4" />
              </span>
              .
            </ModalDescription>
            <div className="flex flex-col gap-2 pt-1">
              <Button size="lg" className="w-full" onClick={() => void handleInstall()}>
                Установить
              </Button>
              <Button
                size="lg"
                variant="soft"
                className="w-full !bg-surface-3 !text-fg-muted hover:!text-fg"
                onClick={handleClose}
              >
                Закрыть
              </Button>
              <button
                type="button"
                onClick={handleNever}
                className="cursor-pointer py-1 text-center text-[12px] font-medium text-fg-muted transition-colors hover:text-fg"
              >
                Больше не показывать
              </button>
            </div>
          </>
        ) : (
          <>
            <ModalTitle className="text-[18px] leading-tight font-extrabold tracking-[-0.02em] text-fg">
              Как добавить на экран
            </ModalTitle>
            <ModalDescription className="sr-only">
              Инструкция: как добавить сайт на домашний экран
            </ModalDescription>
            <ol className="list-decimal space-y-2 pl-4 text-[13px] leading-relaxed font-medium text-fg-muted">
              {platform === "ios" ? (
                <>
                  <li>Нажмите кнопку «Поделиться» внизу Safari</li>
                  <li>Выберите «На экран «Домой»»</li>
                  <li>Подтвердите «Добавить»</li>
                </>
              ) : platform === "android" ? (
                <>
                  <li>Откройте меню браузера (три точки)</li>
                  <li>Выберите «Установить приложение» или «На главный экран»</li>
                  <li>Подтвердите установку</li>
                </>
              ) : (
                <>
                  <li>В адресной строке найдите значок установки</li>
                  <li>Или меню браузера → «Установить Шашлыковский»</li>
                  <li>Подтвердите установку</li>
                </>
              )}
            </ol>
            <div className="flex flex-col gap-2 pt-1">
              <Button size="lg" className="w-full" onClick={() => void confirmInstalled()}>
                Готово — получить бонусы
              </Button>
              <Button
                size="lg"
                variant="soft"
                className="w-full !bg-surface-3 !text-fg-muted hover:!text-fg"
                onClick={handleClose}
              >
                Закрыть
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  )
}
