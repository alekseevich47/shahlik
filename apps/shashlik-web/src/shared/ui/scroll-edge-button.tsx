import { ChevronLeft, ChevronRight } from "lucide-react"
import * as m from "motion/react-m"

import { cn } from "@/shared/lib/cn"

type Side = "left" | "right"

type Props = {
  side: Side
  visible: boolean
  label: string
  onPeekEnter: () => void
  onPeekLeave: () => void
  onStepScroll: () => void
  className?: string
}

const FADE = { duration: 0.2, ease: [0.22, 1, 0.36, 1] } as const

/**
 * Круговая edge-стрелка для горизонтальной ленты на стекле StickyBar.
 * Появление — opacity/scale; hover — лёгкий nudge иконки + peek ленты снаружи.
 */
export function ScrollEdgeButton({
  side,
  visible,
  label,
  onPeekEnter,
  onPeekLeave,
  onStepScroll,
  className,
}: Props) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight

  return (
    <m.button
      type="button"
      aria-label={label}
      tabIndex={visible ? 0 : -1}
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        scale: visible ? 1 : 0.86,
      }}
      transition={FADE}
      onPointerEnter={onPeekEnter}
      onPointerLeave={onPeekLeave}
      onClick={onStepScroll}
      className={cn(
        "group absolute top-1/2 z-10 grid size-7 -translate-y-1/2 place-items-center",
        "rounded-full border border-[var(--glass-btn-border)] bg-[var(--glass-btn)] text-white",
        "shadow-none transition-colors",
        "hover:border-[var(--glass-btn-border)] hover:text-white",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50",
        visible ? "pointer-events-auto cursor-pointer" : "pointer-events-none",
        side === "left" ? "left-0.5" : "right-0.5",
        className,
      )}
    >
      <Icon
        size={16}
        strokeWidth={2.4}
        className={cn(
          "transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
          side === "left" ? "group-hover:-translate-x-0.5" : "group-hover:translate-x-0.5",
        )}
        aria-hidden
      />
    </m.button>
  )
}
