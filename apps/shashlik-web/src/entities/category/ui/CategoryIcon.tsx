import { Soup } from "lucide-react"

import { cn } from "@/shared/lib/cn"

type Props = {
  icon: string | null
  active: boolean
  /** `glass` — иконка на стеклянной плашке, цвет текста `--glass-fg`. */
  tone?: "brand" | "glass"
  className?: string
}

/** Иконка категории: PNG из `/icons`, у соусов иконки нет — рисуем заглушку. */
export function CategoryIcon({ icon, active, tone = "brand", className }: Props) {
  if (!icon) {
    const color =
      tone === "glass" ? "text-glass-fg" : active ? "text-brand" : "text-fg-faint"
    return (
      <Soup
        size={20}
        strokeWidth={2}
        className={cn("shrink-0", color, className)}
      />
    )
  }

  return (
    <img
      src={icon}
      alt=""
      aria-hidden
      className={cn(
        "size-5 shrink-0 object-contain transition-[opacity,filter] duration-200",
        tone === "glass"
          ? cn("category-icon-glass", active ? "opacity-100" : "opacity-50")
          : active
            ? "opacity-100"
            : "opacity-45 grayscale",
        className,
      )}
    />
  )
}
