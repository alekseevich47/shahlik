/** Цена всегда целая в рублях: 340 → «340₽». */
export function formatPrice(value: number): string {
  return `${Math.round(value).toLocaleString("ru-RU")}₽`
}

/** @deprecated Используйте formatScore5. */
export function formatScore10(value: number): string {
  return formatScore5(value > 5 ? value / 2 : value)
}

/** Оценка по 5-балльной шкале: 4 → «4/5», 4.2 → «4.2/5». */
export function formatScore5(value: number): string {
  return `${trimZero(value)}/5`
}

function trimZero(value: number): string {
  return Number(value.toFixed(1)).toString().replace(".", ".")
}

export function pluralize(count: number, forms: [string, string, string]): string {
  const n = Math.abs(count) % 100
  const n1 = n % 10
  if (n > 10 && n < 20) return forms[2]
  if (n1 > 1 && n1 < 5) return forms[1]
  if (n1 === 1) return forms[0]
  return forms[2]
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}
