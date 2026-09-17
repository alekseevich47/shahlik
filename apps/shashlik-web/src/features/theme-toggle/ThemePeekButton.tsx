import { Moon, Settings, Sun } from "lucide-react"
import * as m from "motion/react-m"
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react"

import { useTheme } from "@/app/providers/theme"
import { cn } from "@/shared/lib/cn"

import { DisplaySettingsModal } from "./DisplaySettingsModal"

const SESSION_KEY = "shashlik:theme-peek:v1"
const HOLD_MS = 3000
const BTN = 44
const GAP = 8
/** Half-peek темы из правого края. */
const PEEK_THEME = 22
/** Шестерёнка в rest почти за краем. */
const PEEK_GEAR_REST = BTN + 4
/** В themeOpen шестерёнка чуть видна. */
const PEEK_GEAR_SLIGHT = 30

type Phase = "rest" | "intro" | "themeOpen" | "fullOpen"

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

const BTN_SHADOW =
  "shadow-[0_4px_14px_-2px_rgba(23,18,14,0.38),0_2px_6px_rgba(23,18,14,0.16)] dark:shadow-[0_4px_18px_-2px_rgba(255,255,255,0.28),0_2px_8px_rgba(255,255,255,0.14)]"

const SPRING = {
  type: "spring" as const,
  stiffness: 170,
  damping: 13,
  mass: 1.15,
}

/**
 * Mobile: рейка справа над TabBar — тема + настройки.
 * Rest: half-peek темы; tap/drag → тема + чуть шестерёнка; тянуть дальше → обе;
 * idle: full → themeOpen → rest (bounce).
 */
export function ThemePeekButton({ className }: { className?: string }) {
  const { theme, toggle } = useTheme()
  const isDark = theme === "dark"
  const [phase, setPhase] = useState<Phase>("rest")
  const [mounted, setMounted] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const holdTimer = useRef<number | null>(null)
  const dragStartX = useRef<number | null>(null)
  const dragged = useRef(false)
  const phaseRef = useRef(phase)
  phaseRef.current = phase

  const clearHold = () => {
    if (holdTimer.current != null) {
      window.clearTimeout(holdTimer.current)
      holdTimer.current = null
    }
  }

  const scheduleCollapse = () => {
    clearHold()
    holdTimer.current = window.setTimeout(() => {
      const current = phaseRef.current
      if (current === "fullOpen") {
        setPhase("themeOpen")
        holdTimer.current = window.setTimeout(() => {
          setPhase("rest")
          holdTimer.current = null
        }, HOLD_MS)
        return
      }
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

  const openTheme = () => {
    setPhase("themeOpen")
    markSessionPlayed()
    scheduleCollapse()
  }

  const openFull = () => {
    setPhase("fullOpen")
    markSessionPlayed()
    scheduleCollapse()
  }

  const onThemeClick = () => {
    if (dragged.current) {
      dragged.current = false
      return
    }
    if (phase === "rest" || phase === "intro") {
      openTheme()
      return
    }
    toggle()
    scheduleCollapse()
  }

  const onGearClick = () => {
    if (dragged.current) {
      dragged.current = false
      return
    }
    if (phase === "rest" || phase === "intro") {
      openTheme()
      return
    }
    setSettingsOpen(true)
    scheduleCollapse()
  }

  const onPointerDown = (event: ReactPointerEvent) => {
    dragStartX.current = event.clientX
    dragged.current = false
  }

  const onPointerUp = (event: ReactPointerEvent) => {
    const start = dragStartX.current
    dragStartX.current = null
    if (start == null) return
    const dx = event.clientX - start
    if (dx >= -12) return

    dragged.current = true
    if (phase === "rest" || phase === "intro") {
      openTheme()
      return
    }
    if (phase === "themeOpen" && dx < -28) {
      openFull()
    }
  }

  if (!mounted) return null

  const themeX =
    phase === "fullOpen" || phase === "themeOpen" || phase === "intro" ? 0 : PEEK_THEME
  const gearX =
    phase === "fullOpen"
      ? 0
      : phase === "themeOpen" || phase === "intro"
        ? PEEK_GEAR_SLIGHT
        : PEEK_GEAR_REST

  const railWidth = BTN * 2 + GAP

  return (
    <>
      <div
        className={cn(
          "pointer-events-none fixed right-0 z-[55] flex flex-row-reverse items-center gap-2",
          "bottom-[calc(68px+env(safe-area-inset-bottom)+12px)] lg:hidden",
          className,
        )}
        style={{ width: railWidth }}
      >
        <m.button
          type="button"
          onClick={onThemeClick}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => {
            dragStartX.current = null
          }}
          aria-label={isDark ? "Включить светлую тему" : "Включить тёмную тему"}
          initial={{ x: PEEK_THEME }}
          animate={{ x: themeX }}
          transition={SPRING}
          className={cn(
            "pointer-events-auto grid size-11 place-items-center rounded-[var(--r-md)]",
            "border border-transparent bg-surface text-fg",
            BTN_SHADOW,
            "cursor-pointer touch-manipulation select-none",
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

        <m.button
          type="button"
          onClick={onGearClick}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => {
            dragStartX.current = null
          }}
          aria-label="Настройки отображения"
          initial={{ x: PEEK_GEAR_REST }}
          animate={{ x: gearX }}
          transition={SPRING}
          className={cn(
            "pointer-events-auto grid size-11 place-items-center rounded-[var(--r-md)]",
            "border border-transparent bg-surface text-fg",
            BTN_SHADOW,
            "cursor-pointer touch-manipulation select-none",
          )}
        >
          <Settings size={18} strokeWidth={2.2} />
        </m.button>
      </div>

      <DisplaySettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
    </>
  )
}
