import { useQuery } from "@tanstack/react-query"

import { collectionMutations } from "@/shared/api/crud"
import { pb } from "@/shared/api/pb"

import { DEFAULT_SIZE_TEMPLATES, type SizeTemplate } from "./model"

type SizeTemplateRecord = {
  id: string
  label: string
  weight: string
  order: number
}

function mapSizeTemplate(record: SizeTemplateRecord): SizeTemplate {
  return {
    id: record.id,
    label: record.label,
    weight: record.weight,
    order: record.order,
  }
}

export const sizeTemplateKeys = {
  all: ["size_templates"] as const,
}

export async function fetchSizeTemplates(): Promise<SizeTemplate[]> {
  try {
    const records = await pb.collection("size_templates").getFullList<SizeTemplateRecord>({
      sort: "order",
    })
    if (!records.length) return seedFallback()
    return records.map(mapSizeTemplate)
  } catch {
    return seedFallback()
  }
}

function seedFallback(): SizeTemplate[] {
  return DEFAULT_SIZE_TEMPLATES.map((t) => ({ ...t, id: `local-${t.label}` }))
}

export function useSizeTemplates() {
  return useQuery({
    queryKey: sizeTemplateKeys.all,
    queryFn: fetchSizeTemplates,
    staleTime: 60_000,
  })
}

export type SizeTemplateInput = {
  label: string
  weight: string
  order: number
}

const sizeTemplateMutations = collectionMutations<
  SizeTemplateRecord,
  SizeTemplate,
  SizeTemplateInput
>({
  collection: "size_templates",
  map: mapSizeTemplate,
  keys: { all: sizeTemplateKeys.all },
})

export function useCreateSizeTemplate() {
  return sizeTemplateMutations.useCreate()
}

export function useUpdateSizeTemplate() {
  return sizeTemplateMutations.useUpdate()
}

export function useDeleteSizeTemplate() {
  return sizeTemplateMutations.useRemove()
}
