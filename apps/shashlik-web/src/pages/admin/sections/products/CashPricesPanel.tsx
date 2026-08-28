import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

import { adminProductKeys, productKeys, useAdminProducts } from "@/entities/product/api"
import {
  cellDelta,
  parseApplyPricesResult,
  planAllCashPrices,
  stockPriceMap,
  type CashPricePlan,
  type CashPriceStatus,
} from "@/entities/product/lib/prices"
import {
  applyPricesJobKeys,
  stoppedStockKeys,
  useApplyPricesJobs,
  useEnqueueApplyPricesJob,
  useFrontpadSettings,
  useFrontpadStock,
} from "@/entities/settings/api"
import { AdminCard } from "@/pages/admin/ui/AdminCard"
import { DataTable, type Column } from "@/pages/admin/ui/DataTable"
import { EmptyState } from "@/pages/admin/ui/EmptyState"
import { SkeletonRows } from "@/pages/admin/ui/SkeletonRows"
import { Toolbar, type ToolbarFilter } from "@/pages/admin/ui/Toolbar"
import { useAdminAuth } from "@/shared/api/auth"
import { useCollectionRealtime } from "@/shared/api/realtime"
import { queryClient } from "@/shared/api/query-client"
import { cn } from "@/shared/lib/cn"
import { formatPrice } from "@/shared/lib/format"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import { useConfirm } from "@/shared/ui/confirm-dialog"

const ROW_FILTERS: ToolbarFilter[] = [
  { id: "mismatch", label: "Расхождения" },
  { id: "blocked", label: "Нельзя применить" },
  { id: "all", label: "Все SKU" },
]

type PriceRow = {
  key: string
  productId: string
  productName: string
  status: CashPriceStatus
  reason?: string
  variantLabel: string
  sizeLabel: string
  article: string
  ourPrice: number
  cashPrice: number | null
  delta: number | null
}

const STATUS_LABEL: Record<CashPriceStatus, string> = {
  ready: "к записи",
  blocked: "нельзя",
  match: "совпадает",
}

function formatSigned(value: number): string {
  if (value === 0) return formatPrice(0)
  return `${value > 0 ? "+" : ""}${formatPrice(value)}`
}

function flattenPlans(plans: CashPricePlan[]): PriceRow[] {
  return plans.flatMap((plan) =>
    plan.cells.map((cell) => ({
      key: `${plan.productId}:${cell.variantId ?? "_"}:${cell.sizeId}`,
      productId: plan.productId,
      productName: plan.name,
      status: plan.status,
      reason: plan.reason,
      variantLabel: cell.variantLabel,
      sizeLabel: cell.sizeLabel,
      article: cell.article,
      ourPrice: cell.ourPrice,
      cashPrice: cell.cashPrice,
      delta: cellDelta(cell),
    })),
  )
}

