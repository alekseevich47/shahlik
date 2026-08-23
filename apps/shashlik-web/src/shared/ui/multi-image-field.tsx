import { ChevronLeft, ChevronRight, ImagePlus, X } from "lucide-react"
import { AnimatePresence } from "motion/react"
import * as m from "motion/react-m"
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type PointerEvent as ReactPointerEvent,
} from "react"
import Cropper, { type Area } from "react-easy-crop"
import "react-easy-crop/react-easy-crop.css"

import {
  PRODUCT_ASPECT,
  PRODUCT_ASPECT_RATIO,
  PRODUCT_FORMAT_LABEL,
  PRODUCT_HEIGHT,
  PRODUCT_MIN_SOURCE_HEIGHT,
  PRODUCT_MIN_SOURCE_WIDTH,
  PRODUCT_WIDTH,
} from "@/entities/product/format"
import { cn } from "@/shared/lib/cn"
import { compressImage } from "@/shared/lib/compress-image"
import { cropImageToFile, readImageSize } from "@/shared/lib/crop-image"
import { Button } from "@/shared/ui/button"
import { IMAGE_MAX_BYTES } from "@/shared/ui/image-field"

const ACCEPT = "image/jpeg,image/png,image/webp"
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp"])
const DEFAULT_MAX = 5
const SWIPE_PX = 48

export type MultiImageItem =
  | { kind: "existing"; key: string; url: string; filename: string }
  | { kind: "new"; key: string; file: File; url: string }

type Props = {
  items: MultiImageItem[]
  onChange: (items: MultiImageItem[]) => void
  maxCount?: number
  maxBytes?: number
  disabled?: boolean
  className?: string
}

function formatMb(bytes: number) {
  return `${Math.round(bytes / 1_048_576)} МБ`
}

