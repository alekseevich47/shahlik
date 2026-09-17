import { PRODUCT_ASPECT_RATIO } from "@/entities/product/format"
import { cn } from "@/shared/lib/cn"

/** Каркас PDP — тот же габарит, что у загруженной модалки (`max-h-[94vh]`). */
export function ProductSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex min-h-[calc(94vh-1.5rem)] flex-col bg-canvas sm:min-h-[calc(94vh-2rem)] lg:min-h-[calc(94vh-2.5rem)]",
        className,
      )}
      aria-busy
      aria-label="Загрузка карточки"
    >
      <div className="mx-auto grid w-full max-w-[1680px] flex-1 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,413px)] lg:items-stretch xl:grid-cols-[minmax(0,1fr)_467px]">
        <section className="relative min-h-0 overflow-hidden bg-surface lg:rounded-[var(--r-2xl)] dark:bg-surface-3">
          <div
            className={cn(
              "relative w-full animate-pulse bg-surface-3",
              "max-lg:[aspect-ratio:var(--product-ar)]",
              "lg:h-full lg:min-h-[480px]",
            )}
            style={{ ["--product-ar" as string]: PRODUCT_ASPECT_RATIO }}
          />
        </section>

        <section className="relative flex min-h-0 min-w-0 flex-col border border-line bg-surface p-4 shadow-[var(--shadow-card)] sm:p-6 lg:overflow-hidden lg:rounded-[var(--r-2xl)]">
          <div className="flex min-h-0 flex-1 flex-col gap-5">
            <div className="flex items-start gap-4">
              <div className="min-w-0 flex-1 space-y-3">
                <div className="h-8 w-3/4 max-w-[280px] animate-pulse rounded-[var(--r-md)] bg-surface-3 sm:h-9" />
                <div className="h-3 w-full max-w-[360px] animate-pulse rounded bg-surface-3" />
                <div className="h-3 w-2/3 max-w-[240px] animate-pulse rounded bg-surface-3" />
              </div>
              <div className="size-10 shrink-0 animate-pulse rounded-[var(--r-md)] bg-surface-3" />
            </div>

            <div className="h-[4.5rem] w-full max-w-[440px] animate-pulse rounded-[var(--r-lg)] bg-surface-3" />

            <div className="space-y-2">
              <div className="h-3 w-28 animate-pulse rounded bg-surface-3" />
              <div className="flex gap-2">
                <div className="h-10 w-24 animate-pulse rounded-[var(--r-md)] bg-surface-3" />
                <div className="h-10 w-24 animate-pulse rounded-[var(--r-md)] bg-surface-3" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-3 w-16 animate-pulse rounded bg-surface-3" />
              <div className="flex gap-2">
                <div className="h-14 flex-1 animate-pulse rounded-[var(--r-md)] bg-surface-3" />
                <div className="h-14 flex-1 animate-pulse rounded-[var(--r-md)] bg-surface-3" />
                <div className="h-14 flex-1 animate-pulse rounded-[var(--r-md)] bg-surface-3" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <div className="h-3 w-14 animate-pulse rounded bg-surface-3" />
                <div className="h-12 w-full animate-pulse rounded-[var(--r-md)] bg-surface-3" />
                <div className="h-12 w-full animate-pulse rounded-[var(--r-md)] bg-surface-3" />
                <div className="h-12 w-full animate-pulse rounded-[var(--r-md)] bg-surface-3" />
              </div>
              <div className="space-y-2">
                <div className="h-3 w-16 animate-pulse rounded bg-surface-3" />
                <div className="h-12 w-full animate-pulse rounded-[var(--r-md)] bg-surface-3" />
                <div className="h-12 w-full animate-pulse rounded-[var(--r-md)] bg-surface-3" />
                <div className="h-12 w-full animate-pulse rounded-[var(--r-md)] bg-surface-3" />
              </div>
            </div>

            <div className="mt-auto flex items-center gap-3 pt-1">
              <div className="h-12 w-28 shrink-0 animate-pulse rounded-[var(--r-md)] bg-surface-3" />
              <div className="h-12 min-w-0 flex-1 animate-pulse rounded-[var(--r-md)] bg-surface-3" />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
