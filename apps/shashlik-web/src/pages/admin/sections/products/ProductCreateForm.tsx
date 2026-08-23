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
import { Switch } from "@/shared/ui/switch"

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
  const [slugTouched, setSlugTouched] = useState(false)
  const [categoryId, setCategoryId] = useState("")
  const [tagline, setTagline] = useState("")
  const [composition, setComposition] = useState("")
  const [price, setPrice] = useState("")
  const [sizeLabel, setSizeLabel] = useState("Стандарт")
  const [active, setActive] = useState(true)
  const [photos, setPhotos] = useState<MultiImageItem[]>([])

  useEffect(() => {
    if (!open) return
    setName("")
    setSlug("")
    setSlugTouched(false)
    setCategoryId(defaultCategoryId || categories[0]?.id || "")
    setTagline("")
    setComposition("")
    setPrice("")
    setSizeLabel("Стандарт")
    setActive(true)
    setPhotos([])
  }, [open, defaultCategoryId, categories])

  async function submit() {
    const trimmedName = name.trim()
    const trimmedSlug = slug.trim()
    const trimmedTagline = tagline.trim()
    const trimmedComposition = composition.trim()
    const priceNum = Number(price.replace(",", "."))
    const files = photos
      .filter((p): p is Extract<MultiImageItem, { kind: "new" }> => p.kind === "new")
      .map((p) => p.file)

    if (!trimmedName) {
      toast.error("Укажите название")
      return
    }
    if (!trimmedSlug || !SLUG_PATTERN.test(trimmedSlug)) {
      toast.error("Slug: латиница, цифры и дефис")
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
    if (!Number.isFinite(priceNum) || priceNum < 0) {
      toast.error("Цена — число ≥ 0")
      return
    }
    if (!sizeLabel.trim()) {
      toast.error("Укажите размер")
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
        sizes: [{ id: "std", label: sizeLabel.trim(), price: priceNum }],
        order: products.length ? Math.max(...products.map((p) => p.order)) + 1 : 1,
        active,
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
            Базовые поля и один размер. Варианты мяса и матрицу артикулов — на странице товара.
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
                if (!slugTouched) setSlug(slugFromName(next))
              }}
              maxLength={200}
              required
              disabled={busy}
            />
          </Field>

          <Field label="Slug" hint="URL /product/…">
            <Input
              value={slug}
              onChange={(e) => {
                setSlugTouched(true)
                setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))
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

          <div className="grid grid-cols-2 gap-3">
            <Field label="Размер">
              <Input
                value={sizeLabel}
                onChange={(e) => setSizeLabel(e.target.value)}
                maxLength={40}
                disabled={busy}
                required
              />
            </Field>
            <Field label="Цена, ₽">
              <Input
                value={price}
                onChange={(e) => setPrice(e.target.value.replace(/[^\d.,]/g, ""))}
                inputMode="decimal"
                disabled={busy}
                required
              />
            </Field>
          </div>

          <div className="flex items-center justify-between gap-3 rounded-[var(--r-md)] border border-line px-3 py-2.5">
            <span className="text-[12.5px] font-bold text-fg">Активен на витрине</span>
            <Switch checked={active} onCheckedChange={setActive} disabled={busy} />
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
              Создать
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}
