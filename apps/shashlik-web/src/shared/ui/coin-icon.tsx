import { cn } from "@/shared/lib/cn"

type CoinIconProps = {
  className?: string
  alt?: string
}

/** Логотип бонусной монеты (`/icons/coin.svg`). */
export function CoinIcon({ className, alt = "" }: CoinIconProps) {
  return (
    <img
      src="/icons/coin.svg"
      alt={alt}
      width={14}
      height={14}
      decoding="async"
      className={cn("inline-block size-3.5 shrink-0 object-contain", className)}
    />
  )
}
