/**
 * Генератор карты преломления для стеклянной плашки (`public/pattern/glass-noise.png`).
 *
 * Раньше карту считал `feTurbulence` прямо в фильтре: Chromium гонит SVG-фильтры
 * по CPU и пересчитывает турбулентность при каждом изменении области фильтра,
 * то есть на каждом кадре скролла и раскрытия плашки. Тайл считается один раз
 * здесь, в рантайме остаётся feImage + feTile (блиты) + feDisplacementMap.
 *
 * Геометрия повторяет прежний фильтр: fractalNoise, baseFrequency 0.009 0.013,
 * numOctaves 2, сглаживание ≈ feGaussianBlur stdDeviation 2.4.
 *
 * Запуск: node scripts/gen-glass-noise.mjs
 */
import { deflateSync } from "node:zlib"
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

/** Сторона тайла. Кратна длинам волн ниже, иначе на стыке видно шов. */
const SIZE = 256
/** Длина волны первой октавы, px. 1/0.009 и 1/0.013 из прежнего feTurbulence. */
const CELL_X = 128
const CELL_Y = 64
const OCTAVES = 2
/** Радиус box-blur; три прохода ≈ гауссиана с stdDeviation 2.4. */
const BLUR_RADIUS = 2
const BLUR_PASSES = 3

/** xorshift32 — нужен детерминированный шум, Math.random() дал бы новый тайл каждый запуск. */
function makeRandom(seed) {
  let state = seed | 0 || 1
  return () => {
    state ^= state << 13
    state ^= state >>> 17
    state ^= state << 5
    return ((state >>> 0) % 100000) / 100000
  }
}

const smoothstep = (t) => t * t * (3 - 2 * t)

/** Value noise на решётке с заворотом по обеим осям — тайл склеивается без шва. */
function valueNoise(cellX, cellY, seed) {
  const cols = Math.max(1, Math.round(SIZE / cellX))
  const rows = Math.max(1, Math.round(SIZE / cellY))
  const random = makeRandom(seed)
  const lattice = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => random()),
  )

  const out = new Float64Array(SIZE * SIZE)
  const stepX = cols / SIZE
  const stepY = rows / SIZE

  for (let y = 0; y < SIZE; y += 1) {
    const fy = y * stepY
    const y0 = Math.floor(fy)
    const ty = smoothstep(fy - y0)
    const rowA = lattice[y0 % rows]
    const rowB = lattice[(y0 + 1) % rows]

    for (let x = 0; x < SIZE; x += 1) {
      const fx = x * stepX
      const x0 = Math.floor(fx)
      const tx = smoothstep(fx - x0)
      const xa = x0 % cols
      const xb = (x0 + 1) % cols

      const top = rowA[xa] + (rowA[xb] - rowA[xa]) * tx
      const bottom = rowB[xa] + (rowB[xb] - rowB[xa]) * tx
      out[y * SIZE + x] = top + (bottom - top) * ty
    }
  }

  return out
}

/** fractalNoise: октавы с половинной длиной волны и половинной амплитудой. */
function fractal(seed) {
  const acc = new Float64Array(SIZE * SIZE)
  let amplitude = 1
  let total = 0

  for (let octave = 0; octave < OCTAVES; octave += 1) {
    const divisor = 2 ** octave
    const layer = valueNoise(
      Math.max(4, CELL_X / divisor),
      Math.max(4, CELL_Y / divisor),
      seed + octave * 7919,
    )
    for (let i = 0; i < acc.length; i += 1) acc[i] += layer[i] * amplitude
    total += amplitude
    amplitude /= 2
  }

  for (let i = 0; i < acc.length; i += 1) acc[i] /= total
  return acc
}

/** Разделимый box-blur с заворотом — сглаживание не должно ломать бесшовность. */
function blur(data) {
  let src = data
  let dst = new Float64Array(data.length)
  const width = 2 * BLUR_RADIUS + 1

  for (let pass = 0; pass < BLUR_PASSES * 2; pass += 1) {
    const horizontal = pass % 2 === 0
    for (let y = 0; y < SIZE; y += 1) {
      for (let x = 0; x < SIZE; x += 1) {
        let sum = 0
        for (let k = -BLUR_RADIUS; k <= BLUR_RADIUS; k += 1) {
          const sx = horizontal ? (x + k + SIZE) % SIZE : x
          const sy = horizontal ? y : (y + k + SIZE) % SIZE
          sum += src[sy * SIZE + sx]
        }
        dst[y * SIZE + x] = sum / width
      }
    }
    const swap = src
    src = dst
    dst = swap
  }

  return src
}

