import { useQuery } from "@tanstack/react-query"

import { adminCountKeys } from "@/shared/api/counts"
import { collectionMutations } from "@/shared/api/crud"
import { imageUrl, toFormData, toUploadFormData } from "@/shared/api/files"
import { pb } from "@/shared/api/pb"

import type { Banner } from "./model"

export type BannerNote = { title: string; text: string }

type BannerRecord = {
  id: string
  image: string
  imageDark?: string
  note?: BannerNote | null
  order: number
}

function mapBanner(record: BannerRecord): Banner {
  const note =
    record.note && (record.note.title || record.note.text) ? record.note : undefined
  const imageDark = imageUrl(record, "imageDark")
  return {
    id: record.id,
    image: imageUrl(record, "image"),
    ...(imageDark ? { imageDark } : {}),
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
  order: number
  note?: BannerNote | null
  image: File
  imageDark?: File
}

export type UpdateBannerInput = {
  order?: number
  /** Объект или `null`, чтобы очистить плашку. */
  note?: BannerNote | null
  image?: File | null
  imageDark?: File | null
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

const BANNER_MAX_BYTES = 5_242_880

/** FormData: `note: null` → JSON null (toFormData иначе шлёт "" как удаление файла). */
async function bannerFormData(data: {
  order?: number
  note?: BannerNote | null
  image?: File | null
  imageDark?: File | null
}): Promise<FormData> {
  const { note, image, imageDark, ...rest } = data
  const filePayload: Record<string, unknown> = { ...rest }
  if (image instanceof File) filePayload.image = image
  else if (image === null) filePayload.image = null
  if (imageDark instanceof File) filePayload.imageDark = imageDark
  else if (imageDark === null) filePayload.imageDark = null

  const needsCompress = image instanceof File || imageDark instanceof File
  const form = needsCompress
    ? await toUploadFormData(filePayload, { maxBytes: BANNER_MAX_BYTES })
    : toFormData(filePayload)
  if (note !== undefined) {
    form.set("note", note === null ? "null" : JSON.stringify(note))
  }
  return form
}

export function useCreateBanner() {
  const mutation = bannerMutations.useCreate()
  return {
    ...mutation,
    mutateAsync: async (input: CreateBannerInput) =>
      mutation.mutateAsync(
        (await bannerFormData({
          order: input.order,
          note: input.note,
          image: input.image,
          ...(input.imageDark ? { imageDark: input.imageDark } : {}),
        })) as unknown as Record<string, unknown>,
      ),
  }
}

export function useUpdateBanner() {
  const mutation = bannerMutations.useUpdate()
  return {
    ...mutation,
    mutateAsync: async (args: { id: string; data: UpdateBannerInput }) => {
      const { note, image, imageDark, ...rest } = args.data
      const payload: {
        order?: number
        note?: BannerNote | null
        image?: File | null
        imageDark?: File | null
      } = { ...rest }
      if (note !== undefined) payload.note = note
      if (image !== undefined) payload.image = image
      if (imageDark !== undefined) payload.imageDark = imageDark

      if (image !== undefined || imageDark !== undefined || note !== undefined) {
        return mutation.mutateAsync({
          id: args.id,
          data: (await bannerFormData(payload)) as unknown as Record<string, unknown>,
        })
      }

      return mutation.mutateAsync({ id: args.id, data: rest })
    },
  }
}

export function useDeleteBanner() {
  return bannerMutations.useRemove()
}
