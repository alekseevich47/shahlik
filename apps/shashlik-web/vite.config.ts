import { fileURLToPath, URL } from "node:url"

import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 5273,
    host: true,
  },
  build: {
    // Библиотеки живут отдельным чанком: они меняются редко, поэтому деплой
    // правок витрины не сбрасывает их из кэша браузера.
    rolldownOptions: {
      output: {
        advancedChunks: {
          groups: [
            { name: "react", test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/ },
            { name: "motion", test: /node_modules[\\/]motion/ },
            { name: "router", test: /node_modules[\\/]react-router/ },
          ],
        },
      },
    },
  },
})
