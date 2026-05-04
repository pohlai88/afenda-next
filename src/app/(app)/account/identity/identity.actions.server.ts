"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

import { getEnabledOAuthProviderIds } from "@/server/better-auth/auth.oauth.providers.server";
import type { OAuthProviderId } from "@/server/better-auth/auth.oauth.provider.shared";
import { recordAuthEvent } from "@/server/better-auth/auth.audit.server";
import { getAuth } from "@/server/better-auth/auth.config.adapter.server";
import { requireFreshVerifiedEmailSession } from "@/server/better-auth/auth.policy.server";

const identityPath = "/account/identity";

const changeEmailSchema = z.object({
  newEmail: z.string().trim().email(),
});

const updateIdentitySchema = z.object({
  displayName: z.string().trim().min(2).max(80),
  displayUsername: z.string().trim().min(3).max(50).optional(),
  username: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9_.]+$/)
    .min(3)
    .max(30)
    .optional(),
});

const providerSchema = z.enum(["github", "google", "linkedin"]);
const unlinkSchema = z.object({
  accountId: z.string().trim().optional(),
  providerId: z.string().trim().min(1).max(64),
});

export async function requestEmailChangeAction(formData: FormData) {
  const session = await requireFreshVerifiedEmailSession(identityPath);
  const body = changeEmailSchema.parse({
    newEmail: formData.get("newEmail"),
  });

  await (getAuth().api as any).changeEmail({
    body: {
      callbackURL: `${identityPath}?emailChange=check-email`,
      newEmail: body.newEmail,
    },
    headers: await headers(),
  });

  await recordAuthEvent({
    actorEmail: session.user.email,
    actorUserId: session.user.id,
    eventType: "email_change_requested",
    metadata: { newEmail: body.newEmail },
  });

  redirect(`${identityPath}?emailChange=check-email`);
}

export async function updateIdentityAction(formData: FormData) {
  const session = await requireFreshVerifiedEmailSession(identityPath);
  const body = updateIdentitySchema.parse({
    displayName: formData.get("displayName"),
    displayUsername: optionalString(formData.get("displayUsername")),
    username: optionalString(formData.get("username")),
  });

  await (getAuth().api as any).updateUser({
    body: {
      displayUsername: body.displayUsername,
      name: body.displayName,
      username: body.username,
    },
    headers: await headers(),
  });

  await recordAuthEvent({
    actorEmail: session.user.email,
    actorUserId: session.user.id,
    eventType: "profile_updated",
    metadata: {
      displayUsername: body.displayUsername ?? null,
      username: body.username ?? null,
    },
  });

  revalidatePath(identityPath);
  redirect(`${identityPath}?updated=1`);
}

export async function beginSocialLinkAction(provider: OAuthProviderId) {
  const session = await requireFreshVerifiedEmailSession(identityPath);
  const validProvider = providerSchema.parse(provider);
  const enabledProviders = getEnabledOAuthProviderIds();

  if (!enabledProviders.includes(validProvider)) {
    redirect(`${identityPath}?linkError=provider-disabled`);
  }

  const response = await (getAuth().api as any).linkSocialAccount({
    body: {
      callbackURL: `${identityPath}?linked=${validProvider}`,
      disableRedirect: true,
      provider: validProvider,
    },
    headers: await headers(),
  });

  await recordAuthEvent({
    actorEmail: session.user.email,
    actorUserId: session.user.id,
    eventType: "linked_account_added",
    metadata: { providerId: validProvider, status: "requested" },
  });

  if (response?.url) {
    redirect(response.url as never);
  }

  redirect(`${identityPath}?linked=${validProvider}`);
}

export async function unlinkAccountAction(formData: FormData) {
  const session = await requireFreshVerifiedEmailSession(identityPath);
  const body = unlinkSchema.parse({
    accountId: optionalString(formData.get("accountId")),
    providerId: formData.get("providerId"),
  });

  await (getAuth().api as any).unlinkAccount({
    body,
    headers: await headers(),
  });

  await recordAuthEvent({
    actorEmail: session.user.email,
    actorUserId: session.user.id,
    eventType: "linked_account_removed",
    metadata: {
      accountId: body.accountId ?? null,
      providerId: body.providerId,
    },
  });

  revalidatePath(identityPath);
  redirect(`${identityPath}?unlinked=${body.providerId}`);
}

function optionalString(value: FormDataEntryValue | null) {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}
