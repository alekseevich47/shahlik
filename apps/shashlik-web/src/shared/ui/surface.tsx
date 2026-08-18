import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentProps } from "react"

import { cn } from "@/shared/lib/cn"

const surfaceVariants = cva("bg-surface", {
  variants: {
    tone: {
      /** Основная белая поверхность (карточки, сайдбар, корзина). */
      base: "bg-surface",
      /** Тёплая подложка (админ-панели, вложенные блоки). */
      warm: "bg-surface-2",
      /** Утопленный блок (инпуты-строки, неактивные чипы). */
      inset: "bg-surface-3",
    },
    radius: {
      lg: "rounded-[var(--r-lg)]",
      xl: "rounded-[var(--r-xl)]",
      "2xl": "rounded-[var(--r-2xl)]",
    },
    border: { true: "border border-line", false: "" },
    shadow: {
      none: "",
      card: "shadow-[var(--shadow-card)]",
      panel: "shadow-[var(--shadow-panel)]",
    },
  },
  defaultVariants: { tone: "base", radius: "xl", border: true, shadow: "card" },
})

type PanelProps = ComponentProps<"div"> & VariantProps<typeof surfaceVariants>

export function Panel({ className, tone, radius, border, shadow, ...props }: PanelProps) {
  return (
    <div
      data-slot="panel"
      className={cn(surfaceVariants({ tone, radius, border, shadow }), className)}
      {...props}
    />
  )
}

export function SectionTitle({
  className,
  children,
  action,
}: {
  className?: string
  children: React.ReactNode
  action?: React.ReactNode
}) {
  return (
    <div className={cn("mb-3.5 flex items-end justify-between gap-4", className)}>
      <h2 className="text-[20px] leading-none font-extrabold tracking-[-0.01em] text-fg sm:text-[22px]">
        {children}
      </h2>
      {action}
    </div>
  )
}

/** Мелкий uppercase-лейбл групп («ВЫБЕРИТЕ ВАРИАНТ», «РАЗМЕР»). */
export function GroupLabel({ className, children }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mb-2 text-[11px] font-extrabold tracking-[0.08em] text-fg-muted uppercase",
        className,
      )}
    >
      {children}
    </div>
  )
}
