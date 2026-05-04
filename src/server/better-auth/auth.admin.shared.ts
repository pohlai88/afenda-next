/**
 * @afenda-owner auth
 * @afenda-subject admin
 * @afenda-artifact shared
 * @afenda-boundary shared
 * @afenda-description Shared admin-role helpers for Better Auth authorization
 */

type AdminIdentity = {
  emailVerified?: boolean | null | undefined;
  id: string;
  role?: string | null | undefined;
};

export function parseAdminUserIds(value: string | undefined) {
  return [...new Set(splitCsv(value))];
}

export function getUserRoles(role: string | null | undefined) {
  const roles = splitCsv(role);
  return roles.length > 0 ? roles : ["user"];
}

export function hasAdminAccess(
  user: AdminIdentity | null | undefined,
  adminUserIds: readonly string[] = [],
) {
  if (!user) return false;

  return (
    adminUserIds.includes(user.id) || getUserRoles(user.role).includes("admin")
  );
}

export function hasVerifiedEmailAccess(
  user: AdminIdentity | null | undefined,
  adminUserIds: readonly string[] = [],
) {
  if (!user) return false;
  if (adminUserIds.includes(user.id)) return true;

  return user.emailVerified === true;
}

export function hasVerifiedOperatorAccess(
  user: AdminIdentity | null | undefined,
  adminUserIds: readonly string[] = [],
) {
  if (!user) return false;
  if (adminUserIds.includes(user.id)) return true;

  const roles = getUserRoles(user.role);

  return (
    user.emailVerified === true &&
    (roles.includes("operator") || roles.includes("admin"))
  );
}

function splitCsv(value: string | null | undefined) {
  return (value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}
