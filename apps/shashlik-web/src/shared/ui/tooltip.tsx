import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import type { ComponentProps } from "react"

import { cn } from "@/shared/lib/cn"

export const TooltipProvider = TooltipPrimitive.Provider
export const Tooltip = TooltipPrimitive.Root
export const TooltipTrigger = TooltipPrimitive.Trigger

export function TooltipContent({
  className,
  sideOffset = 8,
  children,
  ...props
}: ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        sideOffset={sideOffset}
        className={cn(
          "z-100 max-w-60 rounded-[var(--r-sm)] border border-line bg-surface px-3 py-2",
          "text-[12px] leading-snug font-semibold text-fg-soft shadow-[var(--shadow-pop)]",
          "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
          className,
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="fill-surface" width={10} height={5} />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

/** Кружок «?» рядом с критерием оценки. */
export function HintMark({ hint }: { hint: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label={hint}
          className="grid size-[15px] cursor-help place-items-center rounded-full border border-line text-[9px] font-extrabold text-fg-faint transition-colors hover:border-brand-border hover:text-brand"
        >
          ?
        </button>
      </TooltipTrigger>
      <TooltipContent>{hint}</TooltipContent>
    </Tooltip>
  )
}
