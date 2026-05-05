/**
 * Instant loading UI for `(app)/*` while the active route streams. Keeps layout
 * shells stable during navigation (Vercel / Next streaming model).
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/loading
 */
export default function AppRouteGroupLoading() {
  return (
    <div
      className="bg-background text-foreground flex min-h-[40vh] flex-col items-center justify-center px-6 py-16"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="flex w-full max-w-md flex-col gap-4">
        <div className="bg-surface-muted h-3 w-28 animate-pulse rounded" />
        <div className="bg-surface-muted h-10 animate-pulse rounded" />
        <div className="bg-surface-muted h-20 animate-pulse rounded" />
      </div>
    </div>
  );
}
