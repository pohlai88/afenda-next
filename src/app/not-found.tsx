import Link from "next/link";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not found",
  description: "The requested Afenda URL does not exist.",
  robots: { index: false, follow: false },
};

/**
 * Shown for `notFound()` and for unmatched URLs at the root (when no deeper
 * `not-found` applies). Keep copy factual for operators.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/not-found
 */
export default function RootNotFound() {
  return (
    <main className="bg-background text-foreground flex min-h-[50vh] flex-col items-center justify-center gap-6 px-6 py-16">
      <div className="max-w-md space-y-2 text-center">
        <p className="type-kicker text-foreground-muted">404</p>
        <h1 className="type-page-title">Page not found</h1>
        <p className="type-body text-foreground-muted">
          That path is not part of this Afenda deployment. Check the URL or
          return to the home surface.
        </p>
      </div>
      <Link
        className="border-border bg-surface-raised hover:bg-surface rounded-panel border px-4 py-2 text-sm font-medium transition"
        href="/"
      >
        Back to home
      </Link>
    </main>
  );
}
