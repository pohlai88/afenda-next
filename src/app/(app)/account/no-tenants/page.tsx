import Link from "next/link";

import { requireSession } from "@/server/better-auth/auth.policy.server";

export default async function AccountNoTenantsPage() {
  await requireSession("/account/no-tenants");

  return (
    <main className="bg-background text-foreground min-h-screen">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-16">
        <div className="space-y-2">
          <p className="type-kicker text-accent-strong">Afenda ERP</p>
          <h1 className="type-page-title">No tenant available</h1>
          <p className="type-body text-foreground-muted max-w-2xl">
            Afenda could not resolve a tenant membership for this session. Retry
            bootstrap or inspect the workspace account surface.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            className="type-label bg-accent text-accent-foreground hover:bg-accent-strong inline-flex rounded-2xl px-6 py-3 font-semibold transition"
            href="/auth/post-login"
          >
            Retry bootstrap
          </Link>
          <Link
            className="type-label border-border-strong bg-field text-foreground hover:bg-field-hover inline-flex rounded-2xl border px-6 py-3 font-semibold transition"
            href="/account/workspace"
          >
            Workspace settings
          </Link>
        </div>
      </div>
    </main>
  );
}
