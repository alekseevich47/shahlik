import { Chip } from "@/shared/ui/chip"
import { cn } from "@/shared/lib/cn"

export type PhotoTheme = "light" | "dark"

type Props = {
  value: PhotoTheme
  onChange: (theme: PhotoTheme) => void
  disabled?: boolean
  className?: string
}

/** Сегмент Светлая / Тёмная для dual-draft фото в админке. */
export function PhotoThemeToggle({ value, onChange, disabled, className }: Props) {
  return (
    <div className={cn("flex flex-wrap gap-1.5", className)} role="group" aria-label="Тема фото">
      <Chip
        type="button"
        active={value === "light"}
        disabled={disabled}
        onClick={() => onChange("light")}
        className="h-8 px-3 text-[12px]"
      >
        Светлая
      </Chip>
      <Chip
        type="button"
        active={value === "dark"}
        disabled={disabled}
        onClick={() => onChange("dark")}
        className="h-8 px-3 text-[12px]"
      >
        Тёмная
      </Chip>
    </div>
  )
}
