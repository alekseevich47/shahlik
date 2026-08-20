import { useQuery } from "@tanstack/react-query"

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
    image: pb.files.getUrl(record, record.image),
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
    filter: `kind = "${kind}"`,
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
