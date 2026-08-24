import { cn } from "@/shared/lib/cn"

export function SumRow({
  label,
  value,
  tone = "default",
}: {
  label: string
  value: string
  tone?: "default" | "success"
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-[12px] text-fg-muted">{label}</span>
      <span
        className={cn(
          "text-[12px] font-bold tabular-nums",
          tone === "success" ? "text-success" : "text-fg",
        )}
      >
        {value}
      </span>
    </div>
  )
}
