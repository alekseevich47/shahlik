import { ImagePlus, X } from "lucide-react"
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
} from "react"
import Cropper, { type Area } from "react-easy-crop"
import "react-easy-crop/react-easy-crop.css"

import {
  BANNER_ASPECT,
  BANNER_ASPECT_RATIO,
  BANNER_FORMAT_LABEL,
  BANNER_HEIGHT,
  BANNER_MIN_SOURCE_HEIGHT,
  BANNER_MIN_SOURCE_WIDTH,
  BANNER_WIDTH,
} from "@/entities/banner/format"
import { cn } from "@/shared/lib/cn"
import { compressImage } from "@/shared/lib/compress-image"
import { cropImageToFile, readImageSize } from "@/shared/lib/crop-image"
import { Button } from "@/shared/ui/button"
import { IMAGE_MAX_BYTES } from "@/shared/ui/image-field"

const ACCEPT = "image/jpeg,image/png,image/webp"
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp"])

type Props = {
  previewUrl?: string | null
  value?: File | null
  onChange: (file: File | null) => void
  maxBytes?: number
  disabled?: boolean
}

function formatMb(bytes: number) {
  return `${Math.round(bytes / 1_048_576)} МБ`
}

export function BannerImageField({
  previewUrl,
  value,
  onChange,
  maxBytes = IMAGE_MAX_BYTES.banner,
  disabled,
}: Props) {
  const inputId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)
  const [localUrl, setLocalUrl] = useState<string | null>(null)

  const [cropSource, setCropSource] = useState<File | null>(null)
  const [cropUrl, setCropUrl] = useState<string | null>(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [cropPixels, setCropPixels] = useState<Area | null>(null)
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    if (!value) {
      setLocalUrl(null)
      return
    }
    const url = URL.createObjectURL(value)
    setLocalUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [value])

  useEffect(() => {
    if (!cropSource) {
      setCropUrl(null)
      return
    }
    const url = URL.createObjectURL(cropSource)
    setCropUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [cropSource])

  const shown = localUrl ?? (!cropSource ? previewUrl : null) ?? null
  const cropping = Boolean(cropSource && cropUrl)

  const onCropComplete = useCallback((_area: Area, pixels: Area) => {
    setCropPixels(pixels)
  }, [])

  function resetCrop() {
    setCropSource(null)
    setCrop({ x: 0, y: 0 })
    setZoom(1)
    setCropPixels(null)
    setError(null)
  }

  async function startCrop(file: File) {
    if (!ALLOWED.has(file.type)) {
      setError("Только JPEG, PNG или WebP")
      return
    }
    if (file.size > maxBytes) {
      setError(`Файл больше ${formatMb(maxBytes)}`)
      return
    }

    try {
      const { width, height } = await readImageSize(file)
      if (width < BANNER_MIN_SOURCE_WIDTH || height < BANNER_MIN_SOURCE_HEIGHT) {
        setError(
          `Слишком маленькое фото (мин. ${BANNER_MIN_SOURCE_WIDTH}×${BANNER_MIN_SOURCE_HEIGHT}). Загрузите крупнее.`,
        )
        return
      }
      setError(null)
      onChange(null)
      setCropSource(file)
      setCrop({ x: 0, y: 0 })
      setZoom(1)
      setCropPixels(null)
    } catch {
      setError("Не удалось прочитать изображение")
    }
  }

  function applyFile(file: File | null) {
    if (!file) {
      setError(null)
      onChange(null)
      resetCrop()
      return
    }
    void startCrop(file)
  }

  async function confirmCrop() {
    if (!cropUrl || !cropPixels || !cropSource) return
    setProcessing(true)
    setError(null)
    try {
      const baseName = cropSource.name.replace(/\.[^.]+$/, "") || "banner"
      const cropped = await cropImageToFile(
        cropUrl,
        cropPixels,
        BANNER_WIDTH,
        BANNER_HEIGHT,
        baseName,
      )
      const compressed = await compressImage(cropped, {
        maxBytes,
        maxEdge: BANNER_WIDTH,
      })
      onChange(compressed)
      resetCrop()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось обрезать")
    } finally {
      setProcessing(false)
    }
  }

  function onInputChange(e: ChangeEvent<HTMLInputElement>) {
    applyFile(e.target.files?.[0] ?? null)
    e.target.value = ""
  }

  function onDrop(e: DragEvent) {
    e.preventDefault()
    setDragging(false)
    if (disabled || processing) return
    applyFile(e.dataTransfer.files?.[0] ?? null)
  }

  const fieldDisabled = disabled || processing

  return (
    <div className="flex flex-col gap-2">
      {cropping && cropUrl ? (
        <div className="flex flex-col gap-3">
          <div
            className="relative overflow-hidden rounded-[var(--r-md)] border border-line bg-surface-3"
            style={{ aspectRatio: BANNER_ASPECT_RATIO }}
          >
            <Cropper
              image={cropUrl}
              crop={crop}
              zoom={zoom}
              aspect={BANNER_ASPECT}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              objectFit="contain"
            />
          </div>
          <label className="flex flex-col gap-1.5">
            <span className="text-[11px] font-bold text-fg-muted">Масштаб</span>
            <input
              type="range"
              min={1}
              max={3}
              step={0.01}
              value={zoom}
              disabled={fieldDisabled}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full accent-brand"
            />
          </label>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="flex-1"
              disabled={fieldDisabled}
              onClick={resetCrop}
            >
              Отмена
            </Button>
            <Button
              type="button"
              variant="brand"
              size="sm"
              className="flex-1"
              disabled={fieldDisabled || !cropPixels}
              onClick={() => void confirmCrop()}
            >
              {processing ? "Обработка…" : "Применить обрезку"}
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div
            onDragOver={(e) => {
              e.preventDefault()
              if (!fieldDisabled) setDragging(true)
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            className={cn(
              "relative flex items-center justify-center overflow-hidden rounded-[var(--r-md)] border border-dashed",
              dragging ? "border-brand bg-brand-soft" : "border-line bg-surface-3",
              fieldDisabled && "opacity-50",
            )}
            style={{ aspectRatio: BANNER_ASPECT_RATIO }}
          >
            {shown ? (
              <>
                <img src={shown} alt="" className="size-full object-cover" />
                {!fieldDisabled ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    aria-label="Убрать фото"
                    className="absolute top-2 right-2 bg-surface/90"
                    onClick={() => applyFile(null)}
                  >
                    <X size={16} strokeWidth={2.4} />
                  </Button>
                ) : null}
              </>
            ) : (
              <label
                htmlFor={inputId}
                className={cn(
                  "flex cursor-pointer flex-col items-center gap-2 px-4 text-center",
                  fieldDisabled && "pointer-events-none",
                )}
              >
                <ImagePlus size={28} strokeWidth={1.8} className="text-fg-faint" />
                <span className="text-[12px] font-bold text-fg-muted">
                  Перетащите или выберите файл
                </span>
                <span className="text-[11px] text-fg-faint">
                  {BANNER_FORMAT_LABEL} · JPEG, PNG, WebP · до {formatMb(maxBytes)}
                </span>
              </label>
            )}
            <input
              ref={inputRef}
              id={inputId}
              type="file"
              accept={ACCEPT}
              disabled={fieldDisabled}
              className="sr-only"
              onChange={onInputChange}
            />
          </div>
          {shown && !fieldDisabled ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => inputRef.current?.click()}
            >
              Заменить фото
            </Button>
          ) : null}
        </>
      )}
      {error ? <p className="text-[11px] font-semibold text-red">{error}</p> : null}
    </div>
  )
}
