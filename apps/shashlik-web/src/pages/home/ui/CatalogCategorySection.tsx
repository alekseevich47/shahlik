import type { ReactNode } from "react"

import { CATALOG_SCROLL_MARGIN, catalogSectionId } from "../lib/catalogSection"

type Props = {
  categoryId: string
  title: string
  headingClassName?: string
  className?: string
  /** Переопределение scroll-margin-top (mobile sticky). */
  scrollMarginTop?: number
  children: ReactNode
}

export function CatalogCategorySection({
  categoryId,
  title,
  headingClassName,
  className,
  scrollMarginTop,
  children,
}: Props) {
  return (
    <section
      id={catalogSectionId(categoryId)}
      data-category-id={categoryId}
      style={{ scrollMarginTop: scrollMarginTop ?? CATALOG_SCROLL_MARGIN }}
      className={className}
    >
      <h2 className={headingClassName}>{title}</h2>
      {children}
    </section>
  )
}
