/**
 * Instant loading UI for the root segment (Suspense fallback).
 * Default is a Server Component — keep markup lightweight.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/loading
 */
export default function RootLoading() {
  return (
    <div
      aria-busy="true"
      aria-live="polite"
      className="bg-background text-foreground flex min-h-[40vh] flex-col items-center justify-center gap-4 px-6 py-16"
    >
      <div
        className="border-accent h-9 w-9 animate-spin rounded-full border-2 border-t-transparent"
        role="presentation"
      />
      <p className="type-body text-foreground-muted">Loading…</p>
    </div>
  );
}
