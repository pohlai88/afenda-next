/**
 * Explicit `not-found` surface for unmatched Interface Studio templates after `notFound()` calls
 */

import Link from "next/link";

import { buildInterfaceStudioSectionIndexHref } from "@/app/(app)/(public)/interface-studio/interface-studio.routes.shared";

export default function InterfaceStudioNotFound() {
  return (
    <main className="min-h-screen bg-background px-6 py-16 text-foreground">
      <div className="mx-auto flex max-w-lg flex-col gap-6 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-foreground-muted">
          Interface Studio
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">Template not found</h1>
        <p className="text-sm leading-6 text-foreground-muted">
          This slug is not in the studio template registry. Return to the library and open a registered template.
        </p>
        <Link
          href={buildInterfaceStudioSectionIndexHref("studio", "landing")}
          className="text-sm font-medium text-foreground underline-offset-4 hover:underline"
        >
          Back to Interface Studio
        </Link>
      </div>
    </main>
  );
}
