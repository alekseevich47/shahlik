import type { ProductNutrition } from "@/entities/product/model"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip"

function formatGrams(value: number): string {
  return Number.isInteger(value) ? `${value}` : value.toFixed(1).replace(".", ",")
}

/** Иконка kcal справа от названия (~0.92lh заголовка) — пищевая ценность на 100 г. */
export function NutritionHint({ nutrition }: { nutrition: ProductNutrition }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label="Пищевая ценность на 100 г"
          className="nutrition-hint group/kcal relative ml-[0.16em] inline-flex shrink-0 cursor-help items-center justify-center"
        >
          <span className="nutrition-hint-glyph bg-fg-muted group-hover/kcal:bg-brand group-hover/kcal:scale-[1.06]" />
        </button>
      </TooltipTrigger>
      <TooltipContent side="bottom" align="start" className="max-w-none min-w-52 p-3">
        <p className="mb-2 text-[11px] font-extrabold tracking-[0.04em] text-fg">
          Пищевая ценность на 100 г
        </p>
        <ul className="flex flex-col gap-1">
          <NutRow label="Энерг. ценность" value={`${Math.round(nutrition.kcal)} ккал`} />
          <NutRow label="Жиры" value={`${formatGrams(nutrition.fat)} г`} />
          <NutRow label="Белки" value={`${formatGrams(nutrition.protein)} г`} />
          <NutRow label="Углеводы" value={`${formatGrams(nutrition.carbs)} г`} />
        </ul>
      </TooltipContent>
    </Tooltip>
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
