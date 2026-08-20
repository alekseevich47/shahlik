import { useMutation, useQuery } from "@tanstack/react-query"

import type { StaffRole } from "@/shared/api/auth"
import { collectionMutations, pbErrorMessage } from "@/shared/api/crud"
import { pb } from "@/shared/api/pb"
import { queryClient } from "@/shared/api/query-client"

export type StaffMember = {
  id: string
  email: string
  name: string
  role: StaffRole
  verified: boolean
  createdAt: string
}

export type CreateStaffInput = {
  email: string
  password: string
  passwordConfirm: string
  name?: string
  role: StaffRole
  verified?: boolean
}

export type UpdateStaffInput = {
  name?: string
  role?: StaffRole
  verified?: boolean
}

type StaffRecord = {
  id: string
  email: string
  name?: string
  role?: string
  verified?: boolean
  created: string
}

function mapStaff(record: StaffRecord): StaffMember | null {
  if (record.role !== "admin" && record.role !== "manager") return null
  return {
    id: record.id,
    email: record.email,
    name: record.name ?? "",
    role: record.role,
    verified: Boolean(record.verified),
    createdAt: record.created,
  }
}

function mapStaffRequired(record: StaffRecord): StaffMember {
  const mapped = mapStaff(record)
  if (!mapped) throw new Error("Некорректная роль сотрудника")
  return mapped
}

export const staffKeys = {
  all: ["staff"] as const,
  list: () => ["staff", "list"] as const,
  detail: (id: string) => ["staff", id] as const,
}

const staffMutations = collectionMutations<
  StaffRecord,
  StaffMember,
  CreateStaffInput,
  UpdateStaffInput
>({
  collection: "users",
  map: mapStaffRequired,
  keys: {
    all: staffKeys.all,
    detail: staffKeys.detail,
  },
})

export async function fetchStaff(): Promise<StaffMember[]> {
  const records = await pb.collection("users").getFullList<StaffRecord>({
    sort: "-created",
    filter: pb.filter("role = {:admin} || role = {:manager}", {
      admin: "admin",
      manager: "manager",
    }),
  })
  return records.map(mapStaff).filter((item): item is StaffMember => item != null)
}

export function useStaff() {
  return useQuery({
    queryKey: staffKeys.list(),
    queryFn: fetchStaff,
  })
}

export function useCreateStaff() {
  return staffMutations.useCreate()
}

export function useUpdateStaff() {
  return staffMutations.useUpdate()
}

export function useDeleteStaff() {
  return useMutation({
    mutationFn: async ({ id, currentUserId }: { id: string; currentUserId: string }) => {
      if (id === currentUserId) {
        throw new Error("Нельзя удалить свой аккаунт")
      }
      await staffMutations.remove(id)
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: staffKeys.all })
    },
  })
}

export function useRequestStaffPasswordReset() {
  return useMutation({
    mutationFn: async (email: string) => {
      try {
        await pb.collection("users").requestPasswordReset(email)
      } catch (err) {
        throw new Error(pbErrorMessage(err, "Не удалось отправить письмо"))
      }
    },
  })
}
