"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { recordAuthEvent } from "@/server/better-auth/auth.audit.server";
import { requireSession } from "@/server/better-auth/auth.policy.server";
import { createTenantForUser } from "@/server/tenant/tenant.bootstrap.server";

const workspacePath = "/iam/account/workspace";

const createTenantSchema = z
  .object({
    name: z.string().trim().min(2).max(80),
    slug: z.string().trim().toLowerCase().regex(/^[a-z0-9-]*$/).max(48),
  })
  .transform((value) => ({
    name: value.name,
    slug: value.slug.length > 0 ? value.slug : undefined,
  }));

export async function createTenantAction(formData: FormData) {
  const session = await requireSession(workspacePath);
  const body = createTenantSchema.parse({
    name: formData.get("name"),
    slug: formData.get("slug"),
  });

  const created = await createTenantForUser({
    name: body.name,
    slug: body.slug,
    userEmail: session.user.email,
    userId: session.user.id,
    userName: session.user.name,
  });

  await recordAuthEvent({
    actorEmail: session.user.email,
    actorUserId: session.user.id,
    eventType: "tenant_created",
    metadata: {
      tenantId: created.tenant.id,
      tenantSlug: created.tenant.slug,
    },
  });

  redirect(`/iam/t/${created.tenant.slug}` as `/iam/t/${string}`);
}
