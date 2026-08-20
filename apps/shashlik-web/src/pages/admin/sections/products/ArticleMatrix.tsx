import { useAddons } from "@/entities/addon/api"
import { useAdminProducts, useFrontpadStockArticles } from "@/entities/product/api"
import {
  ARTICLE_PATTERN,
  articleConflictMessage,
} from "@/entities/product/lib/articles"
import type { ProductSize, ProductVariant } from "@/entities/product/model"
import { cn } from "@/shared/lib/cn"
import { Input } from "@/shared/ui/input"

type Props = {
  productId?: string
  variants: ProductVariant[]
  sizes: ProductSize[]
  onChange: (sizes: ProductSize[]) => void
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

export function ArticleMatrix({ productId, variants, sizes, onChange, disabled }: Props) {
  const { data: products = [] } = useAdminProducts()
  const { data: addons = [] } = useAddons()
  const { data: stock } = useFrontpadStockArticles()

  if (!sizes.length) {
    return (
      <p className="text-[12.5px] text-fg-muted">
        Добавьте хотя бы один размер — появятся ячейки артикулов.
      </p>
    )
  }

  const cols = variants.length ? variants : [null]

  return (
    <div className="overflow-x-auto rounded-[var(--r-md)] border border-line">
      <table className="w-full min-w-[320px] border-collapse text-left">
        <thead>
          <tr className="border-b border-line bg-surface-3">
            <th className="px-3 py-2 text-[11px] font-bold text-fg-muted">Вариант \ размер</th>
            {sizes.map((size) => (
              <th key={size.id} className="px-3 py-2 text-[11px] font-bold text-fg-muted">
                {size.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cols.map((variant) => (
            <tr key={variant?.id ?? "base"} className="border-b border-line last:border-0">
              <td className="px-3 py-2 text-[12px] font-bold text-fg">
                {variant?.label ?? "Без варианта"}
              </td>
              {sizes.map((size) => {
                const value = cellArticle(size, variant?.id ?? null)
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
                          "h-9 font-mono text-[12.5px] tabular-nums",
                          error && "border-red focus:border-red",
                        )}
                        onChange={(e) =>
                          onChange(
                            setCellArticle(
                              sizes,
                              size.id,
                              variant?.id ?? null,
                              e.target.value,
                            ),
                          )
                        }
                      />
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
