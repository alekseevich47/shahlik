import {
  Image,
  LayoutDashboard,
  ListOrdered,
  MessageSquare,
  Package,
  PlusSquare,
  Settings,
  Star,
  TicketPercent,
  Users,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

export type AdminTabId =
  | "products"
  | "categories"
  | "banners"
  | "addons"
  | "orders"
  | "reviews"

export const ADMIN_NAV: ReadonlyArray<{ id: string; label: string; icon: LucideIcon; tab?: AdminTabId }> = [
  { id: "dashboard", label: "Главная", icon: LayoutDashboard },
  { id: "products", label: "Товары", icon: Package, tab: "products" },
  { id: "categories", label: "Категории", icon: PlusSquare, tab: "categories" },
  { id: "addons", label: "Добавки", icon: ListOrdered, tab: "addons" },
  { id: "orders", label: "Заказы", icon: Star, tab: "orders" },
  { id: "reviews", label: "Отзывы", icon: MessageSquare, tab: "reviews" },
  { id: "users", label: "Пользователи", icon: Users },
  { id: "coupons", label: "Купоны", icon: TicketPercent },
  { id: "settings", label: "Настройки", icon: Settings },
]

export const ADMIN_BANNER_ICON = Image
