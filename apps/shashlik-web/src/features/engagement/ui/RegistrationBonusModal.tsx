import { CoinIcon } from "@/shared/ui/coin-icon"
import { Button } from "@/shared/ui/button"
import { Modal, ModalDescription, ModalTitle } from "@/shared/ui/modal"

import { AuthButtons } from "./AuthButtons"

type RegistrationBonusModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  amount: number
}

export function RegistrationBonusModal({
  open,
  onOpenChange,
  amount,
}: RegistrationBonusModalProps) {
  return (
    <Modal open={open} onOpenChange={onOpenChange} className="w-[min(420px,calc(100vw-2rem))]">
      <div className="flex flex-col gap-4 p-6 pr-14">
        <div className="flex items-center gap-2">
          <CoinIcon className="size-8" />
          <ModalTitle className="text-[20px] leading-tight font-extrabold tracking-[-0.02em] text-fg">
            Бонусы за регистрацию
          </ModalTitle>
        </div>
        <ModalDescription className="text-[14px] leading-relaxed font-medium text-fg-muted">
          Создайте аккаунт и получите{" "}
          <span className="inline-flex items-center gap-1 font-extrabold text-fg tabular-nums">
            {amount}
            <CoinIcon className="size-4" />
          </span>{" "}
          в подарок. Дальше — бонусы с каждого заказа и акции только для своих.
        </ModalDescription>
        <AuthButtons />
        <Button
          size="lg"
          variant="soft"
          className="w-full !bg-surface-3 !text-fg-muted hover:!text-fg"
          onClick={() => onOpenChange(false)}
        >
          Позже
        </Button>
      </div>
    </Modal>
  )
}
