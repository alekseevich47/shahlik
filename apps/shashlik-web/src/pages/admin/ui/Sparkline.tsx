import * as m from "motion/react-m"

type Props = {
  values: number[]
  width?: number
  height?: number
  className?: string
}

/** Чистый SVG-спарклайн; анимация `pathLength` на `m.path`. */
export function Sparkline({ values, width = 96, height = 36, className }: Props) {
  const points = normalize(values)
  if (points.length < 2) {
    return (
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className={className} aria-hidden>
        <line
          x1={0}
          y1={height / 2}
          x2={width}
          y2={height / 2}
          stroke="currentColor"
          strokeOpacity={0.25}
          strokeWidth={1.5}
        />
      </svg>
    )
  }

  const path = toPath(points, width, height)
  const area = `${path} L ${width} ${height} L 0 ${height} Z`

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      aria-hidden
    >
      <m.path
        d={area}
        fill="currentColor"
        fillOpacity={0.12}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      />
      <m.path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      />
    </svg>
  )
}

function normalize(values: number[]): number[] {
  if (!values.length) return []
  return values.map((v) => (Number.isFinite(v) ? Math.max(0, v) : 0))
}

function toPath(values: number[], width: number, height: number): string {
  const max = Math.max(...values, 1)
  const min = Math.min(...values, 0)
  const span = Math.max(max - min, 1)
  const step = width / (values.length - 1)
  const pad = 2

  return values
    .map((v, i) => {
      const x = i * step
      const y = height - pad - ((v - min) / span) * (height - pad * 2)
      return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`
    })
    .join(" ")
}
