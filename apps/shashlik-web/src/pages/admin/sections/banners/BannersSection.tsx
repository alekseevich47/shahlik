import { Pencil, Trash2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import {
  useBanners,
  useDeleteBanner,
  useUpdateBanner,
} from "@/entities/banner/api"
import type { Banner } from "@/entities/banner/model"
import { BannerForm } from "@/pages/admin/sections/banners/BannerForm"
import { EmptyState } from "@/pages/admin/ui/EmptyState"
import { SectionShell } from "@/pages/admin/ui/SectionShell"
import { SkeletonRows } from "@/pages/admin/ui/SkeletonRows"
import { SortableList } from "@/pages/admin/ui/SortableList"
import { Toolbar } from "@/pages/admin/ui/Toolbar"
import { Button } from "@/shared/ui/button"
import { useConfirm } from "@/shared/ui/confirm-dialog"

export function BannersSection() {
  const { data: banners = [], isPending } = useBanners()
  const updateBanner = useUpdateBanner()
  const deleteBanner = useDeleteBanner()
  const { confirm, dialog } = useConfirm()

  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Banner | null>(null)
  const [query, setQuery] = useState("")

  const busy = updateBanner.isPending || deleteBanner.isPending

  const filtered = query.trim()
    ? banners.filter((b) =>
        (b.note?.title ?? "").toLowerCase().includes(query.trim().toLowerCase()),
      )
    : banners

  const openCreate = () => {
    setEditing(null)
    setFormOpen(true)
  }

  const openEdit = (banner: Banner) => {
    setEditing(banner)
    setFormOpen(true)
  }

  const handleReorder = async (next: Banner[]) => {
    const updates = next
      .map((item, index) => ({ item, order: index + 1 }))
      .filter(({ item, order }) => item.order !== order)

    if (!updates.length) return

    try {
      await Promise.all(
        updates.map(({ item, order }) =>
          updateBanner.mutateAsync({ id: item.id, data: { order } }),
        ),
      )
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Не удалось изменить порядок")
    }
  }

  const handleDelete = async (banner: Banner, label: string) => {
    const ok = await confirm({
      title: `Удалить ${label}?`,
      description: "Баннер исчезнет из карусели на главной.",
      confirmLabel: "Удалить",
      cancelLabel: "Отмена",
      danger: true,
    })
    if (!ok) return

    try {
      await deleteBanner.mutateAsync(banner.id)
      toast.success("Удалено")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Не удалось удалить")
    }
  }

  const nextOrder = banners.reduce((max, b) => Math.max(max, b.order), 0) + 1

  return (
    <SectionShell
      title="Баннеры"
      description="Карусель на главной. Порядок — стрелками; пустая плашка скрывается."
    >
      <Toolbar
        searchPlaceholder="Поиск по плашке…"
        onSearchChange={setQuery}
        createLabel="Баннер"
        onCreate={openCreate}
      />

      {isPending ? (
        <SkeletonRows rows={3} cols={3} />
      ) : !banners.length ? (
        <EmptyState
          title="Баннеров пока нет"
          description="Добавьте первый — фото и опциональная плашка."
          actionLabel="Создать баннер"
          onAction={openCreate}
        />
      ) : !filtered.length ? (
        <EmptyState title="Ничего не найдено" description="Сбросьте поиск или измените запрос." />
      ) : (
        <SortableList
          items={filtered}
          keyOf={(b) => b.id}
          disabled={busy || Boolean(query.trim())}
          onReorder={(next) => void handleReorder(next)}
          renderItem={(banner, index) => {
            const label = `Баннер ${banner.order || index + 1}`
            return (
            <div className="flex items-center gap-2.5 py-0.5">
              <img
                src={banner.image}
                alt=""
                className="h-12 w-[72px] shrink-0 rounded-[var(--r-xs)] object-cover"
              />
              <div className="min-w-0 flex-1 leading-tight">
                <p className="text-[14px] font-extrabold text-fg">{label}</p>
                <p className="mt-1 text-[12px] text-fg-soft">
                  {banner.note?.title ? `Плашка: ${banner.note.title}` : "Без плашки"} · порядок{" "}
                  {banner.order}
                </p>
              </div>
              <div className="flex shrink-0 gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label={`Редактировать ${label}`}
                  disabled={busy}
                  onClick={() => openEdit(banner)}
                >
                  <Pencil size={14} strokeWidth={2.3} />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label={`Удалить ${label}`}
                  disabled={busy}
                  className="text-fg-faint hover:bg-red-soft hover:text-red"
                  onClick={() => void handleDelete(banner, label)}
                >
                  <Trash2 size={14} strokeWidth={2.3} />
                </Button>
              </div>
            </div>
            )
          }}
        />
      )}

      <BannerForm
        open={formOpen}
        onOpenChange={setFormOpen}
        banner={editing}
        nextOrder={nextOrder}
      />
      {dialog}
    </SectionShell>
  )
}
