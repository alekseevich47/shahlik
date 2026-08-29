import type { ProductSize, ProductVariant } from "@/entities/product/model"
import {
  cellNutrition,
  NUTRITION_FIELDS,
  setCellNutrition,
} from "@/entities/product/lib/nutrition-matrix"
import { cn } from "@/shared/lib/cn"
import { Input } from "@/shared/ui/input"

type Props = {
  variants: ProductVariant[]
  sizes: ProductSize[]
  onSizesChange: (sizes: ProductSize[]) => void
  disabled?: boolean
}

export function NutritionMatrix({ variants, sizes, onSizesChange, disabled }: Props) {
  if (!sizes.length) {
    return (
      <p className="text-[12.5px] text-fg-muted">
        Добавьте размер — появится матрица КБЖУ (на 100 г) по вариантам.
      </p>
    )
  }

  const cols = variants.length ? variants : [null]
  const scrollSizes = sizes.length > 3

  return (
    <div
      className={cn(
        "rounded-[var(--r-md)] border border-line",
        scrollSizes ? "overflow-x-auto overscroll-x-contain" : "overflow-x-auto",
      )}
    >
      <table
        className={cn(
          "w-full border-collapse text-left",
          scrollSizes ? "min-w-max" : "min-w-[320px]",
        )}
      >
        <thead>
          <tr className="border-b border-line bg-surface-3">
            <th
              className={cn(
                "px-3 py-2 text-[11px] font-bold text-fg-muted",
                scrollSizes && "sticky left-0 z-20 bg-surface-3 shadow-[2px_0_0_0_var(--line)]",
              )}
            >
              Вариант \ размер
            </th>
            {sizes.map((size) => (
              <th
                key={size.id}
                className={cn(
                  "px-2 py-2 text-[11px] font-bold whitespace-nowrap text-fg-muted",
                  scrollSizes && "min-w-[168px]",
                )}
              >
                {size.label}
                {size.weight ? (
                  <span className="ml-1 font-normal text-fg-faint">({size.weight})</span>
                ) : null}
                <span className="mt-0.5 block text-[10px] font-normal text-fg-faint">
                  на 100 г
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cols.map((variant) => (
            <tr key={variant?.id ?? "base"} className="border-b border-line last:border-0">
              <td
                className={cn(
                  "bg-surface px-3 py-2 text-[12px] font-bold whitespace-nowrap text-fg",
                  scrollSizes && "sticky left-0 z-10 shadow-[2px_0_0_0_var(--line)]",
                )}
              >
                {variant?.label ?? "Без варианта"}
              </td>
              {sizes.map((size) => {
                const values = cellNutrition(size, variant?.id ?? null)
                return (
                  <td key={size.id} className="px-2 py-2 align-top">
                    <div className="grid grid-cols-2 gap-1">
                      {NUTRITION_FIELDS.map(([key, label]) => (
                        <label key={key} className="flex flex-col gap-0.5">
                          <span className="text-[9px] font-bold text-fg-faint">{label}</span>
                          <Input
                            value={String(values[key])}
                            disabled={disabled}
                            inputMode="decimal"
                            maxLength={8}
                            aria-label={`${label} ${variant?.label ?? "база"} ${size.label}`}
                            className="h-8 px-1.5 text-[11px] tabular-nums"
                            onChange={(e) =>
                              onSizesChange(
                                setCellNutrition(
                                  sizes,
                                  size.id,
                                  variant?.id ?? null,
                                  key,
                                  e.target.value.replace(/[^\d.,]/g, ""),
                                ),
                              )
                            }
                          />
                        </label>
                      ))}
                    </div>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
