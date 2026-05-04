"use client";

import { useEffect } from "react";

import "@/styles/globals.css";

/**
 * Root layout errors only — replaces the root layout when active.
 * Must define its own `<html>` / `<body>` and cannot export `metadata`
 * (use `<title>` for a minimal document title).
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/error#global-error
 */
export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error("[app:global-error]", error);
  }, [error]);

  return (
    <html lang="en-US" dir="ltr">
      <head>
        <title>Error · Afenda</title>
      </head>
      <body className="bg-background text-foreground antialiased">
        <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 py-16">
          <div className="max-w-md space-y-2 text-center">
            <h1 className="text-xl font-semibold tracking-tight">
              Application error
            </h1>
            <p className="text-foreground-muted text-sm leading-relaxed">
              Afenda could not render this request. Try again, or reload the
              page after a moment.
            </p>
            {error.digest ? (
              <p className="text-foreground-muted text-xs">
                Reference:{" "}
                <span className="text-foreground font-mono">
                  {error.digest}
                </span>
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
      </body>
    </html>
  );
}
