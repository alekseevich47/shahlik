/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** PocketBase base URL. Прод — пусто (same-origin), dev — адрес staging/tunnel. */
  readonly VITE_PB_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
