import { CoinIcon } from "@/shared/ui/coin-icon"
import { cn } from "@/shared/lib/cn"

type BonusEarnHintProps = {
  amount: number
  /** Гость — «можно получить», авторизованный — «(+N)». */
  guest: boolean
  className?: string
}

/** Тонкая подпись начисления рядом с ценой строки. */
export function BonusEarnHint({ amount, guest, className }: BonusEarnHintProps) {
  if (amount <= 0) return null

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-0.5 whitespace-nowrap text-[11px] font-medium text-fg-muted tabular-nums",
        className,
      )}
    >
      {guest ? (
        <>
          можно получить {amount}
          <CoinIcon className="size-6 opacity-80" />
        </>
      ) : (
        <>
          (+{amount}
          <CoinIcon className="size-3 opacity-80" />)
        </>
      )}
    </span>
  )
}
