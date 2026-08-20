import { useQuery } from "@tanstack/react-query"

import { pb } from "./pb"

export type AdminCounts = {
  products: number
  addons: number
  categories: number
  banners: number
  orders: number
  reviews: number
}

export const adminCountKeys = {
  all: ["admin", "counts"] as const,
}

async function fetchAdminCounts(): Promise<AdminCounts> {
  const [products, addons, categories, banners, orders, reviews] = await Promise.all([
    pb.collection("products").getList(1, 1),
    pb.collection("addons").getList(1, 1),
    pb.collection("categories").getList(1, 1),
    pb.collection("banners").getList(1, 1),
    pb.collection("orders").getList(1, 1),
    pb.collection("reviews").getList(1, 1),
  ])

  return {
    products: products.totalItems,
    addons: addons.totalItems,
    categories: categories.totalItems,
    banners: banners.totalItems,
    orders: orders.totalItems,
    reviews: reviews.totalItems,
  }
}

export function useAdminCounts() {
  return useQuery({
    queryKey: adminCountKeys.all,
    queryFn: fetchAdminCounts,
    staleTime: 30_000,
  })
}
