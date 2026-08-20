import { pb } from "./pb"

type FileRecord = {
  [key: string]: unknown
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
    form.append(key, String(value))
  }

  return form
}

/** Абсолютный URL файла записи; `thumb` — например `"100x100"`. */
export function imageUrl(record: FileRecord, field: string, thumb?: string): string {
  const filename = record[field]
  if (typeof filename !== "string" || !filename) return ""
  return pb.files.getURL(record, filename, thumb ? { thumb } : undefined)
}
