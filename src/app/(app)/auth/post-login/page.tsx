import { redirect } from "next/navigation";

import { recordAuthEvent } from "@/server/better-auth/auth.audit.server";
import { requireSession } from "@/server/better-auth/auth.policy.server";
import { getPostLoginHref } from "@/server/better-auth/auth.redirect.shared";
import { createTenantForUser } from "@/server/tenant/tenant.bootstrap.server";
import { listUserTenantMemberships } from "@/server/tenant/tenant.context.server";

export default async function AuthPostLoginPage() {
  const session = await requireSession(getPostLoginHref());
  const memberships = await listUserTenantMemberships(session.user.id);

  if (memberships.length === 0) {
    try {
      const created = await createTenantForUser({
        userEmail: session.user.email,
        userId: session.user.id,
        userName: session.user.name,
      });

      await recordAuthEvent({
        actorEmail: session.user.email,
        actorUserId: session.user.id,
        eventType: "tenant_bootstrapped",
        metadata: {
          tenantId: created.tenant.id,
          tenantSlug: created.tenant.slug,
        },
      });

      redirect(`/t/${created.tenant.slug}` as `/t/${string}`);
    } catch {
      redirect("/account/no-tenants");
    }
  }

  if (memberships.length === 1) {
    redirect(`/t/${memberships[0]?.tenant.slug}`);
  }

  redirect("/account/select-tenant");
}
