import { useQuery } from "@tanstack/react-query"

import { collectionMutations } from "@/shared/api/crud"
import { pb } from "@/shared/api/pb"

import type { CategoryTag } from "./model"

type TagRecord = {
  id: string
  categoryId: string
  slug: string
  name: string
  emoji?: string
  order: number
}

function mapTag(record: TagRecord): CategoryTag {
  return {
    id: record.id,
    categoryId: record.categoryId,
    slug: record.slug,
    name: record.name,
    emoji: record.emoji || null,
    order: record.order,
  }
}

export const tagKeys = {
  all: ["product_tags"] as const,
  category: (categoryId: string) => ["product_tags", "category", categoryId] as const,
}

export async function fetchTags(): Promise<CategoryTag[]> {
  const records = await pb.collection("product_tags").getFullList<TagRecord>({
    sort: "order",
  })
  return records.map(mapTag)
}

export function tagsForCategory(tags: CategoryTag[], categoryId: string): CategoryTag[] {
  return tags.filter((tag) => tag.categoryId === categoryId).sort((a, b) => a.order - b.order)
}

export function useTags() {
  return useQuery({
    queryKey: tagKeys.all,
    queryFn: fetchTags,
  })
}

export function useCategoryTags(categoryId: string) {
  const query = useTags()
  return {
    ...query,
    data: query.data ? tagsForCategory(query.data, categoryId) : [],
  }
}

export type TagInput = {
  categoryId: string
  slug: string
  name: string
  emoji?: string
  order: number
}

const tagMutations = collectionMutations<TagRecord, CategoryTag, TagInput>({
  collection: "product_tags",
  map: mapTag,
  keys: { all: tagKeys.all },
})

export function useCreateTag() {
  return tagMutations.useCreate()
}

export function useUpdateTag() {
  return tagMutations.useUpdate()
}

export function useDeleteTag() {
  return tagMutations.useRemove()
}
