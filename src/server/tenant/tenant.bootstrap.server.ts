import "server-only";

import { and, eq, isNull } from "drizzle-orm";

import {
  permission,
  role,
  rolePermission,
  tenant,
  tenantMembership,
  tenantMembershipRole,
  workspaceNotes,
} from "@/server/db/db.database.schema.shared";
import { getDb } from "@/server/db/db.postgres.adapter.server";

import {
  DEFAULT_ROLE_PERMISSION_MAP,
  DEFAULT_TENANT_PERMISSION_KEYS,
  DEFAULT_TENANT_ROLE_SLUGS,
} from "./tenant.permissions.shared";

export async function createTenantForUser(input: {
  name?: string | undefined;
  slug?: string | undefined;
  userEmail: string;
  userId: string;
  userName?: string | null | undefined;
}) {
  const db = getDb();

  return db.transaction(async (tx) => {
    const tenantName = resolveTenantName(input);
    const requestedSlug = slugifyTenantSlug(
      input.slug ?? input.userName ?? input.userEmail.split("@")[0] ?? "workspace",
    );
    const tenantSlug = await getUniqueTenantSlug(tx, requestedSlug);

    const createdTenantRows = await tx
      .insert(tenant)
      .values({
        name: tenantName,
        slug: tenantSlug,
      })
      .returning({
        id: tenant.id,
        name: tenant.name,
        slug: tenant.slug,
        status: tenant.status,
      });
    const createdTenant = createdTenantRows[0];
    if (!createdTenant) {
      throw new Error("Failed to create tenant");
    }

    const createdPermissions = await tx
      .insert(permission)
      .values(
        DEFAULT_TENANT_PERMISSION_KEYS.map((key) => ({
          category: key.split(":")[0] ?? "tenant",
          key,
          name: humanizePermissionKey(key),
          tenantId: createdTenant.id,
        })),
      )
      .returning({
        id: permission.id,
        key: permission.key,
      });

    const permissionIdByKey = new Map(createdPermissions.map((entry) => [entry.key, entry.id]));

    const createdRoles = await tx
      .insert(role)
      .values(
        DEFAULT_TENANT_ROLE_SLUGS.map((slug) => ({
          description: `${humanizeRoleSlug(slug)} workspace role`,
          isSystem: true,
          name: humanizeRoleSlug(slug),
          slug,
          tenantId: createdTenant.id,
        })),
      )
      .returning({
        id: role.id,
        slug: role.slug,
      });

    const roleIdBySlug = new Map(createdRoles.map((entry) => [entry.slug, entry.id]));

    const rolePermissionRows = Object.entries(DEFAULT_ROLE_PERMISSION_MAP).flatMap(([roleSlug, permissionKeys]) => {
      const roleId = roleIdBySlug.get(roleSlug);
      if (!roleId) return [];

      return permissionKeys
        .map((permissionKey) => {
          const permissionId = permissionIdByKey.get(permissionKey);
          if (!permissionId) return null;
          return { permissionId, roleId };
        })
        .filter((value): value is { permissionId: string; roleId: string } => value !== null);
    });

    if (rolePermissionRows.length > 0) {
      await tx.insert(rolePermission).values(rolePermissionRows);
    }

    const adminRoleId = roleIdBySlug.get("admin");
    if (!adminRoleId) {
      throw new Error("Failed to seed tenant admin role");
    }

    const membershipRows = await tx
      .insert(tenantMembership)
      .values({
        primaryRoleId: adminRoleId,
        tenantId: createdTenant.id,
        userId: input.userId,
      })
      .returning({
        id: tenantMembership.id,
      });
    const membership = membershipRows[0];
    if (!membership) {
      throw new Error("Failed to create tenant membership");
    }

    await tx.insert(tenantMembershipRole).values({
      membershipId: membership.id,
      roleId: adminRoleId,
    });

    await tx
      .update(workspaceNotes)
      .set({ tenantId: createdTenant.id })
      .where(and(eq(workspaceNotes.createdById, input.userId), isNull(workspaceNotes.tenantId)));

    return {
      membershipId: membership.id,
      tenant: createdTenant,
    };
  });
}

async function getUniqueTenantSlug(tx: ReturnType<typeof getDb>, baseSlug: string) {
  let attempt = 0;
  let candidate = baseSlug;

  while (true) {
    const existingTenant = await tx.query.tenant.findFirst({
      columns: { id: true },
      where: (fields, { eq }) => eq(fields.slug, candidate),
    });

    if (!existingTenant) return candidate;

    attempt += 1;
    candidate = `${baseSlug}-${attempt + 1}`;
  }
}

function resolveTenantName(input: {
  name?: string | undefined;
  userEmail: string;
  userName?: string | null | undefined;
}) {
  const explicitName = input.name?.trim();
  if (explicitName) return explicitName;

  const userName = input.userName?.trim();
  if (userName) return `${userName} Workspace`;

  const emailLocalPart = input.userEmail.split("@")[0] ?? "Personal";
  return `${emailLocalPart} Workspace`;
}

function slugifyTenantSlug(raw: string) {
  const normalized = raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");

  return normalized.length > 0 ? normalized.slice(0, 48) : "workspace";
}

function humanizePermissionKey(value: string) {
  return value
    .split(/[:_-]/g)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}

function humanizeRoleSlug(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