function crc32(buffer) {
  let crc = 0xffffffff
  for (const byte of buffer) {
    crc ^= byte
    for (let bit = 0; bit < 8; bit += 1) {
      crc = crc & 1 ? (crc >>> 1) ^ 0xedb88320 : crc >>> 1
    }
  }
  return (crc ^ 0xffffffff) >>> 0
}

function chunk(type, payload) {
  const length = Buffer.alloc(4)
  length.writeUInt32BE(payload.length)
  const body = Buffer.concat([Buffer.from(type, "ascii"), payload])
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(body))
  return Buffer.concat([length, body, crc])
}

const BPP = 3

function paeth(a, b, c) {
  const p = a + b - c
  const pa = Math.abs(p - a)
  const pb = Math.abs(p - b)
  const pc = Math.abs(p - c)
  if (pa <= pb && pa <= pc) return a
  return pb <= pc ? b : c
}

/**
 * Адаптивная фильтрация строк. На сглаженном шуме соседние пиксели почти равны,
 * поэтому Sub/Up/Paeth дают дельты около нуля и deflate жмёт тайл в разы лучше,
 * чем фильтр None (100 kB → единицы kB).
 */
function filterScanlines(rgb) {
  const stride = SIZE * BPP
  const raw = Buffer.alloc(SIZE * (1 + stride))
  const prev = Buffer.alloc(stride)
  const line = Buffer.alloc(stride)
  const candidate = Buffer.alloc(stride)

  for (let y = 0; y < SIZE; y += 1) {
    line.set(rgb.subarray(y * stride, (y + 1) * stride))

    let bestScore = Infinity
    const rowStart = y * (1 + stride)

    for (let type = 0; type <= 4; type += 1) {
      let score = 0
      for (let i = 0; i < stride; i += 1) {
        const a = i >= BPP ? line[i - BPP] : 0
        const b = prev[i]
        const c = i >= BPP ? prev[i - BPP] : 0
        let delta
        switch (type) {
          case 1:
            delta = line[i] - a
            break
          case 2:
            delta = line[i] - b
            break
          case 3:
            delta = line[i] - ((a + b) >> 1)
            break
          case 4:
            delta = line[i] - paeth(a, b, c)
            break
          default:
            delta = line[i]
        }
        candidate[i] = delta & 0xff
        // Эвристика PNG-спеки: сумма знаковых дельт как оценка энтропии строки.
        score += Math.abs(candidate[i] > 127 ? candidate[i] - 256 : candidate[i])
      }
      if (score < bestScore) {
        bestScore = score
        raw[rowStart] = type
        candidate.copy(raw, rowStart + 1)
      }
    }

    prev.set(line)
  }

  return raw
}

function encodePng(rgb) {
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(SIZE, 0)
  ihdr.writeUInt32BE(SIZE, 4)
  ihdr[8] = 8 // бит на канал
  ihdr[9] = 2 // truecolor RGB
  ihdr[10] = 0
  ihdr[11] = 0
  ihdr[12] = 0

  const raw = filterScanlines(rgb)

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ])
}

/** Растягиваем сглаженный шум обратно на полный диапазон: blur съедает контраст. */
function normalize(data) {
  let min = Infinity
  let max = -Infinity
  for (const value of data) {
    if (value < min) min = value
    if (value > max) max = value
  }
  const span = max - min || 1
  const out = new Uint8Array(data.length)
  for (let i = 0; i < data.length; i += 1) {
    out[i] = Math.round(((data[i] - min) / span) * 255)
  }
  return out
}

// R → смещение по x, G → по y (xChannelSelector/yChannelSelector в фильтре).
const channelX = normalize(blur(fractal(7)))
const channelY = normalize(blur(fractal(1361)))

const rgb = new Uint8Array(SIZE * SIZE * 3)
for (let i = 0; i < SIZE * SIZE; i += 1) {
  rgb[i * 3] = channelX[i]
  rgb[i * 3 + 1] = channelY[i]
  rgb[i * 3 + 2] = 128
}

const out = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../public/pattern/glass-noise.png",
)
mkdirSync(dirname(out), { recursive: true })
const png = encodePng(rgb)
writeFileSync(out, png)
console.log(`glass-noise.png: ${SIZE}x${SIZE}, ${(png.length / 1024).toFixed(1)} kB`)
