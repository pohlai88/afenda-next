import { and, eq, isNotNull } from "drizzle-orm";
import Link from "next/link";

import { AccountAreaNav } from "@/app/(app)/account/_components/account-area-nav";
import { listRecentAuthEvents } from "@/server/better-auth/auth.audit.server";
import { requireFreshVerifiedEmailSession } from "@/server/better-auth/auth.policy.server";
import { getStepUpWindowMinutes } from "@/server/better-auth/auth.step-up.shared";
import {
  listPasskeys,
  listSessions,
} from "@/server/better-auth/auth.security.query.server";
import { getDb } from "@/server/db/db.postgres.adapter.server";

import {
  changePasswordAction,
  deleteAccountAction,
  deletePasskeyAction,
  revokeOtherSessionsAction,
  revokeSessionAction,
  setPasswordAction,
} from "./security.actions.server";
import { AccountSecuritySurface } from "./_components/account-security.route.surface.client";

export default async function AccountSecurityPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const session = await requireFreshVerifiedEmailSession("/account/security");
  const sp = searchParams ? await searchParams : {};
  const [sessions, passkeys, securityUser, passwordAccount, recentEvents] =
    await Promise.all([
      listSessions(),
      listPasskeys(),
      getDb().query.user.findFirst({
        columns: { twoFactorEnabled: true },
        where: (fields, { eq }) => eq(fields.id, session.user.id),
      }),
      getDb().query.account.findFirst({
        columns: { id: true },
        where: (fields) =>
          and(eq(fields.userId, session.user.id), isNotNull(fields.password)),
      }),
      listRecentAuthEvents(session.user.id),
    ]);

  const currentSessionId = session.session.id;
  const activeSessions = [...sessions].sort(
    (a, b) =>
      Number(b.id === currentSessionId) - Number(a.id === currentSessionId),
  );
  const twoFactorEnabled = securityUser?.twoFactorEnabled === true;
  const notice =
    sp["password"] === "changed"
      ? "Password updated."
      : sp["password"] === "set"
        ? "Password added to this account."
        : sp["delete"] === "check-email"
          ? "Deletion verification email sent. Open it from your inbox to complete removal of this public account."
          : null;

  return (
    <main className="bg-background text-foreground min-h-screen">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-16">
        <div className="space-y-3">
          <p className="type-kicker text-accent-strong">Afenda ERP</p>
          <h1 className="type-page-title">Account security</h1>
          <p className="type-body text-foreground-muted max-w-3xl">
            Manage sign-in factors, passwords, session inventory, and public
            account deletion under Afenda’s fresh-session boundary.
          </p>
        </div>

        <AccountAreaNav current="security" />

        {notice ? (
          <section className="border-border bg-surface rounded-(--radius-panel) border p-4">
            <p className="type-body-sm text-foreground">{notice}</p>
          </section>
        ) : null}

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.9fr)]">
          <section className="border-border bg-surface space-y-4 rounded-(--radius-panel) border p-6">
            <div className="space-y-1">
              <h2 className="type-panel-title">Session inventory</h2>
              <p className="type-body-sm text-foreground-muted">
                Active device sessions for this account, including the current
                browser session.
              </p>
            </div>

            <div className="space-y-3">
              {activeSessions.map((item) => {
                const isCurrent = item.id === currentSessionId;

                return (
                  <div
                    className="border-border bg-surface-raised grid gap-3 rounded-(--radius-control) border p-4 md:grid-cols-[minmax(0,1fr)_auto]"
                    key={item.id}
                  >
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="type-label text-foreground">
                          {formatDeviceLabel(item.userAgent)}
                        </p>
                        <span className="type-meta border-border-strong bg-field text-foreground rounded-full border px-2.5 py-1">
                          {isCurrent ? "Current session" : "Active session"}
                        </span>
                      </div>
                      <dl className="grid gap-2 text-sm md:grid-cols-2">
                        <div>
                          <dt className="type-meta text-foreground-muted">
                            Last activity
                          </dt>
                          <dd className="type-body-sm text-foreground">
                            {formatDateTime(item.updatedAt)}
                          </dd>
                        </div>
                        <div>
                          <dt className="type-meta text-foreground-muted">
                            Created
                          </dt>
                          <dd className="type-body-sm text-foreground">
                            {formatDateTime(item.createdAt)}
                          </dd>
                        </div>
                        <div>
                          <dt className="type-meta text-foreground-muted">
                            Expires
                          </dt>
                          <dd className="type-body-sm text-foreground">
                            {formatDateTime(item.expiresAt)}
                          </dd>
                        </div>
                        <div>
                          <dt className="type-meta text-foreground-muted">
                            IP address
                          </dt>
                          <dd className="type-body-sm text-foreground">
                            {item.ipAddress ?? "Not captured"}
                          </dd>
                        </div>
                      </dl>
                    </div>

                    {!isCurrent ? (
                      <form action={revokeSessionAction.bind(null, item.token)}>
                        <button
                          className="type-label border-border-strong bg-field text-foreground hover:bg-field-hover rounded-(--radius-control) border px-4 py-2 transition"
                          type="submit"
                        >
                          Revoke
                        </button>
                      </form>
                    ) : null}
                  </div>
                );
              })}
            </div>

            <form action={revokeOtherSessionsAction}>
              <button
                className="type-label border-border-strong bg-field text-foreground hover:bg-field-hover rounded-(--radius-control) border px-4 py-2 transition disabled:cursor-not-allowed disabled:opacity-60"
                disabled={activeSessions.length <= 1}
                type="submit"
              >
                Revoke other sessions
              </button>
            </form>
          </section>

          <aside className="space-y-4">
            <section className="border-border bg-surface rounded-(--radius-panel) border p-5">
              <div className="space-y-1">
                <h2 className="type-panel-title">Security summary</h2>
                <p className="type-body-sm text-foreground-muted">
                  Current account protections and registered authenticators.
                </p>
              </div>
              <dl className="mt-4 grid gap-3 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <dt className="type-meta text-foreground-muted">
                    Step-up gate
                  </dt>
                  <dd className="type-label text-foreground">
                    Fresh session active
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="type-meta text-foreground-muted">
                    Two-factor authentication
                  </dt>
                  <dd className="type-label text-foreground">
                    {twoFactorEnabled ? "Enabled" : "Not enabled"}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="type-meta text-foreground-muted">Passkeys</dt>
                  <dd className="type-label text-foreground">
                    {passkeys.length} registered
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="type-meta text-foreground-muted">
                    Signed in as
                  </dt>
                  <dd className="type-body-sm text-foreground">
                    {session.user.email}
                  </dd>
                </div>
              </dl>
              <p className="type-meta text-foreground-muted mt-4">
                Sensitive account changes require recent re-authentication. If
                this page stays open, Afenda will ask you to step up again after{" "}
                {getStepUpWindowMinutes()} minutes.
              </p>
            </section>

            <section className="border-border bg-surface rounded-(--radius-panel) border p-5">
              <div className="space-y-1">
                <h2 className="type-panel-title">Registered passkeys</h2>
                <p className="type-body-sm text-foreground-muted">
                  Remove outdated authenticators you no longer control.
                </p>
              </div>
              <div className="mt-4 space-y-3">
                {passkeys.length > 0 ? (
                  passkeys.map((item) => (
                    <div
                      className="border-border bg-surface-raised space-y-2 rounded-(--radius-control) border p-4"
                      key={item.id}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <p className="type-label text-foreground">
                            {item.name ?? "Unnamed passkey"}
                          </p>
                          <p className="type-meta text-foreground-muted">
                            {item.deviceType}
                            {item.backedUp ? " • Synced backup available" : ""}
                          </p>
                        </div>
                        <form action={deletePasskeyAction.bind(null, item.id)}>
                          <button
                            className="type-label border-border-strong bg-field text-foreground hover:bg-field-hover rounded-(--radius-control) border px-3 py-2 transition"
                            type="submit"
                          >
                            Remove
                          </button>
                        </form>
                      </div>
                      <p className="type-meta text-foreground-muted">
                        Registered {formatDateTime(item.createdAt ?? null)}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="type-body-sm text-foreground-muted">
                    No passkeys registered yet.
                  </p>
                )}
              </div>
            </section>
          </aside>
        </div>

        <AccountSecuritySurface
          hasPasswordAuth={Boolean(passwordAccount)}
          twoFactorEnabled={twoFactorEnabled}
        />

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)]">
          <section className="border-border bg-surface space-y-4 rounded-(--radius-panel) border p-5">
            <div className="space-y-1">
              <h2 className="type-panel-title">Password lifecycle</h2>
              <p className="type-body-sm text-foreground-muted">
                Credential users can rotate passwords here. OAuth, passkey, and
                passwordless accounts can add a credential fallback without
                changing their primary sign-in preference.
              </p>
            </div>

            {passwordAccount ? (
              <form action={changePasswordAction} className="space-y-4">
                <Field
                  label="Current password"
                  name="currentPassword"
                  type="password"
                />
                <Field
                  description="At least 8 characters."
                  label="New password"
                  name="newPassword"
                  type="password"
                />
                <label className="flex items-center gap-2">
                  <input name="revokeOtherSessions" type="checkbox" value="1" />
                  <span className="type-body-sm text-foreground">
                    Revoke other sessions after the change
                  </span>
                </label>
                <button type="submit">Change password</button>
              </form>
            ) : (
              <form action={setPasswordAction} className="space-y-4">
                <Field
                  description="Add a password as an extra recovery path for this account."
                  label="New password"
                  name="newPassword"
                  type="password"
                />
                <button type="submit">Add password</button>
              </form>
            )}

            <Link
              className="type-body-sm text-accent-strong hover:underline"
              href="/sign-in/reset-password"
            >
              Send a reset email instead
            </Link>
          </section>

          <section className="border-border bg-surface space-y-4 rounded-(--radius-panel) border p-5">
            <div className="space-y-1">
              <h2 className="type-panel-title">Delete public account</h2>
              <p className="type-body-sm text-foreground-muted">
                Public accounts may self-delete. Operator and admin accounts are
                blocked to preserve ERP traceability.
              </p>
            </div>
            <form action={deleteAccountAction} className="space-y-4">
              {passwordAccount ? (
                <Field
                  description="Provide your password to complete deletion immediately instead of by email verification."
                  label="Current password"
                  name="password"
                  type="password"
                />
              ) : null}
              <button type="submit">Delete public account</button>
            </form>
          </section>
        </div>

        <section className="border-border bg-surface rounded-(--radius-panel) border p-6">
          <div className="space-y-1">
            <h2 className="type-panel-title">Recent auth activity</h2>
            <p className="type-body-sm text-foreground-muted">
              Password, verification, and linked-account changes are recorded
              here for auditability.
            </p>
          </div>
          <ul className="mt-4 space-y-3">
            {recentEvents.length > 0 ? (
              recentEvents.map((event) => (
                <li
                  className="border-border bg-surface-raised rounded-(--radius-control) border p-4"
                  key={event.id}
                >
                  <p className="type-label text-foreground">
                    {formatEventLabel(event.eventType)}
                  </p>
                  <p className="type-meta text-foreground-muted">
                    {formatDateTime(event.createdAt)}
                  </p>
                </li>
              ))
            ) : (
              <li className="type-body-sm text-foreground-muted">
                No auth activity recorded yet.
              </li>
            )}
          </ul>
        </section>

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

function formatDeviceLabel(userAgent: string | null | undefined) {
  if (!userAgent) return "Unknown device";

  const browser = userAgent.includes("Edg/")
    ? "Edge"
    : userAgent.includes("Chrome/")
      ? "Chrome"
      : userAgent.includes("Firefox/")
        ? "Firefox"
        : userAgent.includes("Safari/")
          ? "Safari"
          : "Browser";

  const platform = userAgent.includes("Windows")
    ? "Windows"
    : userAgent.includes("Mac OS X")
      ? "macOS"
      : userAgent.includes("Android")
        ? "Android"
        : userAgent.includes("iPhone") || userAgent.includes("iPad")
          ? "iOS"
          : userAgent.includes("Linux")
            ? "Linux"
            : "device";

  return `${platform} · ${browser}`;
}

function formatDateTime(value: Date | null) {
  if (!value) return "Unknown";

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(value);
}

function formatEventLabel(eventType: string) {
  return eventType
    .split("_")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}

function Field({
  description,
  label,
  name,
  type = "text",
}: {
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
        id={name}
        name={name}
        type={type}
      />
    </label>
  );
}
