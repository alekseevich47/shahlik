import { useState } from "react"

import { useCustomersPage } from "@/entities/customer/api"
import type { Customer, CustomerSortKey } from "@/entities/customer/model"
import { CustomerDrawer } from "@/pages/admin/sections/customers/CustomerDrawer"
import { DataTable, type Column, type SortDir } from "@/pages/admin/ui/DataTable"
import { EmptyState } from "@/pages/admin/ui/EmptyState"
import { SectionShell } from "@/pages/admin/ui/SectionShell"
import { SkeletonRows } from "@/pages/admin/ui/SkeletonRows"
import { Toolbar } from "@/pages/admin/ui/Toolbar"
import { formatDate, formatPrice } from "@/shared/lib/format"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"

const PER_PAGE = 20

export function CustomersSection() {
  const [query, setQuery] = useState("")
  const [page, setPage] = useState(1)
  const [sortKey, setSortKey] = useState<CustomerSortKey>("lastOrderAt")
  const [sortDir, setSortDir] = useState<SortDir>("desc")
  const [selected, setSelected] = useState<Customer | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const params = {
    page,
    perPage: PER_PAGE,
    query,
    sortKey,
    sortDir,
  }

  const { data, isPending, isFetching } = useCustomersPage(params)

  const items = data?.items ?? []
  const totalPages = Math.max(1, data?.totalPages ?? 1)
  const totalItems = data?.totalItems ?? 0
  const safePage = Math.min(page, totalPages)

  const openCustomer = (customer: Customer) => {
    setSelected(customer)
    setDrawerOpen(true)
  }

  const handleSort = (key: string) => {
    const next = key as CustomerSortKey
    if (sortKey === next) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortKey(next)
      setSortDir("desc")
    }
    setPage(1)
  }

  const columns: Column<Customer>[] = [
    {
      key: "customer",
      header: "Клиент",
      render: (row) => (
        <span className="flex flex-col leading-tight">
          <span className="font-bold text-fg">{row.name || "Без имени"}</span>
          <span className="text-[11px] tabular-nums text-fg-muted">{row.phone}</span>
        </span>
      ),
    },
    {
      key: "ordersCount",
      header: "Заказов",
      className: "tabular-nums",
      render: (row) => row.ordersCount,
    },
    {
      key: "totalSpent",
      header: "Сумма",
      className: "tabular-nums",
      sortable: true,
      render: (row) => formatPrice(row.totalSpent),
    },
    {
      key: "lastOrderAt",
      header: "Последний",
      sortable: true,
      render: (row) =>
        row.lastOrderAt ? (
          <span className="text-[12.5px] text-fg-soft">{formatDate(row.lastOrderAt)}</span>
        ) : (
          <span className="text-fg-faint">—</span>
        ),
    },
    {
      key: "status",
      header: "Статус",
      render: (row) =>
        row.blocked ? (
          <Badge variant="outline">Блок</Badge>
        ) : (
          <Badge variant="success">Ок</Badge>
        ),
    },
  ]

  return (
    <SectionShell
      title="Клиенты"
      description="Карточки из заказов. Создаются хуком, здесь — адрес, скидка и блокировка."
    >
      <Toolbar
        searchPlaceholder="Телефон или имя…"
        onSearchChange={(q) => {
          setQuery(q)
          setPage(1)
        }}
      />

      {isPending && !data ? (
        <SkeletonRows rows={8} cols={5} />
      ) : !totalItems && !query ? (
        <EmptyState
          title="Клиентов пока нет"
          description="Появятся после первого заказа с витрины."
        />
      ) : !items.length ? (
        <EmptyState title="Ничего не найдено" description="Измените запрос поиска." />
      ) : (
        <>
          <div className="rounded-[var(--r-md)] border border-line bg-surface p-1">
            <DataTable
              columns={columns}
              rows={items}
              rowKey={(c) => c.id}
              busy={isFetching && !isPending}
              sort={{ key: sortKey, dir: sortDir }}
              onSort={handleSort}
              onRowClick={openCustomer}
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

      <CustomerDrawer
        customer={selected}
        open={drawerOpen}
        onOpenChange={(next) => {
          setDrawerOpen(next)
          if (!next) setSelected(null)
        }}
      />
    </SectionShell>
  )
}
