export type OAuthProvider = "vk" | "yandex"

export type SavedAddress = {
  id: string
  label: string
  street: string
  home: string
  pod: string
  et: string
  apart: string
  isDefault: boolean
}

export type ProfileBonus = {
  score: number
  sale: number
  card: string
  referralCode?: string
  referredBy?: string
  history?: Array<{
    id: string
    delta: number
    balanceAfter: number
    reason: string
    created: string
  }>
}

export type AppUser = {
  id: string
  email: string
  extraEmails: string[]
  phone: string
  firstName: string
  lastName: string
  birthday: string | null
  addresses: SavedAddress[]
  customerId: string | null
  blocked: boolean
  referralCode?: string
  referredBy?: string | null
}

export type UpdateAccountInput = {
  firstName?: string
  lastName?: string
  phone?: string
  birthday?: string | null
}

export type NewSavedAddress = Omit<SavedAddress, "id">
