import { Pencil, Trash2 } from "lucide-react"
import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

import { useCategories } from "@/entities/category/api"
import {
  useAdminProducts,
  useDeleteProduct,
  useToggleProductActive,
  useUpdateProduct,
} from "@/entities/product/api"
import { hasMissingArticle, minPrice } from "@/entities/product/lib"
import type { Product } from "@/entities/product/model"
import { ProductCreateForm } from "@/pages/admin/sections/products/ProductCreateForm"
import { CashPricesPanel } from "@/pages/admin/sections/products/CashPricesPanel"
import { EmptyState } from "@/pages/admin/ui/EmptyState"
import { SectionShell } from "@/pages/admin/ui/SectionShell"
import { SkeletonRows } from "@/pages/admin/ui/SkeletonRows"
import { SortableList } from "@/pages/admin/ui/SortableList"
import { Toolbar, type ToolbarFilter } from "@/pages/admin/ui/Toolbar"
import { formatPrice } from "@/shared/lib/format"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import { Chip } from "@/shared/ui/chip"
import { useConfirm } from "@/shared/ui/confirm-dialog"
import { Switch } from "@/shared/ui/switch"

const STATUS_FILTERS: ToolbarFilter[] = [
  { id: "all", label: "Все" },
  { id: "active", label: "Активные" },
  { id: "hidden", label: "Скрытые" },
  { id: "no-article", label: "Без артикула" },
]

/** Переставляет только отфильтрованные слоты в полном списке (по order). */
function applyFilteredReorder(
  all: Product[],
  filtered: Product[],
  nextFiltered: Product[],
): Product[] {
  if (filtered.length !== nextFiltered.length) return all
  const queue = [...nextFiltered]
  const filteredIds = new Set(filtered.map((p) => p.id))
  return all.map((item) => (filteredIds.has(item.id) ? queue.shift()! : item))
}

