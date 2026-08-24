import { ChevronRight, TicketPercent, X } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import { checkPromo } from "@/entities/coupon/api"
import { formatCouponValue } from "@/entities/coupon/model"
import { useCartTotals } from "@/features/cart/model/selectors"
import { useCartStore } from "@/features/cart/model/store"
import { cn } from "@/shared/lib/cn"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"

export function CartPromo() {
  const { lines, goods } = useCartTotals()
  const appliedCoupon = useCartStore((s) => s.appliedCoupon)
  const applyCoupon = useCartStore((s) => s.applyCoupon)
  const [open, setOpen] = useState(Boolean(appliedCoupon))
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

  return (
    <div className="rounded-[var(--r-md)] border border-line">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-full cursor-pointer items-center gap-2 px-3 text-left"
      >
        <TicketPercent size={15} className="shrink-0 text-fg-faint" strokeWidth={2.3} />
        <span className="flex-1 text-[12.5px] font-bold text-fg-soft">Скидки и промокоды</span>
        <ChevronRight
          size={15}
          className={cn(
            "shrink-0 text-fg-faint transition-transform duration-200",
            open && "rotate-90",
          )}
          strokeWidth={2.4}
        />
      </button>
      {open ? (
        <div className="border-t border-line p-2">
          {appliedCoupon ? (
            <div className="flex items-center justify-between gap-2 rounded-[var(--r-xs)] bg-brand-soft px-2.5 py-1.5">
              <span className="text-[12px] font-extrabold tracking-[0.05em] text-brand">
                {appliedCoupon.code}
              </span>
              <span className="text-[12px] font-extrabold text-success">
                −{formatCouponValue(appliedCoupon.kind, appliedCoupon.value)}
              </span>
              <button
                type="button"
                aria-label="Убрать промокод"
                onClick={() => applyCoupon(null)}
                className="grid size-5 cursor-pointer place-items-center rounded-[var(--r-xs)] text-fg-faint hover:text-red"
              >
                <X size={12} strokeWidth={3} />
              </button>
            </div>
          ) : (
            <form
              className="flex gap-1.5"
              onSubmit={(e) => {
                e.preventDefault()
                void submitPromo()
              }}
            >
              <Input
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                placeholder="Промокод"
                maxLength={32}
                autoComplete="off"
                spellCheck={false}
                className="h-9 flex-1 text-[12.5px]"
              />
              <Button type="submit" size="sm" variant="soft" disabled={busy} className="shrink-0">
                ОК
              </Button>
            </form>
          )}
        </div>
      ) : null}
    </div>
  )
}
