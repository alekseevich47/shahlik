import { useQuery } from "@tanstack/react-query"

import { pb } from "@/shared/api/pb"

import type { Category, CategoryId } from "./model"

type CategoryRecord = {
  id: string
  name: string
  icon: string
  order: number
}

function mapCategory(record: CategoryRecord): Category {
  return {
    id: record.id as CategoryId,
    name: record.name,
    icon: record.icon || null,
    order: record.order,
  }
}

export const categoryKeys = {
  all: ["categories"] as const,
  detail: (id: string) => ["categories", id] as const,
}

export async function fetchCategories(): Promise<Category[]> {
  const records = await pb.collection("categories").getFullList<CategoryRecord>({
    sort: "order",
  })
  return records.map(mapCategory)
}

export async function fetchCategoryById(id: string): Promise<Category | null> {
  try {
    const record = await pb.collection("categories").getOne<CategoryRecord>(id)
    return mapCategory(record)
  } catch {
    return null
  }
}

export function useCategories() {
  return useQuery({
    queryKey: categoryKeys.all,
    queryFn: fetchCategories,
  })
}

export function useCategory(id: string) {
  return useQuery({
    queryKey: categoryKeys.detail(id),
    queryFn: () => fetchCategoryById(id),
    enabled: Boolean(id),
  })
}
