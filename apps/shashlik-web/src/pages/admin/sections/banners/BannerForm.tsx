import { useEffect, useState } from "react"
import { toast } from "sonner"

import {
  useCreateBanner,
  useUpdateBanner,
  type BannerNote,
} from "@/entities/banner/api"
import type { Banner } from "@/entities/banner/model"
import { BANNER_FORMAT_LABEL } from "@/entities/banner/format"
import { Button } from "@/shared/ui/button"
import { Field, Input } from "@/shared/ui/input"
import { BannerImageField } from "@/shared/ui/banner-image-field"
import { IMAGE_MAX_BYTES } from "@/shared/ui/image-field"
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/shared/ui/sheet"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  banner?: Banner | null
  nextOrder: number
}

function normalizeNote(title: string, text: string): BannerNote | null {
  const t = title.trim()
  const body = text.trim()
  if (!t && !body) return null
  return { title: t || "Контроль качества", text: body }
}

export function BannerForm({ open, onOpenChange, banner, nextOrder }: Props) {
  const isEdit = Boolean(banner)
  const createBanner = useCreateBanner()
  const updateBanner = useUpdateBanner()
  const busy = createBanner.isPending || updateBanner.isPending

  const [title, setTitle] = useState("")
  const [subtitle, setSubtitle] = useState("")
  const [noteTitle, setNoteTitle] = useState("")
  const [noteText, setNoteText] = useState("")
  const [image, setImage] = useState<File | null>(null)

  useEffect(() => {
    if (!open) return
    setTitle(banner?.title ?? "")
    setSubtitle(banner?.subtitle ?? "")
    setNoteTitle(banner?.note?.title ?? "")
    setNoteText(banner?.note?.text ?? "")
    setImage(null)
  }, [open, banner])

  async function submit() {
    const trimmedTitle = title.trim()
    const trimmedSubtitle = subtitle.trim()

    if (!trimmedTitle) {
      toast.error("Укажите заголовок")
      return
    }
    if (!trimmedSubtitle) {
      toast.error("Укажите подзаголовок")
      return
    }
    if (!isEdit && !image) {
      toast.error("Добавьте изображение")
      return
    }

    const note = normalizeNote(noteTitle, noteText)

    try {
      if (isEdit && banner) {
        await updateBanner.mutateAsync({
          id: banner.id,
          data: {
            title: trimmedTitle,
            subtitle: trimmedSubtitle,
            note,
            ...(image ? { image } : {}),
          },
        })
      } else {
        await createBanner.mutateAsync({
          title: trimmedTitle,
          subtitle: trimmedSubtitle,
          order: nextOrder,
          note,
          image: image!,
        })
      }
      toast.success(isEdit ? "Сохранено" : "Баннер создан")
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
            {isEdit ? "Редактировать баннер" : "Новый баннер"}
          </SheetTitle>
          <SheetDescription className="mt-1 text-[12.5px] text-fg-muted">
            Карусель на главной. Изображение — {BANNER_FORMAT_LABEL}, обрезка в форме. Плашку можно
            оставить пустой — она скроется.
          </SheetDescription>
        </div>

        <form
          className="flex flex-1 flex-col gap-4 overflow-y-auto px-5 py-4"
          onSubmit={(e) => {
            e.preventDefault()
            void submit()
          }}
        >
          <Field label="Изображение" hint={`Формат ${BANNER_FORMAT_LABEL} — подгоняется при загрузке`}>
            <BannerImageField
              previewUrl={banner?.image || null}
              value={image}
              onChange={setImage}
              maxBytes={IMAGE_MAX_BYTES.banner}
              disabled={busy}
            />
          </Field>

          <Field label="Заголовок">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Шаурма"
              maxLength={200}
              required
              disabled={busy}
            />
          </Field>

          <Field label="Подзаголовок">
            <Input
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Сочная, сытная и свежая"
              maxLength={500}
              required
              disabled={busy}
            />
          </Field>

          <div className="rounded-[var(--r-md)] border border-line bg-surface-2 p-3">
            <p className="mb-3 text-[12px] font-bold text-fg-muted">
              Плашка в углу (необязательно)
            </p>
            <div className="flex flex-col gap-3">
              <Field label="Заголовок плашки">
                <Input
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  placeholder="Контроль качества"
                  maxLength={80}
                  disabled={busy}
                />
              </Field>
              <Field label="Текст плашки">
                <Input
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="100% свежие продукты"
                  maxLength={120}
                  disabled={busy}
                />
              </Field>
            </div>
          </div>

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
