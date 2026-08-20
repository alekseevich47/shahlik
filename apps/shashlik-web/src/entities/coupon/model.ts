export type CouponKind = "percent" | "amount"

export type Coupon = {
  id: string
  code: string
  kind: CouponKind
  value: number
  description: string
  minTotal: number
  startsAt: string | null
  endsAt: string | null
  /** 0 = без лимита */
  usesLimit: number
  /** 0 = без лимита */
  perCustomer: number
  uses: number
  active: boolean
  createdAt: string
}

/** Применённый в корзине купон (без утечки списка кодов). */
export type AppliedCoupon = {
  code: string
  kind: CouponKind
  value: number
}

export const COUPON_CODE_PATTERN = /^[A-Z0-9]{3,32}$/

export function formatCouponValue(kind: CouponKind, value: number): string {
  return kind === "percent" ? `${value}%` : `${Math.round(value)}₽`
}

export function calcCouponDiscount(goods: number, coupon: AppliedCoupon | null): number {
  if (!coupon || goods <= 0) return 0
  if (coupon.kind === "percent") {
    return Math.round((goods * coupon.value) / 100)
  }
  return Math.min(Math.round(coupon.value), goods)
}
