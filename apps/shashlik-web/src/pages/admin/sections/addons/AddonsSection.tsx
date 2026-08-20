import { Pencil, Trash2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import { useAddons, useDeleteAddon } from "@/entities/addon/api"
import type { Addon, AddonKind } from "@/entities/addon/model"
import { AddonForm } from "@/pages/admin/sections/addons/AddonForm"
import { DataTable, type Column } from "@/pages/admin/ui/DataTable"
import { EmptyState } from "@/pages/admin/ui/EmptyState"
import { SectionShell } from "@/pages/admin/ui/SectionShell"
import { SkeletonRows } from "@/pages/admin/ui/SkeletonRows"
import { Toolbar, type ToolbarFilter } from "@/pages/admin/ui/Toolbar"
import { formatPrice } from "@/shared/lib/format"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import { useConfirm } from "@/shared/ui/confirm-dialog"

const KIND_FILTERS: ToolbarFilter[] = [
  { id: "all", label: "Все" },
  { id: "extra", label: "Добавки" },
  { id: "sauce", label: "Соусы" },
]

export function AddonsSection() {
  const { data: addons = [], isPending } = useAddons()
  const deleteAddon = useDeleteAddon()
  const { confirm, dialog } = useConfirm()

  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Addon | null>(null)
  const [query, setQuery] = useState("")
  const [kindFilter, setKindFilter] = useState("all")

  const busy = deleteAddon.isPending

  const filtered = addons.filter((item) => {
    if (kindFilter !== "all" && item.kind !== kindFilter) return false
    const q = query.trim().toLowerCase()
    if (!q) return true
    return (
      item.name.toLowerCase().includes(q) ||
      (item.article?.includes(q) ?? false) ||
      item.weight.toLowerCase().includes(q)
    )
  })

  const openCreate = () => {
    setEditing(null)
    setFormOpen(true)
  }

  const openEdit = (addon: Addon) => {
    setEditing(addon)
    setFormOpen(true)
  }

  const handleDelete = async (addon: Addon) => {
    const ok = await confirm({
      title: `Удалить «${addon.name}»?`,
      description: "Позиция исчезнет из карточек товаров на витрине.",
      confirmLabel: "Удалить",
      cancelLabel: "Отмена",
      danger: true,
    })
    if (!ok) return

    try {
      await deleteAddon.mutateAsync(addon.id)
      toast.success("Удалено")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Не удалось удалить")
    }
  }

  const columns: Column<Addon>[] = [
    {
      key: "name",
      header: "Позиция",
      render: (row) => (
        <span className="flex items-center gap-2.5">
          {row.image ? (
            <img src={row.image} alt="" className="size-8 rounded-full object-cover" />
          ) : (
            <span className="size-8 rounded-full bg-surface-3" />
          )}
          <span className="text-[12.5px] font-bold text-fg">{row.name}</span>
        </span>
      ),
    },
    {
      key: "kind",
      header: "Тип",
      render: (row) => (
        <Badge variant={row.kind === "sauce" ? "soft" : "meta"}>
          {row.kind === "sauce" ? "Соус" : "Добавка"}
        </Badge>
      ),
    },
    { key: "weight", header: "Вес", render: (row) => row.weight },
    {
      key: "price",
      header: "Цена",
      className: "tabular-nums",
      render: (row) => formatPrice(row.price),
    },
    {
      key: "article",
      header: "Артикул",
      className: "tabular-nums",
      render: (row) => row.article ?? "—",
    },
    {
      key: "actions",
      header: "",
      className: "w-[72px] text-right",
      render: (row) => (
        <span className="inline-flex gap-0.5">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={`Редактировать ${row.name}`}
            disabled={busy}
            onClick={(e) => {
              e.stopPropagation()
              openEdit(row)
            }}
          >
            <Pencil size={14} strokeWidth={2.3} />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={`Удалить ${row.name}`}
            disabled={busy}
            className="text-fg-faint hover:bg-red-soft hover:text-red"
            onClick={(e) => {
              e.stopPropagation()
              void handleDelete(row)
            }}
          >
            <Trash2 size={14} strokeWidth={2.3} />
          </Button>
        </span>
      ),
    },
  ]

  const defaultKind: AddonKind =
    kindFilter === "sauce" || kindFilter === "extra" ? kindFilter : "extra"

  return (
    <SectionShell
      title="Добавки и соусы"
      description="Модификаторы к товарам. Артикул уходит в кассу как отдельная позиция."
    >
      <Toolbar
        searchPlaceholder="Поиск по названию, весу или артикулу…"
        onSearchChange={setQuery}
        filters={KIND_FILTERS}
        activeFilter={kindFilter}
        onFilterChange={setKindFilter}
        createLabel="Добавка"
        onCreate={openCreate}
      />

      {isPending ? (
        <SkeletonRows rows={5} cols={5} />
      ) : !addons.length ? (
        <EmptyState
          title="Добавок пока нет"
          description="Создайте первую — с фото, ценой и артикулом кассы."
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
            rowKey={(a) => a.id}
            busy={busy}
            onRowClick={openEdit}
          />
        </div>
      )}

      <AddonForm
        open={formOpen}
        onOpenChange={setFormOpen}
        addon={editing}
        defaultKind={defaultKind}
      />
      {dialog}
    </SectionShell>
  )
}
