import { useQuery } from "@tanstack/react-query"

import { adminCountKeys } from "@/shared/api/counts"
import { collectionMutations } from "@/shared/api/crud"
import { imageUrl, toFormData } from "@/shared/api/files"
import { pb } from "@/shared/api/pb"

import type { Addon, AddonKind } from "./model"

type AddonRecord = {
  id: string
  name: string
  weight: string
  price: number
  image: string
  kind: AddonKind
  article?: string
}

function mapAddon(record: AddonRecord): Addon {
  return {
    id: record.id,
    name: record.name,
    weight: record.weight,
    price: record.price,
    image: imageUrl(record, "image"),
    kind: record.kind,
    article: record.article,
  }
}

export const addonKeys = {
  all: ["addons"] as const,
  detail: (id: string) => ["addons", id] as const,
  kind: (kind: AddonKind) => ["addons", "kind", kind] as const,
}

export async function fetchAddons(): Promise<Addon[]> {
  const records = await pb.collection("addons").getFullList<AddonRecord>()
  return records.map(mapAddon)
}

export async function fetchAddonsByKind(kind: AddonKind): Promise<Addon[]> {
  const records = await pb.collection("addons").getFullList<AddonRecord>({
    filter: pb.filter("kind = {:kind}", { kind }),
  })
  return records.map(mapAddon)
}

export async function fetchAddonById(id: string): Promise<Addon | null> {
  try {
    const record = await pb.collection("addons").getOne<AddonRecord>(id)
    return mapAddon(record)
  } catch {
    return null
  }
}

export const fetchExtras = () => fetchAddonsByKind("extra")
export const fetchSauces = () => fetchAddonsByKind("sauce")

export function useAddons() {
  return useQuery({
    queryKey: addonKeys.all,
    queryFn: fetchAddons,
  })
}

export function useAddon(id: string) {
  return useQuery({
    queryKey: addonKeys.detail(id),
    queryFn: () => fetchAddonById(id),
    enabled: Boolean(id),
  })
}

export function useExtras() {
  return useQuery({
    queryKey: addonKeys.kind("extra"),
    queryFn: fetchExtras,
  })
}

export function useSauces() {
  return useQuery({
    queryKey: addonKeys.kind("sauce"),
    queryFn: fetchSauces,
  })
}

export type CreateAddonInput = {
  name: string
  weight: string
  price: number
  kind: AddonKind
  article?: string
  image: File
}

export type UpdateAddonInput = {
  name?: string
  weight?: string
  price?: number
  kind?: AddonKind
  article?: string
  /** Новый файл; `null` — удалить (поле в схеме required — обычно не используем). */
  image?: File | null
}

const addonMutations = collectionMutations<
  AddonRecord,
  Addon,
  Record<string, unknown>,
  Record<string, unknown>
>({
  collection: "addons",
  map: mapAddon,
  keys: {
    all: [addonKeys.all, addonKeys.kind("extra"), addonKeys.kind("sauce"), adminCountKeys.all],
    detail: addonKeys.detail,
  },
})

function createBody(input: CreateAddonInput): Record<string, unknown> {
  return toFormData({
    name: input.name,
    weight: input.weight,
    price: input.price,
    kind: input.kind,
    article: input.article,
    image: input.image,
  }) as unknown as Record<string, unknown>
}

function updateBody(input: UpdateAddonInput): Record<string, unknown> {
  return toFormData({
    name: input.name,
    weight: input.weight,
    price: input.price,
    kind: input.kind,
    article: input.article,
    image: input.image,
  }) as unknown as Record<string, unknown>
}

export function useCreateAddon() {
  const mutation = addonMutations.useCreate()
  return {
    ...mutation,
    mutateAsync: (input: CreateAddonInput) => mutation.mutateAsync(createBody(input)),
  }
}

export function useUpdateAddon() {
  const mutation = addonMutations.useUpdate()
  return {
    ...mutation,
    mutateAsync: (args: { id: string; data: UpdateAddonInput }) =>
      mutation.mutateAsync({ id: args.id, data: updateBody(args.data) }),
  }
}

export function useDeleteAddon() {
  return addonMutations.useRemove()
}
