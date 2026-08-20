import { useMutation } from "@tanstack/react-query"
import { ClientResponseError } from "pocketbase"

import { pb } from "./pb"
import { queryClient } from "./query-client"

type QueryKey = readonly unknown[]

type MutationKeys = {
  /** Ключи списков — инвалидируются после create/update/remove */
  all: QueryKey | readonly QueryKey[]
  /** Detail-ключ — `setQueryData` после create/update */
  detail?: (id: string) => QueryKey
}

type CollectionMutationsConfig<TRecord, TEntity> = {
  collection: string
  map: (record: TRecord) => TEntity
  keys: MutationKeys
}

const FIELD_CODE_RU: Record<string, string> = {
  validation_not_unique: "уже занят",
  validation_required: "обязательное поле",
  validation_invalid_format: "неверный формат",
  validation_min_text_constraint: "слишком короткое значение",
  validation_max_text_constraint: "слишком длинное значение",
}

function listKeys(keys: MutationKeys): QueryKey[] {
  const { all } = keys
  if (all.length === 0) return []
  if (typeof all[0] === "string" || typeof all[0] === "number") {
    return [all as QueryKey]
  }
  return [...(all as readonly QueryKey[])]
}

function invalidate(keys: MutationKeys) {
  for (const key of listKeys(keys)) {
    void queryClient.invalidateQueries({ queryKey: key })
  }
}

function syncDetail(keys: MutationKeys, entity: { id: string }) {
  if (!keys.detail) return
  queryClient.setQueryData(keys.detail(entity.id), entity)
}

/** Человекочитаемое сообщение из `ClientResponseError.response.data` по полям. */
export function pbErrorMessage(err: unknown, fallback = "Не удалось сохранить"): string {
  if (err instanceof ClientResponseError) {
    if (err.status === 413) {
      return "Файл слишком большой для сервера. Выберите фото поменьше или подождите сжатие."
    }
    const data = err.response?.data
    if (data && typeof data === "object") {
      const parts: string[] = []
      for (const [field, info] of Object.entries(data)) {
        if (!info || typeof info !== "object") continue
        const code = "code" in info && typeof info.code === "string" ? info.code : ""
        const mapped = code ? FIELD_CODE_RU[code] : undefined
        if (mapped) {
          parts.push(`${field} ${mapped}`)
          continue
        }
        if ("message" in info && typeof info.message === "string" && info.message) {
          parts.push(`${field}: ${info.message}`)
        }
      }
      if (parts.length > 0) return parts.join("; ")
    }
    return err.response?.message || err.message || fallback
  }
  if (err instanceof Error) return err.message
  return fallback
}

function wrapError(err: unknown): never {
  throw new Error(pbErrorMessage(err))
}

export function collectionMutations<
  TRecord extends { id: string },
  TEntity extends { id: string },
  TCreate extends Record<string, unknown> = Record<string, unknown>,
  TUpdate extends Record<string, unknown> = Partial<TCreate>,
>({ collection, map, keys }: CollectionMutationsConfig<TRecord, TEntity>) {
  async function create(data: TCreate): Promise<TEntity> {
    try {
      const record = await pb.collection(collection).create<TRecord>(data)
      return map(record)
    } catch (err) {
      wrapError(err)
    }
  }

  async function update(id: string, data: TUpdate): Promise<TEntity> {
    try {
      const record = await pb.collection(collection).update<TRecord>(id, data)
      return map(record)
    } catch (err) {
      wrapError(err)
    }
  }

  async function remove(id: string): Promise<void> {
    try {
      await pb.collection(collection).delete(id)
    } catch (err) {
      wrapError(err)
    }
  }

  function useCreate() {
    return useMutation({
      mutationFn: create,
      onSuccess: (entity) => {
        invalidate(keys)
        syncDetail(keys, entity)
      },
    })
  }

  function useUpdate() {
    return useMutation({
      mutationFn: ({ id, data }: { id: string; data: TUpdate }) => update(id, data),
      onSuccess: (entity) => {
        invalidate(keys)
        syncDetail(keys, entity)
      },
    })
  }

  function useRemove() {
    return useMutation({
      mutationFn: remove,
      onSuccess: (_ok, id) => {
        invalidate(keys)
        if (keys.detail) {
          queryClient.removeQueries({ queryKey: keys.detail(id) })
        }
      },
    })
  }

  return { create, update, remove, useCreate, useUpdate, useRemove }
}
