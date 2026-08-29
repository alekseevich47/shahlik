import * as DialogPrimitive from "@radix-ui/react-dialog"
import { ArrowLeft, Drumstick, Ham, Heart, Leaf, Star, X } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"

import { useBadges } from "@/entities/badge/api"
import { badgeLabel } from "@/entities/badge/model"
import { useExtras, useSauces } from "@/entities/addon/api"
import { criterionScore, criterionStars, type MeatIcon } from "@/entities/product/model"
import { findSize, findVariant, nutritionOf, priceOf } from "@/entities/product/lib"
import {
  isAddonStopped,
  isSizeStopped,
  isSkuStopped,
  isVariantStopped,
  useFrontpadStockRealtime,
  useStoppedArticles,
} from "@/entities/product/lib/stock"
import { useProductBySlug } from "@/entities/product/api"
import { PRODUCT_ASPECT_RATIO } from "@/entities/product/format"
import { useCartStore } from "@/features/cart/model/store"
import { cn } from "@/shared/lib/cn"
import { formatPrice, pluralize } from "@/shared/lib/format"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import { OptionCard } from "@/shared/ui/chip"
import { ScoreValue, Stars } from "@/shared/ui/rating"
import { Stepper } from "@/shared/ui/stepper"
import { GroupLabel } from "@/shared/ui/surface"
import { HintMark } from "@/shared/ui/tooltip"

import { AddonRow } from "./ui/AddonRow"
import { FreshStamp } from "./ui/FreshStamp"
import { NutritionHint } from "./ui/NutritionHint"

type ProductViewProps = {
  onClose: () => void
  className?: string
}