export function CashPricesPanel() {
  const navigate = useNavigate()
  const { isAdmin } = useAdminAuth()
  const { data: products = [], isPending: productsPending } = useAdminProducts()
  const { data: stock = [], isPending: stockPending } = useFrontpadStock()
  const { data: settings } = useFrontpadSettings(isAdmin)
  const { data: jobs = [] } = useApplyPricesJobs(isAdmin)
  const enqueue = useEnqueueApplyPricesJob()
  const { confirm, dialog } = useConfirm()

  useCollectionRealtime("frontpad_stock", [stoppedStockKeys.all])
  useCollectionRealtime("products", [adminProductKeys.all, productKeys.all])
  useCollectionRealtime(
    "frontpad_jobs",
    [applyPricesJobKeys.all, adminProductKeys.all, productKeys.all],
    isAdmin,
  )

  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState("mismatch")

  const stockMap = useMemo(() => stockPriceMap(stock), [stock])
  const plans = useMemo(() => planAllCashPrices(products, stockMap), [products, stockMap])
  const rows = useMemo(() => flattenPlans(plans), [plans])

  const readyCount = plans.filter((p) => p.status === "ready").length
  const blocked = plans.filter((p) => p.status === "blocked")
  const mismatchCells = rows.filter((r) => r.delta !== null && r.delta !== 0).length
  const fromFrontpad = settings?.priceSource === "frontpad"
  const jobBusy =
    enqueue.isPending || jobs.some((j) => j.status === "queued" || j.status === "running")
  const lastJob = jobs[0]
  const lastResult = lastJob ? parseApplyPricesResult(lastJob.result) : null

  const filtered = rows.filter((row) => {
    if (filter === "blocked" && row.status !== "blocked") return false
    if (filter === "mismatch") {
      const priceDiff = row.delta !== null && row.delta !== 0
      if (!priceDiff && row.status !== "blocked") return false
    }
    const q = query.trim().toLowerCase()
    if (!q) return true
    return (
      row.productName.toLowerCase().includes(q) ||
      row.article.includes(q) ||
      row.variantLabel.toLowerCase().includes(q) ||
      row.sizeLabel.toLowerCase().includes(q)
    )
  })

  const handleApply = async () => {
    const ok = await confirm({
      title: "Применить цены кассы?",
      description: fromFrontpad
        ? "Обновит цену размеров и надбавки вариантов у товаров с полной матрицей артикулов. Остальные попадут в отчёт."
        : "Источник цен — сайт. Джоб посчитает отчёт, но товары не изменит. Чтобы записать, выставьте «Касса» в Настройки → Касса → Источник справочника цен.",
      confirmLabel: fromFrontpad ? "Применить" : "Посчитать отчёт",
      cancelLabel: "Отмена",
    })
    if (!ok) return
    try {
      const job = await enqueue.mutateAsync()
      void queryClient.invalidateQueries({ queryKey: adminProductKeys.all })
      void queryClient.invalidateQueries({ queryKey: productKeys.all })
      if (job.status === "error") {
        toast.error(job.error || "Не удалось применить цены")
        return
      }
      const result = parseApplyPricesResult(job.result)
      if (job.status === "done" && result) {
        if (result.applied) {
          toast.success(`Обновлено ${result.updated}, пропущено ${result.skipped}`)
        } else {
          toast(
            `Отчёт готов, цены не записаны. К записи: ${result.updated}, пропущено: ${result.skipped}`,
          )
        }
        return
      }
      toast.success("Задача поставлена")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Не удалось поставить задачу")
    }
  }

  const pending = productsPending || stockPending

  const columns: Column<PriceRow>[] = [
    {
      key: "product",
      header: "Товар",
      render: (row) => (
        <span className="flex flex-col leading-tight">
          <span className="font-bold text-fg">{row.productName}</span>
          {row.status === "blocked" && row.reason ? (
            <span className="mt-0.5 text-[11px] font-semibold text-red">{row.reason}</span>
          ) : null}
        </span>
      ),
    },
    {
      key: "sku",
      header: "SKU",
      render: (row) => (
        <span className="text-fg-muted">
          {row.variantLabel} · {row.sizeLabel}
        </span>
      ),
    },
    {
      key: "article",
      header: "Артикул",
      className: "font-mono tabular-nums",
      render: (row) => row.article || "—",
    },
    {
      key: "ours",
      header: "Наша",
      className: "tabular-nums",
      render: (row) => formatPrice(row.ourPrice),
    },
    {
      key: "cash",
      header: "Касса",
      className: "tabular-nums",
      render: (row) => (row.cashPrice === null ? "—" : formatPrice(row.cashPrice)),
    },
    {
      key: "delta",
      header: "Δ",
      className: "tabular-nums",
      render: (row) => {
        if (row.delta === null) return <span className="text-fg-faint">—</span>
        return (
          <span className={cn(row.delta === 0 ? "text-fg-muted" : "font-bold text-red")}>
            {formatSigned(row.delta)}
          </span>
        )
      },
    },
    {
      key: "status",
      header: "Статус",
      render: (row) => (
        <Badge variant={row.status === "match" ? "success" : row.status === "ready" ? "soft" : "outline"}>
          {STATUS_LABEL[row.status]}
        </Badge>
      ),
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      <AdminCard
        title="Цены кассы"
        action={
          isAdmin ? (
            <Button
              type="button"
              variant="soft"
              size="sm"
              disabled={jobBusy || pending}
              onClick={() => void handleApply()}
            >
              {jobBusy ? "Применение…" : "Применить цены кассы"}
            </Button>
          ) : null
        }
      >
        <p className="text-[13px] leading-snug text-fg-muted">
          Сравнение с <span className="font-mono text-[12px]">frontpad_stock</span> после
          «Обновить товары кассы». Пишем{" "}
          <span className="font-mono text-[12px]">sizes[].price</span> /{" "}
          <span className="font-mono text-[12px]">sizes[].priceByVariant</span> только при
          источнике «касса».
        </p>
        <p className="mt-2 text-[12.5px] font-semibold text-fg">
          К записи: {readyCount} · нельзя: {blocked.length} · ячеек с Δ: {mismatchCells}
          {isAdmin ? ` · источник: ${fromFrontpad ? "касса" : "сайт"}` : ""}
        </p>
        {lastJob && lastResult ? (
          <p className="mt-1 text-[12px] text-fg-muted">
            Последний джоб: {lastResult.applied ? "записано" : "без записи"} · обновлено{" "}
            {lastResult.updated} · пропущено {lastResult.skipped} · без изменений{" "}
            {lastResult.unchanged}
            {lastJob.status === "error" && lastJob.error ? ` · ошибка: ${lastJob.error}` : ""}
          </p>
        ) : null}
        {!fromFrontpad && isAdmin ? (
          <p className="mt-2 text-[12.5px] font-semibold text-brand">
            Сейчас источник цен — сайт: кнопка только считает отчёт.
          </p>
        ) : null}
      </AdminCard>

      {blocked.length ? (
        <AdminCard title="Нельзя применить">
          <ul className="flex flex-col gap-1.5">
            {blocked.map((plan) => (
              <li key={plan.productId} className="text-[13px] leading-snug">
                <button
                  type="button"
                  className="font-bold text-fg hover:text-brand"
                  onClick={() => navigate(`/admin/products/${plan.productId}`)}
                >
                  {plan.name}
                </button>
                <span className="text-fg-muted"> — {plan.reason}</span>
              </li>
            ))}
          </ul>
        </AdminCard>
      ) : null}

      <Toolbar
        searchPlaceholder="Товар, артикул, размер…"
        onSearchChange={setQuery}
        filters={ROW_FILTERS}
        activeFilter={filter}
        onFilterChange={setFilter}
      />

      {pending ? (
        <SkeletonRows rows={8} cols={7} />
      ) : !products.length ? (
        <EmptyState title="Нет товаров" description="Сначала заведите каталог." />
      ) : !filtered.length ? (
        <EmptyState
          title="Нет строк"
          description={
            filter === "mismatch"
              ? "Расхождений нет — наши цены совпадают с кассой, либо артикулов нет."
              : "Сбросьте фильтр или измените запрос."
          }
        />
      ) : (
        <DataTable
          columns={columns}
          rows={filtered}
          rowKey={(row) => row.key}
          onRowClick={(row) => navigate(`/admin/products/${row.productId}`)}
          empty="Нет строк"
        />
      )}
      {dialog}
    </div>
  )
}
