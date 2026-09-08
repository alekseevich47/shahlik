import { Link } from "react-router-dom"

import { BONUS_REASON_LABEL } from "../model"

type BonusHistoryRow = {
  reason: string
  refType?: string
  refId?: string
  orderNumber?: string
}

/** Подпись строки истории бонусов в профиле. */
export function BonusHistoryReason({ row }: { row: BonusHistoryRow }) {
  if (row.reason === "order_spend") {
    const num = row.orderNumber?.trim() || (row.refId ? row.refId.slice(0, 8) : "")
    return (
      <>
        Оплата за заказ №
        {row.refId ? (
          <Link
            to={`/order/${row.refId}`}
            className="font-semibold text-brand underline-offset-2 hover:underline"
          >
            {num || "…"}
          </Link>
        ) : (
          <span>{num || "заказ"}</span>
        )}
      </>
    )
  }

  return <>{BONUS_REASON_LABEL[row.reason] ?? row.reason}</>
}
