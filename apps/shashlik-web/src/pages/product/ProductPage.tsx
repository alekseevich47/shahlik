import { ArrowLeft, Drumstick, Ham, Heart, Leaf, Star, X } from "lucide-react"
import { useMemo, useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"

import type { MeatIcon } from "@/entities/product/model"
import { findSize, findVariant, priceOf } from "@/entities/product/lib"
import { useCartStore } from "@/features/cart/model/store"
import { extras, sauces } from "@/mocks/addons"
import { productBySlug } from "@/mocks/products"
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

export default function ProductPage() {
  const { slug = "" } = useParams()
  const navigate = useNavigate()
  const product = productBySlug(slug)

  const [variantId, setVariantId] = useState(() => product?.variants[0]?.id)
  const [sizeId, setSizeId] = useState(() => product?.sizes[0]?.id ?? "")
  const [quantity, setQuantity] = useState(1)
  const [picked, setPicked] = useState<Record<string, number>>({})
  const [liked, setLiked] = useState(false)
  const add = useCartStore((s) => s.add)

  const total = useMemo(() => {
    if (!product) return 0
    const base = priceOf(findSize(product, sizeId), findVariant(product, variantId))
    const addonsSum = [...sauces, ...extras].reduce(
      (sum, addon) => sum + addon.price * (picked[addon.id] ?? 0),
      0,
    )
    return (base + addonsSum) * quantity
  }, [product, sizeId, variantId, picked, quantity])

  if (!product) return <Navigate to="/" replace />

  const size = findSize(product, sizeId)
  const variant = findVariant(product, variantId)
  const goHome = () => navigate("/")

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
    goHome()
  }

  return (
    <div className="min-h-dvh bg-canvas lg:p-5">
      <div className="mx-auto grid w-full max-w-[1680px] gap-4 lg:min-h-[calc(100dvh-40px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,620px)] xl:grid-cols-[minmax(0,1fr)_700px]">
        {/* Левая половина: фото на всю высоту + оверлей-карточки */}
        <section className="relative min-h-[300px] overflow-hidden bg-surface-3 lg:rounded-[var(--r-2xl)]">
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.35))] lg:hidden" />

          <button
            type="button"
            onClick={goHome}
            className="absolute top-4 left-4 inline-flex h-10 items-center gap-2 rounded-[var(--r-md)] border border-line bg-surface/92 px-3.5 text-[13px] font-bold text-fg shadow-[var(--shadow-card)] backdrop-blur-md transition-colors hover:border-brand-border hover:text-brand"
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
              "text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)] transition-colors duration-200",
              liked ? "text-red" : "hover:text-red",
            )}
          >
            <Heart size={22} strokeWidth={2.1} fill={liked ? "currentColor" : "none"} />
          </button>

          <div className="absolute inset-x-4 bottom-4 flex flex-col gap-2.5">
            <RatingOverlay
              overall={product.rating.overall}
              votes={product.rating.votes}
              criteria={product.rating.criteria}
            />
            {product.composition ? (
              <div className="max-w-[420px] rounded-[var(--r-lg)] border border-line bg-surface/94 p-3.5 shadow-[var(--shadow-card)] backdrop-blur-md">
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
        </section>

        {/* Правая половина: выбор и добавление в заказ */}
        <section className="flex flex-col gap-5 border border-line bg-surface p-5 shadow-[var(--shadow-card)] sm:p-6 lg:rounded-[var(--r-2xl)]">
          <header className="flex items-start gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="overflow-visible text-[30px] leading-none font-extrabold tracking-[-0.02em] text-fg sm:text-[36px]">
                  {product.name}
                  <NutritionHint nutrition={product.nutrition} />
                </h1>
                {product.badge === "hit" ? (
                  <Badge variant="soft" size="lg">
                    🔥 Хит продаж
                  </Badge>
                ) : null}
              </div>
              <p className="mt-2 max-w-[440px] text-[12.5px] leading-[1.55] text-fg-muted">
                {product.tagline}
              </p>
            </div>

            <FreshStamp className="hidden sm:block" />

            <button
              type="button"
              onClick={goHome}
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
                <Stars value={criterion.value} />
                <ScoreValue
                  value={criterion.value}
                  max={5}
                  className="ml-auto w-12 text-right text-[13px]"
                />
              </li>
            ))}
          </ul>

          {product.variants.length > 1 ? (
            <div>
              <GroupLabel>Выберите вариант</GroupLabel>
              <div className="flex gap-2.5">
                {product.variants.map((v) => (
                  <OptionCard
                    key={v.id}
                    active={v.id === variant?.id}
                    onClick={() => setVariantId(v.id)}
                  >
                    <MeatGlyph icon={v.icon} />
                    {v.label}
                  </OptionCard>
                ))}
              </div>
            </div>
          ) : null}

          {product.sizes.length > 1 ? (
            <div>
              <GroupLabel>Размер</GroupLabel>
              <div className="flex gap-2.5">
                {product.sizes.map((s) => (
                  <OptionCard
                    key={s.id}
                    active={s.id === size.id}
                    onClick={() => setSizeId(s.id)}
                    className="flex-col gap-0.5"
                  >
                    <span className="text-[14px] font-extrabold">{s.label}</span>
                    <span className="text-[12px] font-bold opacity-80 tabular-nums">
                      {formatPrice(priceOf(s, variant))}
                    </span>
                  </OptionCard>
                ))}
              </div>
            </div>
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <GroupLabel>Соусы</GroupLabel>
              <ul className="flex flex-col gap-1.5">
                {sauces.slice(0, 4).map((addon) => (
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
              <ul className="flex flex-col gap-1.5">
                {extras.slice(0, 4).map((addon) => (
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
            <Button variant="product" size="xl" className="flex-1" onClick={submit}>
              В корзину • {formatPrice(total)}
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}

function MeatGlyph({ icon }: { icon: MeatIcon }) {
  if (icon === "chicken") return <Drumstick size={18} strokeWidth={1.9} />
  if (icon === "pork") return <Ham size={18} strokeWidth={1.9} />
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
            <ScoreValue value={criterion.value * 2} max={10} className="text-[12.5px]" />
          </span>
        ))}
      </div>
    </div>
  )
}
