import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"

import type { OrderLineSnapshot } from "@/entities/order/model"
import { AdminCard } from "@/pages/admin/ui/AdminCard"
import { SectionShell } from "@/pages/admin/ui/SectionShell"
import { Sparkline } from "@/pages/admin/ui/Sparkline"
import { StatCard } from "@/pages/admin/ui/StatCard"
import { pb } from "@/shared/api/pb"
import { useCollectionRealtime } from "@/shared/api/realtime"
import { formatPrice, pluralize } from "@/shared/lib/format"

const DAYS = 14

type OrderSlice = {
  id: string
  created: string
  total: number
  status: string
  lines?: OrderLineSnapshot[]
  frontpadError?: string
}

type TopProduct = {
  key: string
  name: string
  quantity: number
  revenue: number
}

type DashboardData = {
  todayOrders: number
  todayRevenue: number
  avgCheck: number
  inProgress: number
  frontpadErrors: number
  stoppedStock: number
  reviewsModeration: number
  series: number[]
  topProducts: TopProduct[]
}

export const dashboardKeys = {
  all: ["admin", "dashboard"] as const,
}

async function countByFilter(collection: string, filter: string): Promise<number> {
  const result = await pb.collection(collection).getList(1, 1, { filter })
  return result.totalItems
}

function dayKey(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, "0")
  const d = String(date.getDate()).padStart(2, "0")
  return `${y}-${m}-${d}`
}

function startOfDay(date: Date): Date {
  const next = new Date(date)
  next.setHours(0, 0, 0, 0)
  return next
}

function buildSeries(orders: OrderSlice[], from: Date): number[] {
  const buckets = new Map<string, number>()
  for (let i = 0; i < DAYS; i++) {
    const day = new Date(from)
    day.setDate(from.getDate() + i)
    buckets.set(dayKey(day), 0)
  }
  for (const order of orders) {
    const key = dayKey(new Date(order.created))
    if (buckets.has(key)) buckets.set(key, (buckets.get(key) ?? 0) + 1)
  }
  return [...buckets.values()]
}

function buildTopProducts(orders: OrderSlice[]): TopProduct[] {
  const map = new Map<string, TopProduct>()
  for (const order of orders) {
    for (const line of order.lines ?? []) {
      const key = line.productId || line.name
      const prev = map.get(key)
      const qty = line.quantity || 0
      const revenue = line.total || line.unitPrice * qty
      if (prev) {
        prev.quantity += qty
        prev.revenue += revenue
      } else {
        map.set(key, {
          key,
          name: line.name,
          quantity: qty,
          revenue,
        })
      }
    }
  }
  return [...map.values()].sort((a, b) => b.quantity - a.quantity || b.revenue - a.revenue).slice(0, 5)
}

async function fetchDashboard(): Promise<DashboardData> {
  const today = startOfDay(new Date())
  const from = new Date(today)
  from.setDate(today.getDate() - (DAYS - 1))
  const fromIso = `${dayKey(from)} 00:00:00`

  const [orders, inProgress, frontpadErrors, stoppedStock, reviewsModeration] = await Promise.all([
    pb.collection("orders").getFullList<OrderSlice>({
      filter: pb.filter("created >= {:from}", { from: fromIso }),
      sort: "created",
    }),
    countByFilter(
      "orders",
      'status = "new" || status = "cooking" || status = "delivering"',
    ),
    countByFilter("orders", 'frontpadError != "" && frontpadOrderId = 0'),
    countByFilter("frontpad_stock", "stopped = true"),
    countByFilter("reviews", "published = false"),
  ])

  const todayOrdersList = orders.filter((o) => new Date(o.created) >= today)
  const todayRevenue = todayOrdersList.reduce((sum, o) => sum + (o.total || 0), 0)
  const todayOrders = todayOrdersList.length
  const avgCheck = todayOrders ? Math.round(todayRevenue / todayOrders) : 0

  return {
    todayOrders,
    todayRevenue,
    avgCheck,
    inProgress,
    frontpadErrors,
    stoppedStock,
    reviewsModeration,
    series: buildSeries(orders, from),
    topProducts: buildTopProducts(orders),
  }
}

