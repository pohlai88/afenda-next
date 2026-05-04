import "server-only";

import { cache } from "react";

import { getDb } from "@/server/db/db.postgres.adapter.server";

export async function listUserTenantMemberships(userId: string) {
  const memberships = await getDb().query.tenantMembership.findMany({
    columns: {
      id: true,
      primaryRoleId: true,
      tenantId: true,
      userId: true,
    },
    where: (fields, { eq }) => eq(fields.userId, userId),
    with: {
      membershipRoles: {
        columns: {
          membershipId: true,
          roleId: true,
        },
        with: {
          role: {
            columns: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      },
      primaryRole: {
        columns: {
          id: true,
          name: true,
          slug: true,
        },
      },
      tenant: {
        columns: {
          id: true,
          name: true,
          slug: true,
          status: true,
        },
      },
    },
  });

  return memberships
    .filter((membership) => membership.tenant.status === "active")
    .map((membership) => ({
      membershipId: membership.id,
      roleSlugs: Array.from(
        new Set(
          [
            membership.primaryRole?.slug,
            ...membership.membershipRoles.map((entry) => entry.role?.slug ?? null),
          ].filter((value): value is string => typeof value === "string"),
        ),
      ).sort(),
      tenant: membership.tenant,
    }))
    .sort((left, right) => left.tenant.name.localeCompare(right.tenant.name));
}

export const getActiveTenantContext = cache(async (userId: string, tenantSlug: string) => {
  const tenantRow = await getDb().query.tenant.findFirst({
    columns: {
      id: true,
      name: true,
      slug: true,
      status: true,
    },
    where: (fields, { eq }) => eq(fields.slug, tenantSlug),
  });

  if (!tenantRow || tenantRow.status !== "active") {
    return null;
  }

  const membership = await getDb().query.tenantMembership.findFirst({
    columns: {
      id: true,
      primaryRoleId: true,
      tenantId: true,
      userId: true,
    },
    where: (fields, { and, eq }) =>
      and(eq(fields.tenantId, tenantRow.id), eq(fields.userId, userId)),
    with: {
      membershipRoles: {
        columns: {
          membershipId: true,
          roleId: true,
        },
        with: {
          role: {
            columns: {
              id: true,
              name: true,
              slug: true,
            },
            with: {
              rolePermissions: {
                columns: {
                  permissionId: true,
                  roleId: true,
                },
                with: {
                  permission: {
                    columns: {
                      id: true,
                      key: true,
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
      primaryRole: {
        columns: {
          id: true,
          name: true,
          slug: true,
        },
        with: {
          rolePermissions: {
            columns: {
              permissionId: true,
              roleId: true,
            },
            with: {
              permission: {
                columns: {
                  id: true,
                  key: true,
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!membership) {
    return null;
  }

  const roles = [membership.primaryRole, ...membership.membershipRoles.map((entry) => entry.role)].filter(
    (value): value is NonNullable<typeof value> => value !== null && value !== undefined,
  );

  const roleSlugs = Array.from(new Set(roles.map((entry) => entry.slug))).sort();
  const permissionKeys = Array.from(
    new Set(
      roles.flatMap((entry) =>
        entry.rolePermissions
          .map((assignment) => assignment.permission?.key ?? null)
          .filter((value): value is string => typeof value === "string"),
      ),
    ),
  ).sort();

  return {
    membership,
    permissionKeys,
    roleSlugs,
    tenant: tenantRow,
  };
});
