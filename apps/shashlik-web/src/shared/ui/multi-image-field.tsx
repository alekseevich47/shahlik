import { ImagePlus, X } from "lucide-react"
import {
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
} from "react"

import { cn } from "@/shared/lib/cn"
import { Button } from "@/shared/ui/button"
import { IMAGE_MAX_BYTES } from "@/shared/ui/image-field"

const ACCEPT = "image/jpeg,image/png,image/webp"
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp"])
const DEFAULT_MAX = 5

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

  const canAdd = items.length < maxCount && !disabled

  function applyFiles(fileList: FileList | File[] | null) {
    if (!fileList || disabled) return
    const incoming = Array.from(fileList)
    const room = maxCount - items.length
    if (room <= 0) {
      setError(`Максимум ${maxCount} фото`)
      return
    }

    const next = [...items]
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
    }
    setError(null)
    onChange(next)
  }

  function removeAt(index: number) {
    onChange(items.filter((_, i) => i !== index))
    setError(null)
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

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <ul className="flex flex-col gap-2">
        {items.map((item, index) => (
          <li
            key={item.key}
            className="relative aspect-[3/2] overflow-hidden rounded-[var(--r-md)] border border-line bg-surface-3"
          >
            <img src={item.url} alt="" className="size-full object-cover" />
            {!disabled ? (
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label={`Убрать фото ${index + 1}`}
                className="absolute top-2 right-2 bg-surface/90"
                onClick={() => removeAt(index)}
              >
                <X size={16} strokeWidth={2.4} />
              </Button>
            ) : null}
            <span className="absolute bottom-2 left-2 rounded-[var(--r-xs)] bg-surface/90 px-1.5 py-0.5 text-[10px] font-bold text-fg-muted tabular-nums">
              {index + 1}/{maxCount}
            </span>
          </li>
        ))}
      </ul>

      {canAdd ? (
        <div
          onDragOver={(e) => {
            e.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={cn(
            "relative flex aspect-[3/2] items-center justify-center overflow-hidden rounded-[var(--r-md)] border border-dashed",
            dragging ? "border-brand bg-brand-soft" : "border-line bg-surface-3",
          )}
        >
          <label
            htmlFor={inputId}
            className="flex cursor-pointer flex-col items-center gap-2 px-4 text-center"
          >
            <ImagePlus size={28} strokeWidth={1.8} className="text-fg-faint" />
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
