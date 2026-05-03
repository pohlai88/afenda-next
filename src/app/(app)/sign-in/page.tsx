import { type Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { SignInSurface } from "./_components/sign-in.surface.client";
import { safeInternalPath } from "@/lib/url.safe-internal-path.shared";
import { getSession } from "@/server/better-auth/auth.session.query.server";
import { getEnabledOAuthProviderIds } from "@/server/better-auth/auth.oauth-providers.server";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to Afenda",
};

export default async function SignInPage({
  searchParams,
}: {
  searchParams?: Promise<{ callbackUrl?: string }>;
}) {
  const session = await getSession();
  if (session) redirect("/");

  const sp = searchParams ? await searchParams : {};
  const callbackURL = safeInternalPath(sp.callbackUrl, "/");

  const oauthProviders = getEnabledOAuthProviderIds();

  return (
    <main className="bg-background text-foreground min-h-screen">
      <div className="mx-auto flex w-full max-w-md flex-col gap-8 px-6 py-16">
        <div className="space-y-2">
          <p className="type-kicker text-accent-strong">Afenda ERP</p>
          <h1 className="type-page-title">Sign in</h1>
          <p className="type-body-sm text-foreground-muted">
            Email and password or the OAuth providers configured in your
            environment.
          </p>
        </div>
        <div className="border-border bg-surface rounded-(--radius-panel) border p-6">
          <SignInSurface
            callbackURL={callbackURL}
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
