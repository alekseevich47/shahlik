/** % начисления строки: свой bonusPercent или default (0…100). */
export function resolveEarnPercent(
  bonusPercent: number | null | undefined,
  defaultEarnPercent: number,
): number {
  if (bonusPercent === null || bonusPercent === undefined || Number.isNaN(bonusPercent)) {
    return clampPercent(defaultEarnPercent)
  }
  return clampPercent(bonusPercent)
}

function clampPercent(value: number): number {
  if (!Number.isFinite(value) || value < 0) return 0
  if (value > 100) return 100
  return value
}

/** Начисление за одну строку (как сервер до округления суммы заказа). */
export function calcLineEarn(
  lineTotal: number,
  bonusPercent: number | null | undefined,
  defaultEarnPercent: number,
): number {
  const total = Number(lineTotal) || 0
  if (total <= 0) return 0
  const pct = resolveEarnPercent(bonusPercent, defaultEarnPercent)
  return (total * pct) / 100
}

export type EarnLineInput = {
  total: number
  bonusPercent?: number | null
}

/** Сумма начисления по корзине — `Math.round`, как `calcOrderEarnAmount` на сервере. */
export function calcCartEarn(
  lines: EarnLineInput[],
  defaultEarnPercent: number,
  enabled = true,
): number {
  if (!enabled || !lines.length) return 0
  let earned = 0
  for (const line of lines) {
    earned += calcLineEarn(line.total, line.bonusPercent, defaultEarnPercent)
  }
  return Math.round(earned)
}

/** Клиентский клип списания — зеркало `resolveSpendForOrder`. */
export function calcBonusSpendCap(opts: {
  score: number
  goods: number
  discount: number
  maxSpendPercent: number
}): number {
  const balance = Math.max(0, Math.round(opts.score))
  if (balance <= 0) return 0
  const afterPromo = Math.max(opts.goods - opts.discount, 0)
  const maxByPercent = Math.round((afterPromo * clampPercent(opts.maxSpendPercent)) / 100)
  return Math.max(0, Math.min(balance, afterPromo, maxByPercent))
}
