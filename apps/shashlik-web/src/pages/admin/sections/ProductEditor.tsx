import {
  ArrowLeft,
  Copy,
  Drumstick,
  ExternalLink,
  GripVertical,
  Ham,
  Lightbulb,
  Monitor,
  Plus,
  Smartphone,
  Trash2,
  X,
} from "lucide-react"
import { useEffect, useState, type DragEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"

import { useBadges } from "@/entities/badge/api"
import { badgeLabel } from "@/entities/badge/model"
import { useCategories } from "@/entities/category/api"
import { ARTICLE_PATTERN, articleConflictMessage } from "@/entities/product/lib/articles"
import { minPrice, skuMatrix } from "@/entities/product/lib"
import { PRODUCT_ASPECT_RATIO } from "@/entities/product/format"
import type {
  MeatIcon,
  Product,
  ProductBadge,
  ProductNutrition,
  ProductSize,
  ProductVariant,
  RatingCriterion,
} from "@/entities/product/model"
import { criterionScore } from "@/entities/product/model"
import { useAddons } from "@/entities/addon/api"
import {
  useAdminProducts,
  useDeleteProduct,
  useDuplicateProduct,
  useUpdateProduct,
} from "@/entities/product/api"
import { useCategoryTags } from "@/entities/tag/api"
import { ArticleMatrix } from "@/pages/admin/sections/products/ArticleMatrix"
import { BadgeManagerDialog } from "@/pages/admin/sections/products/BadgeManagerDialog"
import { slugFromName } from "@/shared/lib/slug"
import { AdminCard } from "@/pages/admin/ui/AdminCard"
import { cn } from "@/shared/lib/cn"
import { formatDate, formatPrice } from "@/shared/lib/format"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import { Chip } from "@/shared/ui/chip"
import { useConfirm } from "@/shared/ui/confirm-dialog"
import { Field, Input, Textarea } from "@/shared/ui/input"
import { IMAGE_MAX_BYTES } from "@/shared/ui/image-field"
import {
  MultiImageField,
  multiImageDiff,
  type MultiImageItem,
} from "@/shared/ui/multi-image-field"
import { scoreColor } from "@/shared/ui/rating"
import { Select } from "@/shared/ui/select"
import { Switch } from "@/shared/ui/switch"

type Props = {
  product: Product
  onBack: () => void
}

const MEAT_OPTIONS: Array<{ value: MeatIcon; label: string }> = [
  { value: "chicken", label: "Курица" },
  { value: "pork", label: "Свинина" },
  { value: null, label: "Без иконки" },
]

const MAX_PHOTOS = 5

function newId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`
}

function imagesFromProduct(product: Product): MultiImageItem[] {
  const urls = product.images.length ? product.images : product.image ? [product.image] : []
  return urls.map((url, index) => ({
    kind: "existing" as const,
    key: `ex-${product.imageFilenames[index] ?? index}`,
    url,
    filename: product.imageFilenames[index] ?? `legacy-${index}`,
  }))
}

function moveCriterion(list: RatingCriterion[], from: number, to: number): RatingCriterion[] {
  if (to < 0 || to >= list.length) return list
  const next = list.slice()
  const [item] = next.splice(from, 1)
  next.splice(to, 0, item)
  return next
}

export function ProductEditor({ product, onBack }: Props) {
  const navigate = useNavigate()
  const { data: categories = [] } = useCategories()
  const { data: products = [] } = useAdminProducts()
  const { data: addons = [] } = useAddons()
  const { data: badges = [] } = useBadges()
  const updateProduct = useUpdateProduct()
  const deleteProduct = useDeleteProduct()
  const duplicateProduct = useDuplicateProduct()
  const { confirm, dialog } = useConfirm()
  const busy =
    updateProduct.isPending || deleteProduct.isPending || duplicateProduct.isPending

  const [name, setName] = useState(product.name)
  const [slug, setSlug] = useState(product.slug)
  const [slugTouched, setSlugTouched] = useState(true)
  const [categoryId, setCategoryId] = useState<string>(product.categoryId)
  const [tagline, setTagline] = useState(product.tagline)
  const [composition, setComposition] = useState(product.composition)
  const [badge, setBadge] = useState<"" | ProductBadge>(product.badge ?? "")
  const [badgeManagerOpen, setBadgeManagerOpen] = useState(false)
  const [nutrition, setNutrition] = useState<ProductNutrition>(product.nutrition)
  const [tags, setTags] = useState<string[]>(product.tags)
  const [variants, setVariants] = useState<ProductVariant[]>(product.variants)
  const [sizes, setSizes] = useState<ProductSize[]>(product.sizes)
  const [active, setActive] = useState(product.active)
  const [photoItems, setPhotoItems] = useState<MultiImageItem[]>(() => imagesFromProduct(product))
  const [initialFilenames, setInitialFilenames] = useState(product.imageFilenames)
  const [criteria, setCriteria] = useState(product.rating.criteria)
  const [preview, setPreview] = useState<"desktop" | "mobile">("desktop")
  const [previewIndex, setPreviewIndex] = useState(0)
  const [dragIndex, setDragIndex] = useState<number | null>(null)

  const { data: categoryTags, isPending: categoryTagsPending } = useCategoryTags(categoryId)

  useEffect(() => {
    setName(product.name)
    setSlug(product.slug)
    setSlugTouched(true)
    setCategoryId(product.categoryId)
    setTagline(product.tagline)
    setComposition(product.composition)
    setBadge(product.badge ?? "")
    setNutrition(product.nutrition)
    setTags(product.tags)
    setVariants(product.variants)
    setSizes(product.sizes)
    setActive(product.active)
    setPhotoItems(imagesFromProduct(product))
    setInitialFilenames(product.imageFilenames)
    setCriteria(product.rating.criteria)
    setPreviewIndex(0)
  }, [product])

  useEffect(() => {
    if (previewIndex >= photoItems.length) {
      setPreviewIndex(Math.max(0, photoItems.length - 1))
    }
  }, [photoItems.length, previewIndex])

  const draftProduct: Product = {
    ...product,
    name,
    slug,
    categoryId,
    tagline,
    composition,
    badge: badge || undefined,
    nutrition,
    tags,
    variants,
    sizes,
    active,
  }

  const previewImages = photoItems.map((item) => item.url)
  const previewImage = previewImages[previewIndex] ?? previewImages[0] ?? ""
  const selectedBadgeLabel = badge ? badgeLabel(badge, badges) : ""

  const validateArticles = (): string | null => {
    for (const cell of skuMatrix(draftProduct)) {
      const article = cell.article.trim()
      if (!article) continue
      if (!ARTICLE_PATTERN.test(article)) {
        return `Артикул «${article}» — только цифры`
      }
      const conflict = articleConflictMessage(article, products, addons, {
        productId: product.id,
        sizeId: cell.sizeId,
        variantId: cell.variantId,
      })
      if (conflict) return conflict
    }
    const seen = new Map<string, string>()
    for (const cell of skuMatrix(draftProduct)) {
      const article = cell.article.trim()
      if (!article) continue
      const key = `${cell.variantId ?? ""}:${cell.sizeId}`
      const prev = seen.get(article)
      if (prev && prev !== key) {
        return `Артикул ${article} повторяется внутри товара`
      }
      seen.set(article, key)
    }
    return null
  }

  const save = async () => {
    if (!name.trim()) {
      toast.error("Укажите название")
      return
    }
    if (!slug.trim() || !/^[a-z0-9-]+$/.test(slug.trim())) {
      toast.error("Slug: латиница, цифры и дефис")
      return
    }
    if (!tagline.trim()) {
      toast.error("Укажите описание")
      return
    }
    if (!composition.trim()) {
      toast.error("Укажите состав")
      return
    }
    if (active && !sizes.length) {
      toast.error("Добавьте размер перед публикацией на витрину")
      return
    }
    if (!photoItems.length) {
      toast.error("Добавьте хотя бы одно фото")
      return
    }
    const articleError = validateArticles()
    if (articleError) {
      toast.error(articleError)
      return
    }

    try {
      const variantIds = new Set(variants.map((v) => v.id))
      const cleanedSizes = sizes.map((size) => {
        if (!size.articleByVariant) return size
        const next = Object.fromEntries(
          Object.entries(size.articleByVariant).filter(([id]) => variantIds.has(id)),
        )
        return {
          ...size,
          articleByVariant: Object.keys(next).length ? next : undefined,
        }
      })

      const { files, remove } = multiImageDiff(initialFilenames, photoItems)

      await updateProduct.mutateAsync({
        id: product.id,
        data: {
          name: name.trim(),
          slug: slug.trim(),
          categoryId,
          tagline: tagline.trim(),
          composition: composition.trim(),
          badge,
          nutrition,
          tags,
          variants,
          sizes: cleanedSizes,
          active,
          rating: { ...product.rating, criteria },
          ...(files.length ? { image: files.length === 1 ? files[0] : files } : {}),
          ...(remove.length ? { imageRemove: remove } : {}),
        },
      })
      toast.success("Изменения сохранены")
      onBack()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Не удалось сохранить")
    }
  }

  const remove = async () => {
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
      toast.success("Товар удалён")
      onBack()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Не удалось удалить")
    }
  }

  const duplicate = async () => {
    try {
      const copy = await duplicateProduct.mutateAsync(product.id)
      toast.success("Копия создана")
      navigate(`/admin/products/${copy.id}`)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Не удалось дублировать")
    }
  }

  const addVariant = () => {
    setVariants((list) => [
      ...list,
      { id: newId("v"), label: "Новый", icon: "chicken", priceDelta: 0 },
    ])
  }

  const addSize = () => {
    setSizes((list) => [...list, { id: newId("s"), label: "M", price: 0 }])
  }

  function onCriterionDragStart(index: number) {
    setDragIndex(index)
  }

  function onCriterionDragOver(e: DragEvent, index: number) {
    e.preventDefault()
    if (dragIndex === null || dragIndex === index) return
    setCriteria((list) => moveCriterion(list, dragIndex, index))
    setDragIndex(index)
  }

  function onCriterionDragEnd() {
    setDragIndex(null)
  }

  return (
    <div className="flex flex-col gap-4">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex w-fit cursor-pointer items-center gap-1.5 text-[12px] font-bold text-fg-muted transition-colors hover:text-brand"
      >
        <ArrowLeft size={14} strokeWidth={2.6} />К списку товаров
      </button>

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <h2 className="text-[24px] leading-none font-extrabold tracking-[-0.01em] text-fg">
              {name || product.name}
            </h2>
            <Badge variant={active ? "success" : "outline"} size="lg">
              {active ? "Активен" : "Скрыт"}
            </Badge>
          </div>
          <p className="mt-1.5 text-[11.5px] text-fg-muted">
            Создан: {formatDate(product.createdAt)} · Изменён: {formatDate(product.updatedAt)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-bold text-fg-muted">На витрине</span>
          <Switch checked={active} onCheckedChange={setActive} disabled={busy} />
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div className="flex flex-col gap-4">
          <AdminCard bodyClassName="grid gap-4 sm:grid-cols-[200px_minmax(0,1fr)]">
            <Field label="Фото" hint={`до ${MAX_PHOTOS}`}>
              <MultiImageField
                items={photoItems}
                onChange={setPhotoItems}
                maxCount={MAX_PHOTOS}
                maxBytes={IMAGE_MAX_BYTES.product}
                disabled={busy}
              />
            </Field>

            <div className="flex flex-col gap-3">
              <Field label="Название">
                <Input
                  value={name}
                  onChange={(e) => {
                    const next = e.target.value
                    setName(next)
                    if (!slugTouched) setSlug(slugFromName(next))
                  }}
                  disabled={busy}
                />
              </Field>

              <Field label="Slug">
                <Input
                  value={slug}
                  onChange={(e) => {
                    setSlugTouched(true)
                    setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))
                  }}
                  disabled={busy}
                />
              </Field>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Категория">
                  <Select
                    value={categoryId}
                    onChange={(e) => {
                      setCategoryId(e.target.value)
                      setTags([])
                    }}
                    disabled={busy}
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Field label="Бейдж">
                  <div className="flex flex-col gap-1.5">
                    <Select
                      value={badge}
                      onChange={(e) => setBadge(e.target.value as "" | ProductBadge)}
                      disabled={busy}
                    >
                      <option value="">Без бейджа</option>
                      {badges.map((opt) => (
                        <option key={opt.id} value={opt.slug}>
                          {opt.label}
                        </option>
                      ))}
                    </Select>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => setBadgeManagerOpen(true)}
                      className="inline-flex h-8 cursor-pointer items-center justify-center gap-1 rounded-[var(--r-sm)] border border-dashed border-brand-border px-2 text-[11.5px] font-bold text-brand transition-colors hover:bg-brand-soft disabled:opacity-50"
                    >
                      <Plus size={13} strokeWidth={3} />
                      Добавить
                    </button>
                  </div>
                </Field>
              </div>

              <Field label="Теги фильтра">
                {categoryTags.length ? (
                  <div className="flex flex-wrap gap-1.5">
                    {categoryTags.map((tag) => {
                      const on = tags.includes(tag.slug)
                      return (
                        <Chip
                          key={tag.id}
                          active={on}
                          onClick={() =>
                            setTags((list) =>
                              on ? list.filter((s) => s !== tag.slug) : [...list, tag.slug],
                            )
                          }
                        >
                          {tag.name}
                          {tag.emoji ? <span>{tag.emoji}</span> : null}
                        </Chip>
                      )
                    })}
                  </div>
                ) : (
                  <p className="text-[12.5px] text-fg-muted">
                    {categoryTagsPending
                      ? "Загрузка…"
                      : "У категории нет тегов — добавьте во вкладке «Категории»"}
                  </p>
                )}
              </Field>

              <Field label="Описание" hint={`${tagline.length}/500`}>
                <Textarea
                  rows={2}
                  maxLength={500}
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  disabled={busy}
                />
              </Field>

              <Field label="Состав" hint={`${composition.length}/1000`}>
                <Textarea
                  rows={3}
                  maxLength={1000}
                  value={composition}
                  onChange={(e) => setComposition(e.target.value)}
                  disabled={busy}
                />
              </Field>
            </div>
          </AdminCard>

          <AdminCard title="Пищевая ценность (на 100 г)">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {(
                [
                  ["kcal", "Ккал"],
                  ["protein", "Белки"],
                  ["fat", "Жиры"],
                  ["carbs", "Углеводы"],
                ] as const
              ).map(([key, label]) => (
                <Field key={key} label={label}>
                  <Input
                    value={String(nutrition[key])}
                    inputMode="decimal"
                    disabled={busy}
                    onChange={(e) => {
                      const n = Number(e.target.value.replace(",", "."))
                      setNutrition((prev) => ({
                        ...prev,
                        [key]: Number.isFinite(n) ? n : 0,
                      }))
                    }}
                  />
                </Field>
              ))}
            </div>
          </AdminCard>

          <div className="grid gap-4 lg:grid-cols-2 lg:items-start">
            <AdminCard
              title="Варианты мяса"
              action={
                <button
                  type="button"
                  aria-label="Добавить вариант"
                  onClick={addVariant}
                  disabled={busy}
                  className="grid size-7 cursor-pointer place-items-center rounded-[var(--r-xs)] bg-brand text-on-brand transition-colors hover:bg-brand-hover disabled:opacity-50"
                >
                  <Plus size={15} strokeWidth={3} />
                </button>
              }
              bodyClassName="flex flex-col gap-2 p-3"
            >
              {!variants.length ? (
                <p className="px-1 py-2 text-[12.5px] text-fg-muted">
                  Без вариантов — один SKU на размер. Цены — в матрице артикулов.
                </p>
              ) : (
                variants.map((variant, index) => (
                  <div
                    key={variant.id}
                    className="grid grid-cols-[13.5rem_minmax(0,1fr)_auto] items-end gap-1.5 rounded-[var(--r-md)] border border-line bg-surface p-2"
                  >
                    <Field label="Название">
                      <Input
                        value={variant.label}
                        disabled={busy}
                        onChange={(e) =>
                          setVariants((list) =>
                            list.map((v, i) =>
                              i === index ? { ...v, label: e.target.value } : v,
                            ),
                          )
                        }
                      />
                    </Field>
                    <Field label="Иконка">
                      <Select
                        value={variant.icon ?? ""}
                        disabled={busy}
                        formatOption={(opt) => (
                          <span className="flex items-center gap-2">
                            <MeatIconGlyph
                              icon={(opt.value === "" ? null : opt.value) as MeatIcon}
                            />
                            <span>{opt.label}</span>
                          </span>
                        )}
                        onChange={(e) => {
                          const raw = e.target.value
                          const icon = (raw === "" ? null : raw) as MeatIcon
                          setVariants((list) =>
                            list.map((v, i) => (i === index ? { ...v, icon } : v)),
                          )
                        }}
                      >
                        {MEAT_OPTIONS.map((opt) => (
                          <option key={String(opt.value)} value={opt.value ?? ""}>
                            {opt.label}
                          </option>
                        ))}
                      </Select>
                    </Field>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      className="self-end text-fg-faint hover:bg-red-soft hover:text-red"
                      aria-label="Удалить вариант"
                      disabled={busy}
                      onClick={() => setVariants((list) => list.filter((_, i) => i !== index))}
                    >
                      <Trash2 size={14} strokeWidth={2.3} />
                    </Button>
                  </div>
                ))
              )}
            </AdminCard>

            <AdminCard
              title="Размеры"
              action={
                <button
                  type="button"
                  aria-label="Добавить размер"
                  onClick={addSize}
                  disabled={busy}
                  className="grid size-7 cursor-pointer place-items-center rounded-[var(--r-xs)] bg-brand text-on-brand transition-colors hover:bg-brand-hover disabled:opacity-50"
                >
                  <Plus size={15} strokeWidth={3} />
                </button>
              }
              bodyClassName="flex flex-col gap-2 p-3"
            >
              {!sizes.length ? (
                <p className="px-1 py-2 text-[12.5px] text-fg-muted">
                  Пока без размеров — добавьте, чтобы задать артикулы и цены.
                </p>
              ) : (
                sizes.map((size, index) => (
                  <div
                    key={size.id}
                    className="grid grid-cols-[1fr_auto] gap-1.5 rounded-[var(--r-md)] border border-line bg-surface p-2"
                  >
                    <Field label="Название">
                      <Input
                        value={size.label}
                        disabled={busy}
                        onChange={(e) =>
                          setSizes((list) =>
                            list.map((s, i) =>
                              i === index ? { ...s, label: e.target.value } : s,
                            ),
                          )
                        }
                      />
                    </Field>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      className="self-end text-fg-faint hover:bg-red-soft hover:text-red"
                      aria-label="Удалить размер"
                      disabled={busy}
                      onClick={() => setSizes((list) => list.filter((_, i) => i !== index))}
                    >
                      <Trash2 size={14} strokeWidth={2.3} />
                    </Button>
                  </div>
                ))
              )}
            </AdminCard>
          </div>

          <AdminCard title="Матрица артикулов и цен (вариант × размер)">
            <ArticleMatrix
              productId={product.id}
              variants={variants}
              sizes={sizes}
              onSizesChange={setSizes}
              onVariantsChange={setVariants}
              disabled={busy}
            />
          </AdminCard>

          <AdminCard title="Критерии оценки">
            <ul className="flex flex-col gap-2">
              {criteria.map((criterion, index) => (
                <li
                  key={criterion.id}
                  onDragOver={(e) => onCriterionDragOver(e, index)}
                  onDrop={onCriterionDragEnd}
                  className={cn(
                    "flex items-start gap-2.5 rounded-[var(--r-md)] border border-line bg-surface px-3 py-2.5",
                    dragIndex === index && "border-brand bg-brand-soft/40",
                  )}
                >
                  <button
                    type="button"
                    draggable={!busy}
                    aria-label="Перетащить критерий"
                    className="mt-2 shrink-0 cursor-grab touch-none text-fg-faint active:cursor-grabbing"
                    onDragStart={() => onCriterionDragStart(index)}
                    onDragEnd={onCriterionDragEnd}
                  >
                    <GripVertical size={15} strokeWidth={2.2} />
                  </button>
                  <div className="grid min-w-0 flex-1 gap-2 sm:grid-cols-[1fr_1fr_88px]">
                    <Field label="Заголовок">
                      <Input
                        value={criterion.label}
                        disabled={busy}
                        onChange={(e) =>
                          setCriteria((list) =>
                            list.map((c, i) =>
                              i === index ? { ...c, label: e.target.value } : c,
                            ),
                          )
                        }
                      />
                    </Field>
                    <Field label="Подсказка">
                      <Input
                        value={criterion.hint}
                        disabled={busy}
                        onChange={(e) =>
                          setCriteria((list) =>
                            list.map((c, i) =>
                              i === index ? { ...c, hint: e.target.value } : c,
                            ),
                          )
                        }
                      />
                    </Field>
                    <Field label="Оценка /10">
                      <Input
                        value={String(criterion.value)}
                        inputMode="numeric"
                        disabled={busy}
                        onChange={(e) => {
                          const n = Number(e.target.value.replace(",", "."))
                          const clamped = Number.isFinite(n)
                            ? Math.min(10, Math.max(0, Math.round(n)))
                            : 0
                          setCriteria((list) =>
                            list.map((c, i) => (i === index ? { ...c, value: clamped } : c)),
                          )
                        }}
                      />
                    </Field>
                  </div>
                  <span
                    className="mt-7 shrink-0 text-[12.5px] font-extrabold tabular-nums"
                    style={{ color: scoreColor(criterionScore(criterion.value), 10) }}
                  >
                    {criterionScore(criterion.value)}/10
                  </span>
                  <button
                    type="button"
                    aria-label={`Удалить критерий «${criterion.label}»`}
                    onClick={() =>
                      setCriteria((list) => list.filter((c) => c.id !== criterion.id))
                    }
                    className="mt-6 grid size-6 shrink-0 cursor-pointer place-items-center rounded-[var(--r-xs)] text-fg-faint transition-colors hover:bg-red-soft hover:text-red"
                  >
                    <X size={13} strokeWidth={2.6} />
                  </button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              disabled={busy}
              onClick={() =>
                setCriteria((list) => [
                  ...list,
                  {
                    id: `c-${Date.now()}`,
                    label: "Новый критерий",
                    hint: "Опишите, что оценивают",
                    value: 0,
                  },
                ])
              }
              className="mt-2.5 inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-[var(--r-sm)] border border-dashed border-brand-border px-3 text-[11.5px] font-bold text-brand transition-colors hover:bg-brand-soft disabled:opacity-50"
            >
              <Plus size={13} strokeWidth={3} />
              Добавить критерий
            </button>
          </AdminCard>
        </div>

        <div className="flex flex-col gap-4">
          <AdminCard title="SKU" bodyClassName="flex flex-col gap-2 p-3">
            {skuMatrix(draftProduct).map((cell) => {
              const variant = variants.find((v) => v.id === cell.variantId)
              const size = sizes.find((s) => s.id === cell.sizeId)
              return (
                <div
                  key={`${cell.variantId ?? "base"}-${cell.sizeId}`}
                  className="flex items-center gap-2 rounded-[var(--r-md)] border border-line bg-surface px-2.5 py-2"
                >
                  <MeatIconGlyph icon={variant?.icon ?? null} />
                  <span className="min-w-0 flex-1 leading-tight">
                    <span className="flex items-baseline gap-2">
                      <span className="truncate text-[12px] font-bold text-fg">
                        {variant?.label ?? name}
                      </span>
                      <span className="text-[11px] text-fg-muted">{size?.label}</span>
                    </span>
                    <span className="block text-[10px] text-fg-faint">
                      арт. {cell.article || "—"}
                    </span>
                  </span>
                  <span className="shrink-0 text-[12.5px] font-extrabold text-fg tabular-nums">
                    {formatPrice(cell.price)}
                  </span>
                </div>
              )
            })}
          </AdminCard>

          <AdminCard
            title="Предпросмотр на сайте"
            action={
              <div className="flex gap-1">
                <PreviewToggle
                  active={preview === "desktop"}
                  onClick={() => setPreview("desktop")}
                  label="Десктоп"
                >
                  <Monitor size={14} strokeWidth={2.3} />
                </PreviewToggle>
                <PreviewToggle
                  active={preview === "mobile"}
                  onClick={() => setPreview("mobile")}
                  label="Мобильный"
                >
                  <Smartphone size={14} strokeWidth={2.3} />
                </PreviewToggle>
              </div>
            }
          >
            <article
              className={cn(
                "mx-auto overflow-hidden rounded-[var(--r-lg)] border border-line bg-surface",
                preview === "mobile" ? "max-w-[190px]" : "max-w-full",
              )}
            >
              <div className="relative bg-surface-3" style={{ aspectRatio: PRODUCT_ASPECT_RATIO }}>
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt=""
                    className="size-full object-cover transition-opacity duration-300"
                  />
                ) : null}
                {badge && selectedBadgeLabel ? (
                  <Badge variant="brand" size="sm" className="absolute top-2 right-2">
                    {selectedBadgeLabel}
                  </Badge>
                ) : null}
                {previewImages.length > 1 ? (
                  <div className="absolute inset-x-0 bottom-2 flex items-center justify-center gap-1.5">
                    {previewImages.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        aria-label={`Фото ${index + 1}`}
                        aria-current={index === previewIndex}
                        onClick={() => setPreviewIndex(index)}
                        className={cn(
                          "size-1.5 rounded-full transition-[transform,background-color] duration-200",
                          index === previewIndex
                            ? "scale-125 bg-brand"
                            : "bg-white/55 hover:bg-white/80",
                        )}
                      />
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col gap-1.5 p-3">
                <p className="text-[14px] leading-tight font-extrabold text-fg">{name}</p>
                {variants.length ? (
                  <div className="flex flex-wrap gap-1">
                    {variants.map((variant) => (
                      <Badge key={variant.id} size="sm">
                        {variant.label}
                      </Badge>
                    ))}
                  </div>
                ) : null}
                <p className="line-clamp-2 text-[10.5px] leading-[1.45] text-fg-muted">
                  {tagline || composition}
                </p>
                <p className="text-[11px] font-extrabold text-brand tabular-nums">
                  ★ {product.rating.overall}/10 ({product.rating.votes})
                </p>
                <p className="text-[13px] font-extrabold text-fg tabular-nums">
                  от {formatPrice(sizes.length ? minPrice(draftProduct) : 0)}
                </p>
                <Button size="sm" block className="mt-1">
                  В корзину
                  <Plus size={14} strokeWidth={3} />
                </Button>
              </div>
            </article>
          </AdminCard>

          <AdminCard title="Статистика товара" bodyClassName="flex flex-col gap-2 p-4">
            <StatRow label="Просмотры" value={product.stats.views.toLocaleString("ru-RU")} />
            <StatRow
              label="Добавления в корзину"
              value={product.stats.addedToCart.toLocaleString("ru-RU")}
            />
            <StatRow label="Заказов" value={product.stats.orders.toLocaleString("ru-RU")} />
            <StatRow label="Выручка" value={formatPrice(product.stats.revenue)} />
          </AdminCard>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2.5 rounded-[var(--r-lg)] border border-line bg-surface-2 p-3">
        <Button onClick={() => void save()} disabled={busy}>
          Сохранить изменения
        </Button>
        <Button variant="outline" onClick={onBack} disabled={busy}>
          Отмена
        </Button>
        <Button variant="danger" className="ml-auto" onClick={() => void remove()} disabled={busy}>
          Удалить товар
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <AdminCard bodyClassName="flex gap-2.5 p-4">
          <Lightbulb size={16} className="mt-0.5 shrink-0 text-gold" strokeWidth={2.2} />
          <span>
            <span className="block text-[12.5px] font-extrabold text-fg">Подсказка</span>
            <span className="mt-0.5 block text-[11px] leading-[1.5] text-fg-muted">
              Для шаурмы с мясом заполните артикул и цену в каждой ячейке матрицы — иначе «Курица M» и
              «Свинина M» уйдут в кассу одним SKU.
            </span>
          </span>
        </AdminCard>

        <AdminCard bodyClassName="flex flex-col gap-2 p-4">
          <span className="text-[12.5px] font-extrabold text-fg">Быстрые действия</span>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" disabled={busy} onClick={() => void duplicate()}>
              <Copy size={13} strokeWidth={2.4} />
              Дублировать товар
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to={`/product/${product.slug}`}>
                <ExternalLink size={13} strokeWidth={2.4} />
                Посмотреть на сайте
              </Link>
            </Button>
          </div>
          <p className="text-[11px] text-fg-muted">
            Последнее изменение: {formatDate(product.updatedAt)}
          </p>
        </AdminCard>
      </div>
      {dialog}
      <BadgeManagerDialog open={badgeManagerOpen} onOpenChange={setBadgeManagerOpen} />
    </div>
  )
}

function MeatIconGlyph({ icon }: { icon: MeatIcon }) {
  if (icon === "chicken") return <Drumstick size={14} className="shrink-0 text-fg-faint" />
  if (icon === "pork") return <Ham size={14} className="shrink-0 text-fg-faint" />
  return <span className="size-3.5 shrink-0" />
}

function PreviewToggle({
  active,
  onClick,
  label,
  children,
}: {
  active: boolean
  onClick: () => void
  label: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={cn(
        "grid size-7 cursor-pointer place-items-center rounded-[var(--r-xs)] transition-colors",
        active ? "bg-brand-soft text-brand" : "text-fg-faint hover:bg-surface-3",
      )}
    >
      {children}
    </button>
  )
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-[11.5px] text-fg-muted">{label}</span>
      <span className="text-[12.5px] font-extrabold text-fg tabular-nums">{value}</span>
    </div>
  )
}
