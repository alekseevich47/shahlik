export type CategoryId =
  | "shawarma"
  | "shashlik"
  | "pizza"
  | "combo"
  | "sides"
  | "drinks"
  | "sauces"

export type Category = {
  id: CategoryId
  name: string
  /** PNG-иконка из брендового набора (public/icons). */
  icon: string | null
  order: number
}
