import { type Metadata } from "next";
import Link from "next/link";
import { and, eq, isNotNull } from "drizzle-orm";
import { redirect } from "next/navigation";

import { StepUpSurface } from "./_components/step-up.route.surface.client";
import { getEnabledOAuthProviderIds } from "@/server/better-auth/auth.oauth.providers.server";
import { safeInternalPath } from "@/server/better-auth/auth.redirect.shared";
import { requireSession } from "@/server/better-auth/auth.policy.server";
import { hasFreshSessionAge } from "@/server/better-auth/auth.step-up.shared";
import { getDb } from "@/server/db/db.postgres.adapter.server";

export const metadata: Metadata = {
  title: "Step up",
  description: "Re-authenticate to continue with a sensitive action",
};

export default async function StepUpPage({
  searchParams,
}: {
    searchParams?: Promise<{ callbackUrl?: string }>;
}) {
  const sp = searchParams ? await searchParams : {};
  const callbackURL = safeInternalPath(sp.callbackUrl, "/");
  const session = await requireSession(callbackURL);

  if (hasFreshSessionAge(session.session.createdAt)) {
    redirect(callbackURL as never);
  }

  const oauthProviders = getEnabledOAuthProviderIds();
  const passwordAccount = await getDb().query.account.findFirst({
    columns: { id: true },
    where: (fields) =>
      and(eq(fields.userId, session.user.id), isNotNull(fields.password)),
  });

  return (
    <main className="bg-background text-foreground min-h-screen">
      <div className="mx-auto flex w-full max-w-md flex-col gap-8 px-6 py-16">
        <div className="space-y-2">
          <p className="type-kicker text-accent-strong">Afenda ERP</p>
          <h1 className="type-page-title">Recent re-authentication required</h1>
          <p className="type-body-sm text-foreground-muted">
            This action changes sensitive security or operator state. Re-confirm
            your identity to continue.
          </p>
        </div>
        <div className="border-border bg-surface rounded-(--radius-panel) border p-6">
          <StepUpSurface
            callbackURL={callbackURL}
            currentEmail={session.user.email}
            hasPasswordAuth={Boolean(passwordAccount)}
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
