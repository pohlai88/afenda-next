import Link from "next/link";

import { AccountAreaNav } from "@/app/(app)/account/_components/account-area-nav";
import { listRecentAuthEvents } from "@/server/better-auth/auth.audit.server";
import { requireSession } from "@/server/better-auth/auth.policy.server";
import { listUserTenantMemberships } from "@/server/tenant/tenant.context.server";

import { createTenantAction } from "./workspace.actions.server";

export default async function AccountWorkspacePage() {
  const session = await requireSession("/account/workspace");
  const [memberships, recentEvents] = await Promise.all([
    listUserTenantMemberships(session.user.id),
    listRecentAuthEvents(session.user.id),
  ]);

  return (
    <main className="bg-background text-foreground min-h-screen">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-16">
        <div className="space-y-3">
          <p className="type-kicker text-accent-strong">Afenda ERP</p>
          <h1 className="type-page-title">Workspace</h1>
          <p className="type-body text-foreground-muted max-w-3xl">
            Every signed-in workflow now runs inside an Afenda tenant. Create
            additional tenants here and review your current memberships.
          </p>
        </div>

        <AccountAreaNav current="workspace" />

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)]">
          <section className="border-border bg-surface space-y-4 rounded-(--radius-panel) border p-6">
            <div className="space-y-1">
              <h2 className="type-panel-title">Tenant memberships</h2>
              <p className="type-body-sm text-foreground-muted">
                Use these entries to enter or switch tenant workspaces.
              </p>
            </div>

            <div className="space-y-3">
              {memberships.length > 0 ? (
                memberships.map((membership) => (
                  <Link
                    className="border-border bg-surface-raised hover:bg-field flex flex-col gap-1 rounded-(--radius-control) border p-4 transition"
                    href={`/t/${membership.tenant.slug}`}
                    key={membership.membershipId}
                  >
                    <span className="type-label text-foreground">{membership.tenant.name}</span>
                    <span className="type-meta text-foreground-muted">/{membership.tenant.slug}</span>
                    <span className="type-meta text-foreground-muted">
                      Roles: {membership.roleSlugs.join(", ")}
                    </span>
                  </Link>
                ))
              ) : (
                <p className="type-body-sm text-foreground-muted">
                  No tenant memberships resolved yet. Use the form to create a
                  tenant or retry bootstrap.
                </p>
              )}
            </div>
          </section>

          <section className="border-border bg-surface space-y-4 rounded-(--radius-panel) border p-6">
            <div className="space-y-1">
              <h2 className="type-panel-title">Create tenant</h2>
              <p className="type-body-sm text-foreground-muted">
                Add another tenant workspace without changing platform-level
                operator or admin auth.
              </p>
            </div>
            <form action={createTenantAction} className="space-y-4">
              <Field label="Tenant name" name="name" />
              <Field
                description="Optional. Lowercase letters, numbers, and hyphens only."
                label="Slug"
                name="slug"
              />
              <button type="submit">Create tenant</button>
            </form>
          </section>
        </div>

        <section className="border-border bg-surface rounded-(--radius-panel) border p-6">
          <div className="space-y-1">
            <h2 className="type-panel-title">Recent tenant auth activity</h2>
            <p className="type-body-sm text-foreground-muted">
              Bootstrap and tenant creation events stay visible here for
              traceability.
            </p>
          </div>
          <ul className="mt-4 space-y-3">
            {recentEvents.length > 0 ? (
              recentEvents.map((event) => (
                <li
                  className="border-border bg-surface-raised rounded-(--radius-control) border p-4"
                  key={event.id}
                >
                  <p className="type-label text-foreground">{formatEventLabel(event.eventType)}</p>
                  <p className="type-meta text-foreground-muted">{formatDateTime(event.createdAt)}</p>
                </li>
              ))
            ) : (
              <li className="type-body-sm text-foreground-muted">
                No tenant auth activity recorded yet.
              </li>
            )}
          </ul>
        </section>

        <div className="flex flex-wrap gap-3">
          <Link className="type-body-sm text-accent-strong hover:underline" href="/account/select-tenant">
            Switch tenant
          </Link>
          <Link className="type-body-sm text-accent-strong hover:underline" href="/auth/post-login">
            Retry post-login resolver
          </Link>
        </div>
      </div>
    </main>
  );
}

function Field({
  description,
  label,
  name,
  type = "text",
}: {
  description?: string | undefined;
  label: string;
  name: string;
  type?: string | undefined;
}) {
  return (
    <label className="flex min-w-0 flex-col gap-2" htmlFor={name}>
      <span className="type-label">{label}</span>
      {description ? (
        <span className="type-meta text-foreground-muted">{description}</span>
      ) : null}
      <input
        className="border-border bg-field rounded-(--radius-control) border px-3 py-2"
        id={name}
        name={name}
        type={type}
      />
    </label>
  );
}

function formatDateTime(value: Date | null) {
  if (!value) return "Unknown";

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(value);
}

function formatEventLabel(eventType: string) {
  return eventType
    .split("_")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}
