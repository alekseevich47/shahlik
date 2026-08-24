import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

import {
  orderJobKeys,
  orderKeys,
  useOrderJobs,
  useOrdersPage,
} from "@/entities/order/api"
import {
  ORDER_STATUS_LABEL,
  isFrontpadWarning,
  type Order,
  type OrderStatus,
} from "@/entities/order/model"
import { OrderDrawer } from "@/pages/admin/sections/orders/OrderDrawer"
import { DataTable, type Column } from "@/pages/admin/ui/DataTable"
import { EmptyState } from "@/pages/admin/ui/EmptyState"
import { SectionShell } from "@/pages/admin/ui/SectionShell"
import { SkeletonRows } from "@/pages/admin/ui/SkeletonRows"
import { Toolbar, type ToolbarFilter } from "@/pages/admin/ui/Toolbar"
import { useAdminAuth } from "@/shared/api/auth"
import { useCollectionRealtime } from "@/shared/api/realtime"
import { formatDateTime, formatPrice } from "@/shared/lib/format"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"

const PER_PAGE = 20

const STATUS_FILTERS: ToolbarFilter[] = [
  { id: "all", label: "Все" },
  { id: "new", label: "Новые" },
  { id: "cooking", label: "Готовятся" },
  { id: "delivering", label: "В доставке" },
  { id: "done", label: "Выполнены" },
  { id: "canceled", label: "Отменены" },
]

function statusFromSearch(value: string | null): OrderStatus | "all" {
  if (
    value === "new" ||
    value === "cooking" ||
    value === "delivering" ||
    value === "done" ||
    value === "canceled"
  ) {
    return value
  }
  return "all"
}

