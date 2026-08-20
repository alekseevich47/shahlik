import { useEffect, useState } from "react"
import { toast } from "sonner"

import {
  useAddons,
  useCreateAddon,
  useUpdateAddon,
} from "@/entities/addon/api"
import type { Addon, AddonKind } from "@/entities/addon/model"
import { useAdminProducts } from "@/entities/product/api"
import {
  ARTICLE_PATTERN,
  articleConflictMessage,
} from "@/entities/product/lib/articles"
import { Button } from "@/shared/ui/button"
import { Field, Input } from "@/shared/ui/input"
import { ImageField, IMAGE_MAX_BYTES } from "@/shared/ui/image-field"
import { Select } from "@/shared/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/shared/ui/sheet"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  addon?: Addon | null
  defaultKind?: AddonKind
}

export function AddonForm({ open, onOpenChange, addon, defaultKind = "extra" }: Props) {
  const isEdit = Boolean(addon)
  const createAddon = useCreateAddon()
  const updateAddon = useUpdateAddon()
  const { data: addons = [] } = useAddons()
  const { data: products = [] } = useAdminProducts()
  const busy = createAddon.isPending || updateAddon.isPending

  const [name, setName] = useState("")
  const [weight, setWeight] = useState("")
  const [price, setPrice] = useState("")
  const [kind, setKind] = useState<AddonKind>("extra")
  const [article, setArticle] = useState("")
  const [image, setImage] = useState<File | null>(null)

  useEffect(() => {
    if (!open) return
    setName(addon?.name ?? "")
    setWeight(addon?.weight ?? "")
    setPrice(addon ? String(addon.price) : "")
    setKind(addon?.kind ?? defaultKind)
    setArticle(addon?.article ?? "")
    setImage(null)
  }, [open, addon, defaultKind])

  async function submit() {
    const trimmedName = name.trim()
    const trimmedWeight = weight.trim()
    const priceNum = Number(price.replace(",", "."))

    if (!trimmedName) {
      toast.error("Укажите название")
      return
    }
    if (!trimmedWeight) {
      toast.error("Укажите вес")
      return
    }
    if (!Number.isFinite(priceNum) || priceNum < 0) {
      toast.error("Цена — число ≥ 0")
      return
    }

    const trimmedArticle = article.trim()
    if (trimmedArticle) {
      if (!ARTICLE_PATTERN.test(trimmedArticle)) {
        toast.error("Артикул — только цифры")
        return
      }
      const conflict = articleConflictMessage(trimmedArticle, products, addons, {
        addonId: addon?.id,
      })
      if (conflict) {
        toast.error(conflict)
        return
      }
    }

    if (!isEdit && !image) {
      toast.error("Добавьте фото")
      return
    }

    try {
      if (isEdit && addon) {
        await updateAddon.mutateAsync({
          id: addon.id,
          data: {
            name: trimmedName,
            weight: trimmedWeight,
            price: priceNum,
            kind,
            article: trimmedArticle,
            ...(image ? { image } : {}),
          },
        })
      } else {
        await createAddon.mutateAsync({
          name: trimmedName,
          weight: trimmedWeight,
          price: priceNum,
          kind,
          article: trimmedArticle || undefined,
          image: image!,
        })
      }
      toast.success(isEdit ? "Сохранено" : "Добавка создана")
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
            {isEdit ? "Редактировать" : "Новая позиция"}
          </SheetTitle>
          <SheetDescription className="mt-1 text-[12.5px] text-fg-muted">
            Добавка или соус. Артикул — цифры, уникальный по всей рознице.
          </SheetDescription>
        </div>

        <form
          className="flex flex-1 flex-col gap-4 overflow-y-auto px-5 py-4"
          onSubmit={(e) => {
            e.preventDefault()
            void submit()
          }}
        >
          <Field label="Фото">
            <ImageField
              previewUrl={addon?.image || null}
              value={image}
              onChange={setImage}
              maxBytes={IMAGE_MAX_BYTES.addon}
              disabled={busy}
            />
          </Field>

          <Field label="Тип">
            <Select
              value={kind}
              onChange={(e) => setKind(e.target.value as AddonKind)}
              disabled={busy}
            >
              <option value="extra">Добавка</option>
              <option value="sauce">Соус</option>
            </Select>
          </Field>

          <Field label="Название">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Сыр моцарелла"
              maxLength={100}
              required
              disabled={busy}
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Вес" hint="Например 30г">
              <Input
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="30г"
                maxLength={20}
                required
                disabled={busy}
              />
            </Field>
            <Field label="Цена, ₽">
              <Input
                value={price}
                onChange={(e) => setPrice(e.target.value.replace(/[^\d.,]/g, ""))}
                placeholder="35"
                inputMode="decimal"
                required
                disabled={busy}
              />
            </Field>
          </div>

          <Field label="Артикул" hint="Только цифры, уникальный">
            <Input
              value={article}
              onChange={(e) => setArticle(e.target.value.replace(/\D/g, ""))}
              placeholder="31124"
              maxLength={32}
              inputMode="numeric"
              autoComplete="off"
              disabled={busy}
            />
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
