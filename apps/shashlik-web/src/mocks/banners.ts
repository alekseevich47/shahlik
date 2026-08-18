import type { Banner } from "@/entities/banner/model"

export const banners: Banner[] = [
  {
    id: "b-shawarma",
    title: "Шаурма",
    subtitle: "Сочная, сытная и свежая",
    image: "/products/shawarma-arabskaya.jpg",
    note: { title: "Контроль качества", text: "100% свежие продукты" },
    order: 0,
  },
  {
    id: "b-shashlik",
    title: "Шашлык",
    subtitle: "С мангала, на живых углях",
    image: "/products/shashlik-lavash-kur.jpg",
    note: { title: "Готовим при вас", text: "Отдаём за 12 минут" },
    order: 1,
  },
  {
    id: "b-combo",
    title: "Комбо",
    subtitle: "Всё сразу и выгоднее",
    image: "/products/shawarma-frensis-bekon.jpg",
    note: { title: "Выгода до 15%", text: "Комбо дешевле по отдельности" },
    order: 2,
  },
]
