import { ChevronDown } from "lucide-react"
import {
  Children,
  isValidElement,
  useId,
  useMemo,
  useState,
  type ChangeEvent,
  type ComponentProps,
  type ReactElement,
  type ReactNode,
} from "react"

import { cn } from "@/shared/lib/cn"
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover"

type OptionData = {
  value: string
  label: string
  disabled?: boolean
}

function parseOptions(children: ReactNode): OptionData[] {
  return Children.toArray(children).flatMap((child) => {
    if (!isValidElement(child)) return []
    if (child.type !== "option") return []
    const el = child as ReactElement<ComponentProps<"option">>
    return [
      {
        value: el.props.value == null ? "" : String(el.props.value),
        label: String(el.props.children ?? ""),
        disabled: Boolean(el.props.disabled),
      },
    ]
  })
}

type SelectProps = Omit<ComponentProps<"select">, "size"> & {
  children?: ReactNode
}

export function Select({
  className,
  children,
  value,
  defaultValue,
  onChange,
  disabled,
  id,
  name,
  required,
  "aria-label": ariaLabel,
  ...rest
}: SelectProps) {
  const listId = useId()
  const [open, setOpen] = useState(false)
  const options = useMemo(() => parseOptions(children), [children])

  const controlled = value !== undefined
  const [uncontrolled, setUncontrolled] = useState(
    defaultValue == null ? (options[0]?.value ?? "") : String(defaultValue),
  )
  const current = controlled ? String(value) : uncontrolled
  const selected = options.find((opt) => opt.value === current) ?? options[0]
  const label = selected?.label ?? ""

  function commit(next: string) {
    if (!controlled) setUncontrolled(next)
    onChange?.({
      target: { value: next, name: name ?? "" },
      currentTarget: { value: next, name: name ?? "" },
    } as ChangeEvent<HTMLSelectElement>)
    setOpen(false)
  }

  return (
    <div className={cn("relative h-11 min-w-0 text-[14px] font-semibold text-fg", className)}>
      <Popover open={open} onOpenChange={(next) => !disabled && setOpen(next)}>
        <select
          id={id}
          name={name}
          required={required}
          disabled={disabled}
          value={current}
          tabIndex={-1}
          aria-hidden
          className="pointer-events-none absolute h-0 w-0 opacity-0"
          onChange={() => {}}
          {...rest}
        >
          {options.map((opt) => (
            <option key={`${opt.value}::${opt.label}`} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>

        <PopoverTrigger asChild>
          <button
            type="button"
            disabled={disabled}
            aria-label={ariaLabel}
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-controls={listId}
            data-slot="select"
            className={cn(
              "flex size-full cursor-pointer items-center justify-between gap-2 rounded-[var(--r-md)] border border-line bg-surface px-3.5 text-left text-inherit",
              "outline-none transition-[border-color,box-shadow,background-color] duration-200",
              "hover:border-line-strong focus-visible:border-brand-border",
              "disabled:cursor-not-allowed disabled:opacity-50",
              open && "border-brand-border shadow-[0_0_0_3px_var(--brand-ring)]",
            )}
          >
            <span className="min-w-0 truncate">{label || "Выберите…"}</span>
            <ChevronDown
              size={16}
              strokeWidth={2.4}
              className={cn(
                "shrink-0 text-fg-muted transition-transform duration-200 ease-out",
                open && "rotate-180",
              )}
            />
          </button>
        </PopoverTrigger>

        <PopoverContent
          id={listId}
          role="listbox"
          align="start"
          sideOffset={6}
          collisionPadding={12}
          onOpenAutoFocus={(e) => e.preventDefault()}
          className={cn(
            "z-100 w-[var(--radix-popover-trigger-width)] max-w-none overflow-hidden p-1",
            "rounded-[var(--r-lg)] border border-line bg-surface shadow-[var(--shadow-pop)]",
            "origin-[var(--radix-popover-content-transform-origin)]",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-top-1",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-top-1",
            "data-[state=open]:duration-200 data-[state=closed]:duration-150",
            "text-[14px] leading-none font-semibold text-fg",
          )}
        >
          <ul className="flex max-h-60 flex-col gap-0.5 overflow-y-auto py-0.5">
            {options.map((opt) => {
              const active = opt.value === current
              return (
                <li key={`${opt.value}::${opt.label}`} role="presentation">
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    disabled={opt.disabled}
                    onClick={() => commit(opt.value)}
                    className={cn(
                      "flex w-full cursor-pointer items-center rounded-[var(--r-md)] px-3 py-2.5 text-left transition-colors duration-150",
                      active
                        ? "bg-brand-soft text-brand"
                        : "text-fg hover:bg-surface-3",
                      opt.disabled && "cursor-not-allowed opacity-40",
                    )}
                  >
                    {opt.label}
                  </button>
                </li>
              )
            })}
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  )
}
