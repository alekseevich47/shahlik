import { AnimatePresence, LayoutGroup } from "motion/react"
import * as m from "motion/react-m"

import { useCategoryTags } from "@/entities/tag/api"
import { ALL_TAG, type TagFilterId } from "@/entities/tag/model"
import { cn } from "@/shared/lib/cn"
import { Chip } from "@/shared/ui/chip"

const SPRING = { type: "spring", stiffness: 520, damping: 38, mass: 0.7 } as const

type Props = {
  categoryId: string
  value: TagFilterId
  onChange: (tag: TagFilterId) => void
  className?: string
  layoutGroup?: string
  chipClassName?: (active: boolean) => string
  /** На стекле плашки — без layout, иначе кадры раскрытия плашки дорожают. */
  animated?: boolean
}

export function TagFilters({
  categoryId,
  value,
  onChange,
  className,
  layoutGroup = "catalog-tags",
  chipClassName,
  animated = true,
}: Props) {
  const { data: tags } = useCategoryTags(categoryId)

  const items = [
    { slug: ALL_TAG, name: "Все", emoji: null as string | null },
    ...tags.map((tag) => ({ slug: tag.slug, name: tag.name, emoji: tag.emoji })),
  ]

  const chips = items.map((item) => {
    const active = item.slug === value
    return (
      <Chip
        key={item.slug}
        active={active}
        onClick={() => onChange(item.slug)}
        className={chipClassName?.(active)}
      >
        {item.name}
        {item.emoji ? <span>{item.emoji}</span> : null}
      </Chip>
    )
  })

  if (!animated) {
    return <div className={cn("scrollbar-none flex gap-2 overflow-x-auto", className)}>{chips}</div>
  }

  return (
    <LayoutGroup id={layoutGroup}>
      <div className={cn("scrollbar-none flex gap-2 overflow-x-auto", className)}>
        <AnimatePresence mode="popLayout" initial={false}>
          {items.map((item) => {
            const active = item.slug === value
            return (
              <m.div
                key={item.slug}
                layout="position"
                initial={{ opacity: 0, scale: 0.86 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.86 }}
                transition={SPRING}
                className="shrink-0"
              >
                <Chip
                  active={active}
                  onClick={() => onChange(item.slug)}
                  className={chipClassName?.(active)}
                >
                  {item.name}
                  {item.emoji ? <span>{item.emoji}</span> : null}
                </Chip>
              </m.div>
            )
          })}
        </AnimatePresence>
      </div>
    </LayoutGroup>
  )
}