function useDashboard() {
  return useQuery({
    queryKey: dashboardKeys.all,
    queryFn: fetchDashboard,
    staleTime: 30_000,
  })
}

export function DashboardSection() {
  const { data, isPending } = useDashboard()
  useCollectionRealtime("orders", [dashboardKeys.all])
  useCollectionRealtime("reviews", [dashboardKeys.all])
  useCollectionRealtime("frontpad_stock", [dashboardKeys.all])

  const todayOrders = data?.todayOrders ?? 0
  const todayRevenue = data?.todayRevenue ?? 0
  const avgCheck = data?.avgCheck ?? 0
  const inProgress = data?.inProgress ?? 0
  const frontpadErrors = data?.frontpadErrors ?? 0
  const stoppedStock = data?.stoppedStock ?? 0
  const reviewsModeration = data?.reviewsModeration ?? 0
  const series = data?.series ?? Array.from({ length: DAYS }, () => 0)
  const topProducts = data?.topProducts ?? []

  return (
    <SectionShell
      title="Главная"
      description="Сводка за сегодня и последние 14 дней."
    >
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Выручка сегодня"
          value={isPending ? "…" : formatPrice(todayRevenue)}
          hint={
            isPending
              ? undefined
              : `${todayOrders} ${pluralize(todayOrders, ["заказ", "заказа", "заказов"])}`
          }
          sparkline={<Sparkline values={series} />}
        />
        <StatCard
          label="Средний чек"
          value={isPending ? "…" : formatPrice(avgCheck)}
          hint="По заказам за сегодня"
        />
        <StatCard
          label="В работе"
          value={isPending ? "…" : inProgress}
          hint="Новые, готовятся, в доставке"
          to="/admin/orders"
        />
        <StatCard
          label="Ошибки кассы"
          value={isPending ? "…" : frontpadErrors}
          hint={frontpadErrors ? "Открыть список заказов" : "Всё отправлено"}
          tone={frontpadErrors ? "danger" : "default"}
          to="/admin/orders?frontpadError=1"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          label="Стоп-лист"
          value={isPending ? "…" : stoppedStock}
          hint="Позиции с stopped"
          to="/admin/settings"
          tone={stoppedStock ? "danger" : "default"}
        />
        <StatCard
          label="Отзывы на модерации"
          value={isPending ? "…" : reviewsModeration}
          to="/admin/reviews"
        />
        <StatCard
          label="Заказов за 14 дней"
          value={isPending ? "…" : series.reduce((a, b) => a + b, 0)}
          sparkline={<Sparkline values={series} width={120} height={40} />}
        />
      </div>

      <AdminCard
        title="Топ товаров"
        action={
          <Link
            to="/admin/products"
            className="text-[12px] font-bold text-brand hover:underline"
          >
            Каталог
          </Link>
        }
      >
        {isPending ? (
          <p className="text-[13px] text-fg-muted">Загрузка…</p>
        ) : !topProducts.length ? (
          <p className="text-[13px] text-fg-muted">Пока нет позиций в заказах за 14 дней.</p>
        ) : (
          <ul className="divide-y divide-line">
            {topProducts.map((item, index) => (
              <li
                key={item.key}
                className="flex items-center justify-between gap-3 py-2.5 first:pt-0 last:pb-0"
              >
                <span className="flex min-w-0 items-baseline gap-2">
                  <span className="w-4 shrink-0 text-[12px] font-bold tabular-nums text-fg-faint">
                    {index + 1}
                  </span>
                  <span className="truncate text-[13px] font-bold text-fg">{item.name}</span>
                </span>
                <span className="shrink-0 text-right text-[12px] tabular-nums text-fg-muted">
                  {item.quantity} шт · {formatPrice(item.revenue)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </AdminCard>
    </SectionShell>
  )
}
