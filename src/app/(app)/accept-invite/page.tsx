import Link from "next/link";

import { acceptOperatorInviteAction } from "./accept-invite.actions.server";
import {
  getOperatorInviteByToken,
  getOperatorInviteState,
} from "@/server/better-auth/auth.operator-invite.server";
import { requireAnonymous } from "@/server/better-auth/auth.policy.server";

export default async function AcceptInvitePage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string; token?: string }>;
}) {
  await requireAnonymous("/");

  const sp = searchParams ? await searchParams : {};
  const token = typeof sp.token === "string" ? sp.token.trim() : "";
  const invite = token ? await getOperatorInviteByToken(token) : null;
  const inviteState = invite ? getOperatorInviteState(invite) : "invalid";
  const errorMessage = getAcceptInviteErrorMessage(sp.error);

  return (
    <main className="bg-background text-foreground min-h-screen">
      <div className="mx-auto flex w-full max-w-md flex-col gap-8 px-6 py-16">
        <div className="space-y-2">
          <p className="type-kicker text-accent-strong">Afenda ERP</p>
          <h1 className="type-page-title">Accept operator invite</h1>
          <p className="type-body-sm text-foreground-muted">
            Invitation onboarding is bound to the invited email and requires
            email verification before ERP access is enabled.
          </p>
        </div>

        <div className="border-border bg-surface rounded-(--radius-panel) border p-6">
          {errorMessage ? (
            <p className="type-meta text-danger-strong" role="alert">
              {errorMessage}
            </p>
          ) : null}

          {invite && inviteState === "pending" ? (
            <div className="space-y-5">
              <div className="space-y-1">
                <p className="type-label text-foreground">{invite.email}</p>
                <p className="type-body-sm text-foreground-muted">
                  Bootstrap role: {invite.role}
                </p>
              </div>

              <form action={acceptOperatorInviteAction} className="space-y-4">
                <input name="token" type="hidden" value={token} />
                <Field label="Display name" name="name" required />
                <Field
                  description="At least 8 characters."
                  label="Password"
                  name="password"
                  required
                  type="password"
                />
                <button className="mt-2" type="submit">
                  Create operator account
                </button>
              </form>
            </div>
          ) : inviteState === "accepted" ? (
            <div className="space-y-3">
              <p className="type-body-sm text-foreground">
                This invitation has already been used.
              </p>
              <Link
                className="type-body-sm text-accent-strong hover:underline"
                href="/sign-in"
              >
                Go to sign-in
              </Link>
            </div>
          ) : inviteState === "expired" ? (
            <div className="space-y-3">
              <p className="type-body-sm text-foreground">
                This invitation has expired. Ask an admin to send a new
                onboarding link.
              </p>
              <Link
                className="type-body-sm text-accent-strong hover:underline"
                href="/sign-in"
              >
                Back to sign-in
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="type-body-sm text-foreground">
                This invitation link is invalid.
              </p>
              <Link
                className="type-body-sm text-accent-strong hover:underline"
                href="/sign-in"
              >
                Back to sign-in
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function Field({
  description,
  label,
  name,
  ...props
}: {
  description?: string;
  label: string;
  name: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <label className="flex min-w-0 flex-col gap-2" htmlFor={name}>
      <span className="type-label">{label}</span>
      {description ? (
        <span className="type-meta text-foreground-muted">{description}</span>
      ) : null}
      <input
        className="border-border bg-field rounded-(--radius-control) border px-3 py-2"
        id={name}
        name={name}
        {...props}
      />
    </label>
  );
}

function getAcceptInviteErrorMessage(error: string | undefined) {
  if (error === "invalid-invite") {
    return "This invite is missing, expired, or has already been used.";
  }

  if (error === "signup-failed") {
    return "The operator account could not be created from this invite.";
  }

  return null;
}
