import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import type { ComponentProps } from "react"

import { cn } from "@/shared/lib/cn"

export const Sheet = DialogPrimitive.Root
export const SheetTrigger = DialogPrimitive.Trigger
export const SheetClose = DialogPrimitive.Close
export const SheetTitle = DialogPrimitive.Title
export const SheetDescription = DialogPrimitive.Description

type SheetContentProps = ComponentProps<typeof DialogPrimitive.Content> & {
  side?: "right" | "bottom"
}

export function SheetContent({
  className,
  children,
  side = "right",
  ...props
}: SheetContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay
        className={cn(
          "fixed inset-0 z-200 bg-black/45 backdrop-blur-[2px]",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
        )}
      />
      <DialogPrimitive.Content
        className={cn(
          "fixed z-201 flex flex-col bg-surface shadow-[var(--shadow-panel)] outline-none",
          "data-[state=open]:animate-in data-[state=closed]:animate-out duration-300",
          side === "right"
            ? "inset-y-0 right-0 w-[min(420px,100vw)] rounded-l-[var(--r-2xl)] data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right"
            : "inset-x-0 bottom-0 max-h-[92vh] rounded-t-[var(--r-2xl)] data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close
          aria-label="Закрыть"
          className="absolute top-4 right-4 grid size-9 cursor-pointer place-items-center rounded-[var(--r-sm)] text-fg-muted transition-colors hover:bg-surface-3 hover:text-fg"
        >
          <X size={18} strokeWidth={2.4} />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}
