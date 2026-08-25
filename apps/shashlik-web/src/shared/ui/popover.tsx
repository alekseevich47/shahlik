import * as PopoverPrimitive from "@radix-ui/react-popover"
import type { ComponentProps } from "react"

import { cn } from "@/shared/lib/cn"

export const Popover = PopoverPrimitive.Root
export const PopoverTrigger = PopoverPrimitive.Trigger
export const PopoverAnchor = PopoverPrimitive.Anchor

export function PopoverContent({
  className,
  sideOffset = 8,
  align = "center",
  children,
  ...props
}: ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        sideOffset={sideOffset}
        align={align}
        className={cn(
          "z-100 max-w-60 rounded-[var(--r-sm)] border border-line bg-surface px-3 py-2",
          "text-[12px] leading-snug font-semibold text-fg-soft shadow-[var(--shadow-pop)] outline-none",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          className,
        )}
        {...props}
      >
        {children}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  )
}
