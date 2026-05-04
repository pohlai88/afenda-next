/**
 * App Router error boundary (`error.tsx`) for `/interface-studio/*` · Client Component (`"use client"`)
 */

"use client";

export default function InterfaceStudioError({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  return (
    <main className="min-h-screen bg-background px-6 py-16 text-foreground">
      <div className="mx-auto flex max-w-lg flex-col gap-6">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-foreground-muted">
          Interface Studio
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">Something went wrong</h1>
        <p className="text-sm leading-6 text-foreground-muted">
          {error.message.length > 0 ? error.message : "An unexpected error occurred while loading this preview."}
        </p>
        <button
          type="button"
          onClick={() => {
            reset();
          }}
          className="inline-flex w-fit rounded-(--radius-control) border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition hover:bg-surface-muted"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
