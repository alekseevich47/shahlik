import { useEffect, useState } from "react"
import { toast } from "sonner"

import type { Category } from "@/entities/category/model"
import { useCreateCategory, useUpdateCategory } from "@/entities/category/api"
import { CATEGORY_ICONS } from "@/shared/config/icons"
import { cn } from "@/shared/lib/cn"
import { Button } from "@/shared/ui/button"
import { Field, Input } from "@/shared/ui/input"
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/shared/ui/sheet"

const ID_PATTERN = /^[a-z]+$/

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  category?: Category | null
  nextOrder: number
}

export function CategoryForm({ open, onOpenChange, category, nextOrder }: Props) {
  const isEdit = Boolean(category)
  const createCategory = useCreateCategory()
  const updateCategory = useUpdateCategory()
  const busy = createCategory.isPending || updateCategory.isPending

  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [icon, setIcon] = useState<string | null>(null)

  useEffect(() => {
    if (!open) return
    setId(category?.id ?? "")
    setName(category?.name ?? "")
    setIcon(category?.icon ?? null)
  }, [open, category])

  async function submit() {
    const trimmedName = name.trim()
    if (!trimmedName) {
      toast.error("Укажите название")
      return
    }

    try {
      if (isEdit && category) {
        await updateCategory.mutateAsync({
          id: category.id,
          data: { name: trimmedName, icon: icon ?? "" },
        })
      } else {
        const code = id.trim().toLowerCase()
        if (code.length < 3 || code.length > 20 || !ID_PATTERN.test(code)) {
          toast.error("Код: только a–z, длина 3–20")
          return
        }
        await createCategory.mutateAsync({
          id: code,
          name: trimmedName,
          icon: icon ?? "",
          order: nextOrder,
        })
      }
      toast.success(isEdit ? "Категория сохранена" : "Категория создана")
      onOpenChange(false)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Не удалось сохранить")
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="gap-0 p-0">
        <div className="border-b border-line px-5 py-4 pr-14">
          <SheetTitle className="text-[16px] font-extrabold text-fg">
            {isEdit ? "Редактировать категорию" : "Новая категория"}
          </SheetTitle>
          <SheetDescription className="mt-1 text-[12.5px] text-fg-muted">
            Код — латиница без цифр (3–20 символов). Иконка из брендового набора.
          </SheetDescription>
        </div>

        <form
          className="flex flex-1 flex-col gap-4 overflow-y-auto px-5 py-4"
          onSubmit={(e) => {
            e.preventDefault()
            void submit()
          }}
        >
          {!isEdit ? (
            <Field label="Код" hint="Станет id в PocketBase, потом не меняется">
              <Input
                value={id}
                onChange={(e) => setId(e.target.value.toLowerCase().replace(/[^a-z]/g, ""))}
                placeholder="sides"
                maxLength={20}
                autoComplete="off"
                required
              />
            </Field>
          ) : (
            <p className="text-[12px] font-bold text-fg-muted">
              Код: <span className="text-fg">{category!.id}</span>
            </p>
          )}

          <Field label="Название">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Гарниры"
              maxLength={100}
              required
            />
          </Field>

          <Field label="Иконка">
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
              <button
                type="button"
                aria-label="Без иконки"
                aria-pressed={icon === null}
                onClick={() => setIcon(null)}
                className={cn(
                  "grid aspect-square place-items-center rounded-[var(--r-md)] border bg-surface-3 text-[11px] font-bold text-fg-faint transition-colors",
                  icon === null
                    ? "border-brand-border ring-2 ring-brand/25"
                    : "border-line hover:border-brand-border",
                )}
              >
                —
              </button>
              {CATEGORY_ICONS.map((path) => (
                <button
                  key={path}
                  type="button"
                  aria-label={path}
                  aria-pressed={icon === path}
                  onClick={() => setIcon(path)}
                  className={cn(
                    "grid aspect-square place-items-center rounded-[var(--r-md)] border bg-surface p-1.5 transition-colors",
                    icon === path
                      ? "border-brand-border ring-2 ring-brand/25"
                      : "border-line hover:border-brand-border",
                  )}
                >
                  <img src={path} alt="" className="size-full object-contain" />
                </button>
              ))}
            </div>
          </Field>

          <div className="mt-auto flex gap-2 border-t border-line pt-4">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="flex-1"
              disabled={busy}
              onClick={() => onOpenChange(false)}
            >
              Отмена
            </Button>
            <Button type="submit" variant="brand" size="sm" className="flex-1" disabled={busy}>
              {isEdit ? "Сохранить" : "Создать"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}
