"use server";

/**
 * @afenda-owner auth
 * @afenda-subject admin-users
 * @afenda-artifact actions
 * @afenda-boundary server
 * @afenda-description Server actions for Better Auth admin user management
 */
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";

import { sendOperatorInviteEmail } from "@/server/auth-mail/auth.mail.adapter.server";
import {
  buildOperatorInviteUrl,
  createOrRefreshOperatorInvite,
  normalizeOperatorInviteEmail,
} from "@/server/better-auth/auth.operator-invite.server";
import { getAuth } from "@/server/better-auth/auth.config.adapter.server";
import { requireFreshAdminSession } from "@/server/better-auth/auth.policy.server";
import { setStoredUserRole } from "@/server/better-auth/auth.role.server";
import { getDb } from "@/server/db/db.postgres.adapter.server";

const adminUsersPath = "/iam/admin/users";
const userIdSchema = z.string().trim().min(1).max(255);
const sessionTokenSchema = z.string().trim().min(1).max(512);
const roleSchema = z.enum(["admin", "operator", "user"]);
const inviteRoleSchema = z.enum(["admin", "operator"]);
const emailSchema = z
  .string()
  .trim()
  .email()
  .max(320)
  .transform((value) => value.toLowerCase());
const banReasonSchema = z.string().trim().min(1).max(500).optional();

export async function setUserRoleAction(formData: FormData) {
  const userId = userIdSchema.parse(formData.get("userId"));
  const role = roleSchema.parse(formData.get("role"));

  await requireFreshAdminSession(adminUsersPath);
  await setStoredUserRole(userId, role);

  revalidatePath(adminUsersPath);
}

export async function banUserAction(formData: FormData) {
  const userId = userIdSchema.parse(formData.get("userId"));
  const banReason = parseOptionalTrimmedString(formData.get("banReason"));
  const validatedBanReason = banReasonSchema.parse(banReason);

  await requireFreshAdminSession(adminUsersPath);
  await getAuth().api.banUser({
    body: {
      userId,
      ...(validatedBanReason ? { banReason: validatedBanReason } : {}),
    },
    headers: await headers(),
  });

  revalidatePath(adminUsersPath);
}

export async function unbanUserAction(formData: FormData) {
  const userId = userIdSchema.parse(formData.get("userId"));

  await requireFreshAdminSession(adminUsersPath);
  await getAuth().api.unbanUser({
    body: { userId },
    headers: await headers(),
  });

  revalidatePath(adminUsersPath);
}

export async function revokeUserSessionAction(formData: FormData) {
  const sessionToken = sessionTokenSchema.parse(formData.get("sessionToken"));

  await requireFreshAdminSession(adminUsersPath);
  await getAuth().api.revokeUserSession({
    body: { sessionToken },
    headers: await headers(),
  });

  revalidatePath(adminUsersPath);
}

export async function revokeUserSessionsAction(formData: FormData) {
  const userId = userIdSchema.parse(formData.get("userId"));

  await requireFreshAdminSession(adminUsersPath);
  await getAuth().api.revokeUserSessions({
    body: { userId },
    headers: await headers(),
  });

  revalidatePath(adminUsersPath);
}

export async function createOperatorInviteAction(formData: FormData) {
  const session = await requireFreshAdminSession(adminUsersPath);
  const email = normalizeOperatorInviteEmail(
    emailSchema.parse(formData.get("email")),
  );
  const role = inviteRoleSchema.parse(formData.get("role"));

  await assertNoExistingUser(email);

  const invite = await createOrRefreshOperatorInvite({
    email,
    invitedById: session.user.id,
    role,
  });

  await sendOperatorInviteEmail({
    acceptUrl: buildOperatorInviteUrl(invite.token),
    email,
    invitedByName: session.user.name ?? session.user.email ?? "Afenda admin",
    role,
  });

  revalidatePath(adminUsersPath);
}

export async function resendOperatorInviteAction(formData: FormData) {
  const session = await requireFreshAdminSession(adminUsersPath);
  const email = normalizeOperatorInviteEmail(
    emailSchema.parse(formData.get("email")),
  );
  const role = inviteRoleSchema.parse(formData.get("role"));

  await assertNoExistingUser(email);

  const invite = await createOrRefreshOperatorInvite({
    email,
    invitedById: session.user.id,
    role,
  });

  await sendOperatorInviteEmail({
    acceptUrl: buildOperatorInviteUrl(invite.token),
    email,
    invitedByName: session.user.name ?? session.user.email ?? "Afenda admin",
    role,
  });

  revalidatePath(adminUsersPath);
}

async function assertNoExistingUser(email: string) {
  const existingUser = await getDb().query.user.findFirst({
    columns: { id: true },
    where: (fields, { eq }) => eq(fields.email, email),
  });

  if (existingUser) {
    throw new Error(
      `Operator account already exists for ${email}. Use sign-in and verification instead.`,
    );
  }
}

function parseOptionalTrimmedString(value: FormDataEntryValue | null) {
  if (typeof value !== "string") return undefined;

  const normalized = value.trim();
  return normalized.length > 0 ? normalized : undefined;
}
