const STORAGE_KEY = "shashlik:orders:v1"
const MAX_ORDERS = 10
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000

type StoredOrder = {
  id: string
  at: number
}

function canUseStorage(): boolean {
  return typeof window !== "undefined"
}

function isStoredOrder(value: unknown): value is StoredOrder {
  if (!value || typeof value !== "object") return false
  const row = value as { id?: unknown; at?: unknown }
  return typeof row.id === "string" && Boolean(row.id) && typeof row.at === "number"
}

function prune(items: StoredOrder[], now = Date.now()): StoredOrder[] {
  const seen = new Set<string>()
  const out: StoredOrder[] = []
  for (const item of items) {
    if (now - item.at >= MAX_AGE_MS) continue
    if (seen.has(item.id)) continue
    seen.add(item.id)
    out.push(item)
    if (out.length >= MAX_ORDERS) break
  }
  return out
}

function load(): StoredOrder[] {
  if (!canUseStorage()) return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return prune(parsed.filter(isStoredOrder))
  } catch {
    return []
  }
}

function save(items: StoredOrder[]): StoredOrder[] {
  const next = prune(items)
  if (!canUseStorage()) return next
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // quota / private mode
  }
  return next
}

/** Запомнить заказ гостя (новые — в начале, максимум 10, старше 7 дней выкидываются). */
export function rememberLocalOrder(id: string): void {
  const orderId = id.trim()
  if (!orderId) return
  const rest = load().filter((item) => item.id !== orderId)
  save([{ id: orderId, at: Date.now() }, ...rest])
}

export function listLocalOrderIds(): string[] {
  return save(load()).map((item) => item.id)
}

export function getLatestLocalOrderId(): string | null {
  return listLocalOrderIds()[0] ?? null
}
