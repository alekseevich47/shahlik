import { useMutation, useQuery } from "@tanstack/react-query"

import { pb } from "@/shared/api/pb"
import { queryClient } from "@/shared/api/query-client"

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

async function createTag(data: TagInput): Promise<CategoryTag> {
  const record = await pb.collection("product_tags").create<TagRecord>(data)
  return mapTag(record)
}

async function updateTag(id: string, data: Partial<TagInput>): Promise<CategoryTag> {
  const record = await pb.collection("product_tags").update<TagRecord>(id, data)
  return mapTag(record)
}

async function deleteTag(id: string): Promise<void> {
  await pb.collection("product_tags").delete(id)
}

function invalidateTags() {
  void queryClient.invalidateQueries({ queryKey: tagKeys.all })
}

export function useCreateTag() {
  return useMutation({
    mutationFn: createTag,
    onSuccess: invalidateTags,
  })
}

export function useUpdateTag() {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<TagInput> }) => updateTag(id, data),
    onSuccess: invalidateTags,
  })
}

export function useDeleteTag() {
  return useMutation({
    mutationFn: deleteTag,
    onSuccess: invalidateTags,
  })
}
