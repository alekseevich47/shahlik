import { useGraphics, type GraphicsQuality } from "@/app/providers/graphics"
import { useTheme, type Theme } from "@/app/providers/theme"
import { Modal, ModalDescription, ModalTitle } from "@/shared/ui/modal"
import { Segmented } from "@/shared/ui/segmented"

const THEME_OPTIONS = [
  { value: "light" as const, label: "Светлая" },
  { value: "dark" as const, label: "Тёмная" },
]

const GRAPHICS_OPTIONS = [
  { value: "normal" as const, label: "Обычное" },
  { value: "ultra" as const, label: "Ультра" },
]

type DisplaySettingsModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

/** Mobile: тема + качество графики (normal облегчает blur/стекло). */
export function DisplaySettingsModal({ open, onOpenChange }: DisplaySettingsModalProps) {
  const { theme, setTheme } = useTheme()
  const { quality, setQuality } = useGraphics()

  return (
    <Modal open={open} onOpenChange={onOpenChange} className="w-[min(420px,calc(100vw-1.5rem))]">
      <div className="flex flex-col gap-5 p-6 pr-14">
        <div>
          <ModalTitle className="text-[18px] font-extrabold tracking-[-0.02em] text-fg">
            Настройки
          </ModalTitle>
          <ModalDescription className="mt-1 text-[13px] font-medium text-fg-muted">
            Внешний вид и нагрузка на устройство
          </ModalDescription>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-[12px] font-bold text-fg-soft">Цветовая тема</p>
          <Segmented<Theme>
            value={theme}
            onChange={setTheme}
            options={THEME_OPTIONS}
            ariaLabel="Цветовая тема"
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-[12px] font-bold text-fg-soft">Качество графики</p>
          <Segmented<GraphicsQuality>
            value={quality}
            onChange={setQuality}
            options={GRAPHICS_OPTIONS}
            ariaLabel="Качество графики"
          />
          <p className="text-[11px] leading-snug text-fg-muted">
            «Обычное» отключает размытие и преломление стекла — удобнее на слабых телефонах.
            Анимации окон и скролл остаются.
          </p>
        </div>
      </div>
    </Modal>
  )
}
