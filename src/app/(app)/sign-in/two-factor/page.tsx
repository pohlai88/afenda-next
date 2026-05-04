import { type Metadata } from "next";
import Link from "next/link";

import { TwoFactorSurface } from "./_components/two-factor.route.surface.client";
import {
  getTwoFactorMethods,
  safeInternalPath,
} from "@/server/better-auth/auth.redirect.shared";
import { requireAnonymous } from "@/server/better-auth/auth.policy.server";

export const metadata: Metadata = {
  title: "Two-factor verification",
  description: "Continue sign-in with two-factor verification",
};

export default async function TwoFactorPage({
  searchParams,
}: {
  searchParams?: Promise<{ callbackUrl?: string; methods?: string }>;
}) {
  const sp = searchParams ? await searchParams : {};
  const callbackURL = safeInternalPath(sp.callbackUrl, "/");

  await requireAnonymous(callbackURL);

  return (
    <main className="bg-background text-foreground min-h-screen">
      <div className="mx-auto flex w-full max-w-md flex-col gap-8 px-6 py-16">
        <div className="space-y-2">
          <p className="type-kicker text-accent-strong">Afenda ERP</p>
          <h1 className="type-page-title">Two-factor verification</h1>
          <p className="type-body-sm text-foreground-muted">
            Complete sign-in with your authenticator or a recovery code.
          </p>
        </div>
        <div className="border-border bg-surface rounded-(--radius-panel) border p-6">
          <TwoFactorSurface
            callbackURL={callbackURL}
            methods={getTwoFactorMethods(sp.methods)}
          />
        </div>
        <Link
          className="type-body-sm text-accent-strong hover:underline"
          href="/sign-in"
        >
          ← Back to sign in
        </Link>
      </div>
    </main>
  );
}
