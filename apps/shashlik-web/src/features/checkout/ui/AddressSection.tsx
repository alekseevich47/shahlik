import { Home, MapPin } from "lucide-react"

import type { SavedAddress } from "@/entities/account/model"
import type { OrderAddressParts } from "@/entities/order/model"
import { NEW_ADDRESS, formatAddressLine } from "@/features/checkout/model/useCheckout"
import { cn } from "@/shared/lib/cn"
import { FloatingField } from "@/shared/ui/floating-field"
import { Input } from "@/shared/ui/input"
import { Select } from "@/shared/ui/select"

type AddressSectionProps = {
  addresses: SavedAddress[]
  addressId: string
  onSelectAddress: (id: string) => void
  parts: OrderAddressParts
  onPartChange: (key: keyof OrderAddressParts, value: string) => void
  className?: string
}

export function AddressSection({
  addresses,
  addressId,
  onSelectAddress,
  parts,
  onPartChange,
  className,
}: AddressSectionProps) {
  const isNew = addressId === NEW_ADDRESS || addresses.length === 0
  const saved = !isNew ? addresses.find((a) => a.id === addressId) : null
  const summary = saved ? formatAddressLine(saved) : isNew && parts.street ? formatAddressLine(parts) : ""

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <p className="text-[12px] font-bold text-fg-muted">Адрес доставки</p>

      {addresses.length > 0 ? (
        <>
          <Select
            value={addressId}
            onChange={(e) => onSelectAddress(e.target.value)}
            aria-label="Выбор адреса"
            formatOption={(opt) => (
              <span className="flex items-center gap-2">
                <Home size={15} strokeWidth={2.3} className="shrink-0 text-fg-faint" />
                <span className="truncate">{opt.label}</span>
              </span>
            )}
          >
            {addresses.map((address) => (
              <option key={address.id} value={address.id}>
                {address.label || formatAddressLine(address)}
              </option>
            ))}
            <option value={NEW_ADDRESS}>Новый адрес</option>
          </Select>

          {!isNew && summary ? (
            <p className="truncate px-0.5 text-[12.5px] font-medium text-fg-muted">{summary}</p>
          ) : null}
        </>
      ) : null}

      {isNew ? (
        <div className="flex flex-col gap-2">
          <FloatingField
            label="Улица"
            icon={<MapPin size={16} strokeWidth={2.3} />}
            value={parts.street ?? ""}
            onChange={(e) => onPartChange("street", e.target.value)}
            autoComplete="address-line1"
            maxLength={50}
          />
          <div className="grid grid-cols-4 gap-2">
            {(
              [
                ["home", "Дом"],
                ["pod", "Подъезд"],
                ["et", "Этаж"],
                ["apart", "Квартира"],
              ] as const
            ).map(([key, label]) => (
              <div key={key} className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-fg-faint">{label}</span>
                <Input
                  value={parts[key] ?? ""}
                  onChange={(e) => onPartChange(key, e.target.value)}
                  placeholder={label}
                  maxLength={key === "home" || key === "apart" ? 50 : 2}
                  className="h-10 px-2.5 text-center text-[13px]"
                />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
