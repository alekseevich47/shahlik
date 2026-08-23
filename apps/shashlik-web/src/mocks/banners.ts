import type { Banner } from "@/entities/banner/model"

export const banners: Banner[] = [
  {
    id: "b-shawarma",
    image: "/products/shawarma-arabskaya.jpg",
    note: { title: "Контроль качества", text: "100% свежие продукты" },
    order: 1,
  },
  {
    id: "b-shashlik",
    image: "/products/shashlik-lavash-kur.jpg",
    note: { title: "Готовим при вас", text: "Отдаём за 12 минут" },
    order: 2,
  },
  {
    id: "b-combo",
    image: "/products/shawarma-frensis-bekon.jpg",
    note: { title: "Выгода до 15%", text: "Комбо дешевле по отдельности" },
    order: 3,
  },
]
