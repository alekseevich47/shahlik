/** Маска UI: +7 (XXX) XXX-XX-XX */
export const PHONE_MASK_LENGTH = 18

/** Цифры номера без ведущей 7/8 страны (до 10). */
export function phoneLocalDigits(raw: string): string {
  let digits = String(raw ?? "").replace(/\D/g, "")
  if (digits.startsWith("8")) digits = "7" + digits.slice(1)
  if (digits.startsWith("7")) digits = digits.slice(1)
  return digits.slice(0, 10)
}

/** Полные 11 цифр с кодом страны 7, или пустая строка. */
export function phoneDigits(raw: string): string {
  const local = phoneLocalDigits(raw)
  if (!local) return ""
  return `7${local}`
}

export function formatPhoneInput(raw: string): string {
  const digits = String(raw ?? "").replace(/\D/g, "")
  if (!digits) return ""

  // Первичный ввод 8 или 7 → сразу показать +7
  if (digits === "8" || digits === "7") return "+7"

  const local = phoneLocalDigits(raw)
  if (!local) return "+7"

  let out = "+7"
  if (local.length > 0) out += ` (${local.slice(0, 3)}`
  if (local.length >= 3) out += ")"
  if (local.length > 3) out += ` ${local.slice(3, 6)}`
  if (local.length > 6) out += `-${local.slice(6, 8)}`
  if (local.length > 8) out += `-${local.slice(8, 10)}`
  return out
}

export function isCompleteRuPhone(raw: string): boolean {
  return phoneLocalDigits(raw).length === 10
}

/** Для API / PB: +79991234567 */
export function toE164Ru(raw: string): string {
  const digits = phoneDigits(raw)
  return digits.length === 11 ? `+${digits}` : ""
}
