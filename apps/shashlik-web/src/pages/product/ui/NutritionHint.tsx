import { useEffect, useRef, useState, type MouseEvent } from "react"

import type { ProductNutrition } from "@/entities/product/model"
import { useMediaQuery } from "@/shared/hooks/useMediaQuery"
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover"

function formatGrams(value: number): string {
  return Number.isInteger(value) ? `${value}` : value.toFixed(1).replace(".", ",")
}

/** Иконка kcal: hover (ПК) и click/тач (мобилки) → пищевая ценность на порцию. */
export function NutritionHint({
  nutrition,
  portionLabel = "100 г",
}: {
  nutrition: ProductNutrition
  portionLabel?: string
}) {
  const [open, setOpen] = useState(false)
  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)")
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

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
    if (canHover) {
      e.preventDefault()
    }
  }

  return (
    <Popover modal={false} open={open} onOpenChange={(next) => !canHover && setOpen(next)}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={`Пищевая ценность на ${portionLabel}`}
          aria-expanded={open}
          className="nutrition-hint group/kcal relative z-20 ml-[0.16em] inline-flex shrink-0 cursor-pointer items-center justify-center"
          onClick={onTriggerClick}
          onPointerEnter={onHoverEnter}
          onPointerLeave={scheduleLeave}
        >
          <span
            className={
              open
                ? "nutrition-hint-glyph bg-brand scale-[1.06]"
                : "nutrition-hint-glyph bg-fg-muted group-hover/kcal:bg-brand group-hover/kcal:scale-[1.06]"
            }
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="start"
        className="z-[500] max-w-none min-w-52 p-3"
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
        onPointerEnter={onHoverEnter}
        onPointerLeave={scheduleLeave}
        onInteractOutside={() => setOpen(false)}
      >
        <p className="mb-2 text-[11px] font-extrabold tracking-[0.04em] text-fg">
          Пищевая ценность на {portionLabel}
        </p>
        <ul className="flex flex-col gap-1">
          <NutRow label="Энерг. ценность" value={`${Math.round(nutrition.kcal)} ккал`} />
          <NutRow label="Жиры" value={`${formatGrams(nutrition.fat)} г`} />
          <NutRow label="Белки" value={`${formatGrams(nutrition.protein)} г`} />
          <NutRow label="Углеводы" value={`${formatGrams(nutrition.carbs)} г`} />
        </ul>
      </PopoverContent>
    </Popover>
  )
}

function NutRow({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex items-baseline justify-between gap-6">
      <span className="text-[11.5px] font-medium text-fg-muted">{label}</span>
      <span className="text-[12px] font-extrabold tabular-nums text-fg">{value}</span>
    </li>
  )
}
