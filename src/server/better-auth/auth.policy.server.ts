import "server-only";

/**
 * @afenda-owner auth
 * @afenda-subject policy
 * @afenda-artifact server
 * @afenda-boundary server
 * @afenda-description Server auth policy helpers for authenticated and anonymous route enforcement
 */
import { redirect } from "next/navigation";

import { env } from "@/env";
import {
  hasAdminAccess,
  hasVerifiedEmailAccess,
  hasVerifiedOperatorAccess,
  parseAdminUserIds,
} from "./auth.admin.shared";
import { getSignInHref, getStepUpHref } from "./auth.redirect.shared";
import { getSession } from "./auth.session.query.server";
import { hasFreshSessionAge } from "./auth.step-up.shared";

export async function requireSession(callbackUrl: string) {
  const session = await getSession();
  if (!session) {
    redirect(getSignInHref(callbackUrl) as never);
  }

  return session;
}

export async function requireAnonymous(fallbackPath = "/") {
  const session = await getSession();
  if (session) {
    redirect(fallbackPath as never);
  }
}

export async function isVerifiedEmailSession() {
  const session = await getSession();

  return hasVerifiedEmailAccess(
    session?.user,
    parseAdminUserIds(env.BETTER_AUTH_ADMIN_USER_IDS),
  );
}

export async function isFreshSession() {
  const session = await getSession();
  return hasSessionFreshness(session);
}

export async function requireVerifiedEmail(
  callbackUrl: string,
  fallbackPath = "/",
) {
  const session = await requireSession(callbackUrl);

  if (
    !hasVerifiedEmailAccess(
      session.user,
      parseAdminUserIds(env.BETTER_AUTH_ADMIN_USER_IDS),
    )
  ) {
    redirect(fallbackPath as never);
  }

  return session;
}

export async function requireFreshSession(
  callbackUrl: string,
  fallbackPath = "/",
) {
  const session = await requireSession(callbackUrl);

  if (!hasSessionFreshness(session)) {
    redirect(getStepUpHref(callbackUrl) as never);
  }

  return session;
}

export async function requireStepUpSession(
  callbackUrl: string,
  fallbackPath = "/",
) {
  return requireFreshSession(callbackUrl, fallbackPath);
}

export async function requireFreshVerifiedEmailSession(
  callbackUrl: string,
  fallbackPath = "/",
) {
  const session = await requireVerifiedEmail(callbackUrl, fallbackPath);

  if (!hasSessionFreshness(session)) {
    redirect(getStepUpHref(callbackUrl) as never);
  }

  return session;
}

export async function isVerifiedOperatorSession() {
  const session = await getSession();

  return hasVerifiedOperatorAccess(
    session?.user,
    parseAdminUserIds(env.BETTER_AUTH_ADMIN_USER_IDS),
  );
}

export async function requireVerifiedSession(
  callbackUrl: string,
  fallbackPath = "/",
) {
  return requireVerifiedOperatorSession(callbackUrl, fallbackPath);
}

export async function requireVerifiedOperatorSession(
  callbackUrl: string,
  fallbackPath = "/",
) {
  const session = await requireSession(callbackUrl);

  if (
    !hasVerifiedOperatorAccess(
      session.user,
      parseAdminUserIds(env.BETTER_AUTH_ADMIN_USER_IDS),
    )
  ) {
    redirect(fallbackPath as never);
  }

  return session;
}

export async function requireFreshVerifiedOperatorSession(
  callbackUrl: string,
  fallbackPath = "/",
) {
  const session = await requireVerifiedOperatorSession(
    callbackUrl,
    fallbackPath,
  );

  if (!hasSessionFreshness(session)) {
    redirect(getStepUpHref(callbackUrl) as never);
  }

  return session;
}

export async function isAdminSession() {
  const session = await getSession();

  return hasAdminAccess(
    session?.user,
    parseAdminUserIds(env.BETTER_AUTH_ADMIN_USER_IDS),
  );
}

export async function requireAdminSession(
  callbackUrl: string,
  fallbackPath = "/",
) {
  const session = await requireVerifiedOperatorSession(
    callbackUrl,
    fallbackPath,
  );

  if (
    !hasAdminAccess(
      session.user,
      parseAdminUserIds(env.BETTER_AUTH_ADMIN_USER_IDS),
    )
  ) {
    redirect(fallbackPath as never);
  }

  return session;
}

export async function requireFreshAdminSession(
  callbackUrl: string,
  fallbackPath = "/",
) {
  const session = await requireAdminSession(callbackUrl, fallbackPath);

  if (!hasSessionFreshness(session)) {
    redirect(getStepUpHref(callbackUrl) as never);
  }

  return session;
}

function hasSessionFreshness(
  session:
    | Awaited<ReturnType<typeof getSession>>
    | null,
) {
  return hasFreshSessionAge(session?.session.createdAt);
}
