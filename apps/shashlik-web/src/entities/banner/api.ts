import { useQuery } from "@tanstack/react-query"

import { pb } from "@/shared/api/pb"

import type { Banner } from "./model"

type BannerRecord = {
  id: string
  title: string
  subtitle: string
  image: string
  note?: { title: string; text: string }
  order: number
}

function mapBanner(record: BannerRecord): Banner {
  return {
    id: record.id,
    title: record.title,
    subtitle: record.subtitle,
    image: pb.files.getUrl(record, record.image),
    note: record.note,
    order: record.order,
  }
}

export const bannerKeys = {
  all: ["banners"] as const,
  detail: (id: string) => ["banners", id] as const,
}

export async function fetchBanners(): Promise<Banner[]> {
  const records = await pb.collection("banners").getFullList<BannerRecord>({
    sort: "order",
  })
  return records.map(mapBanner)
}

export async function fetchBannerById(id: string): Promise<Banner | null> {
  try {
    const record = await pb.collection("banners").getOne<BannerRecord>(id)
    return mapBanner(record)
  } catch {
    return null
  }
}

export function useBanners() {
  return useQuery({
    queryKey: bannerKeys.all,
    queryFn: fetchBanners,
  })
}

export function useBanner(id: string) {
  return useQuery({
    queryKey: bannerKeys.detail(id),
    queryFn: () => fetchBannerById(id),
    enabled: Boolean(id),
  })
}
