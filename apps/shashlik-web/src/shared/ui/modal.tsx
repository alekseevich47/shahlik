import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import type { ReactNode } from "react"

import { cn } from "@/shared/lib/cn"

export const ModalTitle = DialogPrimitive.Title
export const ModalDescription = DialogPrimitive.Description

type ModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: ReactNode
  className?: string
}

/** Центрированный Dialog. Без Glass, анимация только opacity + scale. */
export function Modal({ open, onOpenChange, children, className }: ModalProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-300 bg-black/45",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
          )}
        />
        <DialogPrimitive.Content
          className={cn(
            "fixed top-1/2 left-1/2 z-301 w-[min(960px,calc(100vw-2rem))] max-h-[92vh] -translate-x-1/2 -translate-y-1/2",
            "overflow-hidden rounded-[var(--r-2xl)] border border-line bg-surface shadow-[var(--shadow-panel)] outline-none",
            "duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
            "data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            className,
          )}
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
    </DialogPrimitive.Root>
  )
}
