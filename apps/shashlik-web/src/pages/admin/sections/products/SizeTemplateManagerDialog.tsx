import * as Dialog from "@radix-ui/react-dialog"
import { Plus, Trash2, X } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

import {
  useCreateSizeTemplate,
  useDeleteSizeTemplate,
  useSizeTemplates,
  useUpdateSizeTemplate,
} from "@/entities/size-template/api"
import type { SizeTemplate } from "@/entities/size-template/model"
import { cn } from "@/shared/lib/cn"
import { Button } from "@/shared/ui/button"
import { Field, Input } from "@/shared/ui/input"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SizeTemplateManagerDialog({ open, onOpenChange }: Props) {
  const { data: templates = [] } = useSizeTemplates()
  const createTemplate = useCreateSizeTemplate()
  const updateTemplate = useUpdateSizeTemplate()
  const deleteTemplate = useDeleteSizeTemplate()
  const busy =
    createTemplate.isPending || updateTemplate.isPending || deleteTemplate.isPending

  const [drafts, setDrafts] = useState<SizeTemplate[]>([])
  const [newLabel, setNewLabel] = useState("")
  const [newWeight, setNewWeight] = useState("")

  useEffect(() => {
    if (!open) return
    setDrafts(templates.map((t) => ({ ...t })))
    setNewLabel("")
    setNewWeight("")
  }, [open, templates])

  const isLocalOnly = drafts.some((t) => t.id.startsWith("local-"))

  async function saveRow(id: string) {
    const row = drafts.find((t) => t.id === id)
    const original = templates.find((t) => t.id === id)
    if (!row) return
    const label = row.label.trim()
    const weight = row.weight.trim()
    if (!label || !weight) {
      toast.error("Укажите название и вес")
      return
    }
    if (
      original &&
      original.label === label &&
      original.weight === weight &&
      original.order === row.order
    ) {
      return
    }
    if (row.id.startsWith("local-")) {
      toast.error("Сначала создайте коллекцию size_templates в PocketBase")
      return
    }
    try {
      await updateTemplate.mutateAsync({
        id: row.id,
        data: { label, weight, order: row.order },
      })
      toast.success("Шаблон обновлён")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Не удалось сохранить")
    }
  }

  async function remove(row: SizeTemplate) {
    if (row.id.startsWith("local-")) {
      toast.error("Сначала создайте коллекцию size_templates в PocketBase")
      return
    }
    try {
      await deleteTemplate.mutateAsync(row.id)
      setDrafts((list) => list.filter((t) => t.id !== row.id))
      toast.success("Шаблон удалён")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Не удалось удалить")
    }
  }

  async function add() {
    const label = newLabel.trim()
    const weight = newWeight.trim()
    if (!label || !weight) {
      toast.error("Укажите название и вес")
      return
    }
    if (isLocalOnly) {
      toast.error("Сначала создайте коллекцию size_templates в PocketBase")
      return
    }
    try {
      const order = drafts.length ? Math.max(...drafts.map((t) => t.order)) + 1 : 1
      await createTemplate.mutateAsync({ label, weight, order })
      setNewLabel("")
      setNewWeight("")
      toast.success("Шаблон создан")
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
            "fixed top-1/2 left-1/2 z-201 w-[min(460px,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2",
            "flex max-h-[min(560px,85vh)] flex-col rounded-[var(--r-xl)] border border-line bg-surface shadow-[var(--shadow-panel)] outline-none",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          )}
        >
          <div className="flex items-start justify-between gap-3 border-b border-line px-5 py-4 pr-12">
            <div>
              <Dialog.Title className="text-[16px] font-extrabold text-fg">
                Шаблоны размеров
              </Dialog.Title>
              <Dialog.Description className="mt-1 text-[12px] text-fg-muted">
                Название и весовка для быстрого выбора в карточке товара.
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
            {drafts.map((row) => (
              <div
                key={row.id}
                className="grid grid-cols-[1fr_1fr_auto] items-end gap-2 rounded-[var(--r-md)] border border-line bg-surface-2 p-2.5"
              >
                <Field label="Название">
                  <Input
                    value={row.label}
                    disabled={busy}
                    onChange={(e) =>
                      setDrafts((list) =>
                        list.map((t) => (t.id === row.id ? { ...t, label: e.target.value } : t)),
                      )
                    }
                    onBlur={() => void saveRow(row.id)}
                  />
                </Field>
                <Field label="Вес">
                  <Input
                    value={row.weight}
                    disabled={busy}
                    placeholder="300 г"
                    onChange={(e) =>
                      setDrafts((list) =>
                        list.map((t) => (t.id === row.id ? { ...t, weight: e.target.value } : t)),
                      )
                    }
                    onBlur={() => void saveRow(row.id)}
                  />
                </Field>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="shrink-0 self-end text-fg-faint hover:bg-red-soft hover:text-red"
                  aria-label={`Удалить «${row.label}»`}
                  disabled={busy}
                  onClick={() => void remove(row)}
                >
                  <Trash2 size={14} strokeWidth={2.3} />
                </Button>
              </div>
            ))}

            <div className="grid grid-cols-[1fr_1fr_auto] items-end gap-2 border-t border-line pt-3">
              <Input
                value={newLabel}
                placeholder="M"
                disabled={busy}
                onChange={(e) => setNewLabel(e.target.value)}
              />
              <Input
                value={newWeight}
                placeholder="300 г"
                disabled={busy}
                onChange={(e) => setNewWeight(e.target.value)}
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
