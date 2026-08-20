/** Целевой размер после сжатия — ниже дефолтного nginx `client_max_body_size` (1m). */
export const UPLOAD_TARGET_BYTES = 900_000

type CompressOptions = {
  /** Жёсткий потолок файла (схема PB). */
  maxBytes: number
  /** Мягкая цель для сети/nginx. */
  targetBytes?: number
  maxEdge?: number
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve(img)
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error("Не удалось прочитать изображение"))
    }
    img.src = url
  })
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality: number,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) reject(new Error("Сжатие не удалось"))
        else resolve(blob)
      },
      type,
      quality,
    )
  })
}

/**
 * Сжимает растр до targetBytes (WebP→JPEG), не меняя файл, если он уже меньше цели.
 * SVG/не-растр — без изменений (валидация типа — на стороне ImageField).
 */
export async function compressImage(
  file: File,
  {
    maxBytes,
    targetBytes = UPLOAD_TARGET_BYTES,
    maxEdge = 1920,
  }: CompressOptions,
): Promise<File> {
  if (!file.type.startsWith("image/") || file.type === "image/svg+xml") {
    return file
  }
  if (file.size <= targetBytes && file.size <= maxBytes) {
    return file
  }

  const img = await loadImage(file)
  const scale = Math.min(1, maxEdge / Math.max(img.naturalWidth, img.naturalHeight))
  let width = Math.max(1, Math.round(img.naturalWidth * scale))
  let height = Math.max(1, Math.round(img.naturalHeight * scale))

  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")
  if (!ctx) return file

  const preferWebp = typeof canvas.toDataURL === "function"
  const mime = preferWebp ? "image/webp" : "image/jpeg"
  const baseName = file.name.replace(/\.[^.]+$/, "") || "image"
  const ext = mime === "image/webp" ? "webp" : "jpg"

  let quality = 0.86
  let blob: Blob | null = null

  for (let attempt = 0; attempt < 8; attempt++) {
    canvas.width = width
    canvas.height = height
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, width, height)
    ctx.drawImage(img, 0, 0, width, height)
    blob = await canvasToBlob(canvas, mime, quality)

    if (blob.size <= targetBytes && blob.size <= maxBytes) break

    if (quality > 0.55) {
      quality -= 0.1
    } else {
      const nextScale = 0.82
      width = Math.max(480, Math.round(width * nextScale))
      height = Math.max(1, Math.round(height * nextScale))
      quality = 0.78
    }
  }

  if (!blob || blob.size > maxBytes) {
    throw new Error(
      `Изображение слишком большое даже после сжатия (лимит ${Math.round(maxBytes / 1_048_576)} МБ)`,
    )
  }

  return new File([blob], `${baseName}.${ext}`, {
    type: mime,
    lastModified: Date.now(),
  })
}
