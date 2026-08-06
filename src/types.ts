export interface Category {
  id: string;
  name: string;
  order: number;
}

export interface Addon {
  id: string;
  name: string;
  weight: string;
  price: number;
  image: string;
}

export interface Product {
  id: string;
  categoryId: string;
  name: string;
  weight: string;
  composition: string;
  price: number;
  image: string;
  order: number;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  order: number;
}

export interface CartAddon {
  addonId: string;
  quantity: number;
}

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  addons: CartAddon[];
}

export type DeliveryMode = 'delivery' | 'pickup';
export type Page = 'home' | 'admin' | 'about';
