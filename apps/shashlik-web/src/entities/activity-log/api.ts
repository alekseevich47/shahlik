import { useQuery } from "@tanstack/react-query"

import { pb } from "@/shared/api/pb"

import type { ActivityActorType, ActivityLog } from "./model"

type ActivityRecord = {
  id: string
  actorType: ActivityActorType
  actorId?: string
  action: string
  entity?: string
  entityId?: string
  meta?: Record<string, unknown> | null
  ip?: string
  userAgent?: string
  created: string
}

function mapLog(record: ActivityRecord): ActivityLog {
  return {
    id: record.id,
    actorType: record.actorType,
    actorId: record.actorId ?? "",
    action: record.action,
    entity: record.entity ?? "",
    entityId: record.entityId ?? "",
    meta: record.meta ?? null,
    ip: record.ip ?? "",
    userAgent: record.userAgent ?? "",
    createdAt: record.created,
  }
}

export const activityLogKeys = {
  page: (page: number, query: string) => ["activity_logs", page, query] as const,
}

export type ActivityLogsPage = {
  items: ActivityLog[]
  page: number
  totalPages: number
  totalItems: number
}

export async function fetchActivityLogsPage(params: {
  page: number
  perPage: number
  query?: string
}): Promise<ActivityLogsPage> {
  const q = params.query?.trim()
  const filter = q
    ? pb.filter("action ~ {:q} || entity ~ {:q} || actorId ~ {:q}", { q })
    : undefined
  const result = await pb.collection("activity_logs").getList<ActivityRecord>(
    params.page,
    params.perPage,
    {
      filter,
      sort: "-created",
    },
  )
  return {
    items: result.items.map(mapLog),
    page: result.page,
    totalPages: result.totalPages,
    totalItems: result.totalItems,
  }
}

export function useActivityLogsPage(
  params: { page: number; perPage: number; query?: string },
  enabled = true,
) {
  return useQuery({
    queryKey: activityLogKeys.page(params.page, params.query ?? ""),
    queryFn: () => fetchActivityLogsPage(params),
    enabled,
    placeholderData: (prev) => prev,
  })
}
