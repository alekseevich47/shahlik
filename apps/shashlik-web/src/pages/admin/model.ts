import {
  Gift,
  Image,
  LayoutDashboard,
  ListOrdered,
  MessageSquare,
  Package,
  PlusSquare,
  ScrollText,
  Settings,
  Star,
  TicketPercent,
  Users,
  Contact,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

export type AdminSectionId =
  | "dashboard"
  | "products"
  | "addons"
  | "categories"
  | "banners"
  | "orders"
  | "reviews"
  | "customers"
  | "staff"
  | "coupons"
  | "bonuses"
  | "logs"
  | "settings"

export type AdminRole = "admin" | "manager"

export type AdminNavItem = {
  id: AdminSectionId
  path: string
  label: string
  icon: LucideIcon
  /** Минимальная роль для пункта меню. */
  role: AdminRole
}

/** Порядок пунктов левого меню — единый источник для сайдбара. */
export const ADMIN_NAV: ReadonlyArray<AdminNavItem> = [
  { id: "dashboard", path: "dashboard", label: "Главная", icon: LayoutDashboard, role: "manager" },
  { id: "products", path: "products", label: "Товары", icon: Package, role: "manager" },
  { id: "addons", path: "addons", label: "Добавки", icon: ListOrdered, role: "manager" },
  { id: "categories", path: "categories", label: "Категории", icon: PlusSquare, role: "manager" },
  { id: "banners", path: "banners", label: "Баннеры", icon: Image, role: "manager" },
  { id: "orders", path: "orders", label: "Заказы", icon: Star, role: "manager" },
  { id: "reviews", path: "reviews", label: "Отзывы", icon: MessageSquare, role: "manager" },
  { id: "customers", path: "customers", label: "Клиенты", icon: Contact, role: "manager" },
  { id: "coupons", path: "coupons", label: "Купоны", icon: TicketPercent, role: "admin" },
  { id: "bonuses", path: "bonuses", label: "Бонусы", icon: Gift, role: "admin" },
  { id: "logs", path: "logs", label: "Журнал", icon: ScrollText, role: "admin" },
  { id: "staff", path: "staff", label: "Сотрудники", icon: Users, role: "admin" },
  { id: "settings", path: "settings", label: "Настройки", icon: Settings, role: "admin" },
]
