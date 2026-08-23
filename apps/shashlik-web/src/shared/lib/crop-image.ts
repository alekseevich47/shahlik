export type CropArea = {
  x: number
  y: number
  width: number
  height: number
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error("Не удалось прочитать изображение"))
    img.src = src
  })
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) reject(new Error("Не удалось экспортировать обрезку"))
        else resolve(blob)
      },
      type,
      quality,
    )
  })
}

/** Обрезка области исходника в файл фиксированного размера (WebP/JPEG). */
export async function cropImageToFile(
  imageSrc: string,
  crop: CropArea,
  outputWidth: number,
  outputHeight: number,
  baseName = "banner",
): Promise<File> {
  const image = await loadImage(imageSrc)
  const canvas = document.createElement("canvas")
  canvas.width = outputWidth
  canvas.height = outputHeight
  const ctx = canvas.getContext("2d")
  if (!ctx) throw new Error("Canvas недоступен")

  ctx.fillStyle = "#ffffff"
  ctx.fillRect(0, 0, outputWidth, outputHeight)
  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    outputWidth,
    outputHeight,
  )

  const preferWebp = typeof canvas.toDataURL === "function"
  const mime = preferWebp ? "image/webp" : "image/jpeg"
  const ext = mime === "image/webp" ? "webp" : "jpg"
  const blob = await canvasToBlob(canvas, mime, 0.92)

  return new File([blob], `${baseName}.${ext}`, {
    type: mime,
    lastModified: Date.now(),
  })
}

/** Размеры растра после загрузки в браузер. */
export function readImageSize(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve({ width: img.naturalWidth, height: img.naturalHeight })
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error("Не удалось прочитать изображение"))
    }
    img.src = url
  })
}
