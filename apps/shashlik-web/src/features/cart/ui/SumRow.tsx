import { cn } from "@/shared/lib/cn"

export function SumRow({
  label,
  value,
  tone = "default",
  dense = false,
}: {
  label: string
  value: string
  tone?: "default" | "success"
  dense?: boolean
}) {
  const size = dense ? "text-[11px]" : "text-[12px]"
  return (
    <div className="flex items-center justify-between gap-3">
      <span className={cn(size, "text-fg-muted")}>{label}</span>
      <span
        className={cn(
          size,
          "font-bold tabular-nums",
          tone === "success" ? "text-success" : "text-fg",
        )}
      >
        {value}
      </span>
    </div>
  )
}
