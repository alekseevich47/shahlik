import { ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react"
import { useEffect, useState } from "react"

import { useBanners } from "@/entities/banner/api"
import { cn } from "@/shared/lib/cn"

const AUTOPLAY_MS = 6000

export function HeroBanner({ className }: { className?: string }) {
  const { data: banners = [] } = useBanners()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = banners.length
  const active = count ? banners[index % count] : undefined

  useEffect(() => {
    if (paused || count < 2) return
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [paused, count])

  const go = (delta: number) => {
    if (!count) return
    setIndex((i) => (i + delta + count) % count)
  }

  return (
    <section
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className={cn(
        "relative isolate h-[190px] overflow-hidden rounded-[var(--r-2xl)] border border-line bg-surface",
        "shadow-[var(--shadow-card)] sm:h-[220px] lg:h-[236px]",
        className,
      )}
    >
      {banners.map((banner, i) => (
        <img
          key={banner.id}
          src={banner.image}
          alt=""
          aria-hidden
          className={cn(
            "absolute inset-y-0 right-0 h-full w-[70%] object-cover transition-opacity duration-700 ease-[var(--ease-out-soft)] sm:w-[64%]",
            i === index ? "opacity-100" : "opacity-0",
          )}
        />
      ))}

      <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--surface)_0%,var(--surface)_30%,color-mix(in_srgb,var(--surface)_72%,transparent)_48%,transparent_78%)] sm:bg-[linear-gradient(90deg,var(--surface)_0%,var(--surface)_26%,color-mix(in_srgb,var(--surface)_55%,transparent)_46%,transparent_72%)]" />

      <div className="relative flex h-full max-w-[62%] flex-col justify-center gap-1.5 px-5 sm:max-w-none sm:px-8">
        {active ? (
          <>
            <h1 className="text-[28px] leading-none font-extrabold tracking-[-0.02em] text-fg sm:text-[42px] lg:text-[46px]">
              {active.title}
            </h1>
            <p className="text-[12px] leading-snug font-semibold text-fg-muted sm:text-[14px]">
              {active.subtitle}
            </p>
          </>
        ) : null}
      </div>

      {active?.note ? (
        <div className="absolute right-4 bottom-4 hidden items-center gap-2 rounded-[var(--r-md)] border border-line bg-surface/92 px-3 py-2 shadow-[var(--shadow-card)] backdrop-blur-md sm:flex">
          <ShieldCheck size={17} className="text-success" strokeWidth={2.3} />
          <span className="flex flex-col leading-tight">
            <span className="text-[11px] font-extrabold text-fg">{active.note.title}</span>
            <span className="text-[10px] text-fg-muted">{active.note.text}</span>
          </span>
        </div>
      ) : null}

      <HoverArrow side="left" onClick={() => go(-1)} />
      <HoverArrow side="right" onClick={() => go(1)} />

      <div className="absolute bottom-3.5 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
        {banners.map((banner, i) => (
          <button
            key={banner.id}
            type="button"
            aria-label={`Баннер ${i + 1}`}
            onClick={() => setIndex(i)}
            className={cn(
              "h-1.5 cursor-pointer rounded-full transition-all duration-300",
              i === index ? "w-5 bg-brand" : "w-1.5 bg-fg-faint/50 hover:bg-fg-faint",
            )}
          />
        ))}
      </div>
    </section>
  )
}

function HoverArrow({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Предыдущий баннер" : "Следующий баннер"}
      className={cn(
        "group absolute inset-y-0 w-[12.5%] cursor-pointer opacity-0 transition-opacity duration-200 hover:opacity-100",
        side === "left" ? "left-0" : "right-0",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute inset-0",
          side === "left"
            ? "bg-[linear-gradient(90deg,rgba(0,0,0,0.28),transparent)]"
            : "bg-[linear-gradient(270deg,rgba(0,0,0,0.28),transparent)]",
        )}
      />
      <Icon
        size={26}
        strokeWidth={2.4}
        className="relative mx-auto text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]"
      />
    </button>
  )
}
