import { Plus, Trash2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import { useCreateTag, useDeleteTag, useTags, useUpdateTag } from "@/entities/tag/api"
import { slugFromName, type CategoryTag } from "@/entities/tag/model"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"

type Draft = { name: string; slug: string; emoji: string }

const EMPTY: Draft = { name: "", slug: "", emoji: "" }

export function CategoryTagsEditor({ categoryId }: { categoryId: string }) {
  const { data: allTags = [] } = useTags()
  const tags = allTags.filter((tag) => tag.categoryId === categoryId)
  const createTag = useCreateTag()
  const updateTag = useUpdateTag()
  const deleteTag = useDeleteTag()
  const [draft, setDraft] = useState<Draft>(EMPTY)
  const busy = createTag.isPending || updateTag.isPending || deleteTag.isPending

  const add = async () => {
    const name = draft.name.trim()
    const slug = (draft.slug.trim() || slugFromName(name)).toLowerCase()
    if (!name || !slug) {
      toast.error("Нужны название и slug (латиница)")
      return
    }
    if (!/^[a-z0-9-]+$/.test(slug)) {
      toast.error("Slug: только a-z, 0-9 и дефис")
      return
    }
    try {
      await createTag.mutateAsync({
        categoryId,
        name,
        slug,
        emoji: draft.emoji.trim(),
        order: tags.reduce((max, t) => Math.max(max, t.order), 0) + 1,
      })
      setDraft(EMPTY)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Не удалось добавить тег")
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="text-[11px] font-bold tracking-[0.04em] text-fg-muted uppercase">
        Фильтры витрины
      </p>
      {tags.map((tag) => (
        <TagRow
          key={tag.id}
          tag={tag}
          disabled={busy}
          onSave={async (data) => {
            try {
              await updateTag.mutateAsync({ id: tag.id, data })
            } catch (err) {
              toast.error(err instanceof Error ? err.message : "Не удалось сохранить тег")
            }
          }}
          onRemove={async () => {
            try {
              await deleteTag.mutateAsync(tag.id)
            } catch (err) {
              toast.error(err instanceof Error ? err.message : "Не удалось удалить тег")
            }
          }}
        />
      ))}
      <div className="flex flex-wrap items-center gap-1.5">
        <Input
          placeholder="Название"
          value={draft.name}
          onChange={(e) =>
            setDraft((d) => ({
              ...d,
              name: e.target.value,
              slug: d.slug || slugFromName(e.target.value),
            }))
          }
          className="h-8 min-w-[8rem] flex-1 px-2.5 text-[12.5px]"
        />
        <Input
          placeholder="slug"
          value={draft.slug}
          onChange={(e) => setDraft((d) => ({ ...d, slug: e.target.value }))}
          className="h-8 w-28 px-2.5 text-[12.5px]"
        />
        <Input
          placeholder="🌶"
          value={draft.emoji}
          onChange={(e) => setDraft((d) => ({ ...d, emoji: e.target.value }))}
          className="h-8 w-14 px-2 text-center text-[12.5px]"
        />
        <Button variant="soft" size="xs" disabled={busy} onClick={() => void add()}>
          <Plus size={12} strokeWidth={3} />
          Тег
        </Button>
      </div>
    </div>
  )
}

function TagRow({
  tag,
  disabled,
  onSave,
  onRemove,
}: {
  tag: CategoryTag
  disabled: boolean
  onSave: (data: { name: string; slug: string; emoji: string }) => Promise<void>
  onRemove: () => Promise<void>
}) {
  const [name, setName] = useState(tag.name)
  const [slug, setSlug] = useState(tag.slug)
  const [emoji, setEmoji] = useState(tag.emoji ?? "")
  const dirty = name !== tag.name || slug !== tag.slug || emoji !== (tag.emoji ?? "")

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="h-8 min-w-[8rem] flex-1 px-2.5 text-[12.5px]"
      />
      <Input
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        className="h-8 w-28 px-2.5 text-[12.5px]"
      />
      <Input
        value={emoji}
        onChange={(e) => setEmoji(e.target.value)}
        className="h-8 w-14 px-2 text-center text-[12.5px]"
      />
      {dirty ? (
        <Button
          variant="soft"
          size="xs"
          disabled={disabled}
          onClick={() => void onSave({ name, slug, emoji })}
        >
          OK
        </Button>
      ) : null}
      <button
        type="button"
        aria-label={`Удалить тег ${tag.name}`}
        disabled={disabled}
        onClick={() => void onRemove()}
        className="grid size-8 cursor-pointer place-items-center rounded-[var(--r-xs)] text-fg-faint transition-colors hover:bg-red-soft hover:text-red disabled:opacity-50"
      >
        <Trash2 size={13} strokeWidth={2.4} />
      </button>
    </div>
  )
}
