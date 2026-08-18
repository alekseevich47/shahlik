import type { Order, Review } from "@/entities/order/model"

export const orders: Order[] = [
  { id: "o-1", number: "№ 1042", createdAt: "2024-05-24T15:30:00", customer: "Алексей П.", phone: "+7 999 120-45-11", mode: "delivery", address: "ул. Ленина, 123", status: "cooking", positions: 3, total: 1140 },
  { id: "o-2", number: "№ 1041", createdAt: "2024-05-24T15:12:00", customer: "Марина К.", phone: "+7 999 341-02-77", mode: "pickup", status: "done", positions: 2, total: 700 },
  { id: "o-3", number: "№ 1040", createdAt: "2024-05-24T14:58:00", customer: "Игорь С.", phone: "+7 999 887-19-04", mode: "delivery", address: "пр. Мира, 8", status: "delivering", positions: 5, total: 2185 },
  { id: "o-4", number: "№ 1039", createdAt: "2024-05-24T14:31:00", customer: "Ольга В.", phone: "+7 999 553-77-20", mode: "pickup", status: "new", positions: 1, total: 340 },
  { id: "o-5", number: "№ 1038", createdAt: "2024-05-24T13:47:00", customer: "Данил Р.", phone: "+7 999 210-88-31", mode: "delivery", address: "ул. Садовая, 41", status: "canceled", positions: 2, total: 780 },
  { id: "o-6", number: "№ 1037", createdAt: "2024-05-24T13:05:00", customer: "Кирилл Н.", phone: "+7 999 664-15-90", mode: "pickup", status: "done", positions: 4, total: 1520 },
]

export const reviews: Review[] = [
  { id: "r-1", author: "Алексей", productName: "Шаурма арабская", createdAt: "2024-05-24", score: 9, text: "Лучшая арабская в городе, гранат — отдельный кайф.", published: true },
  { id: "r-2", author: "Марина", productName: "Шаурма сырная", createdAt: "2024-05-23", score: 10, text: "Сыра не пожалели, буду брать ещё.", published: true },
  { id: "r-3", author: "Игорь", productName: "Шашлык в лаваше", createdAt: "2024-05-23", score: 8, text: "Мясо отличное, но ждал чуть дольше обычного.", published: true },
  { id: "r-4", author: "Ольга", productName: "Шаурма пикантная", createdAt: "2024-05-22", score: 7, text: "Остро — как и обещали. Хотелось бы вариант помягче.", published: false },
]

export const coupons = [
  { id: "c-1", code: "BOSS10", discount: "10%", description: "На первый заказ", uses: 342, active: true },
  { id: "c-2", code: "COMBO15", discount: "15%", description: "На комбо по будням", uses: 118, active: true },
  { id: "c-3", code: "NIGHT200", discount: "200₽", description: "Заказ после 22:00 от 1200₽", uses: 46, active: false },
]
