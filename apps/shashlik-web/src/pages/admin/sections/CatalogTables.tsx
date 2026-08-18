import { Pencil, Plus } from "lucide-react"
import { toast } from "sonner"

import type { Product } from "@/entities/product/model"
import { minPrice } from "@/entities/product/lib"
import { ORDER_STATUS_LABEL, type Order, type Review } from "@/entities/order/model"
import { AdminCard } from "@/pages/admin/ui/AdminCard"
import { DataTable, type Column } from "@/pages/admin/ui/DataTable"
import { addons } from "@/mocks/addons"
import { banners } from "@/mocks/banners"
import { categories, categoryById } from "@/mocks/categories"
import { orders, reviews } from "@/mocks/orders"
import { products, productsByCategory } from "@/mocks/products"
import { formatDate, formatPrice } from "@/shared/lib/format"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"

export function ProductsTable({ onOpen }: { onOpen: (product: Product) => void }) {
  const columns: Column<Product>[] = [
    {
      key: "name",
      header: "Товар",
      render: (row) => (
        <span className="flex items-center gap-2.5">
          <img src={row.image} alt="" className="size-9 rounded-[var(--r-xs)] object-cover" />
          <span className="flex flex-col leading-tight">
            <span className="text-[12.5px] font-bold text-fg">{row.name}</span>
            <span className="text-[10.5px] text-fg-faint">
              {row.variants.length || 1} × {row.sizes.length} SKU
            </span>
          </span>
        </span>
      ),
    },
    {
      key: "category",
      header: "Категория",
      render: (row) => categoryById(row.categoryId)?.name ?? "—",
    },
    {
      key: "price",
      header: "Цена от",
      className: "tabular-nums",
      render: (row) => formatPrice(minPrice(row)),
    },
    {
      key: "rating",
      header: "Оценка",
      className: "tabular-nums",
      render: (row) => `${row.rating.overall}/10`,
    },
    {
      key: "state",
      header: "Статус",
      render: (row) => (
        <Badge variant={row.active ? "success" : "outline"}>
          {row.active ? "Активен" : "Скрыт"}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "",
      className: "w-10 text-right",
      render: (row) => (
        <button
          type="button"
          aria-label={`Редактировать ${row.name}`}
          onClick={() => onOpen(row)}
          className="grid size-7 cursor-pointer place-items-center rounded-[var(--r-xs)] text-fg-faint transition-colors hover:bg-brand-soft hover:text-brand"
        >
          <Pencil size={14} strokeWidth={2.3} />
        </button>
      ),
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      {categories.map((category) => {
        const rows = productsByCategory(category.id)
        if (!rows.length) return null
        return (
          <AdminCard
            key={category.id}
            title={`${category.name} · ${rows.length}`}
            action={
              <Button variant="soft" size="xs" onClick={() => toast("Создание товара — заглушка")}>
                <Plus size={12} strokeWidth={3} />
                Товар
              </Button>
            }
            bodyClassName="p-1"
          >
            <DataTable columns={columns} rows={rows} rowKey={(r) => r.id} onRowClick={onOpen} />
          </AdminCard>
        )
      })}
    </div>
  )
}

export function CategoriesTable() {
  return (
    <AdminCard title={`Категории · ${categories.length}`} bodyClassName="p-1">
      <DataTable
        rows={categories}
        rowKey={(c) => c.id}
        columns={[
          {
            key: "name",
            header: "Категория",
            render: (row) => (
              <span className="flex items-center gap-2.5">
                {row.icon ? (
                  <img src={row.icon} alt="" className="size-7 object-contain" />
                ) : (
                  <span className="size-7 rounded-[var(--r-xs)] bg-surface-3" />
                )}
                <span className="text-[12.5px] font-bold text-fg">{row.name}</span>
              </span>
            ),
          },
          { key: "id", header: "ID", render: (row) => row.id },
          {
            key: "count",
            header: "Товаров",
            className: "tabular-nums",
            render: (row) => products.filter((p) => p.categoryId === row.id).length,
          },
          { key: "order", header: "Порядок", className: "tabular-nums", render: (row) => row.order },
        ]}
      />
    </AdminCard>
  )
}

export function BannersTable() {
  return (
    <AdminCard title={`Баннеры · ${banners.length}`} bodyClassName="p-1">
      <DataTable
        rows={banners}
        rowKey={(b) => b.id}
        columns={[
          {
            key: "image",
            header: "Баннер",
            render: (row) => (
              <span className="flex items-center gap-2.5">
                <img
                  src={row.image}
                  alt=""
                  className="h-9 w-16 rounded-[var(--r-xs)] object-cover"
                />
                <span className="text-[12.5px] font-bold text-fg">{row.title}</span>
              </span>
            ),
          },
          { key: "subtitle", header: "Подзаголовок", render: (row) => row.subtitle },
          { key: "note", header: "Плашка", render: (row) => row.note?.title ?? "—" },
          { key: "order", header: "Порядок", className: "tabular-nums", render: (row) => row.order },
        ]}
      />
    </AdminCard>
  )
}

export function AddonsTable() {
  return (
    <AdminCard title={`Добавки и соусы · ${addons.length}`} bodyClassName="p-1">
      <DataTable
        rows={addons}
        rowKey={(a) => a.id}
        columns={[
          {
            key: "name",
            header: "Позиция",
            render: (row) => (
              <span className="flex items-center gap-2.5">
                <img src={row.image} alt="" className="size-8 rounded-full object-cover" />
                <span className="text-[12.5px] font-bold text-fg">{row.name}</span>
              </span>
            ),
          },
          {
            key: "kind",
            header: "Тип",
            render: (row) => (
              <Badge variant={row.kind === "sauce" ? "soft" : "meta"}>
                {row.kind === "sauce" ? "Соус" : "Добавка"}
              </Badge>
            ),
          },
          { key: "weight", header: "Вес", render: (row) => row.weight },
          {
            key: "price",
            header: "Цена",
            className: "tabular-nums",
            render: (row) => formatPrice(row.price),
          },
          { key: "article", header: "Артикул", render: (row) => row.article ?? "—" },
        ]}
      />
    </AdminCard>
  )
}

export function OrdersTable() {
  const columns: Column<Order>[] = [
    {
      key: "number",
      header: "Заказ",
      render: (row) => <span className="font-bold text-fg">{row.number}</span>,
    },
    { key: "customer", header: "Клиент", render: (row) => row.customer },
    { key: "phone", header: "Телефон", render: (row) => row.phone },
    {
      key: "mode",
      header: "Получение",
      render: (row) => (row.mode === "delivery" ? `Доставка · ${row.address}` : "Самовывоз"),
    },
    { key: "positions", header: "Позиций", className: "tabular-nums", render: (row) => row.positions },
    {
      key: "total",
      header: "Сумма",
      className: "tabular-nums",
      render: (row) => formatPrice(row.total),
    },
    {
      key: "status",
      header: "Статус",
      render: (row) => (
        <Badge
          variant={
            row.status === "done" ? "success" : row.status === "canceled" ? "outline" : "soft"
          }
        >
          {ORDER_STATUS_LABEL[row.status]}
        </Badge>
      ),
    },
  ]

  return (
    <AdminCard title={`Заказы · ${orders.length}`} bodyClassName="p-1">
      <DataTable columns={columns} rows={orders} rowKey={(o) => o.id} />
    </AdminCard>
  )
}

export function ReviewsTable() {
  const columns: Column<Review>[] = [
    {
      key: "author",
      header: "Автор",
      render: (row) => <span className="font-bold text-fg">{row.author}</span>,
    },
    { key: "product", header: "Товар", render: (row) => row.productName },
    {
      key: "score",
      header: "Оценка",
      className: "tabular-nums",
      render: (row) => `${row.score}/10`,
    },
    { key: "text", header: "Отзыв", render: (row) => row.text },
    { key: "date", header: "Дата", render: (row) => formatDate(row.createdAt) },
    {
      key: "published",
      header: "Публикация",
      render: (row) => (
        <Badge variant={row.published ? "success" : "outline"}>
          {row.published ? "Опубликован" : "На модерации"}
        </Badge>
      ),
    },
  ]

  return (
    <AdminCard title={`Отзывы · ${reviews.length}`} bodyClassName="p-1">
      <DataTable columns={columns} rows={reviews} rowKey={(r) => r.id} />
    </AdminCard>
  )
}
