import { useQuery } from "@tanstack/react-query"

import { adminCountKeys } from "@/shared/api/counts"
import { collectionMutations } from "@/shared/api/crud"
import { imageUrl, toFormData } from "@/shared/api/files"
import { pb } from "@/shared/api/pb"

import type { Banner } from "./model"

export type BannerNote = { title: string; text: string }

type BannerRecord = {
  id: string
  title: string
  subtitle: string
  image: string
  note?: BannerNote | null
  order: number
}

function mapBanner(record: BannerRecord): Banner {
  const note =
    record.note && (record.note.title || record.note.text) ? record.note : undefined
  return {
    id: record.id,
    title: record.title,
    subtitle: record.subtitle,
    image: imageUrl(record, "image"),
    note,
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

export type CreateBannerInput = {
  title: string
  subtitle: string
  order: number
  note?: BannerNote | null
  image: File
}

export type UpdateBannerInput = {
  title?: string
  subtitle?: string
  order?: number
  /** Объект или `null`, чтобы очистить плашку. */
  note?: BannerNote | null
  image?: File | null
}

const bannerMutations = collectionMutations<
  BannerRecord,
  Banner,
  Record<string, unknown>,
  Record<string, unknown>
>({
  collection: "banners",
  map: mapBanner,
  keys: {
    all: [bannerKeys.all, adminCountKeys.all],
    detail: bannerKeys.detail,
  },
})

/** FormData: `note: null` → JSON null (toFormData иначе шлёт "" как удаление файла). */
function bannerFormData(data: {
  title?: string
  subtitle?: string
  order?: number
  note?: BannerNote | null
  image?: File | null
}): FormData {
  const { note, ...rest } = data
  const form = toFormData(rest)
  if (note !== undefined) {
    form.set("note", note === null ? "null" : JSON.stringify(note))
  }
  return form
}

export function useCreateBanner() {
  const mutation = bannerMutations.useCreate()
  return {
    ...mutation,
    mutateAsync: (input: CreateBannerInput) =>
      mutation.mutateAsync(
        bannerFormData({
          title: input.title,
          subtitle: input.subtitle,
          order: input.order,
          note: input.note,
          image: input.image,
        }) as unknown as Record<string, unknown>,
      ),
  }
}

export function useUpdateBanner() {
  const mutation = bannerMutations.useUpdate()
  return {
    ...mutation,
    mutateAsync: (args: { id: string; data: UpdateBannerInput }) => {
      const { note, image, ...rest } = args.data
      const payload: {
        title?: string
        subtitle?: string
        order?: number
        note?: BannerNote | null
        image?: File | null
      } = { ...rest }
      if (note !== undefined) payload.note = note
      if (image !== undefined) payload.image = image

      if (image !== undefined || note !== undefined) {
        return mutation.mutateAsync({
          id: args.id,
          data: bannerFormData(payload) as unknown as Record<string, unknown>,
        })
      }

      return mutation.mutateAsync({ id: args.id, data: rest })
    },
  }
}

export function useDeleteBanner() {
  return bannerMutations.useRemove()
}
