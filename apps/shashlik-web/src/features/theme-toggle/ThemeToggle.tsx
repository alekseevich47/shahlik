import { Moon, Sun } from "lucide-react"

import { useTheme } from "@/app/providers/theme"
import { cn } from "@/shared/lib/cn"

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme()
  const isDark = theme === "dark"

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Включить светлую тему" : "Включить тёмную тему"}
      className={cn(
        "grid size-11 cursor-pointer place-items-center rounded-[var(--r-md)] border border-line bg-surface",
        "text-fg-muted transition-colors hover:border-brand-border hover:text-brand",
        className,
      )}
    >
      <span className="relative block size-[18px]">
        <Sun
          size={18}
          strokeWidth={2.2}
          className={cn(
            "absolute inset-0 transition-all duration-300",
            isDark ? "scale-50 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100",
          )}
        />
        <Moon
          size={18}
          strokeWidth={2.2}
          className={cn(
            "absolute inset-0 transition-all duration-300",
            isDark ? "scale-100 rotate-0 opacity-100" : "scale-50 -rotate-90 opacity-0",
          )}
        />
      </span>
    </button>
  )
}
