import type { ReactNode } from "react"

import { CATALOG_SCROLL_MARGIN, catalogSectionId } from "../lib/catalogSection"

type Props = {
  categoryId: string
  title: string
  headingClassName?: string
  className?: string
  children: ReactNode
}

export function CatalogCategorySection({
  categoryId,
  title,
  headingClassName,
  className,
  children,
}: Props) {
  return (
    <section
      id={catalogSectionId(categoryId)}
      data-category-id={categoryId}
      style={{ scrollMarginTop: CATALOG_SCROLL_MARGIN }}
      className={className}
    >
      <h2 className={headingClassName}>{title}</h2>
      {children}
    </section>
  )
}
