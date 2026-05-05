import type { Route } from "next";
import { type Metadata } from "next";
import Link from "next/link";

import { TwoFactorSurface } from "@/app/(app)/iam/sign-in/two-factor/_components/two-factor.route.surface.client";
import {
  getStepUpHref,
  getTwoFactorMethods,
  safeInternalPath,
} from "@/server/better-auth/auth.redirect.shared";
import { requireSession } from "@/server/better-auth/auth.policy.server";

export const metadata: Metadata = {
  title: "Step-up two-factor verification",
  description: "Complete step-up with your second factor",
};

export default async function StepUpTwoFactorPage({
  searchParams,
}: {
  searchParams?: Promise<{ callbackUrl?: string; methods?: string }>;
}) {
  const sp = searchParams ? await searchParams : {};
  const callbackURL = safeInternalPath(sp.callbackUrl, "/");

  await requireSession(callbackURL);

  return (
    <main className="bg-background text-foreground min-h-screen">
      <div className="mx-auto flex w-full max-w-md flex-col gap-8 px-6 py-16">
        <div className="space-y-2">
          <p className="type-kicker text-accent-strong">Afenda ERP</p>
          <h1 className="type-page-title">Complete step-up verification</h1>
          <p className="type-body-sm text-foreground-muted">
            Finish re-authentication with your registered second factor.
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
          href={getStepUpHref(callbackURL) as Route}
        >
          ← Back to step-up
        </Link>
      </div>
    </main>
  );
}
