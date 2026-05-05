"use server";

import type { Route } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

import {
  getActiveOperatorInviteByToken,
  getVerificationCallbackUrl,
  markOperatorInviteAccepted,
} from "@/server/better-auth/auth.operator-invite.server";
import { getAuth } from "@/server/better-auth/auth.config.adapter.server";
import { setStoredUserRole } from "@/server/better-auth/auth.role.server";
import { getDb } from "@/server/db/db.postgres.adapter.server";

const acceptInviteInputSchema = z.object({
  name: z.string().trim().min(1).max(120),
  password: z.string().min(8).max(256),
  token: z.string().trim().min(1).max(512),
});

export async function acceptOperatorInviteAction(formData: FormData) {
  const { name, password, token } = acceptInviteInputSchema.parse({
    name: formData.get("name"),
    password: formData.get("password"),
    token: formData.get("token"),
  });
  const invite = await getActiveOperatorInviteByToken(token);

  if (!invite) {
    redirect(buildAcceptInviteHref(token, "invalid-invite") as Route);
  }

  const existingUser = await getDb().query.user.findFirst({
    columns: { id: true },
    where: (fields, operators) => operators.eq(fields.email, invite.email),
  });

  if (existingUser) {
    redirect(buildSignInHref(invite.email, "existing-account") as Route);
  }

  try {
    await getAuth().api.signUpEmail({
      body: {
        callbackURL: getVerificationCallbackUrl(),
        email: invite.email,
        inviteToken: token,
        name,
        password,
      } as never,
      headers: await headers(),
    });
  } catch {
    redirect(buildAcceptInviteHref(token, "signup-failed") as Route);
  }

  if (invite.role === "admin" || invite.role === "operator") {
    const createdUser = await getDb().query.user.findFirst({
      columns: { id: true },
      where: (fields, operators) => operators.eq(fields.email, invite.email),
    });

    if (createdUser) {
      await setStoredUserRole(createdUser.id, invite.role);
    }
  }

  await markOperatorInviteAccepted(invite.id);

  redirect(buildSignInHref(invite.email, "check-email") as Route);
}

function buildAcceptInviteHref(token: string, error: string) {
  const params = new URLSearchParams({
    error,
    token,
  });

  return `/accept-invite?${params.toString()}`;
}

function buildSignInHref(email: string, onboarding: string) {
  const params = new URLSearchParams({
    email,
    onboarding,
  });

  return `/sign-in?${params.toString()}`;
}
