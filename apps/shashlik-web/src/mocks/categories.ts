import type { Category } from "@/entities/category/model"

export const categories: Category[] = [
  { id: "shawarma", name: "Шаурма", icon: "/icons/shaurma.png", order: 0 },
  { id: "shashlik", name: "Шашлык", icon: "/icons/shahlik.png", order: 1 },
  { id: "pizza", name: "Пицца", icon: "/icons/pizza.png", order: 2 },
  { id: "combo", name: "Комбо", icon: "/icons/combo.png", order: 3 },
  { id: "sides", name: "Гарниры", icon: "/icons/garnir.png", order: 4 },
  { id: "drinks", name: "Напитки", icon: "/icons/drinks.png", order: 5 },
  { id: "sauces", name: "Соусы", icon: null, order: 6 },
]

export function categoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id)
}
