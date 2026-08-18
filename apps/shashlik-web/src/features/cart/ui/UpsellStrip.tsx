import { Plus } from "lucide-react"

import { extras } from "@/mocks/addons"
import { useCartStore } from "@/features/cart/model/store"
import { formatPrice } from "@/shared/lib/format"

/** «Добавить к заказу?» — горизонтальная лента добавок к последней позиции. */
export function UpsellStrip() {
  const bumpAddon = useCartStore((s) => s.bumpAddon)

  return (
    <div className="flex flex-col gap-2">
      <p className="text-[13px] font-extrabold text-fg">Добавить к заказу?</p>
      <div className="scrollbar-none -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {extras.map((addon) => (
          <article
            key={addon.id}
            className="flex w-[86px] shrink-0 flex-col overflow-hidden rounded-[var(--r-md)] border border-line bg-surface"
          >
            <img
              src={addon.image}
              alt=""
              loading="lazy"
              className="aspect-square w-full object-cover"
            />
            <div className="flex flex-1 flex-col gap-1.5 p-1.5">
              <p className="line-clamp-2 text-[9.5px] leading-[1.3] font-semibold text-fg-soft">
                {addon.name}
              </p>
              <button
                type="button"
                onClick={() => bumpAddon(addon.id, 1)}
                aria-label={`Добавить ${addon.name}`}
                className="mt-auto flex h-6 cursor-pointer items-center justify-center gap-0.5 rounded-[var(--r-xs)] bg-brand-soft text-[10px] font-extrabold text-brand transition-colors hover:bg-brand-soft-hover"
              >
                <Plus size={11} strokeWidth={3} />
                {formatPrice(addon.price)}
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
