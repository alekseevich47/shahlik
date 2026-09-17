/**
 * Квадратные PWA-иконки из public/logo/logo.png:
 * белый холст, логотип contain с ~9% padding (для landscape — поля сверху/снизу;
 * для portrait — слева/справа). Исходный logo.png не трогаем.
 *
 *   node scripts/gen-pwa-icons.mjs
 *   pnpm gen:pwa-icons
 */
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const srcPath = join(root, "public/logo/logo.png")
const outDir = join(root, "public/logo")
const PAD = 0.09

const sizes = [
  { name: "pwa-180.png", size: 180 },
  { name: "pwa-192.png", size: 192 },
  { name: "pwa-512.png", size: 512 },
]

const meta = await sharp(srcPath).metadata()
const srcW = meta.width ?? 1050
const srcH = meta.height ?? 826

for (const { name, size } of sizes) {
  const inner = Math.round(size * (1 - 2 * PAD))
  // contain: вписать в inner×inner (по меньшей стороне относительно aspect)
  const scale = Math.min(inner / srcW, inner / srcH)
  const drawW = Math.max(1, Math.round(srcW * scale))
  const drawH = Math.max(1, Math.round(srcH * scale))
  const left = Math.round((size - drawW) / 2)
  const top = Math.round((size - drawH) / 2)

  const logo = await sharp(srcPath)
    .resize(drawW, drawH, { fit: "fill" })
    .ensureAlpha()
    .png()
    .toBuffer()

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    },
  })
    .composite([{ input: logo, left, top }])
    .png()
    .toFile(join(outDir, name))

  console.log(`wrote ${name} (${size}×${size}, logo ${drawW}×${drawH})`)
}
