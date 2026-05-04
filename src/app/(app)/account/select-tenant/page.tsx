import Link from "next/link";
import { redirect } from "next/navigation";

import { requireSession } from "@/server/better-auth/auth.policy.server";
import { listUserTenantMemberships } from "@/server/tenant/tenant.context.server";

export default async function AccountSelectTenantPage() {
  const session = await requireSession("/account/select-tenant");
  const memberships = await listUserTenantMemberships(session.user.id);

  if (memberships.length === 0) {
    redirect("/auth/post-login");
  }

  if (memberships.length === 1) {
    redirect(`/t/${memberships[0]?.tenant.slug}`);
  }

  return (
    <main className="bg-background text-foreground min-h-screen">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-16">
        <div className="space-y-2">
          <p className="type-kicker text-accent-strong">Afenda ERP</p>
          <h1 className="type-page-title">Select tenant</h1>
          <p className="type-body text-foreground-muted max-w-2xl">
            Choose the tenant workspace you want to enter. ERP access now routes
            through tenant membership instead of personal mode.
          </p>
        </div>

        <section className="border-border bg-surface space-y-3 rounded-(--radius-panel) border p-6">
          {memberships.map((membership) => (
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
          ))}
        </section>

        <Link className="type-body-sm text-accent-strong hover:underline" href="/account/workspace">
          Manage tenants
        </Link>
      </div>
    </main>
  );
}
