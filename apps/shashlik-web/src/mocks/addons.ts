import type { Addon } from "@/entities/addon/model"

const IMG = {
  onion: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=200&h=200&fit=crop",
  carrot: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=200&h=200&fit=crop",
  cucumber: "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=200&h=200&fit=crop",
  jalapeno: "https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=200&h=200&fit=crop",
  cheese: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=200&h=200&fit=crop",
  potato: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=200&h=200&fit=crop",
  sauceRed: "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=200&h=200&fit=crop",
  sauceWhite: "https://images.unsplash.com/photo-1607532941433-304659e8198a?w=200&h=200&fit=crop",
  sauceGold: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=200&h=200&fit=crop",
  sauceDark: "https://images.unsplash.com/photo-1608039755401-742074f0548d?w=200&h=200&fit=crop",
}

export const addons: Addon[] = [
  { id: "a-onion", name: "Маринованный лук", weight: "30г", price: 35, image: IMG.onion, kind: "extra", article: "31121" },
  { id: "a-carrot", name: "Морковь по-корейски", weight: "30г", price: 35, image: IMG.carrot, kind: "extra", article: "31112" },
  { id: "a-cucumber", name: "Маринованный огурец", weight: "30г", price: 35, image: IMG.cucumber, kind: "extra", article: "31122" },
  { id: "a-jalapeno", name: "Перец халапеньо", weight: "30г", price: 35, image: IMG.jalapeno, kind: "extra", article: "31123" },
  { id: "a-cheese", name: "Сыр моцарелла", weight: "30г", price: 45, image: IMG.cheese, kind: "extra", article: "31124" },
  { id: "a-potato", name: "Картофель фри", weight: "80г", price: 90, image: IMG.potato, kind: "extra", article: "31125" },

  { id: "s-adjika", name: "Соус Аджика", weight: "30г", price: 35, image: IMG.sauceRed, kind: "sauce", article: "26011" },
  { id: "s-arab", name: "Соус Арабский", weight: "30г", price: 35, image: IMG.sauceGold, kind: "sauce", article: "26012" },
  { id: "s-bbq", name: "Соус Барбекю", weight: "30г", price: 35, image: IMG.sauceDark, kind: "sauce", article: "26013" },
  { id: "s-kavkaz", name: "Соус Кавказский", weight: "30г", price: 35, image: IMG.sauceRed, kind: "sauce", article: "26014" },
  { id: "s-garlic", name: "Соус Чесночный", weight: "30г", price: 35, image: IMG.sauceWhite, kind: "sauce", article: "26015" },
  { id: "s-cheese", name: "Соус Сырный", weight: "30г", price: 35, image: IMG.sauceGold, kind: "sauce", article: "26016" },
]

export const extras = addons.filter((a) => a.kind === "extra")
export const sauces = addons.filter((a) => a.kind === "sauce")

export function addonById(id: string): Addon | undefined {
  return addons.find((a) => a.id === id)
}
