import Link from "next/link";

import {
  requestPasswordResetAction,
  resetPasswordAction,
} from "./reset-password.actions.server";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams?: Promise<{
    email?: string;
    error?: string;
    sent?: string;
    token?: string;
  }>;
}) {
  const sp = searchParams ? await searchParams : {};
  const notice =
    sp.sent === "1"
      ? "If that email exists in Afenda, a password reset link has been sent."
      : sp.error === "INVALID_TOKEN"
        ? "That reset link is invalid or expired. Request a new one below."
        : null;

  return (
    <main className="bg-background text-foreground min-h-screen">
      <div className="mx-auto flex w-full max-w-md flex-col gap-8 px-6 py-16">
        <div className="space-y-2">
          <p className="type-kicker text-accent-strong">Afenda ERP</p>
          <h1 className="type-page-title">
            {typeof sp.token === "string" ? "Set a new password" : "Reset password"}
          </h1>
          <p className="type-body-sm text-foreground-muted">
            Request a secure reset email, or complete the reset after opening
            the Better Auth verification link from your inbox.
          </p>
        </div>

        {notice ? (
          <div className="border-border bg-surface rounded-(--radius-panel) border p-4">
            <p className="type-body-sm text-foreground">{notice}</p>
          </div>
        ) : null}

        <div className="border-border bg-surface rounded-(--radius-panel) border p-6">
          {typeof sp.token === "string" ? (
            <form action={resetPasswordAction} className="space-y-4">
              <input name="token" type="hidden" value={sp.token} />
              <Field
                description="At least 8 characters."
                label="New password"
                name="newPassword"
                type="password"
              />
              <button type="submit">Save new password</button>
            </form>
          ) : (
            <form action={requestPasswordResetAction} className="space-y-4">
              <Field
                defaultValue={typeof sp.email === "string" ? sp.email : ""}
                label="Account email"
                name="email"
                type="email"
              />
              <button type="submit">Send reset email</button>
            </form>
          )}
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

function Field({
  defaultValue,
  description,
  label,
  name,
  type = "text",
}: {
  defaultValue?: string | undefined;
  description?: string | undefined;
  label: string;
  name: string;
  type?: string | undefined;
}) {
  return (
    <label className="flex min-w-0 flex-col gap-2" htmlFor={name}>
      <span className="type-label">{label}</span>
      {description ? (
        <span className="type-meta text-foreground-muted">{description}</span>
      ) : null}
      <input
        className="border-border bg-field rounded-(--radius-control) border px-3 py-2"
        defaultValue={defaultValue}
        id={name}
        name={name}
        type={type}
      />
    </label>
  );
}
