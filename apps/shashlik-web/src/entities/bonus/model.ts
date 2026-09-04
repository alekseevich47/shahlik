export type BonusLedgerReason =
  | "manual"
  | "order_earn"
  | "order_spend"
  | "promo"
  | "referral"
  | "birthday"
  | "pwa_install"
  | "adjust"

export type BonusLedgerEntry = {
  id: string
  delta: number
  balanceAfter: number
  reason: BonusLedgerReason | string
  refType: string
  refId: string
  created: string
}

export type BonusSettings = {
  id: string
  enabled: boolean
  defaultEarnPercent: number
  birthdayAmount: number
  referralInviterAmount: number
  referralInviteeAmount: number
  pwaInstallAmount: number
  maxSpendPercent: number
  earnOnStatus: "done"
}

export const BONUS_SETTINGS_ID = "main"

export const BONUS_REASON_LABEL: Record<string, string> = {
  manual: "Вручную",
  adjust: "Корректировка",
  order_earn: "За заказ",
  order_spend: "Списание",
  promo: "Промокод",
  referral: "Реферал",
  birthday: "День рождения",
  pwa_install: "Установка приложения",
}

export function bonusSettingsFallback(): BonusSettings {
  return {
    id: BONUS_SETTINGS_ID,
    enabled: true,
    defaultEarnPercent: 5,
    birthdayAmount: 300,
    referralInviterAmount: 200,
    referralInviteeAmount: 100,
    pwaInstallAmount: 150,
    maxSpendPercent: 50,
    earnOnStatus: "done",
  }
}
