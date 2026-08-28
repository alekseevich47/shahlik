import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

import { useCategories } from "@/entities/category/api"
import { useAdminProducts, useCreateProduct } from "@/entities/product/api"
import type { ProductNutrition } from "@/entities/product/model"
import { slugFromName } from "@/shared/lib/slug"
import { Button } from "@/shared/ui/button"
import { Field, Input, Textarea } from "@/shared/ui/input"
import { IMAGE_MAX_BYTES } from "@/shared/ui/image-field"
import {
  MultiImageField,
  type MultiImageItem,
} from "@/shared/ui/multi-image-field"
import { Select } from "@/shared/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/shared/ui/sheet"

const SLUG_PATTERN = /^[a-z0-9-]+$/
const MAX_PHOTOS = 5
const DEFAULT_NUTRITION: ProductNutrition = { kcal: 0, fat: 0, protein: 0, carbs: 0 }

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultCategoryId?: string
}

export function ProductCreateForm({ open, onOpenChange, defaultCategoryId }: Props) {
  const navigate = useNavigate()
  const { data: categories = [] } = useCategories()
  const { data: products = [] } = useAdminProducts()
  const createProduct = useCreateProduct()
  const busy = createProduct.isPending

  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [tagline, setTagline] = useState("")
  const [composition, setComposition] = useState("")
  const [photos, setPhotos] = useState<MultiImageItem[]>([])

  useEffect(() => {
    if (!open) return
    setName("")
    setSlug("")
    setCategoryId(defaultCategoryId || categories[0]?.id || "")
    setTagline("")
    setComposition("")
    setPhotos([])
  }, [open, defaultCategoryId, categories])

  async function submit() {
    const trimmedName = name.trim()
    const trimmedSlug = (slug.trim() || slugFromName(trimmedName)).trim()
    const trimmedTagline = tagline.trim()
    const trimmedComposition = composition.trim()
    const files = photos
      .filter((p): p is Extract<MultiImageItem, { kind: "new" }> => p.kind === "new")
      .map((p) => p.file)

    if (!trimmedName) {
      toast.error("Укажите название")
      return
    }
    if (!trimmedSlug || !SLUG_PATTERN.test(trimmedSlug)) {
      toast.error("Не удалось получить slug из названия")
      return
    }
    if (!categoryId) {
      toast.error("Выберите категорию")
      return
    }
    if (!trimmedTagline) {
      toast.error("Укажите описание")
      return
    }
    if (!trimmedComposition) {
      toast.error("Укажите состав")
      return
    }
    if (!files.length) {
      toast.error("Добавьте фото")
      return
    }

    try {
      const product = await createProduct.mutateAsync({
        name: trimmedName,
        slug: trimmedSlug,
        categoryId,
        tagline: trimmedTagline,
        composition: trimmedComposition,
        nutrition: DEFAULT_NUTRITION,
        variants: [],
        sizes: [],
        order: products.length ? Math.max(...products.map((p) => p.order)) + 1 : 1,
        active: false,
        image: files.length === 1 ? files[0] : files,
      })
      toast.success("Товар создан")
      onOpenChange(false)
      navigate(`/admin/products/${product.id}`)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Не удалось создать")
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="gap-0 p-0">
        <div className="border-b border-line px-5 py-4 pr-14">
          <SheetTitle className="text-[16px] font-extrabold text-fg">Новый товар</SheetTitle>
          <SheetDescription className="mt-1 text-[12.5px] text-fg-muted">
            Черновик без размеров. Варианты, размеры, цены и витрину — на странице товара.
          </SheetDescription>
        </div>

        <form
          className="flex flex-1 flex-col gap-4 overflow-y-auto px-5 py-4"
          onSubmit={(e) => {
            e.preventDefault()
            void submit()
          }}
        >
          <Field label="Фото" hint={`до ${MAX_PHOTOS}`}>
            <MultiImageField
              items={photos}
              onChange={setPhotos}
              maxCount={MAX_PHOTOS}
              maxBytes={IMAGE_MAX_BYTES.product}
              disabled={busy}
            />
          </Field>

          <Field label="Название">
            <Input
              value={name}
              onChange={(e) => {
                const next = e.target.value
                setName(next)
                setSlug(slugFromName(next))
              }}
              maxLength={200}
              required
              disabled={busy}
            />
          </Field>

          <Field label="Категория">
            <Select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              disabled={busy || !categories.length}
              required
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </Field>

          <Field label="Описание">
            <Textarea
              rows={2}
              maxLength={500}
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              disabled={busy}
              required
            />
          </Field>

          <Field label="Состав" hint={`${composition.length}/1000`}>
            <Textarea
              rows={3}
              maxLength={1000}
              value={composition}
              onChange={(e) => setComposition(e.target.value)}
              disabled={busy}
              required
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
              Создать
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}
