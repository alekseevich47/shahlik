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
    }
  }
  return toFormData(next)
}

/** Абсолютный URL файла записи; `thumb` — например `"100x100"`. */
export function imageUrl(record: FileRecord, field: string, thumb?: string): string {
  const filename = record[field]
  if (typeof filename !== "string" || !filename) return ""
  return pb.files.getURL(record, filename, thumb ? { thumb } : undefined)
}
