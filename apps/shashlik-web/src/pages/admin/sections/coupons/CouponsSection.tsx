import { Pencil, Trash2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import { useCoupons, useDeleteCoupon, useUpdateCoupon } from "@/entities/coupon/api"
import {
  formatCouponValue,
  type Coupon,
} from "@/entities/coupon/model"
import { CouponForm } from "@/pages/admin/sections/coupons/CouponForm"
import { DataTable, type Column } from "@/pages/admin/ui/DataTable"
import { EmptyState } from "@/pages/admin/ui/EmptyState"
import { SectionShell } from "@/pages/admin/ui/SectionShell"
import { SkeletonRows } from "@/pages/admin/ui/SkeletonRows"
import { Toolbar, type ToolbarFilter } from "@/pages/admin/ui/Toolbar"
import { formatDate, formatPrice } from "@/shared/lib/format"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import { useConfirm } from "@/shared/ui/confirm-dialog"
import { Switch } from "@/shared/ui/switch"

const STATUS_FILTERS: ToolbarFilter[] = [
  { id: "all", label: "Все" },
  { id: "active", label: "Активные" },
  { id: "off", label: "Выкл." },
]

export function CouponsSection() {
  const { data: coupons = [], isPending } = useCoupons()
  const updateCoupon = useUpdateCoupon()
  const deleteCoupon = useDeleteCoupon()
  const { confirm, dialog } = useConfirm()

  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Coupon | null>(null)
  const [query, setQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const busy = updateCoupon.isPending || deleteCoupon.isPending

  const filtered = coupons.filter((item) => {
    if (statusFilter === "active" && !item.active) return false
    if (statusFilter === "off" && item.active) return false
    const q = query.trim().toLowerCase()
    if (!q) return true
    return (
      item.code.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q)
    )
  })

  const openCreate = () => {
    setEditing(null)
    setFormOpen(true)
  }

  const openEdit = (coupon: Coupon) => {
    setEditing(coupon)
    setFormOpen(true)
  }

  const handleToggle = async (coupon: Coupon, active: boolean) => {
    if (coupon.active === active) return
    try {
      await updateCoupon.mutateAsync({ id: coupon.id, data: { active } })
      toast.success(active ? "Включён" : "Выключен")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Не удалось сохранить")
    }
  }

  const handleDelete = async (coupon: Coupon) => {
    const ok = await confirm({
      title: `Удалить «${coupon.code}»?`,
      description: "Код перестанет приниматься в корзине.",
      confirmLabel: "Удалить",
      cancelLabel: "Отмена",
      danger: true,
    })
    if (!ok) return

    try {
      await deleteCoupon.mutateAsync(coupon.id)
      toast.success("Удалено")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Не удалось удалить")
    }
  }

  const columns: Column<Coupon>[] = [
    {
      key: "code",
      header: "Код",
      render: (row) => (
        <span className="flex flex-col leading-tight">
          <span className="font-extrabold tracking-[0.04em] text-fg">{row.code}</span>
          {row.description ? (
            <span className="text-[11px] text-fg-muted">{row.description}</span>
          ) : null}
        </span>
      ),
    },
    {
      key: "value",
      header: "Скидка",
      render: (row) => (
        <Badge variant="soft">{formatCouponValue(row.kind, row.value)}</Badge>
      ),
    },
    {
      key: "minTotal",
      header: "От суммы",
      render: (row) =>
        row.minTotal > 0 ? (
          <span className="tabular-nums">{formatPrice(row.minTotal)}</span>
        ) : (
          <span className="text-fg-faint">—</span>
        ),
    },
    {
      key: "period",
      header: "Период",
      render: (row) => {
        if (!row.startsAt && !row.endsAt) {
          return <span className="text-fg-faint">бессрочно</span>
        }
        const from = row.startsAt ? formatDate(row.startsAt) : "…"
        const to = row.endsAt ? formatDate(row.endsAt) : "…"
        return (
          <span className="text-[12px] tabular-nums text-fg-soft">
            {from} — {to}
          </span>
        )
      },
    },
    {
      key: "uses",
      header: "Исп.",
      render: (row) => (
        <span className="tabular-nums text-fg-soft">
          {row.uses}
          {row.usesLimit > 0 ? ` / ${row.usesLimit}` : ""}
        </span>
      ),
    },
    {
      key: "active",
      header: "Активен",
      render: (row) => (
        <span onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
          <Switch
            checked={row.active}
            disabled={busy}
            onCheckedChange={(next) => void handleToggle(row, next)}
            aria-label={`Активность ${row.code}`}
          />
        </span>
      ),
    },
    {
      key: "actions",
      header: "",
      className: "w-[1%] whitespace-nowrap",
      render: (row) => (
        <span
          className="flex justify-end gap-1"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <Button
            type="button"
            size="icon-sm"
            variant="ghost"
            aria-label="Редактировать"
            onClick={() => openEdit(row)}
          >
            <Pencil size={14} strokeWidth={2.3} />
          </Button>
          <Button
            type="button"
            size="icon-sm"
            variant="ghost"
            aria-label="Удалить"
            disabled={busy}
            onClick={() => void handleDelete(row)}
          >
            <Trash2 size={14} strokeWidth={2.3} />
          </Button>
        </span>
      ),
    },
  ]

  return (
    <SectionShell
      title="Купоны"
      description="Промокоды для корзины. Список кодов доступен только админу."
    >
      <Toolbar
        searchPlaceholder="Поиск по коду или описанию…"
        onSearchChange={setQuery}
        filters={STATUS_FILTERS}
        activeFilter={statusFilter}
        onFilterChange={setStatusFilter}
        createLabel="Купон"
        onCreate={openCreate}
      />

      {isPending ? (
        <SkeletonRows rows={6} cols={6} />
      ) : !coupons.length ? (
        <EmptyState
          title="Купонов пока нет"
          description="Создайте первый промокод — он сразу заработает в корзине."
          actionLabel="Создать"
          onAction={openCreate}
        />
      ) : !filtered.length ? (
        <EmptyState title="Ничего не найдено" description="Сбросьте фильтр или измените запрос." />
      ) : (
        <div className="rounded-[var(--r-md)] border border-line bg-surface p-1">
          <DataTable
            columns={columns}
            rows={filtered}
            rowKey={(row) => row.id}
            busy={busy}
            onRowClick={openEdit}
          />
        </div>
      )}

      <CouponForm open={formOpen} onOpenChange={setFormOpen} coupon={editing} />
      {dialog}
    </SectionShell>
  )
}
