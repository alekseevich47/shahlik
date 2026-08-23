import { ChevronLeft, ChevronRight, ImagePlus, X } from "lucide-react"
import { AnimatePresence } from "motion/react"
import * as m from "motion/react-m"
import {
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type PointerEvent as ReactPointerEvent,
} from "react"

import { cn } from "@/shared/lib/cn"
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
    if (!items.length) {
      setIndex(0)
      return
    }
    if (index >= items.length) setIndex(items.length - 1)
  }, [items.length, index])

  const canAdd = items.length < maxCount && !disabled
  const current = items[index]

  function go(next: number) {
    if (!items.length) return
    const clamped = Math.max(0, Math.min(items.length - 1, next))
    if (clamped === index) return
    setDir(clamped > index ? 1 : -1)
    setIndex(clamped)
  }

  function applyFiles(fileList: FileList | File[] | null) {
    if (!fileList || disabled) return
    const incoming = Array.from(fileList)
    const room = maxCount - items.length
    if (room <= 0) {
      setError(`Максимум ${maxCount} фото`)
      return
    }

    const next = [...items]
    let added = 0
    for (const file of incoming.slice(0, room)) {
      if (!ALLOWED.has(file.type)) {
        setError("Только JPEG, PNG или WebP")
        continue
      }
      if (file.size > maxBytes) {
        setError(`Файл больше ${formatMb(maxBytes)}`)
        continue
      }
      next.push({
        kind: "new",
        key: `new-${file.name}-${file.size}-${file.lastModified}-${Math.random().toString(36).slice(2, 7)}`,
        file,
        url: URL.createObjectURL(file),
      })
      added += 1
    }
    if (!added) return
    setError(null)
    onChange(next)
    setDir(1)
    setIndex(items.length)
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
    applyFiles(e.target.files)
    e.target.value = ""
  }

  function onDrop(e: DragEvent) {
    e.preventDefault()
    setDragging(false)
    applyFiles(e.dataTransfer.files)
  }

  function onPointerDown(e: ReactPointerEvent) {
    if (disabled || items.length < 2) return
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
      {items.length ? (
        <div className="relative overflow-hidden rounded-[var(--r-md)] border border-line bg-surface-3">
          <div
            className="relative aspect-[3/2] touch-pan-y select-none"
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
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={cn(
            "relative flex items-center justify-center overflow-hidden rounded-[var(--r-md)] border border-dashed",
            items.length ? "min-h-14 py-3" : "aspect-[3/2]",
            dragging ? "border-brand bg-brand-soft" : "border-line bg-surface-3",
          )}
        >
          <label
            htmlFor={inputId}
            className="flex cursor-pointer flex-col items-center gap-1.5 px-4 text-center"
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
              JPEG, PNG, WebP · до {formatMb(maxBytes)} · {items.length}/{maxCount}
            </span>
          </label>
          <input
            ref={inputRef}
            id={inputId}
            type="file"
            accept={ACCEPT}
            multiple
            disabled={disabled}
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
