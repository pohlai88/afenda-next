import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { WorkspaceNoteComposer } from "@/app/(app)/_components/afenda-home.workspace-note.composer.client";
import { getAuth } from "@/server/better-auth/auth.config.adapter.server";
import { requireTenantSession } from "@/server/tenant/tenant.policy.server";
import { api, HydrateClient } from "@/trpc/trpc.rsc.hydration.server";

export default async function TenantWorkspacePage({
  params,
}: {
  params: Promise<{ tenantSlug: string }>;
}) {
  const { tenantSlug } = await params;
  const tenantSession = await requireTenantSession(tenantSlug);
  const latestNote = await api.workspaceNote.getLatest({ tenantSlug });
  void api.workspaceNote.getLatest.prefetch({ tenantSlug });

  return (
    <HydrateClient>
      <main className="bg-background text-foreground min-h-screen">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-16">
          <div className="space-y-3">
            <p className="type-kicker text-accent-strong">Afenda ERP</p>
            <h1 className="type-page-title">{tenantSession.tenant.name}</h1>
            <p className="type-body text-foreground-muted max-w-3xl">
              Tenant-first ERP workspace. Access is derived from Afenda-owned
              membership, role, and permission rows.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]">
            <section className="border-border bg-surface space-y-4 rounded-(--radius-panel) border p-6">
              <div className="space-y-1">
                <h2 className="type-panel-title">Tenant boundary</h2>
                <p className="type-body-sm text-foreground-muted">
                  Route: /t/{tenantSession.tenant.slug}
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="border-border bg-surface-raised rounded-(--radius-control) border p-4">
                  <p className="type-meta text-foreground-muted">Roles</p>
                  <p className="type-label text-foreground">
                    {tenantSession.roleSlugs.join(", ")}
                  </p>
                </div>
                <div className="border-border bg-surface-raised rounded-(--radius-control) border p-4">
                  <p className="type-meta text-foreground-muted">Latest note</p>
                  <p className="type-label text-foreground">
                    {latestNote?.name ?? "No notes yet"}
                  </p>
                </div>
              </div>
            </section>

            <section className="border-border bg-surface space-y-4 rounded-(--radius-panel) border p-6">
              <h2 className="type-panel-title">Workspace note</h2>
              <WorkspaceNoteComposer tenantSlug={tenantSlug} />
            </section>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              className="type-label border-border-strong bg-field text-foreground hover:bg-field-hover inline-flex rounded-2xl border px-6 py-3 font-semibold transition"
              href="/account/select-tenant"
            >
              Switch tenant
            </Link>
            <Link
              className="type-label border-border-strong bg-field text-foreground hover:bg-field-hover inline-flex rounded-2xl border px-6 py-3 font-semibold transition"
              href="/account/workspace"
            >
              Workspace settings
            </Link>
            <Link
              className="type-label border-border-strong bg-field text-foreground hover:bg-field-hover inline-flex rounded-2xl border px-6 py-3 font-semibold transition"
              href="/account/security"
            >
              Account security
            </Link>
            <form>
              <button
                className="type-label border-border-strong bg-field text-foreground hover:bg-field-hover rounded-2xl border px-6 py-3 font-semibold transition"
                formAction={async () => {
                  "use server";
                  await getAuth().api.signOut({
                    headers: await headers(),
                  });
                  redirect("/");
                }}
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
