export type AddonKind = "extra" | "sauce"

export type Addon = {
  id: string
  name: string
  /** Граммовка под названием: «30г». */
  weight: string
  price: number
  image: string
  kind: AddonKind
  article?: string
}
