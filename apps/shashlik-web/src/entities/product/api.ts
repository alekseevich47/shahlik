import { useMutation, useQuery } from "@tanstack/react-query"

import type { CategoryId } from "@/entities/category/model"
import { adminCountKeys } from "@/shared/api/counts"
import { collectionMutations } from "@/shared/api/crud"
import { imageFilenames, imageUrl, imageUrls, toUploadFormData } from "@/shared/api/files"
import { pb } from "@/shared/api/pb"
import { queryClient } from "@/shared/api/query-client"

import {
  criterionScore,
  DEFAULT_CRITERIA,
  type Product,
  type ProductBadge,
  type ProductNutrition,
  type ProductRating,
  type ProductSize,
  type ProductVariant,
} from "./model"

type ProductRecord = {
  id: string
  slug: string
  categoryId: CategoryId
  name: string
  emoji?: string
  tagline: string
  composition: string
  compositionByVariant?: Record<string, string>
  image: string | string[]
  imageDark?: string | string[]
  badge?: ProductBadge
  nutrition: ProductNutrition
  variants: ProductVariant[]
  sizes: ProductSize[]
  rating: ProductRating
  order: number
  active: boolean
  bonusPercent?: number | null
  stats: Product["stats"]
  created: string
  updated: string
}

function mapRating(rating: ProductRating): ProductRating {
  return {
    ...rating,
    criteria: rating.criteria.map((c) => ({
      ...c,
      value: criterionScore(c.value),
    })),
  }
}

function mapCompositionByVariant(raw: unknown): Record<string, string> | undefined {
  if (!raw || typeof raw !== "object") return undefined
  const out: Record<string, string> = {}
  for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
    if (typeof value === "string" && value.trim()) out[key] = value.trim()
  }
  return Object.keys(out).length ? out : undefined
}

