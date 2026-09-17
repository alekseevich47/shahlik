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
/** Шестерёнка за правым краем (полностью скрыта). */
const GEAR_HIDDEN = BTN + 8
/** Половинка шестерёнки слева от темы (themeOpen). */
const GEAR_PEEK = -(BTN / 2)
/** Шестерёнка полностью слева от темы (fullOpen). */
const GEAR_OPEN = -(BTN + GAP)

/** reveal: 0 rest → 0.5 theme+half gear → 1 full strip */
type Phase = "rest" | "intro" | "themeOpen" | "fullOpen"

function phaseToReveal(phase: Phase): number {
  if (phase === "fullOpen") return 1
  if (phase === "themeOpen" || phase === "intro") return 0.5
  return 0
}

function revealToPhase(reveal: number): Phase {
  if (reveal >= 0.75) return "fullOpen"
  if (reveal >= 0.25) return "themeOpen"
  return "rest"
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function positionsForReveal(reveal: number) {
  const t = Math.min(Math.max(reveal, 0), 1)
  const themeX = lerp(PEEK_THEME, 0, Math.min(t / 0.5, 1))
  const gearX =
    t <= 0.5
      ? lerp(GEAR_HIDDEN, GEAR_PEEK, t / 0.5)
      : lerp(GEAR_PEEK, GEAR_OPEN, (t - 0.5) / 0.5)
  const gearVisible = t > 0.08
  return { themeX, gearX, gearVisible }
}

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
 * Mobile: полоска тема+шестерёнка у правого края.
 * Rest → half-peek темы; tap/drag → полная тема + half-peek шестерёнки;
 * дальше drag → полная шестерёнка. Можно тянуть полоску тачем.
 */
export function ThemePeekButton({ className }: { className?: string }) {
  const { theme, toggle } = useTheme()
  const isDark = theme === "dark"
  const [phase, setPhase] = useState<Phase>("rest")
  const [dragReveal, setDragReveal] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const holdTimer = useRef<number | null>(null)
  const dragStartX = useRef<number | null>(null)
  const dragOriginReveal = useRef(0)
  const dragRevealRef = useRef<number | null>(null)
  const dragged = useRef(false)
  const phaseRef = useRef(phase)
  phaseRef.current = phase
  dragRevealRef.current = dragReveal

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
      if (current === "themeOpen" || current === "intro") {
        setPhase("rest")
      }
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
    if (phase !== "fullOpen") {
      // half-peek: дотянуть до full, не открывать настройки
      if (phase === "themeOpen" || phase === "intro") openFull()
      return
    }
    setSettingsOpen(true)
    scheduleCollapse()
  }

  const onPointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    dragStartX.current = event.clientX
    dragOriginReveal.current = phaseToReveal(phaseRef.current)
    dragged.current = false
    clearHold()
    event.currentTarget.setPointerCapture?.(event.pointerId)
  }

  const onPointerMove = (event: ReactPointerEvent) => {
    const start = dragStartX.current
    if (start == null) return
    const dx = event.clientX - start
    if (Math.abs(dx) < 6 && !dragged.current) return
    dragged.current = true
    // тянем влево → больше reveal
    const next = Math.min(Math.max(dragOriginReveal.current + -dx / 72, 0), 1)
    setDragReveal(next)
  }

  const onPointerUp = () => {
    dragStartX.current = null
    const live = dragRevealRef.current
    if (live != null) {
      const nextPhase = revealToPhase(live)
      setDragReveal(null)
      dragRevealRef.current = null
      setPhase(nextPhase)
      markSessionPlayed()
      if (nextPhase !== "rest") scheduleCollapse()
      return
    }
    scheduleCollapse()
  }

  const onPointerCancel = () => {
    dragStartX.current = null
    setDragReveal(null)
  }

  if (!mounted) return null

  const reveal = dragReveal ?? phaseToReveal(phase)
  const { themeX, gearX, gearVisible } = positionsForReveal(reveal)
  const stripWide = reveal > 0.2

  return (
    <>
      <div
        className={cn(
          "pointer-events-none fixed right-0 z-[55] h-11 overflow-visible",
          "bottom-[calc(68px+env(safe-area-inset-bottom)+12px)] lg:hidden",
          stripWide ? "w-[96px]" : "w-11",
          className,
        )}
      >
        <m.button
          type="button"
          onClick={onGearClick}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
          aria-label="Настройки отображения"
          aria-hidden={!gearVisible}
          tabIndex={gearVisible ? 0 : -1}
          initial={false}
          animate={{
            x: gearX,
            opacity: gearVisible ? 1 : 0,
            visibility: gearVisible ? ("visible" as const) : ("hidden" as const),
          }}
          transition={dragReveal != null ? { duration: 0 } : SPRING}
          className={cn(
            "absolute top-0 right-0 grid size-11 place-items-center rounded-[var(--r-md)]",
            "border border-transparent bg-surface text-fg",
            BTN_SHADOW,
            "touch-manipulation select-none",
            gearVisible ? "pointer-events-auto cursor-pointer" : "pointer-events-none",
          )}
        >
          <Settings size={18} strokeWidth={2.2} />
        </m.button>

        <m.button
          type="button"
          onClick={onThemeClick}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
          aria-label={isDark ? "Включить светлую тему" : "Включить тёмную тему"}
          initial={false}
          animate={{ x: themeX }}
          transition={dragReveal != null ? { duration: 0 } : SPRING}
          className={cn(
            "pointer-events-auto absolute top-0 right-0 z-10 grid size-11 place-items-center rounded-[var(--r-md)]",
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
      </div>

      <DisplaySettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
    </>
  )
}
