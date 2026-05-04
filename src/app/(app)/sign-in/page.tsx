import { type Metadata } from "next";
import Link from "next/link";

import { SignInSurface } from "./_components/sign-in.route.surface.client";
import { getEnabledOAuthProviderIds } from "@/server/better-auth/auth.oauth.providers.server";
import { requireAnonymous } from "@/server/better-auth/auth.policy.server";
import {
  getPostLoginHref,
  safeInternalPath,
} from "@/server/better-auth/auth.redirect.shared";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to Afenda",
};

export default async function SignInPage({
  searchParams,
}: {
  searchParams?: Promise<{
    callbackUrl?: string;
    email?: string;
    onboarding?: string;
    reset?: string;
    verified?: string;
  }>;
}) {
  const sp = searchParams ? await searchParams : {};
  const callbackURL = safeInternalPath(sp.callbackUrl, getPostLoginHref());
  await requireAnonymous(getPostLoginHref());

  const oauthProviders = getEnabledOAuthProviderIds();
  const initialEmail = typeof sp.email === "string" ? sp.email.trim() : "";
  const notice =
    sp.verified === "1"
      ? "Email verified. Sign in to continue."
      : sp.reset === "1"
        ? "Password reset complete. Sign in with the new password."
        : sp.onboarding === "check-email"
          ? "Check your email for the activation link. Verified-email features unlock after confirmation."
          : sp.onboarding === "existing-account"
            ? "This invited email already belongs to an operator account. Sign in instead."
            : null;

  return (
    <main className="bg-background text-foreground min-h-screen">
      <div className="mx-auto flex w-full max-w-md flex-col gap-8 px-6 py-16">
        <div className="space-y-2">
          <p className="type-kicker text-accent-strong">Afenda ERP</p>
          <h1 className="type-page-title">Sign in</h1>
          <p className="type-body-sm text-foreground-muted">
            Every signed-in workflow now lands inside a tenant workspace. New
            users get a personal workspace automatically after auth completes.
          </p>
        </div>
        <div className="border-border bg-surface rounded-(--radius-panel) border p-6">
          <SignInSurface
            callbackURL={callbackURL}
            initialEmail={initialEmail}
            notice={notice}
            oauthProviders={oauthProviders}
          />
        </div>
        <Link
          className="type-body-sm text-accent-strong hover:underline"
          href="/"
        >
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
