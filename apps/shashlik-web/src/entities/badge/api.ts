import { useQuery } from "@tanstack/react-query"

import { collectionMutations } from "@/shared/api/crud"
import { pb } from "@/shared/api/pb"

import { DEFAULT_BADGES, type ProductBadgeDef } from "./model"

type BadgeRecord = {
  id: string
  slug: string
  label: string
  order: number
}

function mapBadge(record: BadgeRecord): ProductBadgeDef {
  return {
    id: record.id,
    slug: record.slug,
    label: record.label,
    order: record.order,
  }
}

export const badgeKeys = {
  all: ["product_badges"] as const,
}

export async function fetchBadges(): Promise<ProductBadgeDef[]> {
  try {
    const records = await pb.collection("product_badges").getFullList<BadgeRecord>({
      sort: "order",
    })
    if (!records.length) return seedFallback()
    return records.map(mapBadge)
  } catch {
    return seedFallback()
  }
}

function seedFallback(): ProductBadgeDef[] {
  return DEFAULT_BADGES.map((b) => ({ ...b, id: `local-${b.slug}` }))
}

export function useBadges() {
  return useQuery({
    queryKey: badgeKeys.all,
    queryFn: fetchBadges,
    staleTime: 60_000,
  })
}

export type BadgeInput = {
  slug: string
  label: string
  order: number
}

const badgeMutations = collectionMutations<BadgeRecord, ProductBadgeDef, BadgeInput>({
  collection: "product_badges",
  map: mapBadge,
  keys: { all: badgeKeys.all },
})

export function useCreateBadge() {
  return badgeMutations.useCreate()
}

export function useUpdateBadge() {
  return badgeMutations.useUpdate()
}

export function useDeleteBadge() {
  return badgeMutations.useRemove()
}
