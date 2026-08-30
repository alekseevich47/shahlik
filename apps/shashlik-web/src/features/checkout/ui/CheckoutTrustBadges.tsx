import { Flame, Heart, ShieldCheck, Truck } from "lucide-react"

import { cn } from "@/shared/lib/cn"

const BADGES: Array<{
  Icon: typeof Truck
  title: string
  text: string
  iconClass?: string
}> = [
  {
    Icon: Truck,
    title: "Быстрая доставка",
    text: "От 30 минут",
  },
  {
    Icon: Flame,
    title: "Всегда горячее",
    text: "Готовим после заказа",
  },
  {
    Icon: ShieldCheck,
    title: "Качественные продукты",
    text: "Свежие ингредиенты",
  },
  {
    Icon: Heart,
    title: "Сделаем с душой",
    text: "Спасибо Вам за заказ!",
    iconClass: "text-brand",
  },
]

export function CheckoutTrustBadges({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-2 border-t border-line px-5 py-4 md:grid-cols-4 md:gap-3",
        className,
      )}
    >
      {BADGES.map(({ Icon, title, text, iconClass }) => (
        <div
          key={title}
          className="flex flex-col gap-1 rounded-[var(--r-md)] bg-surface-2 px-3 py-2.5"
        >
          <Icon
            size={18}
            strokeWidth={2.2}
            className={cn("shrink-0 text-fg-muted", iconClass)}
          />
          <p className="text-[11.5px] font-extrabold leading-tight text-fg">{title}</p>
          <p className="text-[10.5px] leading-snug font-medium text-fg-muted">{text}</p>
        </div>
      ))}
    </div>
  )
}
