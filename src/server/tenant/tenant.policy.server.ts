import "server-only";

import type { Route } from "next";
import { redirect } from "next/navigation";

import { requireSession } from "@/server/better-auth/auth.policy.server";

import { getActiveTenantContext } from "./tenant.context.server";

export async function requireTenantSession(
  tenantSlug: string,
  callbackUrl = `/t/${tenantSlug}`,
  fallbackPath = "/account/select-tenant",
) {
  const session = await requireSession(callbackUrl);
  const tenantContext = await getActiveTenantContext(session.user.id, tenantSlug);

  if (!tenantContext) {
    redirect(fallbackPath as Route);
  }

  return {
    ...tenantContext,
    session,
  };
}

export async function requireTenantPermission(
  tenantSlug: string,
  permissionKey: string,
  callbackUrl = `/t/${tenantSlug}`,
  fallbackPath = `/t/${tenantSlug}?error=unauthorized`,
) {
  const tenantSession = await requireTenantSession(tenantSlug, callbackUrl, fallbackPath);

  if (!tenantSession.permissionKeys.includes(permissionKey)) {
    redirect(fallbackPath as Route);
  }

  return tenantSession;
}
