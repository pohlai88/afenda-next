import "server-only";

export const DEFAULT_TENANT_ROLE_SLUGS = ["member", "manager", "admin"] as const;

export type TenantRoleSlug = (typeof DEFAULT_TENANT_ROLE_SLUGS)[number];

export const DEFAULT_TENANT_PERMISSION_KEYS = [
  "tenant:view",
  "tenant:manage",
  "workspace_note:create",
  "workspace_note:read",
  "workspace_note:update",
  "workspace_note:delete",
] as const;

export const DEFAULT_ROLE_PERMISSION_MAP: Record<TenantRoleSlug, readonly string[]> = {
  member: ["tenant:view", "workspace_note:create", "workspace_note:read"],
  manager: [
    "tenant:view",
    "workspace_note:create",
    "workspace_note:read",
    "workspace_note:update",
  ],
  admin: [
    "tenant:view",
    "tenant:manage",
    "workspace_note:create",
    "workspace_note:read",
    "workspace_note:update",
    "workspace_note:delete",
  ],
};
