import { Pencil, Trash2 } from "lucide-react"
import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

import { useCategories } from "@/entities/category/api"
import {
  useAdminProducts,
  useDeleteProduct,
  useToggleProductActive,
} from "@/entities/product/api"
import { hasMissingArticle, minPrice } from "@/entities/product/lib"
import type { Product } from "@/entities/product/model"
import { ProductCreateForm } from "@/pages/admin/sections/products/ProductCreateForm"
import { DataTable, type Column } from "@/pages/admin/ui/DataTable"
import { EmptyState } from "@/pages/admin/ui/EmptyState"
import { SectionShell } from "@/pages/admin/ui/SectionShell"
import { SkeletonRows } from "@/pages/admin/ui/SkeletonRows"
import { Toolbar, type ToolbarFilter } from "@/pages/admin/ui/Toolbar"
import { formatPrice } from "@/shared/lib/format"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import { useConfirm } from "@/shared/ui/confirm-dialog"
import { Switch } from "@/shared/ui/switch"

const PAGE_SIZE = 20

const STATUS_FILTERS: ToolbarFilter[] = [
  { id: "all", label: "Все" },
  { id: "active", label: "Активные" },
  { id: "hidden", label: "Скрытые" },
  { id: "no-article", label: "Без артикула" },
]

export function ProductsSection() {
  const navigate = useNavigate()
  const { data: products = [], isPending: productsPending } = useAdminProducts()
  const { data: categories = [], isPending: categoriesPending } = useCategories()
  const deleteProduct = useDeleteProduct()
  const toggleActive = useToggleProductActive()
  const { confirm, dialog } = useConfirm()

  const [createOpen, setCreateOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [page, setPage] = useState(0)

  const pending = productsPending || categoriesPending
  const busy = deleteProduct.isPending || toggleActive.isPending

  const categoryFilters: ToolbarFilter[] = useMemo(
    () => [
      { id: "all", label: "Все категории" },
      ...categories.map((c) => ({ id: c.id, label: c.name })),
    ],
    [categories],
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return products.filter((item) => {
      if (categoryFilter !== "all" && item.categoryId !== categoryFilter) return false
      if (statusFilter === "active" && !item.active) return false
      if (statusFilter === "hidden" && item.active) return false
      if (statusFilter === "no-article" && !hasMissingArticle(item)) return false
      if (!q) return true
      const categoryName = categories.find((c) => c.id === item.categoryId)?.name ?? ""
      return (
        item.name.toLowerCase().includes(q) ||
        item.slug.toLowerCase().includes(q) ||
        categoryName.toLowerCase().includes(q) ||
        item.sizes.some(
          (s) =>
            s.article?.includes(q) ||
            Object.values(s.articleByVariant ?? {}).some((a) => a.includes(q)),
        )
      )
    })
  }, [products, categories, query, statusFilter, categoryFilter])

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, pageCount - 1)
  const pageRows = filtered.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE)

  const openEdit = (product: Product) => navigate(`/admin/products/${product.id}`)

  const handleDelete = async (product: Product) => {
    const ok = await confirm({
      title: `Удалить «${product.name}»?`,
      description: "Товар исчезнет с витрины и из админки.",
      confirmLabel: "Удалить",
      cancelLabel: "Отмена",
      danger: true,
    })
    if (!ok) return
    try {
      await deleteProduct.mutateAsync(product.id)
      toast.success("Удалено")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Не удалось удалить")
    }
  }

  const columns: Column<Product>[] = [
    {
      key: "name",
      header: "Товар",
      render: (row) => (
        <span className="flex items-center gap-2.5">
          {row.image ? (
            <img src={row.image} alt="" className="size-9 rounded-[var(--r-xs)] object-cover" />
          ) : (
            <span className="size-9 rounded-[var(--r-xs)] bg-surface-3" />
          )}
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="truncate text-[12.5px] font-bold text-fg">
              {row.emoji ? `${row.emoji} ` : ""}
              {row.name}
            </span>
            <span className="text-[10.5px] text-fg-faint">
              {(row.variants.length || 1) * row.sizes.length} SKU
              {hasMissingArticle(row) ? " · нет артикула" : ""}
            </span>
          </span>
        </span>
      ),
    },
    {
      key: "category",
      header: "Категория",
      render: (row) => categories.find((c) => c.id === row.categoryId)?.name ?? "—",
    },
    {
      key: "price",
      header: "Цена от",
      className: "tabular-nums",
      render: (row) => (row.sizes.length ? formatPrice(minPrice(row)) : "—"),
    },
    {
      key: "rating",
      header: "Оценка",
      className: "tabular-nums",
      render: (row) => `${row.rating.overall}/10`,
    },
    {
      key: "active",
      header: "Витрина",
      render: (row) => (
        <span
          className="inline-flex items-center gap-2"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <Switch
            checked={row.active}
            disabled={busy}
            aria-label={row.active ? "Скрыть с витрины" : "Показать на витрине"}
            onCheckedChange={(checked) => {
              void toggleActive.mutateAsync({ id: row.id, active: checked }).catch((err) => {
                toast.error(err instanceof Error ? err.message : "Не удалось сменить статус")
              })
            }}
          />
          <Badge variant={row.active ? "success" : "outline"}>
            {row.active ? "Активен" : "Скрыт"}
          </Badge>
        </span>
      ),
    },
    {
      key: "actions",
      header: "",
      className: "w-[72px] text-right",
      render: (row) => (
        <span className="inline-flex gap-0.5" onClick={(e) => e.stopPropagation()}>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={`Редактировать ${row.name}`}
            disabled={busy}
            onClick={() => openEdit(row)}
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
      title="Товары"
      description="Каталог витрины. Артикул — пара вариант × размер, уникальный по всей рознице."
    >
      <Toolbar
        searchPlaceholder="Поиск по названию, slug или артикулу…"
        onSearchChange={(q) => {
          setQuery(q)
          setPage(0)
        }}
        filters={STATUS_FILTERS}
        activeFilter={statusFilter}
        onFilterChange={(id) => {
          setStatusFilter(id)
          setPage(0)
        }}
        createLabel="Товар"
        onCreate={() => setCreateOpen(true)}
      />

      <div className="flex flex-wrap gap-1.5">
        {categoryFilters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            onClick={() => {
              setCategoryFilter(filter.id)
              setPage(0)
            }}
            className={
              categoryFilter === filter.id
                ? "rounded-[var(--r-xs)] bg-brand-soft px-2.5 py-1 text-[11.5px] font-bold text-brand"
                : "rounded-[var(--r-xs)] bg-surface-3 px-2.5 py-1 text-[11.5px] font-bold text-fg-muted hover:text-fg"
            }
          >
            {filter.label}
          </button>
        ))}
      </div>

      {pending ? (
        <SkeletonRows rows={6} cols={5} />
      ) : !products.length ? (
        <EmptyState
          title="Товаров пока нет"
          description="Создайте первый — с фото, ценой и артикулами кассы."
          actionLabel="Создать"
          onAction={() => setCreateOpen(true)}
        />
      ) : !filtered.length ? (
        <EmptyState title="Ничего не найдено" description="Сбросьте фильтр или измените запрос." />
      ) : (
        <>
          <div className="rounded-[var(--r-md)] border border-line bg-surface p-1">
            <DataTable
              columns={columns}
              rows={pageRows}
              rowKey={(p) => p.id}
              busy={busy}
              onRowClick={openEdit}
            />
          </div>
          {pageCount > 1 ? (
            <div className="flex items-center justify-between gap-3">
              <p className="text-[12px] text-fg-muted">
                {filtered.length} · стр. {safePage + 1}/{pageCount}
              </p>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={safePage <= 0}
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                >
                  Назад
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={safePage >= pageCount - 1}
                  onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
                >
                  Далее
                </Button>
              </div>
            </div>
          ) : null}
        </>
      )}

      <ProductCreateForm open={createOpen} onOpenChange={setCreateOpen} />
      {dialog}
    </SectionShell>
  )
}
