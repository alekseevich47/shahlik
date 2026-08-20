import { Pencil, Trash2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import {
  useCategories,
  useDeleteCategory,
  useUpdateCategory,
} from "@/entities/category/api"
import type { Category } from "@/entities/category/model"
import { useAdminProducts } from "@/entities/product/api"
import { CategoryTagsEditor } from "@/pages/admin/sections/CategoryTagsEditor"
import { CategoryForm } from "@/pages/admin/sections/categories/CategoryForm"
import { EmptyState } from "@/pages/admin/ui/EmptyState"
import { SectionShell } from "@/pages/admin/ui/SectionShell"
import { SkeletonRows } from "@/pages/admin/ui/SkeletonRows"
import { SortableList } from "@/pages/admin/ui/SortableList"
import { Toolbar } from "@/pages/admin/ui/Toolbar"
import { Button } from "@/shared/ui/button"
import { useConfirm } from "@/shared/ui/confirm-dialog"

export function CategoriesSection() {
  const { data: categories = [], isPending: categoriesPending } = useCategories()
  const { data: products = [], isPending: productsPending } = useAdminProducts()
  const updateCategory = useUpdateCategory()
  const deleteCategory = useDeleteCategory()
  const { confirm, dialog } = useConfirm()

  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Category | null>(null)
  const [query, setQuery] = useState("")

  const pending = categoriesPending || productsPending
  const busy = updateCategory.isPending || deleteCategory.isPending

  const filtered = query.trim()
    ? categories.filter((c) => {
        const q = query.trim().toLowerCase()
        return c.name.toLowerCase().includes(q) || c.id.toLowerCase().includes(q)
      })
    : categories

  const productCount = (categoryId: string) =>
    products.filter((p) => p.categoryId === categoryId).length

  const openCreate = () => {
    setEditing(null)
    setFormOpen(true)
  }

  const openEdit = (category: Category) => {
    setEditing(category)
    setFormOpen(true)
  }

  const handleReorder = async (next: Category[]) => {
    const updates = next
      .map((item, index) => ({ item, order: index }))
      .filter(({ item, order }) => item.order !== order)

    if (!updates.length) return

    try {
      await Promise.all(
        updates.map(({ item, order }) =>
          updateCategory.mutateAsync({ id: item.id, data: { order } }),
        ),
      )
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Не удалось изменить порядок")
    }
  }

  const handleDelete = async (category: Category) => {
    const count = productCount(category.id)
    if (count > 0) {
      await confirm({
        title: "Нельзя удалить категорию",
        description: `В «${category.name}» ещё ${count} товар(ов). Перенесите или удалите товары, затем повторите.`,
        confirmLabel: "Понятно",
        cancelLabel: "Закрыть",
      })
      return
    }

    const ok = await confirm({
      title: `Удалить «${category.name}»?`,
      description: "Теги фильтров этой категории тоже пропадут, если на них нет связей.",
      confirmLabel: "Удалить",
      cancelLabel: "Отмена",
      danger: true,
    })
    if (!ok) return

    try {
      await deleteCategory.mutateAsync(category.id)
      toast.success("Категория удалена")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Не удалось удалить")
    }
  }

  const nextOrder =
    categories.reduce((max, c) => Math.max(max, c.order), -1) + 1

  return (
    <SectionShell
      title="Категории"
      description="Разделы меню, иконки и фильтры витрины. Порядок — как в сайдбаре."
    >
      <Toolbar
        searchPlaceholder="Поиск по названию или коду…"
        onSearchChange={setQuery}
        createLabel="Категория"
        onCreate={openCreate}
      />

      {pending ? (
        <SkeletonRows rows={4} cols={3} />
      ) : !categories.length ? (
        <EmptyState
          title="Категорий пока нет"
          description="Создайте первую — укажите код латиницей и иконку из набора."
          actionLabel="Создать категорию"
          onAction={openCreate}
        />
      ) : !filtered.length ? (
        <EmptyState title="Ничего не найдено" description="Сбросьте поиск или измените запрос." />
      ) : (
        <SortableList
          items={filtered}
          keyOf={(c) => c.id}
          disabled={busy || Boolean(query.trim())}
          onReorder={(next) => void handleReorder(next)}
          renderItem={(category) => {
            const count = productCount(category.id)
            return (
              <div className="flex flex-col gap-3 py-1">
                <div className="flex items-start gap-2.5">
                  {category.icon ? (
                    <img src={category.icon} alt="" className="size-10 shrink-0 object-contain" />
                  ) : (
                    <span className="size-10 shrink-0 rounded-[var(--r-xs)] bg-surface-3" />
                  )}
                  <div className="min-w-0 flex-1 leading-tight">
                    <p className="text-[14px] font-extrabold text-fg">{category.name}</p>
                    <p className="mt-0.5 text-[12px] font-bold text-fg-muted">{category.id}</p>
                    <p className="mt-1 text-[12px] text-fg-soft">
                      {count} товаров · порядок {category.order}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Редактировать ${category.name}`}
                      disabled={busy}
                      onClick={() => openEdit(category)}
                    >
                      <Pencil size={14} strokeWidth={2.3} />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Удалить ${category.name}`}
                      disabled={busy}
                      className="text-fg-faint hover:bg-red-soft hover:text-red"
                      onClick={() => void handleDelete(category)}
                    >
                      <Trash2 size={14} strokeWidth={2.3} />
                    </Button>
                  </div>
                </div>
                <CategoryTagsEditor categoryId={category.id} />
              </div>
            )
          }}
        />
      )}

      <CategoryForm
        open={formOpen}
        onOpenChange={setFormOpen}
        category={editing}
        nextOrder={nextOrder}
      />
      {dialog}
    </SectionShell>
  )
}
