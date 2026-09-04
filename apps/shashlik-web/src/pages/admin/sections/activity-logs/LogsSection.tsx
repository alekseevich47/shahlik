import { useState } from "react"

import { useActivityLogsPage } from "@/entities/activity-log/api"
import { ACTOR_TYPE_LABEL, type ActivityLog } from "@/entities/activity-log/model"
import { formatDateTime } from "@/shared/lib/format"

import { DataTable, type Column } from "../../ui/DataTable"
import { EmptyState } from "../../ui/EmptyState"
import { SectionShell } from "../../ui/SectionShell"
import { SkeletonRows } from "../../ui/SkeletonRows"
import { Toolbar } from "../../ui/Toolbar"

const COLUMNS: Column<ActivityLog>[] = [
  {
    key: "created",
    header: "Когда",
    render: (row) => (
      <span className="tabular-nums text-[12.5px] text-fg-muted">
        {formatDateTime(row.createdAt)}
      </span>
    ),
  },
  {
    key: "actor",
    header: "Кто",
    render: (row) => (
      <div>
        <p className="text-[13px] font-bold text-fg">{ACTOR_TYPE_LABEL[row.actorType]}</p>
        {row.actorId ? (
          <p className="font-mono text-[11px] text-fg-faint">{row.actorId}</p>
        ) : null}
      </div>
    ),
  },
  {
    key: "action",
    header: "Действие",
    render: (row) => <span className="text-[13px] font-semibold text-fg">{row.action}</span>,
  },
  {
    key: "entity",
    header: "Сущность",
    render: (row) => (
      <div>
        <p className="text-[13px] text-fg">{row.entity || "—"}</p>
        {row.entityId ? (
          <p className="font-mono text-[11px] text-fg-faint">{row.entityId}</p>
        ) : null}
      </div>
    ),
  },
  {
    key: "ip",
    header: "IP",
    render: (row) => (
      <span className="font-mono text-[11.5px] text-fg-muted">{row.ip || "—"}</span>
    ),
  },
]

export function LogsSection() {
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState("")
  const { data, isPending, isFetching } = useActivityLogsPage({
    page,
    perPage: 40,
    query,
  })

  return (
    <SectionShell
      title="Журнал"
      description="Действия администраторов, менеджеров, клиентов и гостей."
    >
      <Toolbar
        onSearchChange={(value) => {
          setQuery(value)
          setPage(1)
        }}
        searchPlaceholder="Действие, сущность, id…"
      />

      {isPending && !data ? (
        <SkeletonRows rows={8} />
      ) : !data?.items.length ? (
        <EmptyState title="Записей нет" description="Действия появятся по мере работы с системой" />
      ) : (
        <>
          <DataTable columns={COLUMNS} rows={data.items} rowKey={(row) => row.id} />
          <div className="mt-3 flex items-center justify-between gap-2 text-[12.5px] text-fg-muted">
            <span>
              Стр. {data.page} / {data.totalPages} · {data.totalItems}
              {isFetching ? " · обновление…" : ""}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                className="rounded-[var(--r-sm)] border border-line px-2.5 py-1 font-bold disabled:opacity-40"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Назад
              </button>
              <button
                type="button"
                className="rounded-[var(--r-sm)] border border-line px-2.5 py-1 font-bold disabled:opacity-40"
                disabled={page >= data.totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Далее
              </button>
            </div>
          </div>
        </>
      )}
    </SectionShell>
  )
}
