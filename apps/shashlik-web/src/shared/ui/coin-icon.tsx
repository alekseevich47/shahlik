import { cn } from "@/shared/lib/cn"

/**
 * Логотип бонусной монеты.
 * Предпочтительный пробный: temp/монета.png → `/icons/coin.png` 16×16.
 * Сейчас: temp/монета_1.png → `/icons/coin.png`.
 * Старая: `/icons/coin.svg`.
 */
export function CoinIcon({ className, alt = "" }: { className?: string; alt?: string }) {
  return (
    <img
      src="/icons/coin.png"
      alt={alt}
      width={16}
      height={16}
      decoding="async"
      className={cn(
        "inline-block size-4 shrink-0 self-center object-contain align-middle",
        className,
      )}
    />
  )
}
