import { copyFileSync, mkdirSync, statSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const src = join(root, "node_modules", "@vkid", "sdk", "dist-sdk", "umd", "index.js")
const destDir = join(root, "public", "vk")
const dest = join(destDir, "vkid-sdk.js")

function needsCopy(from, to) {
  try {
    const s = statSync(from)
    const d = statSync(to)
    return s.mtimeMs > d.mtimeMs || s.size !== d.size
  } catch {
    return true
  }
}

mkdirSync(destDir, { recursive: true })

if (!needsCopy(src, dest)) {
  process.exit(0)
}

copyFileSync(src, dest)
console.log("vkid-sdk.js -> public/vk/vkid-sdk.js")
