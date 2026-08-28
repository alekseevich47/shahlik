/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** PocketBase base URL. Прод — пусто (same-origin), dev — адрес staging/tunnel. */
  readonly VITE_PB_URL?: string
  /** VK ID client_id (One Tap). */
  readonly VITE_VK_APP_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