function mapProduct(record: ProductRecord): Product {
  const images = imageUrls(record, "image")
  return {
    id: record.id,
    slug: record.slug,
    categoryId: record.categoryId,
    name: record.name,
    emoji: record.emoji || undefined,
    tagline: record.tagline,
    composition: record.composition,
    compositionByVariant: mapCompositionByVariant(record.compositionByVariant),
    image: images[0] ?? imageUrl(record, "image"),
    images,
    imageFilenames: imageFilenames(record, "image"),
    imagesDark: imageUrls(record, "imageDark"),
    imageDarkFilenames: imageFilenames(record, "imageDark"),
    badge: record.badge || undefined,
    nutrition: record.nutrition,
    variants: record.variants ?? [],
    sizes: record.sizes ?? [],
    rating: mapRating(record.rating),
    order: record.order,
    active: record.active,
    bonusPercent:
      record.bonusPercent === undefined || record.bonusPercent === null
        ? null
        : Number(record.bonusPercent),
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

export const adminProductKeys = {
  all: ["admin", "products"] as const,
}

export const frontpadStockKeys = {
  all: ["frontpad_stock"] as const,
}

export async function fetchProducts(): Promise<Product[]> {
  const records = await pb.collection("products").getFullList<ProductRecord>({
    filter: "active = true",
    sort: "order",
  })
  return records.map(mapProduct)
}

export async function fetchAdminProducts(): Promise<Product[]> {
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
      .getFirstListItem<ProductRecord>(pb.filter("slug = {:slug}", { slug }))
    return mapProduct(record)
  } catch {
    return null
  }
}

export async function fetchProductsByCategory(categoryId: string): Promise<Product[]> {
  const records = await pb.collection("products").getFullList<ProductRecord>({
    filter: pb.filter("categoryId = {:categoryId} && active = true", { categoryId }),
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

export function useAdminProducts() {
  return useQuery({
    queryKey: adminProductKeys.all,
    queryFn: fetchAdminProducts,
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

export function useFrontpadStockArticles() {
  return useQuery({
    queryKey: frontpadStockKeys.all,
    queryFn: async () => {
      const { fetchFrontpadArticleSet } = await import("./lib/articles")
      return fetchFrontpadArticleSet()
    },
    staleTime: 60_000,
  })
}

export type CreateProductInput = {
  name: string
  slug: string
  categoryId: CategoryId
  tagline: string
  composition: string
  compositionByVariant?: Record<string, string>
  emoji?: string
  badge?: ProductBadge | ""
  nutrition: ProductNutrition
  variants: ProductVariant[]
  sizes: ProductSize[]
  order: number
  active: boolean
  /** Одно или несколько фото (1–5) — светлая тема. */
  image: File | File[]
  /** Опциональные фото тёмной темы (PB `imageDark`). */
  imageDark?: File | File[]
}

export type UpdateProductInput = {
  name?: string
  slug?: string
  categoryId?: CategoryId
  tagline?: string
  composition?: string
  compositionByVariant?: Record<string, string>
  emoji?: string
  badge?: ProductBadge | ""
  nutrition?: ProductNutrition
  variants?: ProductVariant[]
  sizes?: ProductSize[]
  rating?: ProductRating
  order?: number
  active?: boolean
  bonusPercent?: number | null
  /** Новые файлы — дозапись через `image+` (PB ≥0.23; голый `image` затирает). */
  image?: File | File[] | null
  /** Имена файлов PB для удаления (`image-`). */
  imageRemove?: string[]
  /** Дозапись тёмных фото через `imageDark+`. */
  imageDark?: File | File[] | null
  /** Имена файлов PB для удаления (`imageDark-`). */
  imageDarkRemove?: string[]
}

const EMPTY_STATS: Product["stats"] = {
  views: 0,
  addedToCart: 0,
  orders: 0,
  revenue: 0,
}

function defaultRating(): ProductRating {
  return {
    overall: 0,
    votes: 0,
    criteria: DEFAULT_CRITERIA.map((c) => ({ ...c, value: 0 })),
  }
}

const productMutations = collectionMutations<
  ProductRecord,
  Product,
  Record<string, unknown>,
  Record<string, unknown>
>({
  collection: "products",
  map: mapProduct,
  keys: {
    all: [productKeys.all, adminProductKeys.all, adminCountKeys.all],
    detail: productKeys.detail,
  },
})

const PRODUCT_MAX_BYTES = 5_242_880

async function createBody(input: CreateProductInput): Promise<Record<string, unknown>> {
  const images = Array.isArray(input.image) ? input.image : [input.image]
  const darkRaw = input.imageDark
  const darkImages = darkRaw
    ? Array.isArray(darkRaw)
      ? darkRaw
      : [darkRaw]
    : []
  return (await toUploadFormData(
    {
      name: input.name,
      slug: input.slug,
      categoryId: input.categoryId,
      tagline: input.tagline,
      composition: input.composition,
      compositionByVariant: input.compositionByVariant ?? null,
      emoji: input.emoji,
      badge: input.badge || null,
      nutrition: input.nutrition,
      variants: input.variants,
      sizes: input.sizes,
      rating: defaultRating(),
      order: input.order,
      active: input.active,
      stats: EMPTY_STATS,
      image: images.length === 1 ? images[0] : images,
      ...(darkImages.length
        ? { imageDark: darkImages.length === 1 ? darkImages[0] : darkImages }
        : {}),
    },
    { maxBytes: PRODUCT_MAX_BYTES },
  )) as unknown as Record<string, unknown>
}

async function updateBody(input: UpdateProductInput): Promise<Record<string, unknown>> {
  const payload: Record<string, unknown> = {
    name: input.name,
    slug: input.slug,
    categoryId: input.categoryId,
    tagline: input.tagline,
    composition: input.composition,
    compositionByVariant: input.compositionByVariant ?? null,
    emoji: input.emoji,
    badge: input.badge === "" ? null : input.badge,
    nutrition: input.nutrition,
    variants: input.variants,
    sizes: input.sizes,
    rating: input.rating,
    order: input.order,
    active: input.active,
  }
  if (input.bonusPercent !== undefined) {
    payload.bonusPercent = input.bonusPercent
  }
  // PB ≥0.23: ключ `image` заменяет multi-file; `image+` дозаписывает.
  if (input.image !== undefined && input.image !== null) {
    payload["image+"] = input.image
  } else if (input.image === null) {
    payload.image = null
  }
  if (input.imageRemove?.length) payload["image-"] = input.imageRemove
  if (input.imageDark !== undefined && input.imageDark !== null) {
    payload["imageDark+"] = input.imageDark
  } else if (input.imageDark === null) {
    payload.imageDark = null
  }
  if (input.imageDarkRemove?.length) payload["imageDark-"] = input.imageDarkRemove
  return (await toUploadFormData(payload, {
    maxBytes: PRODUCT_MAX_BYTES,
  })) as unknown as Record<string, unknown>
}

export async function createProduct(input: CreateProductInput): Promise<Product> {
  return productMutations.create(await createBody(input))
}

export async function updateProduct(id: string, data: UpdateProductInput): Promise<Product> {
  return productMutations.update(id, await updateBody(data))
}

export async function deleteProduct(id: string): Promise<void> {
  return productMutations.remove(id)
}

async function filesFromUrls(urls: string[], namePrefix: string): Promise<File[]> {
  if (!urls.length) return []
  const files: File[] = []
  for (const [index, url] of urls.entries()) {
    const res = await fetch(url)
    if (!res.ok) throw new Error("Не удалось скопировать фото")
    const blob = await res.blob()
    const ext = blob.type.split("/")[1] || "jpg"
    files.push(
      new File([blob], `${namePrefix}-${index + 1}.${ext}`, {
        type: blob.type || "image/jpeg",
      }),
    )
  }
  return files
}

async function filesFromProductImages(product: Product): Promise<File[]> {
  const urls = product.images.length ? product.images : product.image ? [product.image] : []
  if (!urls.length) throw new Error("Не удалось скопировать фото")
  return filesFromUrls(urls, `${product.slug}-copy`)
}

export async function duplicateProduct(id: string): Promise<Product> {
  const source = await fetchProductById(id)
  if (!source) throw new Error("Товар не найден")

  const image = await filesFromProductImages(source)
  const imageDark = source.imagesDark.length
    ? await filesFromUrls(source.imagesDark, `${source.slug}-copy-dark`)
    : undefined
  const slugBase = `${source.slug}-copy`.slice(0, 190)
  let slug = slugBase
  let n = 2
  while (await fetchProductBySlug(slug)) {
    slug = `${slugBase}-${n}`
    n += 1
  }

  return createProduct({
    name: `${source.name} (копия)`,
    slug,
    categoryId: source.categoryId,
    tagline: source.tagline,
    composition: source.composition,
    compositionByVariant: source.compositionByVariant,
    emoji: source.emoji,
    badge: source.badge,
    nutrition: source.nutrition,
    variants: source.variants,
    sizes: source.sizes,
    order: source.order + 1,
    active: false,
    image,
    ...(imageDark?.length ? { imageDark } : {}),
  })
}

export function useCreateProduct() {
  const mutation = productMutations.useCreate()
  return {
    ...mutation,
    mutateAsync: async (input: CreateProductInput) =>
      mutation.mutateAsync(await createBody(input)),
  }
}

export function useUpdateProduct() {
  const mutation = productMutations.useUpdate()
  return {
    ...mutation,
    mutateAsync: async (args: { id: string; data: UpdateProductInput }) =>
      mutation.mutateAsync({ id: args.id, data: await updateBody(args.data) }),
  }
}

export function useDeleteProduct() {
  return productMutations.useRemove()
}

export function useDuplicateProduct() {
  return useMutation({
    mutationFn: (id: string) => duplicateProduct(id),
    onSuccess: (product) => {
      void queryClient.invalidateQueries({ queryKey: productKeys.all })
      void queryClient.invalidateQueries({ queryKey: adminProductKeys.all })
      void queryClient.invalidateQueries({ queryKey: adminCountKeys.all })
      queryClient.setQueryData(productKeys.detail(product.id), product)
    },
  })
}

export function useToggleProductActive() {
  return useMutation({
    mutationFn: ({ id, active }: { id: string; active: boolean }) =>
      updateProduct(id, { active }),
    onMutate: async ({ id, active }) => {
      await queryClient.cancelQueries({ queryKey: adminProductKeys.all })
      const prev = queryClient.getQueryData<Product[]>(adminProductKeys.all)
      if (prev) {
        queryClient.setQueryData(
          adminProductKeys.all,
          prev.map((p) => (p.id === id ? { ...p, active } : p)),
        )
      }
      const detail = queryClient.getQueryData<Product>(productKeys.detail(id))
      if (detail) {
        queryClient.setQueryData(productKeys.detail(id), { ...detail, active })
      }
      return { prev, detail }
    },
    onError: (_err, { id }, ctx) => {
      if (ctx?.prev) queryClient.setQueryData(adminProductKeys.all, ctx.prev)
      if (ctx?.detail) queryClient.setQueryData(productKeys.detail(id), ctx.detail)
    },
    onSettled: (_data, _err, { id }) => {
      void queryClient.invalidateQueries({ queryKey: productKeys.all })
      void queryClient.invalidateQueries({ queryKey: adminProductKeys.all })
      void queryClient.invalidateQueries({ queryKey: productKeys.detail(id) })
    },
  })
}
