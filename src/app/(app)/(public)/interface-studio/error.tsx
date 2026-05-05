/**
 * App Router error boundary (`error.tsx`) for `/interface-studio/*` · Client Component (`"use client"`)
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/error
 */

"use client";

import { useEffect } from "react";

export default function InterfaceStudioError({
  error,
  unstable_retry,
}: Readonly<{
  error: Error & { digest?: string };
  unstable_retry: () => void;
}>) {
  useEffect(() => {
    console.error("[interface-studio:error]", error);
  }, [error]);

  const safeMessage =
    error.message.length > 0
      ? error.message
      : "An unexpected error occurred while loading this preview.";

  return (
    <main className="bg-background text-foreground min-h-screen px-6 py-16">
      <div className="mx-auto flex max-w-lg flex-col gap-6">
        <p className="text-foreground-muted text-xs font-medium tracking-[0.24em] uppercase">
          Interface Studio
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">Something went wrong</h1>
        <p className="text-foreground-muted text-sm leading-6">{safeMessage}</p>
        {error.digest ? (
          <p className="text-foreground-muted type-caption">
            Reference: <span className="font-mono">{error.digest}</span>
          </p>
        ) : null}
        <button
          type="button"
          onClick={() => {
            unstable_retry();
          }}
          className="border-border bg-surface text-foreground hover:bg-surface-muted inline-flex w-fit rounded-(--radius-control) border px-4 py-2 text-sm font-medium transition"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