/** Содержимое PDP без page-shell и без Navigate — для страницы и модалки. */
export function ProductView({ onClose, className }: ProductViewProps) {
  const { slug = "" } = useParams()
  useFrontpadStockRealtime()
  const { data: product, isPending } = useProductBySlug(slug)
  const { data: stopped = new Set<string>() } = useStoppedArticles()
  const { data: sauces = [] } = useSauces()
  const { data: extras = [] } = useExtras()
  const { data: badges = [] } = useBadges()

  const [variantId, setVariantId] = useState<string>()
  const [sizeId, setSizeId] = useState<string>()
  const [quantity, setQuantity] = useState(1)
  const [picked, setPicked] = useState<Record<string, number>>({})
  const [liked, setLiked] = useState(false)
  const add = useCartStore((s) => s.add)

  useEffect(() => {
    setVariantId(undefined)
    setSizeId(undefined)
    setPicked({})
    setQuantity(1)
  }, [slug])

  const resolvedVariantId = variantId ?? product?.variants[0]?.id
  const resolvedSizeId = sizeId ?? product?.sizes[0]?.id ?? ""

  const total = useMemo(() => {
    if (!product) return 0
    const base = priceOf(findSize(product, resolvedSizeId), findVariant(product, resolvedVariantId))
    const addonsSum = [...sauces, ...extras].reduce(
      (sum, addon) => sum + addon.price * (picked[addon.id] ?? 0),
      0,
    )
    return (base + addonsSum) * quantity
  }, [product, resolvedSizeId, resolvedVariantId, picked, quantity, sauces, extras])

  if (!slug || (!isPending && !product)) return null
  if (!product) return <div className={cn("bg-canvas", className)} />

  const size = findSize(product, resolvedSizeId)
  const variant = findVariant(product, resolvedVariantId)
  const nutrition = nutritionOf(size, variant, product.nutrition)
  const skuStopped = isSkuStopped(product, size.id, variant?.id, stopped)
  const visibleSauces = sauces.filter((addon) => !isAddonStopped(addon, stopped))
  const visibleExtras = extras.filter((addon) => !isAddonStopped(addon, stopped))

  const submit = () => {
    add({
      productId: product.id,
      variantId: variant?.id,
      sizeId: size.id,
      quantity,
      addons: Object.entries(picked)
        .filter(([, qty]) => qty > 0)
        .map(([addonId, qty]) => ({ addonId, quantity: qty })),
    })
    toast.success(`«${product.name}» в заказе`)
    onClose()
  }

  return (
    <div className={cn("bg-canvas", className)}>
      <div className="mx-auto grid w-full max-w-[1680px] gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,413px)] lg:items-stretch xl:grid-cols-[minmax(0,1fr)_467px] dark:lg:items-start">
        <section className="relative overflow-hidden bg-surface lg:rounded-[var(--r-2xl)] dark:bg-surface-3">
          <div
            className={cn(
              "relative flex w-full items-center justify-center",
              /* mobile + dark: канон 3∶2 */
              "max-lg:[aspect-ratio:var(--product-ar)] dark:lg:[aspect-ratio:var(--product-ar)]",
              /* light desktop: высота = правая колонка, фото по центру */
              "lg:h-full lg:min-h-[280px] dark:lg:h-auto dark:lg:min-h-0",
            )}
            style={{ ["--product-ar" as string]: PRODUCT_ASPECT_RATIO }}
          >
            <img
              src={product.image}
              alt={product.name}
              className={cn(
                "max-h-full max-w-full object-contain",
                "dark:size-full dark:object-cover",
                "max-lg:size-full max-lg:object-cover",
              )}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.35))] lg:hidden dark:lg:block" />

            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 left-4 z-10 inline-flex h-10 items-center gap-2 rounded-[var(--r-md)] border border-line bg-surface/92 px-3.5 text-[13px] font-bold text-fg shadow-[var(--shadow-card)] backdrop-blur-md transition-colors hover:border-brand-border hover:text-brand"
            >
              <ArrowLeft size={16} strokeWidth={2.6} />
              Назад
            </button>

            <button
              type="button"
              onClick={() => setLiked((v) => !v)}
              aria-label={liked ? "Убрать из избранного" : "В избранное"}
              aria-pressed={liked}
              className={cn(
                "absolute top-4 right-4 z-10 grid size-10 cursor-pointer place-items-center",
                "text-fg drop-shadow-[0_1px_3px_rgba(0,0,0,0.25)] transition-colors duration-200 dark:text-white dark:drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)]",
                "max-lg:text-white max-lg:drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)]",
                liked ? "text-red" : "hover:text-red",
              )}
            >
              <Heart size={22} strokeWidth={2.1} fill={liked ? "currentColor" : "none"} />
            </button>

            <div className="absolute bottom-4 left-4 z-10 flex max-w-[min(100%-2rem,420px)] flex-col gap-2.5">
              <RatingOverlay
                overall={product.rating.overall}
                votes={product.rating.votes}
                criteria={product.rating.criteria}
              />
              {product.composition ? (
                <div className="rounded-[var(--r-lg)] border border-line bg-surface/94 p-3.5 shadow-[var(--shadow-card)] backdrop-blur-md">
                  <div className="mb-1.5 flex items-center gap-1.5">
                    <span className="text-[14px] font-extrabold text-fg">Состав</span>
                    <Leaf size={14} className="text-success" strokeWidth={2.3} />
                  </div>
                  <p className="text-[11.5px] leading-[1.55] text-fg-muted">
                    {product.composition}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <section className="relative flex flex-col overflow-hidden border border-line bg-surface p-5 shadow-[var(--shadow-card)] sm:p-6 lg:rounded-[var(--r-2xl)]">
          <FreshStamp className="pointer-events-none absolute top-3 right-3 z-0 hidden opacity-30 sm:block" size={96} />

          <div className="relative z-10 flex min-h-0 flex-1 flex-col gap-5">
          <header className="flex items-start gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="overflow-visible text-[30px] leading-none font-extrabold tracking-[-0.02em] text-fg sm:text-[36px]">
                  {product.name}
                  <NutritionHint nutrition={nutrition} />
                </h1>
                {product.badge ? (
                  <Badge variant="soft" size="lg">
                    {badgeLabel(product.badge, badges)}
                  </Badge>
                ) : null}
              </div>
              <p className="mt-2 max-w-[440px] text-[12.5px] leading-[1.55] text-fg-muted">
                {product.tagline}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Закрыть карточку"
              className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-[var(--r-md)] border border-line text-fg-faint transition-colors duration-200 hover:text-red"
            >
              <X size={18} strokeWidth={2.2} />
            </button>
          </header>

          <ul className="flex max-w-[340px] flex-col gap-2">
            {product.rating.criteria.map((criterion) => (
              <li key={criterion.id} className="flex items-center gap-3">
                <span className="flex w-22 shrink-0 items-center gap-1.5 text-[12.5px] font-semibold text-fg-soft">
                  {criterion.label}
                  <HintMark hint={criterion.hint} />
                </span>
                <Stars value={criterionStars(criterion.value)} />
                <ScoreValue
                  value={criterionScore(criterion.value)}
                  max={10}
                  className="ml-auto w-12 text-right text-[13px]"
                />
              </li>
            ))}
          </ul>

          {product.variants.length > 1 ? (
            <div>
              <GroupLabel>Выберите вариант</GroupLabel>
              <div className="flex gap-2">
                {product.variants.map((v) => {
                  const unavailable = isVariantStopped(product, v.id, stopped)
                  return (
                    <OptionCard
                      key={v.id}
                      active={v.id === variant?.id}
                      disabled={unavailable}
                      onClick={() => setVariantId(v.id)}
                    >
                      <MeatGlyph icon={v.icon} />
                      {v.label}
                    </OptionCard>
                  )
                })}
              </div>
            </div>
          ) : null}

          {product.sizes.length > 1 ? (
            <div>
              <GroupLabel>Размер</GroupLabel>
              <div className="flex gap-2">
                {product.sizes.map((s) => {
                  const unavailable = isSizeStopped(product, s.id, variant?.id, stopped)
                  return (
                    <OptionCard
                      key={s.id}
                      active={s.id === size.id}
                      disabled={unavailable}
                      onClick={() => setSizeId(s.id)}
                      className="flex-col gap-0.5"
                    >
                      <span className="text-[13px] font-extrabold">{s.label}</span>
                      <span className="text-[11px] font-bold opacity-80 tabular-nums">
                        {formatPrice(priceOf(s, variant))}
                      </span>
                    </OptionCard>
                  )
                })}
              </div>
            </div>
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <GroupLabel>Соусы</GroupLabel>
              <ul className="flex flex-col">
                {visibleSauces.slice(0, 4).map((addon) => (
                  <AddonRow
                    key={addon.id}
                    addon={addon}
                    quantity={picked[addon.id] ?? 0}
                    onChange={(next) => setPicked((p) => ({ ...p, [addon.id]: next }))}
                  />
                ))}
              </ul>
            </div>
            <div>
              <GroupLabel>Добавки</GroupLabel>
              <ul className="flex flex-col">
                {visibleExtras.slice(0, 4).map((addon) => (
                  <AddonRow
                    key={addon.id}
                    addon={addon}
                    quantity={picked[addon.id] ?? 0}
                    onChange={(next) => setPicked((p) => ({ ...p, [addon.id]: next }))}
                  />
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-auto flex items-center gap-3 pt-1">
            <Stepper size="lg" value={quantity} min={1} onChange={setQuantity} />
            <Button
              variant="product"
              size="xl"
              className="flex-1"
              disabled={skuStopped}
              onClick={submit}
            >
              {skuStopped ? "Нет в наличии" : `В корзину • ${formatPrice(total)}`}
            </Button>
          </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default function ProductPage() {
  const { slug = "" } = useParams()
  const navigate = useNavigate()
  const { data: product, isPending } = useProductBySlug(slug)

  if (!slug || (!isPending && !product)) return <Navigate to="/" replace />

  return (
    <div className="min-h-dvh bg-canvas lg:p-5">
      <ProductView onClose={() => navigate("/")} />
    </div>
  )
}

/** PDP поверх витрины: Portal в body, закрытие — history.back. */
export function ProductModal() {
  const { slug = "" } = useParams()
  const navigate = useNavigate()
  const { data: product, isPending } = useProductBySlug(slug)

  const close = () => navigate(-1)

  if (!slug || (!isPending && !product)) {
    return <Navigate to="/" replace />
  }

  return (
    <DialogPrimitive.Root
      open
      onOpenChange={(next) => {
        if (!next) close()
      }}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-300 bg-black/45",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
          )}
        />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className={cn(
            "fixed top-1/2 left-1/2 z-301 flex w-[min(1200px,calc(100vw-1rem))] max-h-[94vh] -translate-x-1/2 -translate-y-1/2 flex-col",
            "overflow-y-auto rounded-[var(--r-2xl)] border border-line bg-canvas shadow-[var(--shadow-panel)] outline-none",
            "duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
            "data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            "p-0 sm:p-4 lg:p-5",
          )}
        >
          <DialogPrimitive.Title className="sr-only">
            {product?.name ?? "Товар"}
          </DialogPrimitive.Title>
          <ProductView onClose={close} />
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}

function MeatGlyph({ icon }: { icon: MeatIcon }) {
  if (icon === "chicken") return <Drumstick size={15} strokeWidth={1.9} />
  if (icon === "pork") return <Ham size={15} strokeWidth={1.9} />
  return null
}

function RatingOverlay({
  overall,
  votes,
  criteria,
}: {
  overall: number
  votes: number
  criteria: { id: string; label: string; value: number }[]
}) {
  return (
    <div className="flex w-fit max-w-full flex-wrap items-center gap-4 rounded-[var(--r-lg)] border border-line bg-surface/94 px-4 py-2.5 shadow-[var(--shadow-card)] backdrop-blur-md">
      <div className="flex items-center gap-2">
        <Star size={22} className="text-success" strokeWidth={2} />
        <span className="flex flex-col leading-tight">
          <span className="text-[15px] font-extrabold text-fg tabular-nums">{overall}/10</span>
          <span className="text-[10px] text-fg-muted">
            {votes} {pluralize(votes, ["оценка", "оценки", "оценок"])}
          </span>
        </span>
      </div>
      <div className="flex gap-4 border-l border-line pl-4">
        {criteria.map((criterion) => (
          <span key={criterion.id} className="flex flex-col gap-0.5 leading-tight">
            <span className="text-[10px] text-fg-muted">{criterion.label}</span>
            <ScoreValue value={criterionScore(criterion.value)} max={10} className="text-[12.5px]" />
          </span>
        ))}
      </div>
    </div>
  )
}
