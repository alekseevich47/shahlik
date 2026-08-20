import type { ProductTag } from "@/entities/product/model"
import { useCategories } from "@/entities/category/api"
import { CategoryIcon } from "@/entities/category/ui/CategoryIcon"
import { TAG_FILTERS } from "@/shared/config/site"
import { cn } from "@/shared/lib/cn"
import { Chip } from "@/shared/ui/chip"
import { Glass } from "@/shared/ui/glass"
import { FloatingActions } from "@/widgets/header/FloatingActions"

/**
 * Геометрия плашки. Должна совпадать с раскладкой ниже и с `.sticky-bar` в
 * globals.css: пороги наблюдателей считаются отсюда, иначе плашка мигает.
 * compact = p-1.5 + 44, expanded = p-2 + 44 + (36 + pb-2).
 */
export const STICKY_BAR = { top: 20, compact: 56, expanded: 104 } as const

/** Неактивный чип на стекле: без своей поверхности, иначе стекло не видно. */
const GLASS_CHIP =
  "border-transparent bg-transparent text-glass-fg hover:bg-[var(--glass-btn)] hover:text-glass-fg"
/** Выбранный — та же подсветка, что у лупы / темы / корзины. */
const GLASS_CHIP_ACTIVE =
  "border-[var(--glass-btn-border)] bg-[var(--glass-btn)] text-glass-fg shadow-none hover:border-[var(--glass-btn-border)] hover:text-glass-fg"

type Props = {
  /** Верхние действия ушли из вида — плашка выезжает. */
  visible: boolean
  /** Строка тегов ушла из вида — на плашке появляются категории и теги. */
  expanded: boolean
  /** Идёт переход геометрии — преломление стекла выключено на эти кадры. */
  animating?: boolean
  category: string
  onCategoryChange: (id: string) => void
  tag: ProductTag | "all"
  onTagChange: (tag: ProductTag | "all") => void
  onSearch: () => void
  onCart: () => void
  cartPressed?: boolean
}

/** Стеклянная плашка витрины: едет со скроллом, подхватывает навигацию. */
export function StickyBar({
  visible,
  expanded,
  animating,
  category,
  onCategoryChange,
  tag,
  onTagChange,
  onSearch,
  onCart,
  cartPressed,
}: Props) {
  const { data: categories = [] } = useCategories()

  return (
    <div
      className="sticky-bar"
      data-visible={visible ? "1" : "0"}
      data-expanded={expanded ? "1" : "0"}
      data-animating={animating ? "1" : "0"}
    >
      <Glass className="sticky-bar-panel" contentClassName="flex flex-col" inert={!visible}>
        <div className="sticky-bar-row">
          <div className="sticky-bar-nav">
            <div>
              <nav
                aria-label="Категории меню"
                className="sticky-bar-fade scrollbar-none flex gap-1.5 overflow-x-auto"
              >
                {categories.map((item) => {
                  const active = item.id === category
                  return (
                    <Chip
                      key={item.id}
                      active={active}
                      onClick={() => onCategoryChange(item.id)}
                      className={cn(
                        "h-11 gap-2 rounded-[var(--r-md)] px-3",
                        active ? GLASS_CHIP_ACTIVE : GLASS_CHIP,
                      )}
                    >
                      <CategoryIcon icon={item.icon} active={active} tone="glass" />
                      {item.name}
                    </Chip>
                  )
                })}
              </nav>
            </div>
          </div>

          <FloatingActions
            tone="glass"
            className="sticky-bar-actions"
            showAccount={expanded}
            onSearch={onSearch}
            onCart={onCart}
            cartPressed={cartPressed}
          />
        </div>

        <div className="sticky-bar-tags">
          <div>
            <div className="sticky-bar-fade scrollbar-none flex gap-2 overflow-x-auto px-2 pb-2">
              {TAG_FILTERS.map((filter) => (
                <Chip
                  key={filter.id}
                  active={filter.id === tag}
                  onClick={() => onTagChange(filter.id)}
                  className={cn(filter.id === tag ? GLASS_CHIP_ACTIVE : GLASS_CHIP)}
                >
                  {filter.label}
                  {filter.emoji ? <span>{filter.emoji}</span> : null}
                </Chip>
              ))}
            </div>
          </div>
        </div>
      </Glass>
    </div>
  )
}
