import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"

import { useAccount } from "@/entities/account/api"
import type { Order } from "@/entities/order/model"
import { useOrderRatedProducts } from "@/features/rating/api"
import { RateOrderDialog } from "@/features/rating/ui/RateOrderDialog"
import { Button } from "@/shared/ui/button"

type Props = {
  order: Order
  /** Компактная кнопка для списка истории. */
  compact?: boolean
  className?: string
}

/** CTA «Оценить» для выполненного заказа с неоценёнными позициями. */
export function RateOrderButton({ order, compact, className }: Props) {
  const account = useAccount()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const enabled = order.status === "done" && Boolean(account)
  const { data: ratedIds = [], isLoading } = useOrderRatedProducts(order.id, enabled)

  const productIds = useMemo(() => {
    const set = new Set<string>()
    for (const line of order.lines) {
      if (line.productId) set.add(line.productId)
    }
    return [...set]
  }, [order.lines])

  const hasPending = productIds.some((id) => !ratedIds.includes(id))

  if (order.status !== "done") return null

  if (!account) {
    return (
      <Button
        type="button"
        variant={compact ? "outline" : "brand"}
        size={compact ? "sm" : undefined}
        block={!compact}
        className={className}
        onClick={() => navigate("/profile")}
      >
        Войти и оценить
      </Button>
    )
  }

  if (isLoading || !hasPending) return null

  return (
    <>
      <Button
        type="button"
        variant={compact ? "outline" : "brand"}
        size={compact ? "sm" : undefined}
        block={!compact}
        className={className}
        onClick={() => setOpen(true)}
      >
        Оценить
      </Button>
      <RateOrderDialog order={order} open={open} onOpenChange={setOpen} />
    </>
  )
}
