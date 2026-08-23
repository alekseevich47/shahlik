import { compressImage, UPLOAD_TARGET_BYTES } from "@/shared/lib/compress-image"

import { pb } from "./pb"

type FileRecord = {
  [key: string]: unknown
}

export { UPLOAD_TARGET_BYTES }

type ToFormDataOptions = {
  /** Сжать File-поля перед append (баннеры/добавки/товары). */
  compressFiles?: boolean
  maxBytes?: number
}

/** FormData для PB: File как есть, объекты → JSON, undefined пропускаем, null = удалить файл. */
export function toFormData(data: Record<string, unknown>): FormData {
  const form = new FormData()

  for (const [key, value] of Object.entries(data)) {
    if (value === undefined) continue
    if (value === null) {
      form.append(key, "")
      continue
    }
    if (value instanceof File || value instanceof Blob) {
      form.append(key, value)
      continue
    }
    // Multi-file: File[] → несколько append одного ключа; string[] на `field-` → удаления.
    if (Array.isArray(value)) {
      if (value.length === 0) continue
      if (value.every((item) => item instanceof File || item instanceof Blob)) {
        for (const item of value) form.append(key, item)
        continue
      }
      if (value.every((item) => typeof item === "string")) {
        for (const item of value) form.append(key, item)
        continue
      }
    }
    if (typeof value === "object") {
      form.append(key, JSON.stringify(value))
      continue
    }
    // Number/boolean/string — String(0) → "0", иначе PB не увидит поле.
    form.append(key, String(value))
  }

  return form
}

/** Как `toFormData`, но File сжимаются под nginx/PB лимиты. */
export async function toUploadFormData(
  data: Record<string, unknown>,
  { maxBytes = 5_242_880 }: ToFormDataOptions = {},
): Promise<FormData> {
  const next: Record<string, unknown> = { ...data }
  for (const [key, value] of Object.entries(next)) {
    if (value instanceof File) {
      next[key] = await compressImage(value, { maxBytes })
    } else if (
      Array.isArray(value) &&
      value.length > 0 &&
      value.every((item) => item instanceof File)
    ) {
      next[key] = await Promise.all(
        value.map((file) => compressImage(file, { maxBytes })),
      )
    }
  }
  return toFormData(next)
}

function filenamesOf(record: FileRecord, field: string): string[] {
  const raw = record[field]
  if (Array.isArray(raw)) {
    return raw.filter((name): name is string => typeof name === "string" && name.length > 0)
  }
  if (typeof raw === "string" && raw) return [raw]
  return []
}

/** Абсолютный URL файла записи; `thumb` — например `"100x100"`. */
export function imageUrl(record: FileRecord, field: string, thumb?: string): string {
  const [filename] = filenamesOf(record, field)
  if (!filename) return ""
  return pb.files.getURL(record, filename, thumb ? { thumb } : undefined)
}

/** Все URL multi-file поля (порядок как в PB). */
export function imageUrls(record: FileRecord, field: string, thumb?: string): string[] {
  return filenamesOf(record, field).map((filename) =>
    pb.files.getURL(record, filename, thumb ? { thumb } : undefined),
  )
}

export function imageFilenames(record: FileRecord, field: string): string[] {
  return filenamesOf(record, field)
}
