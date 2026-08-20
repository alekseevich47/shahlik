import { Pencil, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

import {
  useAdminReviews,
  useCreateReview,
  useDeleteReview,
  useToggleReviewPublished,
  useUpdateReview,
} from "@/entities/order/api"
import type { Review } from "@/entities/order/model"
import { useAdminProducts } from "@/entities/product/api"
import { DataTable, type Column } from "@/pages/admin/ui/DataTable"
import { EmptyState } from "@/pages/admin/ui/EmptyState"
import { SectionShell } from "@/pages/admin/ui/SectionShell"
import { SkeletonRows } from "@/pages/admin/ui/SkeletonRows"
import { Toolbar, type ToolbarFilter } from "@/pages/admin/ui/Toolbar"
import { can } from "@/shared/api/auth"
import { formatDate } from "@/shared/lib/format"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import { useConfirm } from "@/shared/ui/confirm-dialog"
import { Field, Input, Textarea } from "@/shared/ui/input"
import { Select } from "@/shared/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/shared/ui/sheet"
import { Switch } from "@/shared/ui/switch"

const STATUS_FILTERS: ToolbarFilter[] = [
  { id: "moderation", label: "На модерации" },
  { id: "published", label: "Опубликованные" },
  { id: "all", label: "Все" },
]

export function ReviewsSection() {
  const { data: reviews = [], isPending } = useAdminReviews()
  const { data: products = [] } = useAdminProducts()
  const togglePublished = useToggleReviewPublished()
  const deleteReview = useDeleteReview()
  const { confirm, dialog } = useConfirm()

  const canCreate = can("reviews", "create")
  const canDelete = can("reviews", "delete")

  const [query, setQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("moderation")
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Review | null>(null)

  const busy = togglePublished.isPending || deleteReview.isPending

  const filtered = reviews.filter((item) => {
    if (statusFilter === "moderation" && item.published) return false
    if (statusFilter === "published" && !item.published) return false
    const q = query.trim().toLowerCase()
    if (!q) return true
    return (
      item.author.toLowerCase().includes(q) ||
      item.productName.toLowerCase().includes(q) ||
      item.text.toLowerCase().includes(q)
    )
  })

  const openCreate = () => {
    setEditing(null)
    setFormOpen(true)
  }

  const openEdit = (review: Review) => {
    setEditing(review)
    setFormOpen(true)
  }

  const handleDelete = async (review: Review) => {
    const ok = await confirm({
      title: `Удалить отзыв ${review.author}?`,
      description: "Отзыв исчезнет с витрины, рейтинг товара пересчитается.",
      confirmLabel: "Удалить",
      cancelLabel: "Отмена",
      danger: true,
    })
    if (!ok) return

    try {
      await deleteReview.mutateAsync(review.id)
      toast.success("Удалено")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Не удалось удалить")
    }
  }

  const columns: Column<Review>[] = [
    {
      key: "author",
      header: "Автор",
      render: (row) => <span className="font-bold text-fg">{row.author}</span>,
    },
    {
      key: "product",
      header: "Товар",
      render: (row) => (
        <span className="flex flex-col leading-tight">
          <span className="text-fg">{row.productName}</span>
          {!row.productId ? (
            <span className="text-[10.5px] text-fg-faint">без привязки</span>
          ) : null}
        </span>
      ),
    },
    {
      key: "score",
      header: "Оценка",
      className: "tabular-nums",
      render: (row) => `${row.score}/10`,
    },
    {
      key: "text",
      header: "Отзыв",
      render: (row) => (
        <span className="line-clamp-2 max-w-[280px] text-[12.5px] text-fg-soft">{row.text}</span>
      ),
    },
    {
      key: "reply",
      header: "Ответ",
      render: (row) =>
        row.reply ? (
          <span className="line-clamp-2 max-w-[180px] text-[12px] text-fg-muted">{row.reply}</span>
        ) : (
          <span className="text-fg-faint">—</span>
        ),
    },
    {
      key: "date",
      header: "Дата",
      render: (row) => formatDate(row.createdAt),
    },
    {
      key: "published",
      header: "Публикация",
      render: (row) => (
        <span
          className="inline-flex items-center gap-2"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <Switch
            checked={row.published}
            disabled={busy}
            aria-label={row.published ? "Снять с публикации" : "Опубликовать"}
            onCheckedChange={(checked) => {
              void togglePublished
                .mutateAsync({ id: row.id, published: checked })
                .catch((err) => {
                  toast.error(err instanceof Error ? err.message : "Не удалось сменить статус")
                })
            }}
          />
          <Badge variant={row.published ? "success" : "outline"}>
            {row.published ? "Опубликован" : "Модерация"}
          </Badge>
        </span>
      ),
    },
    {
      key: "actions",
      header: "",
      className: "w-[72px] text-right",
      render: (row) => (
        <span className="inline-flex gap-0.5" onClick={(e) => e.stopPropagation()}>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={`Редактировать отзыв ${row.author}`}
            disabled={busy}
            onClick={() => openEdit(row)}
          >
            <Pencil size={14} strokeWidth={2.3} />
          </Button>
          {canDelete ? (
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={`Удалить отзыв ${row.author}`}
              disabled={busy}
              className="text-fg-faint hover:bg-red-soft hover:text-red"
              onClick={() => void handleDelete(row)}
            >
              <Trash2 size={14} strokeWidth={2.3} />
            </Button>
          ) : null}
        </span>
      ),
    },
  ]

  return (
    <SectionShell
      title="Отзывы"
      description="Модерация, привязка к товару и ответ заведения. Рейтинг товара пересчитывается после публикации."
    >
      <Toolbar
        searchPlaceholder="Поиск по автору, товару или тексту…"
        onSearchChange={setQuery}
        filters={STATUS_FILTERS}
        activeFilter={statusFilter}
        onFilterChange={setStatusFilter}
        createLabel={canCreate ? "Отзыв" : undefined}
        onCreate={canCreate ? openCreate : undefined}
      />

      {isPending ? (
        <SkeletonRows rows={5} cols={6} />
      ) : !reviews.length ? (
        <EmptyState
          title="Отзывов пока нет"
          description={
            canCreate
              ? "Добавьте первый или дождитесь отзывов с витрины."
              : "Появятся, когда гости оставят оценку."
          }
          actionLabel={canCreate ? "Добавить" : undefined}
          onAction={canCreate ? openCreate : undefined}
        />
      ) : !filtered.length ? (
        <EmptyState title="Ничего не найдено" description="Сбросьте фильтр или измените запрос." />
      ) : (
        <div className="rounded-[var(--r-md)] border border-line bg-surface p-1">
          <DataTable
            columns={columns}
            rows={filtered}
            rowKey={(r) => r.id}
            busy={busy}
            onRowClick={openEdit}
          />
        </div>
      )}

      <ReviewForm
        open={formOpen}
        onOpenChange={setFormOpen}
        review={editing}
        products={products.map((p) => ({ id: p.id, name: p.name }))}
      />
      {dialog}
    </SectionShell>
  )
}

type ProductOption = { id: string; name: string }

type ReviewFormProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  review?: Review | null
  products: ProductOption[]
}

function ReviewForm({ open, onOpenChange, review, products }: ReviewFormProps) {
  const isEdit = Boolean(review)
  const createReview = useCreateReview()
  const updateReview = useUpdateReview()
  const busy = createReview.isPending || updateReview.isPending

  const [author, setAuthor] = useState("")
  const [productId, setProductId] = useState("")
  const [productName, setProductName] = useState("")
  const [score, setScore] = useState("10")
  const [text, setText] = useState("")
  const [reply, setReply] = useState("")
  const [published, setPublished] = useState(false)

  useEffect(() => {
    if (!open) return
    setAuthor(review?.author ?? "")
    setProductId(review?.productId ?? "")
    setProductName(review?.productName ?? "")
    setScore(review ? String(review.score) : "10")
    setText(review?.text ?? "")
    setReply(review?.reply ?? "")
    setPublished(review?.published ?? false)
  }, [open, review])

  async function submit() {
    const trimmedAuthor = author.trim()
    const trimmedText = text.trim()
    const scoreNum = Number(score.replace(",", "."))
    const product = products.find((p) => p.id === productId)
    const resolvedName = (product?.name ?? productName).trim()

    if (!isEdit && !trimmedAuthor) {
      toast.error("Укажите автора")
      return
    }
    if (!resolvedName) {
      toast.error("Укажите или выберите товар")
      return
    }
    if (!Number.isFinite(scoreNum) || scoreNum < 1 || scoreNum > 10) {
      toast.error("Оценка — число от 1 до 10")
      return
    }
    if (!isEdit && !trimmedText) {
      toast.error("Напишите текст отзыва")
      return
    }

    const replyValue = reply.trim()
    const isAdmin = can("reviews", "create")

    try {
      if (isEdit && review) {
        await updateReview.mutateAsync({
          id: review.id,
          data: {
            productId: productId || null,
            productName: resolvedName,
            reply: replyValue || null,
            ...(isAdmin
              ? {
                  author: trimmedAuthor || review.author,
                  score: scoreNum,
                  text: trimmedText || review.text,
                  published,
                }
              : {}),
          },
        })
        toast.success("Сохранено")
      } else {
        await createReview.mutateAsync({
          author: trimmedAuthor,
          productName: resolvedName,
          productId: productId || null,
          score: scoreNum,
          text: trimmedText,
          reply: replyValue || undefined,
          published,
        })
        toast.success("Отзыв добавлен")
      }
      onOpenChange(false)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Не удалось сохранить")
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="gap-0 p-0">
        <div className="border-b border-line px-5 py-4">
          <SheetTitle className="text-[16px] font-extrabold text-fg">
            {isEdit ? "Отзыв" : "Новый отзыв"}
          </SheetTitle>
          <SheetDescription className="mt-1 text-[12.5px] text-fg-muted">
            Привязка к товару нужна для пересчёта рейтинга. Ответ заведения виден на витрине.
          </SheetDescription>
        </div>

        <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-5 py-4">
          {!isEdit || can("reviews", "create") ? (
            <Field label="Автор">
              <Input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Имя гостя"
                maxLength={100}
                disabled={busy || (isEdit && !can("reviews", "create"))}
              />
            </Field>
          ) : (
            <div>
              <p className="text-[11px] font-bold tracking-wide text-fg-faint uppercase">Автор</p>
              <p className="mt-1 text-[14px] font-semibold text-fg">{review?.author}</p>
            </div>
          )}

          <Field label="Товар">
            <Select
              value={productId}
              onChange={(e) => {
                const id = e.target.value
                setProductId(id)
                const match = products.find((p) => p.id === id)
                if (match) setProductName(match.name)
              }}
              disabled={busy}
            >
              <option value="">Без привязки</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </Select>
          </Field>

          {!productId ? (
            <Field label="Название товара">
              <Input
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Как на витрине"
                maxLength={200}
                disabled={busy}
              />
            </Field>
          ) : null}

          {!isEdit || can("reviews", "create") ? (
            <>
              <Field label="Оценка (1–10)">
                <Input
                  type="number"
                  min={1}
                  max={10}
                  step={0.5}
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  disabled={busy}
                />
              </Field>
              <Field label="Текст">
                <Textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={4}
                  maxLength={2000}
                  disabled={busy}
                />
              </Field>
            </>
          ) : (
            <>
              <div>
                <p className="text-[11px] font-bold tracking-wide text-fg-faint uppercase">Оценка</p>
                <p className="mt-1 tabular-nums text-[14px] font-semibold text-fg">
                  {review?.score}/10
                </p>
              </div>
              <div>
                <p className="text-[11px] font-bold tracking-wide text-fg-faint uppercase">Текст</p>
                <p className="mt-1 text-[13px] leading-relaxed text-fg-soft">{review?.text}</p>
              </div>
            </>
          )}

          <Field label="Ответ заведения">
            <Textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              rows={3}
              maxLength={1000}
              placeholder="Спасибо за отзыв…"
              disabled={busy}
            />
          </Field>

          {!isEdit ? (
            <div className="flex items-center justify-between gap-3 rounded-[var(--r-md)] border border-line bg-surface-2 px-3.5 py-3">
              <div>
                <p className="text-[13px] font-bold text-fg">Опубликован</p>
                <p className="text-[11.5px] text-fg-muted">Показывать на витрине</p>
              </div>
              <Switch checked={published} onCheckedChange={setPublished} disabled={busy} />
            </div>
          ) : null}
        </div>

        <div className="mt-auto flex gap-2 border-t border-line px-5 py-4">
          <Button
            type="button"
            variant="ghost"
            className="flex-1"
            disabled={busy}
            onClick={() => onOpenChange(false)}
          >
            Отмена
          </Button>
          <Button type="button" className="flex-1" disabled={busy} onClick={() => void submit()}>
            {busy ? "Сохранение…" : "Сохранить"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
