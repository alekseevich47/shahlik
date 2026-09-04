import { useQuery } from "@tanstack/react-query"

import { collectionMutations, pbErrorMessage } from "@/shared/api/crud"
import { pb } from "@/shared/api/pb"
import { pbClient } from "@/shared/api/pb-client"

import type { Coupon, CouponKind } from "./model"

type CouponRecord = {
  id: string
  code: string
  kind: CouponKind
  value: number
  description?: string
  minTotal?: number
  startsAt?: string | null
  endsAt?: string | null
  usesLimit?: number
  perCustomer?: number
  uses?: number
  active?: boolean
  targetUserId?: string | null
  created: string
}

export type CreateCouponInput = {
  code: string
  kind: CouponKind
  value: number
  description?: string
  minTotal?: number
  startsAt?: string | null
  endsAt?: string | null
  usesLimit?: number
  perCustomer?: number
  active?: boolean
  targetUserId?: string | null
}

export type UpdateCouponInput = Partial<CreateCouponInput>

export type PromoCheckOk = {
  ok: true
  kind: CouponKind
  value: number
  discount: number
  bonusValue?: number
  message?: string
}

export type PromoCheckFail = {
  ok: false
  message: string
}

export type PromoCheckResult = PromoCheckOk | PromoCheckFail

function mapCoupon(record: CouponRecord): Coupon {
  return {
    id: record.id,
    code: record.code,
    kind: record.kind,
    value: record.value,
    description: record.description ?? "",
    minTotal: record.minTotal ?? 0,
    startsAt: record.startsAt ?? null,
    endsAt: record.endsAt ?? null,
    usesLimit: record.usesLimit ?? 0,
    perCustomer: record.perCustomer ?? 0,
    uses: record.uses ?? 0,
    active: Boolean(record.active),
    targetUserId: record.targetUserId ?? null,
    createdAt: record.created,
  }
}

export const couponKeys = {
  all: ["coupons"] as const,
  detail: (id: string) => ["coupons", id] as const,
}

const couponMutations = collectionMutations<
  CouponRecord,
  Coupon,
  CreateCouponInput,
  UpdateCouponInput
>({
  collection: "coupons",
  map: mapCoupon,
  keys: {
    all: couponKeys.all,
    detail: couponKeys.detail,
  },
})

export async function fetchCoupons(): Promise<Coupon[]> {
  const records = await pb.collection("coupons").getFullList<CouponRecord>({
    sort: "-created",
  })
  return records.map(mapCoupon)
}

export function useCoupons() {
  return useQuery({
    queryKey: couponKeys.all,
    queryFn: fetchCoupons,
  })
}

export function useCreateCoupon() {
  return couponMutations.useCreate()
}

export function useUpdateCoupon() {
  return couponMutations.useUpdate()
}

export function useDeleteCoupon() {
  return couponMutations.useRemove()
}

/** Публичная проверка кода — без выдачи списка купонов. Auth клиента — для персональных кодов. */
export async function checkPromo(code: string, goods: number): Promise<PromoCheckResult> {
  try {
    const result = await pbClient.send<PromoCheckResult>("/api/promo/check", {
      method: "POST",
      body: { code: code.trim().toUpperCase(), goods },
    })
    if (result && typeof result === "object" && "ok" in result) {
      return result
    }
    return { ok: false, message: "Не удалось проверить промокод" }
  } catch (err) {
    return { ok: false, message: pbErrorMessage(err, "Не удалось проверить промокод") }
  }
}
