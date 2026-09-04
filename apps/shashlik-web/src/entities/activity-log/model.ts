export type ActivityActorType = "admin" | "manager" | "user" | "guest"

export type ActivityLog = {
  id: string
  actorType: ActivityActorType
  actorId: string
  action: string
  entity: string
  entityId: string
  meta: Record<string, unknown> | null
  ip: string
  userAgent: string
  createdAt: string
}

export const ACTOR_TYPE_LABEL: Record<ActivityActorType, string> = {
  admin: "Админ",
  manager: "Менеджер",
  user: "Клиент",
  guest: "Гость",
}