export function ProductsSection() {
  const navigate = useNavigate()
  const { data: products = [], isPending: productsPending } = useAdminProducts()
  const { data: categories = [], isPending: categoriesPending } = useCategories()
  const deleteProduct = useDeleteProduct()
  const toggleActive = useToggleProductActive()
  const updateProduct = useUpdateProduct()
  const { confirm, dialog } = useConfirm()

  const [createOpen, setCreateOpen] = useState(false)
  const [view, setView] = useState<"catalog" | "prices">("catalog")
  const [query, setQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const pending = productsPending || categoriesPending
  const busy =
    deleteProduct.isPending || toggleActive.isPending || updateProduct.isPending

  const categoryFilters: ToolbarFilter[] = useMemo(
    () => [
      { id: "all", label: "Все категории" },
      ...categories.map((c) => ({ id: c.id, label: c.name })),
    ],
    [categories],
  )

  const sorted = useMemo(
    () => [...products].sort((a, b) => a.order - b.order || a.name.localeCompare(b.name, "ru")),
    [products],
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return sorted.filter((item) => {
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
  }, [sorted, categories, query, statusFilter, categoryFilter])

  const canReorder = !query.trim() && statusFilter === "all"

  const openEdit = (product: Product) => navigate(`/admin/products/${product.id}`)

  const handleReorder = async (nextFiltered: Product[]) => {
    if (!canReorder) return
    const nextAll = applyFilteredReorder(sorted, filtered, nextFiltered)
    const updates = nextAll
      .map((item, index) => ({ item, order: index + 1 }))
      .filter(({ item, order }) => item.order !== order)

    if (!updates.length) return

    try {
      await Promise.all(
        updates.map(({ item, order }) =>
          updateProduct.mutateAsync({ id: item.id, data: { order } }),
        ),
      )
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Не удалось изменить порядок")
    }
  }

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

  return (
    <SectionShell
      title="Товары"
      description="Каталог витрины. Порядок — drag&drop (позиция на витрине). Артикул — пара вариант × размер."
      actions={
        <div className="flex flex-wrap gap-1.5">
          <Chip active={view === "catalog"} onClick={() => setView("catalog")}>
            Каталог
          </Chip>
          <Chip active={view === "prices"} onClick={() => setView("prices")}>
            Цены кассы
          </Chip>
        </div>
      }
    >
      {view === "prices" ? (
        <CashPricesPanel />
      ) : (
        <>
      <Toolbar
        searchPlaceholder="Поиск по названию, slug или артикулу…"
        onSearchChange={setQuery}
        filters={STATUS_FILTERS}
        activeFilter={statusFilter}
        onFilterChange={setStatusFilter}
        createLabel="Товар"
        onCreate={() => setCreateOpen(true)}
      />

      <div className="flex flex-wrap gap-1.5">
        {categoryFilters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            onClick={() => setCategoryFilter(filter.id)}
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

      {!canReorder && filtered.length ? (
        <p className="text-[11.5px] text-fg-muted">
          Drag&drop порядка доступен без поиска и фильтра статуса.
        </p>
      ) : null}

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
        <SortableList
          items={filtered}
          keyOf={(p) => p.id}
          disabled={busy || !canReorder}
          onReorder={(next) => void handleReorder(next)}
          renderItem={(product) => {
            const categoryName =
              categories.find((c) => c.id === product.categoryId)?.name ?? "—"
            return (
              <div className="flex items-center gap-2.5 py-0.5">
                <button
                  type="button"
                  className="flex min-w-0 flex-1 items-center gap-2.5 text-left"
                  onClick={() => openEdit(product)}
                >
                  {product.image ? (
                    <img
                      src={product.image}
                      alt=""
                      className="size-10 shrink-0 rounded-[var(--r-xs)] object-cover"
                    />
                  ) : (
                    <span className="size-10 shrink-0 rounded-[var(--r-xs)] bg-surface-3" />
                  )}
                  <span className="flex min-w-0 flex-col leading-tight">
                    <span className="truncate text-[13px] font-extrabold text-fg">
                      {product.emoji ? `${product.emoji} ` : ""}
                      {product.name}
                    </span>
                    <span className="mt-0.5 truncate text-[11.5px] text-fg-muted">
                      {categoryName} ·{" "}
                      {product.sizes.length ? formatPrice(minPrice(product)) : "—"} ·{" "}
                      {(product.variants.length || 1) * product.sizes.length} SKU
                      {hasMissingArticle(product) ? " · нет артикула" : ""}
                    </span>
                  </span>
                </button>

                <span
                  className="hidden shrink-0 items-center gap-2 sm:inline-flex"
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.stopPropagation()}
                >
                  <Switch
                    checked={product.active}
                    disabled={busy}
                    aria-label={
                      product.active ? "Скрыть с витрины" : "Показать на витрине"
                    }
                    onCheckedChange={(checked) => {
                      void toggleActive
                        .mutateAsync({ id: product.id, active: checked })
                        .catch((err) => {
                          toast.error(
                            err instanceof Error
                              ? err.message
                              : "Не удалось сменить статус",
                          )
                        })
                    }}
                  />
                  <Badge variant={product.active ? "success" : "outline"}>
                    {product.active ? "Активен" : "Скрыт"}
                  </Badge>
                </span>

                <span className="flex shrink-0 gap-0.5" onClick={(e) => e.stopPropagation()}>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`Редактировать ${product.name}`}
                    disabled={busy}
                    onClick={() => openEdit(product)}
                  >
                    <Pencil size={14} strokeWidth={2.3} />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`Удалить ${product.name}`}
                    disabled={busy}
                    className="text-fg-faint hover:bg-red-soft hover:text-red"
                    onClick={() => void handleDelete(product)}
                  >
                    <Trash2 size={14} strokeWidth={2.3} />
                  </Button>
                </span>
              </div>
            )
          }}
        />
      )}

      <ProductCreateForm open={createOpen} onOpenChange={setCreateOpen} />
      {dialog}
        </>
      )}
    </SectionShell>
  )
}