export function OrdersSection() {
  const { isAdmin } = useAdminAuth()
  const [searchParams, setSearchParams] = useSearchParams()
  const hasFrontpadError = searchParams.get("frontpadError") === "1"
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState<OrderStatus | "all">(() =>
    statusFromSearch(searchParams.get("status")),
  )
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<Order | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const params = {
    page,
    perPage: PER_PAGE,
    status,
    query,
    from: from || undefined,
    to: to || undefined,
    hasFrontpadError: hasFrontpadError || undefined,
  }

  const clearFrontpadErrorFilter = () => {
    const next = new URLSearchParams(searchParams)
    next.delete("frontpadError")
    setSearchParams(next, { replace: true })
    setPage(1)
  }

  const setStatusFilter = (next: OrderStatus | "all") => {
    setStatus(next)
    setPage(1)
    const paramsNext = new URLSearchParams(searchParams)
    if (next === "all") paramsNext.delete("status")
    else paramsNext.set("status", next)
    setSearchParams(paramsNext, { replace: true })
  }

  useEffect(() => {
    setStatus(statusFromSearch(searchParams.get("status")))
  }, [searchParams])

  const { data, isPending, isFetching } = useOrdersPage(params)
  useOrderJobs(isAdmin)
  useCollectionRealtime("orders", [orderKeys.all])
  useCollectionRealtime("frontpad_jobs", [orderJobKeys.all], isAdmin)

  const items = data?.items ?? []
  const totalPages = Math.max(1, data?.totalPages ?? 1)
  const totalItems = data?.totalItems ?? 0
  const safePage = Math.min(page, totalPages)

  const openOrder = (order: Order) => {
    setSelected(order)
    setDrawerOpen(true)
  }

  const columns: Column<Order>[] = [
    {
      key: "number",
      header: "Заказ",
      render: (row) => (
        <span className="flex flex-col leading-tight">
          <span className="font-bold text-fg">{row.number}</span>
          <span className="text-[10.5px] text-fg-faint">{formatDateTime(row.createdAt)}</span>
        </span>
      ),
    },
    {
      key: "customer",
      header: "Клиент",
      render: (row) => (
        <span className="flex flex-col leading-tight">
          <span className="font-semibold text-fg">{row.customer}</span>
          <span className="text-[11px] tabular-nums text-fg-muted">{row.phone}</span>
        </span>
      ),
    },
    {
      key: "mode",
      header: "Получение",
      render: (row) =>
        row.mode === "delivery" ? (
          <span className="line-clamp-2 max-w-[180px] text-[12px] text-fg-soft">
            {row.addressParts?.street
              ? `${row.addressParts.street}${row.addressParts.home ? `, ${row.addressParts.home}` : ""}`
              : row.address || "Доставка"}
          </span>
        ) : (
          "Самовывоз"
        ),
    },
    {
      key: "positions",
      header: "Поз.",
      className: "tabular-nums",
      render: (row) => row.positions,
    },
    {
      key: "total",
      header: "Сумма",
      className: "tabular-nums",
      render: (row) => formatPrice(row.total),
    },
    {
      key: "status",
      header: "Статус",
      render: (row) => (
        <span className="flex flex-col items-start gap-1">
          <Badge
            variant={
              row.status === "done" ? "success" : row.status === "canceled" ? "outline" : "soft"
            }
          >
            {ORDER_STATUS_LABEL[row.status]}
          </Badge>
          {row.frontpadError ? (
            <span
              className={
                isFrontpadWarning(row)
                  ? "max-w-[140px] truncate text-[10.5px] font-semibold text-brand"
                  : "max-w-[140px] truncate text-[10.5px] font-semibold text-red"
              }
            >
              {isFrontpadWarning(row) ? "Предупреждение кассы" : "Ошибка кассы"}
            </span>
          ) : null}
        </span>
      ),
    },
  ]

  return (
    <SectionShell
      title="Заказы"
      description="Живой список. Статус локальный — касса может перезаписать его вебхуком."
    >
      <Toolbar
        searchPlaceholder="Номер или телефон…"
        onSearchChange={(q) => {
          setQuery(q)
          setPage(1)
        }}
        filters={STATUS_FILTERS}
        activeFilter={status}
        onFilterChange={(id) => setStatusFilter(id as OrderStatus | "all")}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            {hasFrontpadError ? (
              <Button type="button" variant="soft" size="sm" onClick={clearFrontpadErrorFilter}>
                Ошибки кассы · сбросить
              </Button>
            ) : null}
            <Input
              type="date"
              value={from}
              onChange={(e) => {
                setFrom(e.target.value)
                setPage(1)
              }}
              aria-label="Дата от"
              className="h-9 w-auto min-w-[140px] text-[13px]"
            />
            <Input
              type="date"
              value={to}
              onChange={(e) => {
                setTo(e.target.value)
                setPage(1)
              }}
              aria-label="Дата до"
              className="h-9 w-auto min-w-[140px] text-[13px]"
            />
          </div>
        }
      />

      {isPending && !data ? (
        <SkeletonRows rows={8} cols={5} />
      ) : !totalItems && !query && status === "all" && !from && !to && !hasFrontpadError ? (
        <EmptyState title="Заказов пока нет" description="Новые с витрины появятся здесь сразу." />
      ) : !items.length ? (
        <EmptyState
          title="Ничего не найдено"
          description={
            hasFrontpadError
              ? "Заказов с ошибкой кассы нет — можно сбросить фильтр."
              : "Сбросьте фильтр или измените запрос."
          }
          actionLabel={hasFrontpadError ? "Сбросить фильтр" : undefined}
          onAction={hasFrontpadError ? clearFrontpadErrorFilter : undefined}
        />
      ) : (
        <>
          <div className="rounded-[var(--r-md)] border border-line bg-surface p-1">
            <DataTable
              columns={columns}
              rows={items}
              rowKey={(o) => o.id}
              busy={isFetching && !isPending}
              onRowClick={openOrder}
            />
          </div>
          {totalPages > 1 ? (
            <div className="flex items-center justify-between gap-3">
              <p className="text-[12px] text-fg-muted">
                {totalItems} · стр. {safePage}/{totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={safePage <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Назад
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={safePage >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Далее
                </Button>
              </div>
            </div>
          ) : null}
        </>
      )}

      <OrderDrawer
        order={selected}
        open={drawerOpen}
        onOpenChange={(next) => {
          setDrawerOpen(next)
          if (!next) setSelected(null)
        }}
      />
    </SectionShell>
  )
}
