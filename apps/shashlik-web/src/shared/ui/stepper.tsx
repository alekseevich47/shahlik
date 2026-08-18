import { Minus, Plus } from "lucide-react"

import { cn } from "@/shared/lib/cn"

type StepperProps = {
  value: number
  onChange: (next: number) => void
  min?: number
  max?: number
  size?: "sm" | "md" | "lg"
  tone?: "outline" | "ghost"
  className?: string
  ariaLabel?: string
}

const SIZES = {
  sm: { box: "h-7 gap-0.5 px-0.5 rounded-[var(--r-xs)]", btn: "size-6", txt: "text-[12px] min-w-5", ico: 13 },
  md: { box: "h-9 gap-1 px-1 rounded-[var(--r-sm)]", btn: "size-7", txt: "text-[13px] min-w-6", ico: 15 },
  lg: { box: "h-12 gap-1.5 px-1.5 rounded-[var(--r-md)]", btn: "size-9", txt: "text-[15px] min-w-8", ico: 17 },
} as const

/** Счётчик количества (карточка корзины, добавки, страница товара). */
export function Stepper({
  value,
  onChange,
  min = 0,
  max = 99,
  size = "md",
  tone = "outline",
  className,
  ariaLabel = "Количество",
}: StepperProps) {
  const s = SIZES[size]
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cn(
        "inline-flex items-center justify-between",
        s.box,
        tone === "outline" ? "border border-line bg-surface" : "bg-surface-3",
        className,
      )}
    >
      <StepBtn
        className={s.btn}
        disabled={value <= min}
        onClick={() => onChange(value - 1)}
        label="Уменьшить"
      >
        <Minus size={s.ico} strokeWidth={2.6} />
      </StepBtn>
      <span className={cn("text-center font-extrabold text-fg tabular-nums", s.txt)}>
        {value}
      </span>
      <StepBtn
        className={s.btn}
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
        label="Увеличить"
      >
        <Plus size={s.ico} strokeWidth={2.6} />
      </StepBtn>
    </div>
  )
}

function StepBtn({
  children,
  className,
  disabled,
  onClick,
  label,
}: {
  children: React.ReactNode
  className?: string
  disabled?: boolean
  onClick: () => void
  label: string
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "grid cursor-pointer place-items-center rounded-[var(--r-xs)] text-fg-muted",
        "transition-colors hover:bg-surface-3 hover:text-fg",
        "disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent",
        className,
      )}
    >
      {children}
    </button>
  )
}