export function MultiImageField({
  items,
  onChange,
  maxCount = DEFAULT_MAX,
  maxBytes = IMAGE_MAX_BYTES.product,
  disabled,
  className,
}: Props) {
  const inputId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(0)
  const pointerRef = useRef<{ x: number; id: number } | null>(null)
  const urlsRef = useRef<Set<string>>(new Set())

  const [cropQueue, setCropQueue] = useState<File[]>([])
  const [cropSource, setCropSource] = useState<File | null>(null)
  const [cropUrl, setCropUrl] = useState<string | null>(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [cropPixels, setCropPixels] = useState<Area | null>(null)
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    const next = new Set(
      items.filter((i): i is Extract<MultiImageItem, { kind: "new" }> => i.kind === "new").map(
        (i) => i.url,
      ),
    )
    for (const url of urlsRef.current) {
      if (!next.has(url)) URL.revokeObjectURL(url)
    }
    urlsRef.current = next
  }, [items])

  useEffect(() => {
    return () => {
      for (const url of urlsRef.current) URL.revokeObjectURL(url)
      urlsRef.current = new Set()
    }
  }, [])

  useEffect(() => {
    if (!cropSource) {
      setCropUrl(null)
      return
    }
    const url = URL.createObjectURL(cropSource)
    setCropUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [cropSource])

  useEffect(() => {
    if (!items.length) {
      setIndex(0)
      return
    }
    if (index >= items.length) setIndex(items.length - 1)
  }, [items.length, index])

  const cropping = Boolean(cropSource && cropUrl)
  const fieldDisabled = disabled || processing || cropping
  const canAdd = items.length < maxCount && !fieldDisabled
  const current = items[index]
  const cropIndex = cropSource ? cropQueue.indexOf(cropSource) : -1

  const onCropComplete = useCallback((_area: Area, pixels: Area) => {
    setCropPixels(pixels)
  }, [])

  function resetCrop() {
    setCropSource(null)
    setCrop({ x: 0, y: 0 })
    setZoom(1)
    setCropPixels(null)
  }

  function skipCrop() {
    resetCrop()
    setCropQueue((queue) => queue.slice(1))
  }

  async function beginCrop(file: File) {
    if (!ALLOWED.has(file.type)) {
      setError("Только JPEG, PNG или WebP")
      return false
    }
    if (file.size > maxBytes) {
      setError(`Файл больше ${formatMb(maxBytes)}`)
      return false
    }

    try {
      const { width, height } = await readImageSize(file)
      if (width < PRODUCT_MIN_SOURCE_WIDTH || height < PRODUCT_MIN_SOURCE_HEIGHT) {
        setError(
          `Слишком маленькое фото (мин. ${PRODUCT_MIN_SOURCE_WIDTH}×${PRODUCT_MIN_SOURCE_HEIGHT}). Загрузите крупнее.`,
        )
        return false
      }
      setError(null)
      setCropSource(file)
      setCrop({ x: 0, y: 0 })
      setZoom(1)
      setCropPixels(null)
      return true
    } catch {
      setError("Не удалось прочитать изображение")
      return false
    }
  }

  useEffect(() => {
    if (cropSource || !cropQueue.length || disabled) return
    void (async () => {
      const ok = await beginCrop(cropQueue[0])
      if (!ok) setCropQueue((queue) => queue.slice(1))
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- cropSource gates the queue
  }, [cropQueue, cropSource, disabled])

  function queueFiles(fileList: FileList | File[] | null) {
    if (!fileList || disabled || processing) return
    const incoming = Array.from(fileList)
    const room = maxCount - items.length
    if (room <= 0) {
      setError(`Максимум ${maxCount} фото`)
      return
    }

    const valid: File[] = []
    for (const file of incoming.slice(0, room)) {
      if (!ALLOWED.has(file.type)) {
        setError("Только JPEG, PNG или WebP")
        continue
      }
      if (file.size > maxBytes) {
        setError(`Файл больше ${formatMb(maxBytes)}`)
        continue
      }
      valid.push(file)
    }
    if (!valid.length) return
    setError(null)
    setCropQueue((queue) => [...queue, ...valid])
  }

  async function confirmCrop() {
    if (!cropUrl || !cropPixels || !cropSource) return
    setProcessing(true)
    setError(null)
    try {
      const baseName = cropSource.name.replace(/\.[^.]+$/, "") || "product"
      const cropped = await cropImageToFile(
        cropUrl,
        cropPixels,
        PRODUCT_WIDTH,
        PRODUCT_HEIGHT,
        baseName,
      )
      const compressed = await compressImage(cropped, {
        maxBytes,
        maxEdge: PRODUCT_WIDTH,
      })
      const url = URL.createObjectURL(compressed)
      const next = [
        ...items,
        {
          kind: "new" as const,
          key: `new-${compressed.name}-${compressed.size}-${compressed.lastModified}-${Math.random().toString(36).slice(2, 7)}`,
          file: compressed,
          url,
        },
      ]
      onChange(next)
      setDir(1)
      setIndex(items.length)
      resetCrop()
      setCropQueue((queue) => queue.slice(1))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось обрезать")
    } finally {
      setProcessing(false)
    }
  }

  function go(next: number) {
    if (!items.length) return
    const clamped = Math.max(0, Math.min(items.length - 1, next))
    if (clamped === index) return
    setDir(clamped > index ? 1 : -1)
    setIndex(clamped)
  }

  function removeAt(at: number) {
    const next = items.filter((_, i) => i !== at)
    onChange(next)
    setError(null)
    if (!next.length) {
      setIndex(0)
      return
    }
    const nextIndex = Math.min(at, next.length - 1)
    setDir(at >= next.length ? -1 : 0)
    setIndex(nextIndex)
  }

  function onInputChange(e: ChangeEvent<HTMLInputElement>) {
    queueFiles(e.target.files)
    e.target.value = ""
  }

  function onDrop(e: DragEvent) {
    e.preventDefault()
    setDragging(false)
    queueFiles(e.dataTransfer.files)
  }

  function onPointerDown(e: ReactPointerEvent) {
    if (fieldDisabled || items.length < 2) return
    pointerRef.current = { x: e.clientX, id: e.pointerId }
  }

  function onPointerUp(e: ReactPointerEvent) {
    const start = pointerRef.current
    pointerRef.current = null
    if (!start || start.id !== e.pointerId || items.length < 2) return
    const dx = e.clientX - start.x
    if (Math.abs(dx) < SWIPE_PX) return
    go(dx < 0 ? index + 1 : index - 1)
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {cropping && cropUrl ? (
        <div className="flex flex-col gap-3">
          <div
            className="relative overflow-hidden rounded-[var(--r-md)] border border-line bg-surface-3"
            style={{ aspectRatio: PRODUCT_ASPECT_RATIO }}
          >
            <Cropper
              image={cropUrl}
              crop={crop}
              zoom={zoom}
              aspect={PRODUCT_ASPECT}
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
              disabled={processing}
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
              disabled={processing}
              onClick={skipCrop}
            >
              {cropQueue.length > 1 ? "Пропустить" : "Отмена"}
            </Button>
            <Button
              type="button"
              variant="brand"
              size="sm"
              className="flex-1"
              disabled={processing || !cropPixels}
              onClick={() => void confirmCrop()}
            >
              {processing ? "Обработка…" : "Применить обрезку"}
            </Button>
          </div>
          {cropQueue.length > 1 && cropIndex >= 0 ? (
            <p className="text-center text-[11px] text-fg-muted">
              Фото {cropIndex + 1} из {cropQueue.length}
            </p>
          ) : null}
        </div>
      ) : null}

      {items.length ? (
        <div className="relative overflow-hidden rounded-[var(--r-md)] border border-line bg-surface-3">
          <div
            className="relative touch-pan-y select-none"
            style={{ aspectRatio: PRODUCT_ASPECT_RATIO }}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={() => {
              pointerRef.current = null
            }}
          >
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              {current ? (
                <m.img
                  key={current.key}
                  src={current.url}
                  alt=""
                  custom={dir}
                  initial={{ opacity: 0, x: dir >= 0 ? 28 : -28 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: dir >= 0 ? -28 : 28 }}
                  transition={{ type: "spring", stiffness: 420, damping: 36, mass: 0.7 }}
                  className="absolute inset-0 size-full object-cover"
                  draggable={false}
                />
              ) : null}
            </AnimatePresence>

            {!disabled ? (
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label={`Убрать фото ${index + 1}`}
                className="absolute top-2 right-2 z-10 bg-surface/90"
                onClick={() => removeAt(index)}
              >
                <X size={16} strokeWidth={2.4} />
              </Button>
            ) : null}

            <span className="absolute bottom-2 left-2 z-10 rounded-[var(--r-xs)] bg-surface/90 px-1.5 py-0.5 text-[10px] font-bold text-fg-muted tabular-nums">
              {index + 1}/{items.length}
            </span>

            {items.length > 1 ? (
              <>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Предыдущее фото"
                  disabled={index === 0}
                  className="absolute top-1/2 left-2 z-10 -translate-y-1/2 bg-surface/90 disabled:opacity-0"
                  onClick={() => go(index - 1)}
                >
                  <ChevronLeft size={16} strokeWidth={2.4} />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Следующее фото"
                  disabled={index >= items.length - 1}
                  className="absolute top-1/2 right-2 z-10 -translate-y-1/2 bg-surface/90 disabled:opacity-0"
                  onClick={() => go(index + 1)}
                >
                  <ChevronRight size={16} strokeWidth={2.4} />
                </Button>
              </>
            ) : null}
          </div>

          {items.length > 1 ? (
            <div className="flex items-center justify-center gap-1.5 border-t border-line bg-surface/80 px-2 py-2">
              {items.map((item, i) => (
                <button
                  key={item.key}
                  type="button"
                  aria-label={`Фото ${i + 1}`}
                  aria-current={i === index}
                  disabled={disabled}
                  onClick={() => go(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-[width,background-color] duration-200",
                    i === index ? "w-5 bg-brand" : "w-1.5 bg-fg-faint/50 hover:bg-fg-muted",
                  )}
                />
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      {canAdd ? (
        <div
          onDragOver={(e) => {
            e.preventDefault()
            if (!fieldDisabled) setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={cn(
            "relative flex items-center justify-center overflow-hidden rounded-[var(--r-md)] border border-dashed",
            items.length ? "min-h-14 py-3" : "",
            dragging ? "border-brand bg-brand-soft" : "border-line bg-surface-3",
            fieldDisabled && "opacity-50",
          )}
          style={items.length ? undefined : { aspectRatio: PRODUCT_ASPECT_RATIO }}
        >
          <label
            htmlFor={inputId}
            className={cn(
              "flex cursor-pointer flex-col items-center gap-1.5 px-4 text-center",
              fieldDisabled && "pointer-events-none",
            )}
          >
            <ImagePlus
              size={items.length ? 20 : 28}
              strokeWidth={1.8}
              className="text-fg-faint"
            />
            <span className="text-[12px] font-bold text-fg-muted">
              {items.length ? "Добавить ещё фото" : "Перетащите или выберите файл"}
            </span>
            <span className="text-[11px] text-fg-faint">
              {PRODUCT_FORMAT_LABEL} · JPEG, PNG, WebP · до {formatMb(maxBytes)} · {items.length}/
              {maxCount}
            </span>
          </label>
          <input
            ref={inputRef}
            id={inputId}
            type="file"
            accept={ACCEPT}
            multiple
            disabled={fieldDisabled}
            className="sr-only"
            onChange={onInputChange}
          />
        </div>
      ) : null}

      {error ? <p className="text-[11px] font-semibold text-red">{error}</p> : null}
    </div>
  )
}

/** Собирает новые File и имена удаляемых из diff existing→current. */
export function multiImageDiff(
  initialFilenames: string[],
  items: MultiImageItem[],
): { files: File[]; remove: string[] } {
  const kept = new Set(
    items.filter((i): i is Extract<MultiImageItem, { kind: "existing" }> => i.kind === "existing").map(
      (i) => i.filename,
    ),
  )
  return {
    files: items
      .filter((i): i is Extract<MultiImageItem, { kind: "new" }> => i.kind === "new")
      .map((i) => i.file),
    remove: initialFilenames.filter((name) => !kept.has(name)),
  }
}
