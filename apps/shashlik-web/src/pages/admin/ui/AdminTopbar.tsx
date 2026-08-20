import { useQuery } from "@tanstack/react-query"
import { ArrowLeft, Bell, ChevronDown, LogOut, RefreshCw } from "lucide-react"
import { useEffect, useId, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "sonner"

import { ThemeToggle } from "@/features/theme-toggle/ThemeToggle"
import { useAdminAuth } from "@/shared/api/auth"
import { pb } from "@/shared/api/pb"
import { queryClient } from "@/shared/api/query-client"
import { Button } from "@/shared/ui/button"

const newOrdersKey = ["admin", "orders", "new-count"] as const

async function fetchNewOrdersCount(): Promise<number> {
  const result = await pb.collection("orders").getList(1, 1, {
    filter: 'status = "new"',
  })
  return result.totalItems
}

export function AdminTopbar() {
  const { user, logout } = useAdminAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuId = useId()

  const displayName =
    (typeof user?.name === "string" && user.name) ||
    (typeof user?.email === "string" && user.email) ||
    "Админ"
  const initial = displayName.slice(0, 1).toUpperCase()

  const { data: newOrders = 0 } = useQuery({
    queryKey: newOrdersKey,
    queryFn: fetchNewOrdersCount,
    staleTime: 30_000,
  })

  useEffect(() => {
    if (!menuOpen) return
    const onPointerDown = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false)
    }
    document.addEventListener("mousedown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("mousedown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [menuOpen])

  const resetCache = () => {
    void queryClient.invalidateQueries().then(() => {
      toast.success("Кэш обновлён")
    })
  }

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
        <Button variant="outline" size="sm" onClick={resetCache}>
          <RefreshCw size={14} strokeWidth={2.4} />
          Сброс кэш
        </Button>

        <ThemeToggle className="size-9 rounded-[var(--r-sm)]" />

        <Link
          to="/admin/orders?status=new"
          aria-label={
            newOrders > 0 ? `Новые заказы: ${newOrders}` : "Новые заказы"
          }
          className="relative grid size-9 place-items-center rounded-[var(--r-sm)] border border-line bg-surface text-fg-muted transition-colors hover:text-brand"
        >
          <Bell size={16} strokeWidth={2.2} />
          {newOrders > 0 ? (
            <span className="absolute -top-1 -right-1 grid min-w-4 place-items-center rounded-full bg-red px-1 text-[9px] font-extrabold leading-4 text-white">
              {newOrders > 99 ? "99+" : newOrders}
            </span>
          ) : null}
        </Link>

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex cursor-pointer items-center gap-2 rounded-[var(--r-sm)] px-1.5 py-1 transition-colors hover:bg-surface-3"
          >
            <span className="grid size-8 place-items-center rounded-full bg-brand text-[12px] font-extrabold text-on-brand">
              {initial}
            </span>
            <span className="hidden flex-col items-start leading-tight sm:flex">
              <span className="text-[12.5px] font-bold text-fg">{displayName}</span>
              <span className="text-[10px] text-fg-muted">Профиль</span>
            </span>
            <ChevronDown
              size={14}
              className={`text-fg-faint transition-transform ${menuOpen ? "rotate-180" : ""}`}
              strokeWidth={2.4}
            />
          </button>

          {menuOpen ? (
            <div
              id={menuId}
              role="menu"
              className="absolute top-[calc(100%+6px)] right-0 z-50 min-w-44 overflow-hidden rounded-[var(--r-sm)] border border-line bg-surface-2 py-1 shadow-[var(--shadow-pop)]"
            >
              <div className="border-b border-line px-3 py-2 sm:hidden">
                <p className="text-[12.5px] font-bold text-fg">{displayName}</p>
              </div>
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setMenuOpen(false)
                  logout()
                }}
                className="flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-left text-[12.5px] font-bold text-fg transition-colors hover:bg-surface-3"
              >
                <LogOut size={14} strokeWidth={2.4} className="text-fg-muted" />
                Выйти
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  )
}
