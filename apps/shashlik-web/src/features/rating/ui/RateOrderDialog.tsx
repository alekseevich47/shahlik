import { useEffect, useMemo, useState } from "react"
import { toast } from "sonner"

import { useProducts } from "@/entities/product/api"
import { DEFAULT_CRITERIA } from "@/entities/product/model"
import type { Order, OrderLineSnapshot } from "@/entities/order/model"
import {
  ratingSubmitError,
  useOrderRatedProducts,
  useSubmitProductRating,
  type CriteriaScores,
} from "@/features/rating/api"
import { useAccount } from "@/entities/account/api"
import { Button } from "@/shared/ui/button"
import { Modal, ModalDescription, ModalTitle } from "@/shared/ui/modal"
import { Stars } from "@/shared/ui/rating"
import { ThemeAwareImage } from "@/shared/ui/theme-aware-image"

function uniqueProductLines(lines: OrderLineSnapshot[]): OrderLineSnapshot[] {
  const seen = new Set<string>()
  const out: OrderLineSnapshot[] = []
  for (const line of lines) {
    if (!line.productId || seen.has(line.productId)) continue
    seen.add(line.productId)
    out.push(line)
  }
  return out
}

function emptyScores(): CriteriaScores {
  return Object.fromEntries(DEFAULT_CRITERIA.map((c) => [c.id, 0]))
}

type Props = {
  order: Order
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function RateOrderDialog({ order, open, onOpenChange }: Props) {
  const account = useAccount()
  const { data: products = [] } = useProducts()
  const { data: ratedIds = [], isLoading: ratedLoading } = useOrderRatedProducts(
    order.id,
    open && Boolean(account),
  )
  const submit = useSubmitProductRating()
  const lines = useMemo(() => uniqueProductLines(order.lines), [order.lines])
  const pending = useMemo(
    () => lines.filter((l) => !ratedIds.includes(l.productId)),
    [lines, ratedIds],
  )

  const [activeProductId, setActiveProductId] = useState<string | null>(null)
  const [scores, setScores] = useState<CriteriaScores>(emptyScores)

  useEffect(() => {
    if (!open) return
    setActiveProductId(pending[0]?.productId ?? null)
    setScores(emptyScores())
  }, [open, pending])

  const activeLine = pending.find((l) => l.productId === activeProductId) ?? pending[0]
  const product = products.find((p) => p.id === activeLine?.productId)

  const canSubmit =
    Boolean(activeLine) &&
    DEFAULT_CRITERIA.every((c) => {
      const v = scores[c.id]
      return Number.isInteger(v) && v >= 0 && v <= 5
    })

  const onSubmit = async () => {
    if (!activeLine || !account) {
      toast.error("Войдите в аккаунт, чтобы оценить заказ")
      return
    }
    try {
      await submit.mutateAsync({
        orderId: order.id,
        productId: activeLine.productId,
        criteria: scores,
      })
      toast.success(`«${activeLine.name}» оценён`)
      const rest = pending.filter((l) => l.productId !== activeLine.productId)
      if (rest.length === 0) {
        onOpenChange(false)
        return
      }
      setActiveProductId(rest[0].productId)
      setScores(emptyScores())
    } catch (err) {
      toast.error(ratingSubmitError(err))
    }
  }

  return (
    <Modal open={open} onOpenChange={onOpenChange} className="w-[min(480px,calc(100vw-2rem))]">
      <div className="flex flex-col gap-4 p-5 sm:p-6">
        <div className="pr-8">
          <ModalTitle className="text-[20px] font-extrabold text-fg">Оценить заказ</ModalTitle>
          <ModalDescription className="mt-1 text-[12.5px] text-fg-muted">
            Заказ {order.number || order.id.slice(0, 8)}. Оценка только по критериям, от 0 до 5★.
          </ModalDescription>
        </div>

        {!account ? (
          <p className="rounded-[var(--r-md)] border border-dashed border-line px-3 py-4 text-[13px] font-semibold text-fg-muted">
            Войдите в профиль, чтобы оставить оценку.
          </p>
        ) : ratedLoading ? (
          <div className="grid place-items-center py-10">
            <span className="size-7 animate-spin rounded-full border-2 border-line border-t-brand" />
          </div>
        ) : pending.length === 0 ? (
          <p className="rounded-[var(--r-md)] border border-dashed border-line px-3 py-4 text-[13px] font-semibold text-fg-muted">
            Все товары из заказа уже оценены. Спасибо!
          </p>
        ) : (
          <>
            {pending.length > 1 ? (
              <div className="scrollbar-none flex gap-2 overflow-x-auto">
                {pending.map((line) => {
                  const active = line.productId === activeLine?.productId
                  return (
                    <button
                      key={line.productId}
                      type="button"
                      onClick={() => {
                        setActiveProductId(line.productId)
                        setScores(emptyScores())
                      }}
                      className={
                        active
                          ? "shrink-0 rounded-[var(--r-sm)] border border-brand-border bg-brand-soft px-3 py-1.5 text-[12px] font-bold text-brand"
                          : "shrink-0 rounded-[var(--r-sm)] border border-line bg-surface px-3 py-1.5 text-[12px] font-bold text-fg-muted"
                      }
                    >
                      {line.name}
                    </button>
                  )
                })}
              </div>
            ) : null}

            {activeLine ? (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  {product ? (
                    <div className="size-14 shrink-0 overflow-hidden rounded-[var(--r-md)] bg-surface-3">
                      <ThemeAwareImage
                        lightSrc={product.image}
                        darkSrc={product.imagesDark[0]}
                        alt=""
                        className="size-full object-cover"
                      />
                    </div>
                  ) : null}
                  <div className="min-w-0">
                    <p className="truncate text-[15px] font-extrabold text-fg">{activeLine.name}</p>
                    <p className="text-[11px] text-fg-muted">
                      {[activeLine.variantLabel, activeLine.sizeLabel].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                </div>

                <ul className="flex flex-col gap-3">
                  {DEFAULT_CRITERIA.map((criterion) => (
                    <li key={criterion.id} className="flex items-center justify-between gap-3">
                      <span className="text-[13px] font-semibold text-fg-soft">{criterion.label}</span>
                      <Stars
                        value={scores[criterion.id] ?? 0}
                        interactive
                        size={22}
                        onChange={(next) =>
                          setScores((prev) => ({ ...prev, [criterion.id]: next }))
                        }
                      />
                    </li>
                  ))}
                </ul>

                <Button
                  type="button"
                  variant="brand"
                  block
                  disabled={!canSubmit || submit.isPending}
                  onClick={() => void onSubmit()}
                >
                  {submit.isPending ? "Отправка…" : "Отправить оценку"}
                </Button>
              </div>
            ) : null}
          </>
        )}
      </div>
    </Modal>
  )
}
