import { useAddons } from "@/entities/addon/api"
import { useAdminProducts, useFrontpadStockArticles } from "@/entities/product/api"
import { priceOf } from "@/entities/product/lib"
import {
  ARTICLE_PATTERN,
  articleConflictMessage,
} from "@/entities/product/lib/articles"
import { roundPrice } from "@/entities/product/lib/prices"
import type { ProductSize, ProductVariant } from "@/entities/product/model"
import { cn } from "@/shared/lib/cn"
import { Input } from "@/shared/ui/input"

type Props = {
  productId?: string
  variants: ProductVariant[]
  sizes: ProductSize[]
  onSizesChange: (sizes: ProductSize[]) => void
  onVariantsChange: (variants: ProductVariant[]) => void
  disabled?: boolean
}

function setCellArticle(
  sizes: ProductSize[],
  sizeId: string,
  variantId: string | null,
  article: string,
): ProductSize[] {
  const digits = article.replace(/\D/g, "")
  return sizes.map((size) => {
    if (size.id !== sizeId) return size
    if (!variantId) {
      return { ...size, article: digits || undefined }
    }
    const next = { ...(size.articleByVariant ?? {}) }
    if (!digits) delete next[variantId]
    else next[variantId] = digits
    const keys = Object.keys(next)
    return {
      ...size,
      articleByVariant: keys.length ? next : undefined,
    }
  })
}

function cellArticle(size: ProductSize, variantId: string | null): string {
  if (variantId) {
    return size.articleByVariant?.[variantId] ?? size.article ?? ""
  }
  return size.article ?? ""
}

/** Запись финальной цены SKU обратно в size.price + variant.priceDelta (как cash-sync). */
function applySkuPrice(
  sizes: ProductSize[],
  variants: ProductVariant[],
  sizeId: string,
  variantId: string | null,
  raw: string,
): { sizes: ProductSize[]; variants: ProductVariant[] } {
  const parsed = Number(raw.replace(",", "."))
  const value = Number.isFinite(parsed) && parsed >= 0 ? roundPrice(parsed) : 0

  if (!variants.length || !variantId) {
    return {
      sizes: sizes.map((size) => (size.id === sizeId ? { ...size, price: value } : size)),
      variants,
    }
  }

  const base = variants[0]
  const size = sizes.find((s) => s.id === sizeId)
  if (!size) return { sizes, variants }

  if (variantId === base.id) {
    return {
      sizes: sizes.map((s) =>
        s.id === sizeId ? { ...s, price: value - base.priceDelta } : s,
      ),
      variants,
    }
  }

  return {
    sizes,
    variants: variants.map((v) =>
      v.id === variantId ? { ...v, priceDelta: value - size.price } : v,
    ),
  }
}

export function ArticleMatrix({
  productId,
  variants,
  sizes,
  onSizesChange,
  onVariantsChange,
  disabled,
}: Props) {
  const { data: products = [] } = useAdminProducts()
  const { data: addons = [] } = useAddons()
  const { data: stock } = useFrontpadStockArticles()

  if (!sizes.length) {
    return (
      <p className="text-[12.5px] text-fg-muted">
        Добавьте хотя бы один размер — появятся ячейки артикулов и цен.
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
                  "px-3 py-2 text-[11px] font-bold whitespace-nowrap text-fg-muted",
                  scrollSizes && "min-w-[200px]",
                )}
              >
                {size.label}
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
                const value = cellArticle(size, variant?.id ?? null)
                const skuPrice = priceOf(size, variant ?? undefined)
                const formatOk = !value || ARTICLE_PATTERN.test(value)
                const conflict =
                  value && formatOk
                    ? articleConflictMessage(value, products, addons, {
                        productId,
                        sizeId: size.id,
                        variantId: variant?.id ?? null,
                      })
                    : null
                const inStock = !value || !stock || stock.has(value)
                const error = !formatOk
                  ? "Только цифры"
                  : conflict
                    ? conflict
                    : value && stock && !inStock
                      ? "Нет в кассе (frontpad_stock)"
                      : null

                return (
                  <td key={size.id} className="px-2 py-2 align-top">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-start gap-1.5">
                        <Input
                          value={value}
                          disabled={disabled}
                          inputMode="numeric"
                          maxLength={32}
                          placeholder={
                            variant && size.article ? `← ${size.article}` : "артикул"
                          }
                          aria-invalid={Boolean(error)}
                          aria-label={`Артикул ${variant?.label ?? "база"} ${size.label}`}
                          className={cn(
                            "h-9 min-w-0 flex-1 font-mono text-[12.5px] tabular-nums",
                            error && "border-red focus:border-red",
                          )}
                          onChange={(e) =>
                            onSizesChange(
                              setCellArticle(
                                sizes,
                                size.id,
                                variant?.id ?? null,
                                e.target.value,
                              ),
                            )
                          }
                        />
                        <Input
                          value={String(skuPrice)}
                          disabled={disabled}
                          inputMode="decimal"
                          maxLength={8}
                          placeholder="₽"
                          aria-label={`Цена ${variant?.label ?? "база"} ${size.label}`}
                          className="h-9 w-[72px] shrink-0 text-[12.5px] tabular-nums"
                          onChange={(e) => {
                            const next = applySkuPrice(
                              sizes,
                              variants,
                              size.id,
                              variant?.id ?? null,
                              e.target.value.replace(/[^\d.,]/g, ""),
                            )
                            onSizesChange(next.sizes)
                            if (next.variants !== variants) onVariantsChange(next.variants)
                          }}
                        />
                      </div>
                      {error ? (
                        <p className="text-[10px] leading-tight font-semibold text-red">{error}</p>
                      ) : null}
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
