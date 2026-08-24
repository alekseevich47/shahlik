import { Link, useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"

import { repeatOrderIntoCart } from "@/features/order-tracking/lib/repeatOrder"
import { useLiveOrder } from "@/features/order-tracking/model/useLiveOrder"
import { OrderDetails } from "@/features/order-tracking/ui/OrderDetails"
import { SITE } from "@/shared/config/site"
import { Button } from "@/shared/ui/button"

export default function OrderTrackPage() {
  const { id = "" } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: order, isLoading, isError } = useLiveOrder(id)

  return (
    <div className="min-h-dvh bg-canvas">
      <header className="border-b border-line bg-surface">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-4">
          <Link to="/" className="flex items-center gap-2">
            <img src={SITE.brandLogo} alt={SITE.name} className="h-10 w-auto object-contain" />
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/profile" className="text-[13px] font-bold text-fg-muted hover:text-brand">
              Профиль
            </Link>
            <Link to="/" className="text-[13px] font-bold text-fg-muted hover:text-brand">
              На сайт
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-6 pb-16">
        <h1 className="mb-5 text-[22px] font-extrabold tracking-[-0.02em] text-fg">Статус заказа</h1>

        {!id ? (
          <p className="text-[13px] font-semibold text-fg-muted">Не указан номер заказа</p>
        ) : isLoading ? (
          <div className="grid place-items-center rounded-[var(--r-xl)] border border-line bg-surface py-16">
            <span className="size-8 animate-spin rounded-full border-2 border-line border-t-brand" />
          </div>
        ) : isError || !order ? (
          <div className="rounded-[var(--r-xl)] border border-dashed border-line bg-surface px-4 py-10 text-center">
            <p className="text-[13px] font-semibold text-fg-muted">Заказ не найден</p>
            <Button type="button" variant="outline" className="mt-4" onClick={() => navigate("/")}>
              В меню
            </Button>
          </div>
        ) : (
          <OrderDetails
            order={order}
            actions={
              <Button
                type="button"
                variant="brand"
                block
                onClick={() => {
                  repeatOrderIntoCart(order)
                  toast.success("Состав добавлен в корзину")
                  navigate("/")
                }}
              >
                Повторить заказ
              </Button>
            }
          />
        )}
      </main>
    </div>
  )
}
