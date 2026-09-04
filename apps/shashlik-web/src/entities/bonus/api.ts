import { useMutation, useQuery } from "@tanstack/react-query"

import { pb } from "@/shared/api/pb"
import { pbClient } from "@/shared/api/pb-client"
import { queryClient } from "@/shared/api/query-client"

import {
  BONUS_SETTINGS_ID,
  bonusSettingsFallback,
  publicBonusSettingsFallback,
  type BonusLedgerEntry,
  type BonusSettings,
  type PublicBonusSettings,
} from "./model"

type BonusSettingsRecord = {
  id: string
  enabled?: boolean
  defaultEarnPercent?: number
  birthdayAmount?: number
  referralInviterAmount?: number
  referralInviteeAmount?: number
  pwaInstallAmount?: number
  registrationAmount?: number
  maxSpendPercent?: number
  earnOnStatus?: string
}

type LedgerRecord = {
  id: string
  delta?: number
  balanceAfter?: number
  reason?: string
  refType?: string
  refId?: string
  created: string
}

function mapSettings(record: BonusSettingsRecord): BonusSettings {
  const fallback = bonusSettingsFallback()
  return {
    id: record.id,
    enabled: Boolean(record.enabled),
    defaultEarnPercent: record.defaultEarnPercent ?? fallback.defaultEarnPercent,
    birthdayAmount: record.birthdayAmount ?? fallback.birthdayAmount,
    referralInviterAmount: record.referralInviterAmount ?? fallback.referralInviterAmount,
    referralInviteeAmount: record.referralInviteeAmount ?? fallback.referralInviteeAmount,
    pwaInstallAmount: record.pwaInstallAmount ?? fallback.pwaInstallAmount,
    registrationAmount: record.registrationAmount ?? fallback.registrationAmount,
    maxSpendPercent: record.maxSpendPercent ?? fallback.maxSpendPercent,
    earnOnStatus: "done",
  }
}

function mapLedger(record: LedgerRecord): BonusLedgerEntry {
  return {
    id: record.id,
    delta: record.delta ?? 0,
    balanceAfter: record.balanceAfter ?? 0,
    reason: record.reason ?? "",
    refType: record.refType ?? "",
    refId: record.refId ?? "",
    created: record.created,
  }
}

export const bonusKeys = {
  settings: ["bonus_settings"] as const,
  public: ["bonus_settings", "public"] as const,
  ledger: (customerId: string) => ["bonus_ledger", customerId] as const,
}

export async function fetchBonusSettings(): Promise<BonusSettings> {
  try {
    const record = await pb
      .collection("bonus_settings")
      .getOne<BonusSettingsRecord>(BONUS_SETTINGS_ID)
    return mapSettings(record)
  } catch {
    return bonusSettingsFallback()
  }
}

export function useBonusSettings() {
  return useQuery({
    queryKey: bonusKeys.settings,
    queryFn: fetchBonusSettings,
    staleTime: 30_000,
  })
}

export async function fetchPublicBonusSettings(): Promise<PublicBonusSettings> {
  try {
    return await pbClient.send<PublicBonusSettings>("/api/bonus/public", { method: "GET" })
  } catch {
    return publicBonusSettingsFallback()
  }
}

export function usePublicBonusSettings() {
  return useQuery({
    queryKey: bonusKeys.public,
    queryFn: fetchPublicBonusSettings,
    staleTime: 60_000,
  })
}

export type UpdateBonusSettingsInput = Omit<BonusSettings, "id" | "earnOnStatus">

export async function updateBonusSettings(
  input: UpdateBonusSettingsInput,
): Promise<BonusSettings> {
  const record = await pb.collection("bonus_settings").update<BonusSettingsRecord>(
    BONUS_SETTINGS_ID,
    {
      enabled: input.enabled,
      defaultEarnPercent: input.defaultEarnPercent,
      birthdayAmount: input.birthdayAmount,
      referralInviterAmount: input.referralInviterAmount,
      referralInviteeAmount: input.referralInviteeAmount,
      pwaInstallAmount: input.pwaInstallAmount,
      registrationAmount: input.registrationAmount,
      maxSpendPercent: input.maxSpendPercent,
      earnOnStatus: "done",
    },
  )
  return mapSettings(record)
}

export function useUpdateBonusSettings() {
  return useMutation({
    mutationFn: updateBonusSettings,
    onSuccess: (data) => {
      queryClient.setQueryData(bonusKeys.settings, data)
      queryClient.setQueryData(bonusKeys.public, {
        enabled: data.enabled,
        defaultEarnPercent: data.defaultEarnPercent,
        registrationAmount: data.registrationAmount,
        pwaInstallAmount: data.pwaInstallAmount,
        maxSpendPercent: data.maxSpendPercent,
      } satisfies PublicBonusSettings)
    },
  })
}

export async function fetchCustomerLedger(customerId: string): Promise<BonusLedgerEntry[]> {
  if (!customerId) return []
  const records = await pb.collection("bonus_ledger").getList<LedgerRecord>(1, 50, {
    filter: pb.filter("customerId = {:id}", { id: customerId }),
    sort: "-created",
  })
  return records.items.map(mapLedger)
}

export function useCustomerLedger(customerId: string, enabled: boolean) {
  return useQuery({
    queryKey: bonusKeys.ledger(customerId),
    queryFn: () => fetchCustomerLedger(customerId),
    enabled: enabled && Boolean(customerId),
  })
}

export async function adjustBonus(input: {
  customerId: string
  delta: number
  comment?: string
}): Promise<{ ok: boolean; score: number; delta: number }> {
  return pb.send("/api/bonus/adjust", {
    method: "POST",
    body: input,
  })
}

export function useAdjustBonus() {
  return useMutation({
    mutationFn: adjustBonus,
    onSuccess: (_data, vars) => {
      void queryClient.invalidateQueries({ queryKey: bonusKeys.ledger(vars.customerId) })
      void queryClient.invalidateQueries({ queryKey: ["customers"] })
    },
  })
}

export async function bulkSetBonusPercent(percent: number): Promise<{ updated: number }> {
  return pb.send("/api/bonus/bulk-percent", {
    method: "POST",
    body: { percent },
  })
}

export function useBulkBonusPercent() {
  return useMutation({
    mutationFn: bulkSetBonusPercent,
  })
}

export async function claimPwaInstallBonus(): Promise<{
  ok: boolean
  reason?: string
  score?: number
  skipped?: boolean
  delta?: number
}> {
  return pbClient.send("/api/bonus/events/pwa-install", { method: "POST" })
}

export async function submitReferralCode(code: string): Promise<{ ok: boolean; reason?: string }> {
  return pbClient.send("/api/profile/referral", {
    method: "POST",
    body: { code },
  })
}
