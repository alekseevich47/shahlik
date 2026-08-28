import type { SizeTemplate } from "@/entities/size-template/model"
import { DEFAULT_SIZE_TEMPLATES } from "@/entities/size-template/model"

/** Справочник для сида PocketBase (`size_templates`). */
export const SIZE_TEMPLATES: SizeTemplate[] = DEFAULT_SIZE_TEMPLATES.map((t, index) => ({
  ...t,
  id: `seed-st-${index + 1}`,
}))
