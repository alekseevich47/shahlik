import * as Dialog from "@radix-ui/react-dialog"
import { Plus, Trash2, X } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

import {
  useBadges,
  useCreateBadge,
  useDeleteBadge,
  useUpdateBadge,
} from "@/entities/badge/api"
import type { ProductBadgeDef } from "@/entities/badge/model"
import { cn } from "@/shared/lib/cn"
import { Button } from "@/shared/ui/button"
import { Field, Input } from "@/shared/ui/input"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

function slugify(label: string): string {
  return label
    .trim()
    .toLowerCase()
    .replace(/ё/g, "e")
    .replace(/[^a-z0-9а-я]+/gi, "-")
    .replace(/[а-я]/gi, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40)
}

export function BadgeManagerDialog({ open, onOpenChange }: Props) {
  const { data: badges = [] } = useBadges()
  const createBadge = useCreateBadge()
  const updateBadge = useUpdateBadge()
  const deleteBadge = useDeleteBadge()
  const busy =
    createBadge.isPending || updateBadge.isPending || deleteBadge.isPending

  const [drafts, setDrafts] = useState<ProductBadgeDef[]>([])
  const [newLabel, setNewLabel] = useState("")

  useEffect(() => {
    if (!open) return
    setDrafts(badges.map((b) => ({ ...b })))
    setNewLabel("")
  }, [open, badges])

  const isLocalOnly = drafts.some((b) => b.id.startsWith("local-"))

  async function saveRow(id: string) {
    const badge = drafts.find((b) => b.id === id)
    const original = badges.find((b) => b.id === id)
    if (!badge) return
    const label = badge.label.trim()
    const slug = badge.slug.trim()
    if (!label || !slug) {
      toast.error("Укажите название и slug")
      return
    }
    if (
      original &&
      original.label === label &&
      original.slug === slug &&
      original.order === badge.order
    ) {
      return
    }
    if (badge.id.startsWith("local-")) {
      toast.error("Сначала создайте коллекцию product_badges в PocketBase")
      return
    }
    try {
      await updateBadge.mutateAsync({
        id: badge.id,
        data: { label, slug, order: badge.order },
      })
      toast.success("Бейдж обновлён")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Не удалось сохранить")
    }
  }

  async function remove(badge: ProductBadgeDef) {
    if (badge.id.startsWith("local-")) {
      toast.error("Сначала создайте коллекцию product_badges в PocketBase")
      return
    }
    try {
      await deleteBadge.mutateAsync(badge.id)
      setDrafts((list) => list.filter((b) => b.id !== badge.id))
      toast.success("Бейдж удалён")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Не удалось удалить")
    }
  }

  async function add() {
    const label = newLabel.trim()
    if (!label) {
      toast.error("Укажите название")
      return
    }
    const slug = slugify(label)
    if (!slug) {
      toast.error("Slug: латиница и дефис")
      return
    }
    if (drafts.some((b) => b.slug === slug)) {
      toast.error("Такой slug уже есть")
      return
    }
    if (isLocalOnly) {
      toast.error("Сначала создайте коллекцию product_badges в PocketBase")
      return
    }
    try {
      const order = drafts.length ? Math.max(...drafts.map((b) => b.order)) + 1 : 1
      await createBadge.mutateAsync({ label, slug, order })
      setNewLabel("")
      toast.success("Бейдж создан")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Не удалось создать")
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            "fixed inset-0 z-200 bg-black/45 backdrop-blur-[2px]",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
          )}
        />
        <Dialog.Content
          className={cn(
            "fixed top-1/2 left-1/2 z-201 w-[min(420px,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2",
            "flex max-h-[min(560px,85vh)] flex-col rounded-[var(--r-xl)] border border-line bg-surface shadow-[var(--shadow-panel)] outline-none",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          )}
        >
          <div className="flex items-start justify-between gap-3 border-b border-line px-5 py-4 pr-12">
            <div>
              <Dialog.Title className="text-[16px] font-extrabold text-fg">
                Бейджи товаров
              </Dialog.Title>
              <Dialog.Description className="mt-1 text-[12px] text-fg-muted">
                Создайте, переименуйте или удалите метки на карточке.
              </Dialog.Description>
            </div>
            <Dialog.Close
              aria-label="Закрыть"
              className="absolute top-3.5 right-3.5 grid size-8 cursor-pointer place-items-center rounded-[var(--r-sm)] text-fg-muted transition-colors hover:bg-surface-3 hover:text-fg"
            >
              <X size={16} strokeWidth={2.4} />
            </Dialog.Close>
          </div>

          <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-5 py-4">
            {drafts.map((badge) => (
              <div
                key={badge.id}
                className="grid gap-2 rounded-[var(--r-md)] border border-line bg-surface-2 p-2.5 sm:grid-cols-[1fr_100px_auto]"
              >
                <Field label="Название">
                  <Input
                    value={badge.label}
                    disabled={busy}
                    onChange={(e) =>
                      setDrafts((list) =>
                        list.map((b) =>
                          b.id === badge.id ? { ...b, label: e.target.value } : b,
                        ),
                      )
                    }
                    onBlur={() => void saveRow(badge.id)}
                  />
                </Field>
                <Field label="Slug">
                  <Input
                    value={badge.slug}
                    disabled={busy}
                    onChange={(e) =>
                      setDrafts((list) =>
                        list.map((b) =>
                          b.id === badge.id
                            ? {
                                ...b,
                                slug: e.target.value
                                  .toLowerCase()
                                  .replace(/[^a-z0-9-]/g, "")
                                  .slice(0, 40),
                              }
                            : b,
                        ),
                      )
                    }
                    onBlur={() => void saveRow(badge.id)}
                  />
                </Field>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="self-end text-fg-faint hover:bg-red-soft hover:text-red"
                  aria-label={`Удалить «${badge.label}»`}
                  disabled={busy}
                  onClick={() => void remove(badge)}
                >
                  <Trash2 size={14} strokeWidth={2.3} />
                </Button>
              </div>
            ))}

            <div className="flex gap-2 border-t border-line pt-3">
              <Input
                value={newLabel}
                placeholder="Новый бейдж"
                disabled={busy}
                onChange={(e) => setNewLabel(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    void add()
                  }
                }}
              />
              <Button
                type="button"
                variant="brand"
                size="sm"
                disabled={busy}
                onClick={() => void add()}
              >
                <Plus size={14} strokeWidth={3} />
                Создать
              </Button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
