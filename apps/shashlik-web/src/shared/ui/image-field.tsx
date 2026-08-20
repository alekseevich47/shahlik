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

const ACCEPT = "image/jpeg,image/png,image/webp"
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp"])

/** Лимиты как в schema: товары/баннеры 5 МБ, добавки 2 МБ. */
export const IMAGE_MAX_BYTES = {
  product: 5_242_880,
  banner: 5_242_880,
  addon: 2_097_152,
} as const

type ImageFieldProps = {
  /** URL существующего файла (превью до выбора нового). */
  previewUrl?: string | null
  value?: File | null
  onChange: (file: File | null) => void
  maxBytes?: number
  className?: string
  disabled?: boolean
}

function formatMb(bytes: number) {
  return `${Math.round(bytes / 1_048_576)} МБ`
}

export function ImageField({
  previewUrl,
  value,
  onChange,
  maxBytes = IMAGE_MAX_BYTES.product,
  className,
  disabled,
}: ImageFieldProps) {
  const inputId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)
  const [localUrl, setLocalUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!value) {
      setLocalUrl(null)
      return
    }
    const url = URL.createObjectURL(value)
    setLocalUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [value])

  const shown = localUrl ?? previewUrl ?? null

  function applyFile(file: File | null) {
    if (!file) {
      setError(null)
      onChange(null)
      return
    }
    if (!ALLOWED.has(file.type)) {
      setError("Только JPEG, PNG или WebP")
      return
    }
    if (file.size > maxBytes) {
      setError(`Файл больше ${formatMb(maxBytes)}`)
      return
    }
    setError(null)
    onChange(file)
  }

  function onInputChange(e: ChangeEvent<HTMLInputElement>) {
    applyFile(e.target.files?.[0] ?? null)
    e.target.value = ""
  }

  function onDrop(e: DragEvent) {
    e.preventDefault()
    setDragging(false)
    if (disabled) return
    applyFile(e.dataTransfer.files?.[0] ?? null)
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div
        onDragOver={(e) => {
          e.preventDefault()
          if (!disabled) setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={cn(
          "relative flex aspect-[3/2] items-center justify-center overflow-hidden rounded-[var(--r-md)] border border-dashed",
          dragging ? "border-brand bg-brand-soft" : "border-line bg-surface-3",
          disabled && "opacity-50",
        )}
      >
        {shown ? (
          <>
            <img src={shown} alt="" className="size-full object-cover" />
            {!disabled ? (
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
              disabled && "pointer-events-none",
            )}
          >
            <ImagePlus size={28} strokeWidth={1.8} className="text-fg-faint" />
            <span className="text-[12px] font-bold text-fg-muted">
              Перетащите или выберите файл
            </span>
            <span className="text-[11px] text-fg-faint">
              JPEG, PNG, WebP · до {formatMb(maxBytes)}
            </span>
          </label>
        )}
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept={ACCEPT}
          disabled={disabled}
          className="sr-only"
          onChange={onInputChange}
        />
      </div>
      {shown && !disabled ? (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => inputRef.current?.click()}
        >
          Заменить фото
        </Button>
      ) : null}
      {error ? <p className="text-[11px] font-semibold text-red">{error}</p> : null}
    </div>
  )
}