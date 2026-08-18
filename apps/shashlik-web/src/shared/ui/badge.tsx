import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentProps } from "react"

import { cn } from "@/shared/lib/cn"

const badgeVariants = cva(
  "inline-flex items-center gap-1 whitespace-nowrap font-bold leading-none",
  {
    variants: {
      variant: {
        /** «Хит» на фото карточки. */
        brand: "bg-brand text-on-brand shadow-brand",
        /** «Хит продаж» рядом с заголовком. */
        soft: "bg-brand-soft text-brand",
        /** Ярлыки варианта / размера: «Курица», «L». */
        meta: "bg-surface-3 text-fg-muted",
        success: "bg-success-soft text-success",
        outline: "border border-line text-fg-muted",
      },
      size: {
        sm: "h-5 rounded-[6px] px-1.5 text-[10px]",
        md: "h-6 rounded-[7px] px-2 text-[11px]",
        lg: "h-7 rounded-[8px] px-2.5 text-[12px]",
      },
    },
    defaultVariants: { variant: "meta", size: "md" },
  },
)

type BadgeProps = ComponentProps<"span"> & VariantProps<typeof badgeVariants>

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, size }), className)} {...props} />
}
