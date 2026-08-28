import { copyFileSync, mkdirSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const src = join(root, "node_modules", "@vkid", "sdk", "dist-sdk", "umd", "index.js")
const destDir = join(root, "public", "vk")
const dest = join(destDir, "vkid-sdk.js")

mkdirSync(destDir, { recursive: true })
copyFileSync(src, dest)
console.log(`vkid-sdk.js -> public/vk/vkid-sdk.js`)
