import { ArrowLeft, Bell, ChevronDown, RefreshCw, Star } from "lucide-react"
import { Link } from "react-router-dom"
import { toast } from "sonner"

import { ThemeToggle } from "@/features/theme-toggle/ThemeToggle"
import { Button } from "@/shared/ui/button"

export function AdminTopbar() {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b border-line bg-surface-2/92 px-4 backdrop-blur-xl">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-[12.5px] font-bold text-fg-muted transition-colors hover:text-brand"
      >
        <ArrowLeft size={15} strokeWidth={2.6} />
        На сайт
      </Link>

      <h1 className="text-[19px] leading-none font-extrabold tracking-[-0.01em] text-fg">
        Админ-панель
      </h1>

      <div className="ml-auto flex items-center gap-2">
        <span className="hidden h-9 items-center gap-1.5 rounded-[var(--r-sm)] border border-line bg-surface px-3 text-[12px] font-bold text-fg-soft sm:inline-flex">
          <Star size={14} className="text-gold" fill="currentColor" strokeWidth={0} />
          35 бонусов
        </span>

        <Button
          variant="outline"
          size="sm"
          onClick={() => toast.success("Кэш каталога сброшен")}
        >
          <RefreshCw size={14} strokeWidth={2.4} />
          Сброс кэш
        </Button>

        <ThemeToggle className="size-9 rounded-[var(--r-sm)]" />

        <button
          type="button"
          aria-label="Уведомления"
          className="relative grid size-9 cursor-pointer place-items-center rounded-[var(--r-sm)] border border-line bg-surface text-fg-muted transition-colors hover:text-brand"
        >
          <Bell size={16} strokeWidth={2.2} />
          <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-red" />
        </button>

        <button
          type="button"
          className="flex cursor-pointer items-center gap-2 rounded-[var(--r-sm)] px-1.5 py-1 transition-colors hover:bg-surface-3"
        >
          <span className="grid size-8 place-items-center rounded-full bg-brand text-[12px] font-extrabold text-on-brand">
            А
          </span>
          <span className="hidden flex-col items-start leading-tight sm:flex">
            <span className="text-[12.5px] font-bold text-fg">Алексей</span>
            <span className="text-[10px] text-fg-muted">Администратор</span>
          </span>
          <ChevronDown size={14} className="text-fg-faint" strokeWidth={2.4} />
        </button>
      </div>
    </header>
  )
}
