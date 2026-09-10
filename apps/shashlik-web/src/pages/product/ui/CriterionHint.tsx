import { useEffect, useRef, useState, type MouseEvent } from "react"

import type { RatingCriterion } from "@/entities/product/model"
import { normalizeDistribution } from "@/entities/product/model"
import { useMediaQuery } from "@/shared/hooks/useMediaQuery"
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover"
import { StarsOutlineRow } from "@/shared/ui/rating"

/** Попап критерия: hint + гистограмма 0…5 звёзд (как NutritionHint). */
export function CriterionHint({ criterion }: { criterion: RatingCriterion }) {
  const [open, setOpen] = useState(false)
  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)")
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const distribution = normalizeDistribution(criterion.distribution)

  useEffect(() => {
    return () => {
      if (leaveTimer.current) clearTimeout(leaveTimer.current)
    }
  }, [])

  const cancelLeave = () => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current)
      leaveTimer.current = null
    }
  }

  const scheduleLeave = () => {
    if (!canHover) return
    cancelLeave()
    leaveTimer.current = setTimeout(() => setOpen(false), 120)
  }

  const onHoverEnter = () => {
    if (!canHover) return
    cancelLeave()
    setOpen(true)
  }

  const onTriggerClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (canHover) e.preventDefault()
  }

  return (
    <Popover modal={false} open={open} onOpenChange={(next) => !canHover && setOpen(next)}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={criterion.hint || criterion.label}
          aria-expanded={open}
          className="grid size-[15px] cursor-pointer place-items-center rounded-full border border-line text-[9px] font-extrabold text-fg-faint transition-colors hover:border-brand-border hover:text-brand"
          onClick={onTriggerClick}
          onPointerEnter={onHoverEnter}
          onPointerLeave={scheduleLeave}
        >
          ?
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="start"
        className="z-[500] max-w-none min-w-56 p-3"
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
        onPointerEnter={onHoverEnter}
        onPointerLeave={scheduleLeave}
        onInteractOutside={() => setOpen(false)}
      >
        <p className="mb-2 text-[11px] font-extrabold tracking-[0.04em] text-fg">
          {criterion.label}
        </p>
        {criterion.hint ? (
          <p className="mb-2.5 text-[11.5px] leading-[1.45] text-fg-muted">{criterion.hint}</p>
        ) : null}
        <ul className="flex flex-col gap-1.5">
          {[5, 4, 3, 2, 1, 0].map((stars) => (
            <li key={stars} className="flex items-center justify-between gap-4">
              <StarsOutlineRow filled={stars} />
              <span className="text-[12px] font-extrabold tabular-nums text-fg">
                {distribution[stars] ?? 0}
              </span>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  )
}
