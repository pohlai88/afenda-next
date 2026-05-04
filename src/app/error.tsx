"use client";

import { useEffect } from "react";

/**
 * Segment error boundary (Next.js `error.tsx`).
 * Must be a Client Component; prefer `unstable_retry()` to re-fetch the segment.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/error
 */
export default function AppRouteError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    // Server errors: correlate with server logs via `digest` in production.
    console.error("[app:error]", error);
  }, [error]);

  return (
    <main className="bg-background text-foreground flex min-h-[50vh] flex-col items-center justify-center gap-6 px-6 py-16">
      <div className="max-w-md space-y-2 text-center">
        <h1 className="type-page-title">Something went wrong</h1>
        <p className="type-body text-foreground-muted">
          The page hit an unexpected error. You can try again, or return home
          from the navigation.
        </p>
        {process.env.NODE_ENV === "development" && error.message ? (
          <p className="type-caption text-destructive font-mono wrap-break-word">
            {error.message}
          </p>
        ) : null}
        {error.digest ? (
          <p className="type-caption text-foreground-muted">
            Reference: <span className="font-mono">{error.digest}</span>
          </p>
        ) : null}
      </div>
      <button
        className="border-border bg-surface-raised hover:bg-surface rounded-panel border px-4 py-2 text-sm font-medium transition"
        type="button"
        onClick={() => {
          unstable_retry();
        }}
      >
        Try again
      </button>
    </main>
  );
}
