import { useMutation, useQuery } from "@tanstack/react-query"

import type { CategoryId } from "@/entities/category/model"
import { pb } from "@/shared/api/pb"
import { queryClient } from "@/shared/api/query-client"

import type {
  Product,
  ProductBadge,
  ProductNutrition,
  ProductRating,
  ProductSize,
  ProductTag,
  ProductVariant,
} from "./model"

type ProductRecord = {
  id: string
  slug: string
  categoryId: CategoryId
  name: string
  emoji?: string
  tagline: string
  composition: string
  image: string
  badge?: ProductBadge
  nutrition: ProductNutrition
  tags?: ProductTag[]
  variants: ProductVariant[]
  sizes: ProductSize[]
  rating: ProductRating
  order: number
  active: boolean
  stats: Product["stats"]
  created: string
  updated: string
}

function mapProduct(record: ProductRecord): Product {
  return {
    id: record.id,
    slug: record.slug,
    categoryId: record.categoryId,
    name: record.name,
    emoji: record.emoji || undefined,
    tagline: record.tagline,
    composition: record.composition,
    image: pb.files.getUrl(record, record.image),
    badge: record.badge,
    nutrition: record.nutrition,
    tags: record.tags ?? [],
    variants: record.variants,
    sizes: record.sizes,
    rating: record.rating,
    order: record.order,
    active: record.active,
    createdAt: record.created,
    updatedAt: record.updated,
    stats: record.stats ?? { views: 0, addedToCart: 0, orders: 0, revenue: 0 },
  }
}

export const productKeys = {
  all: ["products"] as const,
  detail: (id: string) => ["products", id] as const,
  slug: (slug: string) => ["products", "slug", slug] as const,
  category: (categoryId: string) => ["products", "category", categoryId] as const,
}

export async function fetchProducts(): Promise<Product[]> {
  const records = await pb.collection("products").getFullList<ProductRecord>({
    sort: "order",
  })
  return records.map(mapProduct)
}

export async function fetchProductById(id: string): Promise<Product | null> {
  try {
    const record = await pb.collection("products").getOne<ProductRecord>(id)
    return mapProduct(record)
  } catch {
    return null
  }
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  try {
    const record = await pb
      .collection("products")
      .getFirstListItem<ProductRecord>(`slug = "${slug}"`)
    return mapProduct(record)
  } catch {
    return null
  }
}

export async function fetchProductsByCategory(categoryId: string): Promise<Product[]> {
  const records = await pb.collection("products").getFullList<ProductRecord>({
    filter: `categoryId = "${categoryId}"`,
    sort: "order",
  })
  return records.map(mapProduct)
}

export function useProducts() {
  return useQuery({
    queryKey: productKeys.all,
    queryFn: fetchProducts,
  })
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => fetchProductById(id),
    enabled: Boolean(id),
  })
}

export function useProductBySlug(slug: string) {
  return useQuery({
    queryKey: productKeys.slug(slug),
    queryFn: () => fetchProductBySlug(slug),
    enabled: Boolean(slug),
  })
}

export function useProductsByCategory(categoryId: string) {
  return useQuery({
    queryKey: productKeys.category(categoryId),
    queryFn: () => fetchProductsByCategory(categoryId),
    enabled: Boolean(categoryId),
  })
}

export type UpdateProductInput = {
  name?: string
  categoryId?: CategoryId
  composition?: string
  rating?: ProductRating
}

export async function updateProduct(id: string, data: UpdateProductInput): Promise<Product> {
  const record = await pb.collection("products").update<ProductRecord>(id, data)
  return mapProduct(record)
}

export async function deleteProduct(id: string): Promise<void> {
  await pb.collection("products").delete(id)
}

export function useUpdateProduct() {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProductInput }) => updateProduct(id, data),
    onSuccess: (product) => {
      void queryClient.invalidateQueries({ queryKey: productKeys.all })
      queryClient.setQueryData(productKeys.detail(product.id), product)
      queryClient.setQueryData(productKeys.slug(product.slug), product)
    },
  })
}

export function useDeleteProduct() {
  return useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: (_ok, id) => {
      void queryClient.invalidateQueries({ queryKey: productKeys.all })
      queryClient.removeQueries({ queryKey: productKeys.detail(id) })
    },
  })
}
