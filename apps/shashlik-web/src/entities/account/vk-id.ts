const PKCE_ALPHABET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~"

function randomAlphabet(length: number): string {
  const bytes = crypto.getRandomValues(new Uint8Array(length))
  let out = ""
  for (let i = 0; i < length; i++) {
    out += PKCE_ALPHABET[bytes[i] % PKCE_ALPHABET.length]
  }
  return out
}

export function createVkPkce(): { codeVerifier: string; state: string } {
  return {
    codeVerifier: randomAlphabet(64),
    state: randomAlphabet(48),
  }
}

function base64Url(bytes: Uint8Array): string {
  let binary = ""
  for (const byte of bytes) {
    binary += String.fromCharCode(byte)
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "")
}

/** S256 challenge для VK Config.init — SDK иногда теряет свой verifier. */
export async function pkceChallengeFromVerifier(codeVerifier: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(codeVerifier))
  return base64Url(new Uint8Array(digest))
}

export function resolveVkAppId(): number {
  const raw = import.meta.env.VITE_VK_APP_ID?.trim() || "54734207"
  const appId = Number(raw)
  if (!Number.isFinite(appId) || appId <= 0) {
    throw new Error("VITE_VK_APP_ID не задан")
  }
  return appId
}
