import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentProps } from "react"

import { cn } from "@/shared/lib/cn"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-bold transition-all duration-200 disabled:pointer-events-none disabled:opacity-45 [&_svg]:pointer-events-none [&_svg]:shrink-0 active:scale-[0.985] cursor-pointer",
  {
    variants: {
      variant: {
        /** Главный CTA: сплошной оранжевый бренда. */
        brand:
          "bg-brand text-on-brand shadow-brand hover:bg-brand-hover active:bg-brand-press",
        /** Мягкий оранжевый: «Добавить» на карточке товара. */
        soft: "bg-brand-soft text-brand hover:bg-brand-soft-hover",
        /** Нейтральная поверхность с обводкой. */
        outline:
          "border border-line bg-surface text-fg hover:border-line-strong hover:bg-surface-3",
        /** Прозрачная. */
        ghost: "text-fg-soft hover:bg-surface-3 hover:text-fg",
        /** Опасное действие (удаление). */
        danger: "border border-red/25 bg-red-soft text-red hover:border-red/45",
        /** CTA страницы товара: оранжевый в светлой, лайм в тёмной теме. */
        product:
          "bg-product-accent text-on-product-accent hover:bg-product-accent-hover shadow-[0_10px_26px_-12px_var(--product-accent)]",
      },
      size: {
        xs: "h-7 rounded-[var(--r-xs)] px-2.5 text-[11px]",
        sm: "h-9 rounded-[var(--r-sm)] px-3 text-[13px] [&_svg]:size-4",
        md: "h-11 rounded-[var(--r-md)] px-4 text-[14px] [&_svg]:size-[18px]",
        lg: "h-13 rounded-[var(--r-md)] px-5 text-[15px] [&_svg]:size-5",
        xl: "h-14 rounded-[var(--r-lg)] px-6 text-[16px] [&_svg]:size-5",
        icon: "size-11 rounded-[var(--r-md)] [&_svg]:size-[18px]",
        "icon-sm": "size-9 rounded-[var(--r-sm)] [&_svg]:size-4",
      },
      block: { true: "w-full", false: "" },
    },
    defaultVariants: { variant: "brand", size: "md", block: false },
  },
)

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }

export function Button({
  className,
  variant,
  size,
  block,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, block }), className)}
      {...props}
    />
  )
}

export { buttonVariants }
