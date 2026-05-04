"use server";

/**
 * @afenda-owner auth
 * @afenda-subject security
 * @afenda-artifact actions
 * @afenda-boundary server
 * @afenda-description Server actions for security-center session, password, passkey, and delete mutations
 */
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

import { recordAuthEvent } from "@/server/better-auth/auth.audit.server";
import { getAuth } from "@/server/better-auth/auth.config.adapter.server";
import { requireFreshVerifiedEmailSession } from "@/server/better-auth/auth.policy.server";

const securityPath = "/account/security";
const sessionTokenSchema = z.string().trim().min(1).max(512);
const passkeyIdSchema = z.string().trim().min(1).max(512);
const passwordChangeSchema = z.object({
  currentPassword: z.string().trim().min(1).max(256),
  newPassword: z.string().trim().min(8).max(128),
  revokeOtherSessions: z.literal("1").optional(),
});
const setPasswordSchema = z.object({
  newPassword: z.string().trim().min(8).max(128),
});
const deleteAccountSchema = z.object({
  password: z.string().trim().max(256).optional(),
});

export async function revokeSessionAction(token: string) {
  const validatedToken = sessionTokenSchema.parse(token);
  await requireFreshVerifiedEmailSession(securityPath);

  await getAuth().api.revokeSession({
    body: { token: validatedToken },
    headers: await headers(),
  });

  revalidatePath(securityPath);
}

export async function revokeOtherSessionsAction() {
  await requireFreshVerifiedEmailSession(securityPath);

  await getAuth().api.revokeOtherSessions({
    headers: await headers(),
  });

  revalidatePath(securityPath);
}

export async function deletePasskeyAction(id: string) {
  const validatedId = passkeyIdSchema.parse(id);
  await requireFreshVerifiedEmailSession(securityPath);

  await getAuth().api.deletePasskey({
    body: { id: validatedId },
    headers: await headers(),
  });

  revalidatePath(securityPath);
}

export async function changePasswordAction(formData: FormData) {
  const session = await requireFreshVerifiedEmailSession(securityPath);
  const body = passwordChangeSchema.parse({
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
    revokeOtherSessions: formData.get("revokeOtherSessions"),
  });

  await (getAuth().api as any).changePassword({
    body: {
      currentPassword: body.currentPassword,
      newPassword: body.newPassword,
      revokeOtherSessions: body.revokeOtherSessions === "1",
    },
    headers: await headers(),
  });

  await recordAuthEvent({
    actorEmail: session.user.email,
    actorUserId: session.user.id,
    eventType: "password_changed",
    metadata: {
      revokeOtherSessions: body.revokeOtherSessions === "1",
    },
  });

  revalidatePath(securityPath);
  redirect(`${securityPath}?password=changed`);
}

export async function setPasswordAction(formData: FormData) {
  const session = await requireFreshVerifiedEmailSession(securityPath);
  const body = setPasswordSchema.parse({
    newPassword: formData.get("newPassword"),
  });

  await (getAuth().api as any).setPassword({
    body: {
      newPassword: body.newPassword,
    },
    headers: await headers(),
  });

  await recordAuthEvent({
    actorEmail: session.user.email,
    actorUserId: session.user.id,
    eventType: "password_set",
  });

  revalidatePath(securityPath);
  redirect(`${securityPath}?password=set`);
}

export async function deleteAccountAction(formData: FormData) {
  await requireFreshVerifiedEmailSession(securityPath);
  const body = deleteAccountSchema.parse({
    password: optionalString(formData.get("password")),
  });

  const result = await (getAuth().api as any).deleteUser({
    body: {
      callbackURL: "/account/deleted",
      ...(body.password ? { password: body.password } : {}),
    },
    headers: await headers(),
  });

  if (result?.message === "Verification email sent") {
    redirect(`${securityPath}?delete=check-email`);
  }

  redirect("/account/deleted");
}

function optionalString(value: FormDataEntryValue | null) {
  if (typeof value !== "string") return undefined;

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}
