import { useCategories } from "@/entities/category/api"
import { CategoryIcon } from "@/entities/category/ui/CategoryIcon"
import type { TagFilterId } from "@/entities/tag/model"
import { useAxisLockedHorizontalScroll } from "@/shared/hooks/useAxisLockedHorizontalScroll"
import { useScrollEdgeCues } from "@/shared/hooks/useScrollEdgeCues"
import { cn } from "@/shared/lib/cn"
import { Chip } from "@/shared/ui/chip"
import { Glass } from "@/shared/ui/glass"
import { ScrollEdgeButton } from "@/shared/ui/scroll-edge-button"
import { TagFilters } from "@/widgets/catalog/TagFilters"
import { FloatingActions } from "@/widgets/header/FloatingActions"

/**
 * Геометрия плашки. Должна совпадать с раскладкой ниже и с `.sticky-bar` в
 * globals.css: пороги наблюдателей считаются отсюда, иначе плашка мигает.
 * compact = 6+40+6, expanded = 8+40+8+(36+pb).
 */
export const STICKY_BAR = { top: 20, compact: 52, expanded: 100 } as const

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
  tag: TagFilterId
  onTagChange: (tag: TagFilterId) => void
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
  const categoriesScrollRef = useAxisLockedHorizontalScroll<HTMLElement>()
  const categoryEdges = useScrollEdgeCues(categoriesScrollRef)

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
            <div className="relative min-w-0">
              <nav
                ref={categoriesScrollRef}
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
                        "h-10 gap-2 rounded-[var(--r-md)] px-3",
                        active ? GLASS_CHIP_ACTIVE : GLASS_CHIP,
                      )}
                    >
                      <CategoryIcon icon={item.icon} active={active} tone="glass" />
                      {item.name}
                    </Chip>
                  )
                })}
              </nav>
              <ScrollEdgeButton
                side="left"
                visible={categoryEdges.canScrollLeft}
                label="Прокрутить категории влево"
                onPeekEnter={() => categoryEdges.onPeekEnter("left")}
                onPeekLeave={categoryEdges.onPeekLeave}
                onPageScroll={() => categoryEdges.onPageScroll("left")}
              />
              <ScrollEdgeButton
                side="right"
                visible={categoryEdges.canScrollRight}
                label="Прокрутить категории вправо"
                onPeekEnter={() => categoryEdges.onPeekEnter("right")}
                onPeekLeave={categoryEdges.onPeekLeave}
                onPageScroll={() => categoryEdges.onPageScroll("right")}
              />
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
            <TagFilters
              categoryId={category}
              value={tag}
              onChange={onTagChange}
              layoutGroup="glass-tags"
              animated={false}
              scrollMode="axis-lock"
              className="sticky-bar-fade px-2 pb-2"
              chipClassName={(active) => (active ? GLASS_CHIP_ACTIVE : GLASS_CHIP)}
            />
          </div>
        </div>
      </Glass>
    </div>
  )
}
