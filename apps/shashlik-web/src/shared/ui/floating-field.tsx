import { ArrowRight } from "lucide-react"
import { useId, useState, type ComponentProps, type ReactNode } from "react"

import { cn } from "@/shared/lib/cn"

type FloatingFieldProps = Omit<ComponentProps<"input">, "size"> & {
  label: string
  icon?: ReactNode
  onSubmit?: () => void
  submitBusy?: boolean
  submitLabel?: string
}

/** Поле с плавающей подписью и опциональной кнопкой подтверждения справа. */
export function FloatingField({
  label,
  icon,
  className,
  value,
  defaultValue,
  onFocus,
  onBlur,
  onSubmit,
  submitBusy,
  submitLabel = "Подтвердить",
  disabled,
  readOnly,
  ...props
}: FloatingFieldProps) {
  const id = useId()
  const [focused, setFocused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const current = String(value ?? defaultValue ?? "")
  const floated = focused || hovered || current.length > 0
  const showSubmit = Boolean(onSubmit && current.trim().length > 0)

  return (
    <div
      className={cn(
        "relative h-12 rounded-[var(--r-md)] border border-line bg-surface transition-[border-color,box-shadow] duration-200",
        focused && "border-brand-border shadow-[0_0_0_3px_var(--brand-ring)]",
        disabled && "opacity-50",
        className,
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {icon ? (
        <span
          className={cn(
            "pointer-events-none absolute left-3.5 text-fg-faint transition-all duration-200 ease-out",
            floated ? "top-2.5" : "top-1/2 -translate-y-1/2",
          )}
        >
          {icon}
        </span>
      ) : null}

      <label
        htmlFor={id}
        className={cn(
          "pointer-events-none absolute font-semibold transition-all duration-200 ease-out",
          icon ? "left-10" : "left-3.5",
          floated
            ? "top-2 text-[10px] text-fg-muted"
            : "top-1/2 -translate-y-1/2 text-[13px] text-fg-soft",
        )}
      >
        {label}
      </label>

      <input
        id={id}
        disabled={disabled}
        readOnly={readOnly}
        value={value}
        defaultValue={defaultValue}
        onFocus={(e) => {
          setFocused(true)
          onFocus?.(e)
        }}
        onBlur={(e) => {
          setFocused(false)
          onBlur?.(e)
        }}
        className={cn(
          "size-full rounded-[inherit] bg-transparent pr-3.5 text-[14px] font-semibold text-fg outline-none",
          icon ? "pl-10" : "pl-3.5",
          showSubmit && "pr-12",
          "pt-4.5 pb-1.5",
        )}
        {...props}
      />

      {showSubmit ? (
        <button
          type="button"
          disabled={submitBusy}
          aria-label={submitLabel}
          onClick={onSubmit}
          className="absolute top-1/2 right-1.5 grid size-8 -translate-y-1/2 cursor-pointer place-items-center rounded-[var(--r-sm)] bg-brand text-on-brand transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          <ArrowRight size={16} strokeWidth={2.6} />
        </button>
      ) : null}
    </div>
  )
}
