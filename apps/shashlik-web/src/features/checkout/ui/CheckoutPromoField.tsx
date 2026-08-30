import { TicketPercent } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import { checkPromo } from "@/entities/coupon/api"
import { formatCouponValue } from "@/entities/coupon/model"
import { useCartTotals } from "@/features/cart/model/selectors"
import { useCartStore } from "@/features/cart/model/store"
import { cn } from "@/shared/lib/cn"
import { FloatingField } from "@/shared/ui/floating-field"

type CheckoutPromoFieldProps = {
  className?: string
}

export function CheckoutPromoField({ className }: CheckoutPromoFieldProps) {
  const { lines, goods } = useCartTotals()
  const appliedCoupon = useCartStore((s) => s.appliedCoupon)
  const applyCoupon = useCartStore((s) => s.applyCoupon)
  const [promoInput, setPromoInput] = useState("")
  const [busy, setBusy] = useState(false)

  async function submitPromo() {
    const code = promoInput.trim().toUpperCase()
    if (!code) {
      toast.error("Введите промокод")
      return
    }
    if (lines.length === 0) {
      toast.error("Добавьте товары в корзину")
      return
    }
    setBusy(true)
    try {
      const result = await checkPromo(code, goods)
      if (!result.ok) {
        toast.error(result.message || "Промокод не подходит")
        return
      }
      applyCoupon({ code, kind: result.kind, value: result.value })
      setPromoInput("")
      toast.success(`Промокод ${code} применён`)
    } finally {
      setBusy(false)
    }
  }

  if (appliedCoupon) {
    return (
      <div
        className={cn(
          "flex items-center justify-between gap-2 rounded-[var(--r-md)] border border-line bg-brand-soft px-3 py-2.5",
          className,
        )}
      >
        <span className="flex items-center gap-2 text-[12.5px] font-extrabold tracking-[0.04em] text-brand">
          <TicketPercent size={15} strokeWidth={2.3} />
          {appliedCoupon.code}
        </span>
        <span className="text-[12px] font-extrabold text-success">
          −{formatCouponValue(appliedCoupon.kind, appliedCoupon.value)}
        </span>
        <button
          type="button"
          aria-label="Убрать промокод"
          onClick={() => applyCoupon(null)}
          className="cursor-pointer text-[12px] font-bold text-fg-muted hover:text-red"
        >
          Убрать
        </button>
      </div>
    )
  }

  return (
    <FloatingField
      label="Промокод"
      icon={<TicketPercent size={16} strokeWidth={2.3} />}
      value={promoInput}
      onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
      onSubmit={() => void submitPromo()}
      submitBusy={busy}
      submitLabel="Применить промокод"
      maxLength={32}
      autoComplete="off"
      spellCheck={false}
      className={className}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault()
          void submitPromo()
        }
      }}
    />
  )
}
