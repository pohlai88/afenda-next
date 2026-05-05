/**
 * Route-level `loading.tsx` UX while server components/streaming resolve under `/interface-studio/*`
 */

export default function InterfaceStudioLoading() {
  return (
    <div
      className="min-h-screen bg-background px-6 py-10 text-foreground"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <div className="h-4 w-40 animate-pulse rounded bg-surface-muted" />
        <div className="h-12 max-w-md animate-pulse rounded bg-surface-muted" />
        <div className="h-24 max-w-2xl animate-pulse rounded bg-surface-muted" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {["a", "b", "c"].map((key) => (
            <div
              key={key}
              className="h-48 animate-pulse rounded-2xl border border-border bg-surface-muted/60"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
