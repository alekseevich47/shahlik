import {
  ArrowLeft,
  Copy,
  ExternalLink,
  GripVertical,
  Lightbulb,
  Monitor,
  MoreVertical,
  Plus,
  Smartphone,
  Upload,
  X,
} from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "sonner"

import type { Product } from "@/entities/product/model"
import { minPrice, priceOf } from "@/entities/product/lib"
import { AdminCard } from "@/pages/admin/ui/AdminCard"
import { categories } from "@/mocks/categories"
import { cn } from "@/shared/lib/cn"
import { formatDate, formatPrice } from "@/shared/lib/format"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import { Field, Input, Textarea } from "@/shared/ui/input"
import { scoreColor } from "@/shared/ui/rating"

type Props = {
  product: Product
  onBack: () => void
}

export function ProductEditor({ product, onBack }: Props) {
  const [name, setName] = useState(product.name)
  const [categoryId, setCategoryId] = useState<string>(product.categoryId)
  const [composition, setComposition] = useState(product.composition)
  const [criteria, setCriteria] = useState(product.rating.criteria)
  const [ingredients, setIngredients] = useState(() =>
    product.composition
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  )
  const [preview, setPreview] = useState<"desktop" | "mobile">("desktop")

  return (
    <div className="flex flex-col gap-4">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex w-fit cursor-pointer items-center gap-1.5 text-[12px] font-bold text-fg-muted transition-colors hover:text-brand"
      >
        <ArrowLeft size={14} strokeWidth={2.6} />К списку товаров
      </button>

      <div>
        <div className="flex flex-wrap items-center gap-2.5">
          <h2 className="text-[24px] leading-none font-extrabold tracking-[-0.01em] text-fg">
            {product.name}
          </h2>
          <Badge variant="success" size="lg">
            {product.active ? "Активен" : "Скрыт"}
          </Badge>
        </div>
        <p className="mt-1.5 text-[11.5px] text-fg-muted">
          ID: {product.sizes[0]?.article ?? "—"} • Создан: {formatDate(product.createdAt)} •
          Изменён: {formatDate(product.updatedAt)}
        </p>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div className="flex flex-col gap-4">
          <AdminCard bodyClassName="grid gap-4 sm:grid-cols-[200px_minmax(0,1fr)]">
            <div className="flex flex-col gap-2">
              <div className="aspect-[4/3] overflow-hidden rounded-[var(--r-md)] border border-line bg-surface-3">
                <img src={product.image} alt="" className="size-full object-cover" />
              </div>
              <Button
                variant="soft"
                size="sm"
                block
                onClick={() => toast("Загрузка фото — заглушка прототипа")}
              >
                <Upload size={14} strokeWidth={2.5} />
                Загрузить фото
              </Button>
              <p className="text-[10px] leading-[1.4] text-fg-faint">
                PNG, JPG до 5МБ. Рекомендуем 1200×800px
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Field label="Название">
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </Field>

              <Field label="Категория">
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="h-11 w-full cursor-pointer rounded-[var(--r-md)] border border-line bg-surface px-3.5 text-[14px] font-semibold text-fg outline-none focus:border-brand-border"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Краткое описание" hint={`${composition.length}/200`}>
                <Textarea
                  rows={4}
                  maxLength={200}
                  value={composition}
                  onChange={(e) => setComposition(e.target.value)}
                />
              </Field>
            </div>
          </AdminCard>

          <AdminCard title="Критерии оценки">
            <ul className="flex flex-col gap-2">
              {criteria.map((criterion) => (
                <li
                  key={criterion.id}
                  className="flex items-center gap-2.5 rounded-[var(--r-md)] border border-line bg-surface px-3 py-2.5"
                >
                  <GripVertical
                    size={15}
                    className="shrink-0 cursor-grab text-fg-faint"
                    strokeWidth={2.2}
                  />
                  <span className="min-w-0 flex-1 leading-tight">
                    <span className="block truncate text-[12.5px] font-bold text-fg">
                      {criterion.label}
                    </span>
                    <span className="block truncate text-[10.5px] text-fg-muted">
                      {criterion.hint}
                    </span>
                  </span>
                  <span
                    className="shrink-0 text-[12.5px] font-extrabold tabular-nums"
                    style={{ color: scoreColor(criterion.value * 2, 10) }}
                  >
                    {Number((criterion.value * 2).toFixed(1))}/10
                  </span>
                  <button
                    type="button"
                    aria-label={`Удалить критерий «${criterion.label}»`}
                    onClick={() =>
                      setCriteria((list) => list.filter((c) => c.id !== criterion.id))
                    }
                    className="grid size-6 shrink-0 cursor-pointer place-items-center rounded-[var(--r-xs)] text-fg-faint transition-colors hover:bg-red-soft hover:text-red"
                  >
                    <X size={13} strokeWidth={2.6} />
                  </button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() =>
                setCriteria((list) => [
                  ...list,
                  {
                    id: `c-${Date.now()}`,
                    label: "Новый критерий",
                    hint: "Опишите, что оценивают",
                    value: 4,
                  },
                ])
              }
              className="mt-2.5 inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-[var(--r-sm)] border border-dashed border-brand-border px-3 text-[11.5px] font-bold text-brand transition-colors hover:bg-brand-soft"
            >
              <Plus size={13} strokeWidth={3} />
              Добавить критерий
            </button>
          </AdminCard>

          <AdminCard title="Состав (ингредиенты)">
            <div className="flex flex-wrap gap-1.5">
              {ingredients.map((item) => (
                <span
                  key={item}
                  className="inline-flex h-7 items-center gap-1.5 rounded-[var(--r-xs)] bg-surface-3 px-2.5 text-[11.5px] font-semibold text-fg-soft"
                >
                  {item}
                  <button
                    type="button"
                    aria-label={`Убрать ${item}`}
                    onClick={() => setIngredients((list) => list.filter((i) => i !== item))}
                    className="cursor-pointer text-fg-faint transition-colors hover:text-red"
                  >
                    <X size={11} strokeWidth={3} />
                  </button>
                </span>
              ))}
            </div>
          </AdminCard>
        </div>

        <div className="flex flex-col gap-4">
          <AdminCard
            title="Варианты товара"
            action={
              <button
                type="button"
                aria-label="Добавить вариант"
                onClick={() => toast("Новый вариант — заглушка прототипа")}
                className="grid size-7 cursor-pointer place-items-center rounded-[var(--r-xs)] bg-brand text-on-brand transition-colors hover:bg-brand-hover"
              >
                <Plus size={15} strokeWidth={3} />
              </button>
            }
            bodyClassName="flex flex-col gap-2 p-3"
          >
            {(product.variants.length ? product.variants : [null]).flatMap((variant) =>
              product.sizes.map((size) => (
                <div
                  key={`${variant?.id ?? "base"}-${size.id}`}
                  className="flex items-center gap-2 rounded-[var(--r-md)] border border-line bg-surface px-2.5 py-2"
                >
                  <GripVertical
                    size={14}
                    className="shrink-0 cursor-grab text-fg-faint"
                    strokeWidth={2.2}
                  />
                  <span className="min-w-0 flex-1 leading-tight">
                    <span className="flex items-baseline gap-2">
                      <span className="truncate text-[12px] font-bold text-fg">
                        {variant?.label ?? product.name}
                      </span>
                      <span className="text-[11px] text-fg-muted">{size.label}</span>
                    </span>
                    <span className="block text-[10px] text-fg-faint">
                      арт. {size.article ?? "—"}
                    </span>
                  </span>
                  <span className="shrink-0 text-[12.5px] font-extrabold text-fg tabular-nums">
                    {formatPrice(priceOf(size, variant ?? undefined))}
                  </span>
                  <button
                    type="button"
                    aria-label="Действия с вариантом"
                    className="grid size-6 shrink-0 cursor-pointer place-items-center rounded-[var(--r-xs)] text-fg-faint hover:bg-surface-3 hover:text-fg"
                  >
                    <MoreVertical size={14} strokeWidth={2.4} />
                  </button>
                </div>
              )),
            )}
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
              <div className="relative aspect-[16/10] bg-surface-3">
                <img src={product.image} alt="" className="size-full object-cover" />
                {product.badge === "hit" ? (
                  <Badge variant="brand" size="sm" className="absolute top-2 right-2">
                    Хит продаж
                  </Badge>
                ) : null}
              </div>
              <div className="flex flex-col gap-1.5 p-3">
                <p className="text-[14px] leading-tight font-extrabold text-fg">{name}</p>
                <p className="line-clamp-2 text-[10.5px] leading-[1.45] text-fg-muted">
                  {composition}
                </p>
                <p className="text-[11px] font-extrabold text-brand tabular-nums">
                  ★ {product.rating.overall}/10 ({product.rating.votes})
                </p>
                <p className="text-[13px] font-extrabold text-fg tabular-nums">
                  от {formatPrice(minPrice(product))}
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
        <Button onClick={() => toast.success("Изменения сохранены")}>Сохранить изменения</Button>
        <Button variant="outline" onClick={onBack}>
          Отмена
        </Button>
        <Button
          variant="danger"
          className="ml-auto"
          onClick={() => toast.error("Удаление недоступно в прототипе")}
        >
          Удалить товар
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <AdminCard bodyClassName="flex gap-2.5 p-4">
          <Lightbulb size={16} className="mt-0.5 shrink-0 text-gold" strokeWidth={2.2} />
          <span>
            <span className="block text-[12.5px] font-extrabold text-fg">Подсказка</span>
            <span className="mt-0.5 block text-[11px] leading-[1.5] text-fg-muted">
              Используйте качественные фото и подробное описание — это увеличивает продажи
            </span>
          </span>
        </AdminCard>

        <AdminCard bodyClassName="flex flex-col gap-2 p-4">
          <span className="text-[12.5px] font-extrabold text-fg">Быстрые действия</span>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => toast.success("Товар продублирован")}>
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
        </AdminCard>

        <AdminCard bodyClassName="flex flex-col gap-2 p-4">
          <span className="text-[12.5px] font-extrabold text-fg">Последние изменения</span>
          <div className="flex items-start gap-2.5">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-soft text-[11px] font-extrabold text-brand">
              А
            </span>
            <span className="leading-tight">
              <span className="block text-[11.5px] font-bold text-fg">
                Алексей · {formatDate(product.updatedAt)} в 15:30
              </span>
              <span className="block text-[11px] text-fg-muted">
                Обновлено фото и состав товара
              </span>
            </span>
          </div>
        </AdminCard>
      </div>
    </div>
  )
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
