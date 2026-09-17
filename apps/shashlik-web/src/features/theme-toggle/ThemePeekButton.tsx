import { Moon, Sun } from "lucide-react"
import * as m from "motion/react-m"
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react"

import { useTheme } from "@/app/providers/theme"
import { cn } from "@/shared/lib/cn"

const SESSION_KEY = "shashlik:theme-peek:v1"
const HOLD_MS = 3000
/** Половина ширины кнопки (44px) — peek из правого края. */
const PEEK_X = 22

type Phase = "rest" | "intro" | "expanded"

function sessionAlreadyPlayed(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1"
  } catch {
    return true
  }
}

function markSessionPlayed() {
  try {
    sessionStorage.setItem(SESSION_KEY, "1")
  } catch {
    /* private mode */
  }
}

/**
 * Mobile-only: квадрат темы справа над TabBar.
 * Сессия: один bounce-intro → 3 с → half-peek.
 * Tap/drag из peek → полный выезд; второй tap → toggle темы; без действия 3 с → снова peek.
 */
export function ThemePeekButton({ className }: { className?: string }) {
  const { theme, toggle } = useTheme()
  const isDark = theme === "dark"
  const [phase, setPhase] = useState<Phase>("rest")
  const [mounted, setMounted] = useState(false)
  const holdTimer = useRef<number | null>(null)
  const dragStartX = useRef<number | null>(null)
  const dragged = useRef(false)

  const clearHold = () => {
    if (holdTimer.current != null) {
      window.clearTimeout(holdTimer.current)
      holdTimer.current = null
    }
  }

  const scheduleCollapse = () => {
    clearHold()
    holdTimer.current = window.setTimeout(() => {
      setPhase("rest")
      holdTimer.current = null
    }, HOLD_MS)
  }

  useEffect(() => {
    setMounted(true)
    if (sessionAlreadyPlayed()) return

    const start = window.setTimeout(() => setPhase("intro"), 400)
    const toRest = window.setTimeout(() => {
      setPhase("rest")
      markSessionPlayed()
    }, 400 + HOLD_MS)

    return () => {
      window.clearTimeout(start)
      window.clearTimeout(toRest)
      clearHold()
    }
  }, [])

  useEffect(() => () => clearHold(), [])

  const expand = () => {
    setPhase("expanded")
    markSessionPlayed()
    scheduleCollapse()
  }

  const onClick = () => {
    if (dragged.current) {
      dragged.current = false
      return
    }
    if (phase === "rest" || phase === "intro") {
      expand()
      return
    }
    toggle()
    scheduleCollapse()
  }

  const onPointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    dragStartX.current = event.clientX
    dragged.current = false
  }

  const onPointerUp = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const start = dragStartX.current
    dragStartX.current = null
    if (start == null) return
    const dx = event.clientX - start
    if (dx < -12 && (phase === "rest" || phase === "intro")) {
      dragged.current = true
      expand()
    }
  }

  if (!mounted) return null

  const x = phase === "expanded" || phase === "intro" ? 0 : PEEK_X

  return (
    <m.button
      type="button"
      onClick={onClick}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => {
        dragStartX.current = null
      }}
      aria-label={isDark ? "Включить светлую тему" : "Включить тёмную тему"}
      initial={{ x: PEEK_X }}
      animate={{ x }}
      transition={{
        type: "spring",
        stiffness: 170,
        damping: 13,
        mass: 1.15,
      }}
      className={cn(
        "fixed right-0 z-[55] grid size-11 place-items-center rounded-[var(--r-md)]",
        "border border-transparent bg-surface text-fg",
        /* Light: тёмная тень; dark: светлая (контраст к canvas). */
        "shadow-[0_4px_14px_-2px_rgba(23,18,14,0.38),0_2px_6px_rgba(23,18,14,0.16)]",
        "dark:shadow-[0_4px_18px_-2px_rgba(255,255,255,0.28),0_2px_8px_rgba(255,255,255,0.14)]",
        "bottom-[calc(68px+env(safe-area-inset-bottom)+12px)] lg:hidden",
        "cursor-pointer touch-manipulation select-none",
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
    </m.button>
  )
}
