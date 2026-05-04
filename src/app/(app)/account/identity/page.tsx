import Link from "next/link";

import { AccountAreaNav } from "@/app/(app)/account/_components/account-area-nav";
import { listRecentAuthEvents } from "@/server/better-auth/auth.audit.server";
import { listSafeLinkedAccounts } from "@/server/better-auth/auth.account-query.server";
import { getEnabledOAuthProviderIds } from "@/server/better-auth/auth.oauth.providers.server";
import { requireFreshVerifiedEmailSession } from "@/server/better-auth/auth.policy.server";
import { getDb } from "@/server/db/db.postgres.adapter.server";

import {
  beginSocialLinkAction,
  requestEmailChangeAction,
  unlinkAccountAction,
  updateIdentityAction,
} from "./identity.actions.server";

export default async function AccountIdentityPage({
  searchParams,
}: {
  searchParams?: Promise<{
    emailChange?: string;
    linked?: string;
    linkError?: string;
    updated?: string;
    unlinked?: string;
  }>;
}) {
  const session = await requireFreshVerifiedEmailSession("/account/identity");
  const sp = searchParams ? await searchParams : {};
  const [accounts, recentEvents, profile] = await Promise.all([
    listSafeLinkedAccounts(session.user.id),
    listRecentAuthEvents(session.user.id),
    getDb().query.user.findFirst({
      columns: {
        displayUsername: true,
        name: true,
        username: true,
      },
      where: (fields, { eq }) => eq(fields.id, session.user.id),
    }),
  ]);
  const enabledProviders = getEnabledOAuthProviderIds();
  const linkedProviders = new Set(
    accounts
      .filter((account) => !account.isCredentialAccount)
      .map((account) => account.providerId),
  );
  const notice =
    sp.updated === "1"
      ? "Identity details updated."
      : sp.emailChange === "check-email"
        ? "Check your current inbox, then verify the new email address from the follow-up message."
        : typeof sp.linked === "string"
          ? `${sp.linked} linking completed or was already active for this account.`
          : typeof sp.unlinked === "string"
            ? `${sp.unlinked} was removed from this account.`
            : sp.linkError === "provider-disabled"
              ? "That provider is not enabled in this deployment."
              : null;

  return (
    <main className="bg-background text-foreground min-h-screen">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-16">
        <div className="space-y-3">
          <p className="type-kicker text-accent-strong">Afenda ERP</p>
          <h1 className="type-page-title">Account identity</h1>
          <p className="type-body text-foreground-muted max-w-3xl">
            Manage your canonical email, public username, and linked sign-in
            methods. Sensitive changes stay behind the fresh-session boundary.
          </p>
        </div>

        <AccountAreaNav current="identity" />

        {notice ? (
          <section className="border-border bg-surface rounded-(--radius-panel) border p-4">
            <p className="type-body-sm text-foreground">{notice}</p>
          </section>
        ) : null}

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)]">
          <section className="border-border bg-surface space-y-5 rounded-(--radius-panel) border p-6">
            <div className="space-y-1">
              <h2 className="type-panel-title">Public profile</h2>
              <p className="type-body-sm text-foreground-muted">
                Email stays canonical. Username is optional and only used as a
                password sign-in convenience.
              </p>
            </div>

            <form action={updateIdentityAction} className="space-y-4">
              <Field
                defaultValue={profile?.name ?? session.user.name}
                description="Shown in Afenda account surfaces."
                label="Display name"
                name="displayName"
              />
              <Field
                defaultValue={profile?.username ?? ""}
                description="Optional password sign-in identifier. Letters, numbers, underscores, and dots only."
                label="Username"
                name="username"
              />
              <Field
                defaultValue={profile?.displayUsername ?? ""}
                description="Optional public-facing variant for your username."
                label="Display username"
                name="displayUsername"
              />
              <button type="submit">Save identity details</button>
            </form>
          </section>

          <section className="border-border bg-surface space-y-4 rounded-(--radius-panel) border p-6">
            <div className="space-y-1">
              <h2 className="type-panel-title">Email identity</h2>
              <p className="type-body-sm text-foreground-muted">
                Email changes require current-email confirmation, then
                verification of the new address before Afenda persists it.
              </p>
            </div>
            <div className="border-border bg-surface-raised rounded-(--radius-control) border p-4">
              <p className="type-meta text-foreground-muted">Current email</p>
              <p className="type-label text-foreground">{session.user.email}</p>
            </div>
            <form action={requestEmailChangeAction} className="space-y-4">
              <Field
                description="Use a mailbox you control. The change will not complete until both confirmation steps finish."
                label="New email"
                name="newEmail"
                type="email"
              />
              <button type="submit">Request email change</button>
            </form>
          </section>
        </div>

        <section className="border-border bg-surface space-y-4 rounded-(--radius-panel) border p-6">
          <div className="space-y-1">
            <h2 className="type-panel-title">Linked sign-in methods</h2>
            <p className="type-body-sm text-foreground-muted">
              Keep multiple recovery paths attached to this account without
              allowing different-email links or last-account lockout.
            </p>
          </div>

          <div className="space-y-3">
            {accounts.map((item) => (
              <div
                className="border-border bg-surface-raised flex flex-wrap items-start justify-between gap-3 rounded-(--radius-control) border p-4"
                key={item.id}
              >
                <div className="space-y-1">
                  <p className="type-label text-foreground">
                    {item.isCredentialAccount
                      ? "Password credential"
                      : providerLabel(item.providerId)}
                  </p>
                  <p className="type-meta text-foreground-muted">
                    Linked {formatDateTime(item.createdAt)}
                  </p>
                </div>
                {!item.isCredentialAccount ? (
                  <form action={unlinkAccountAction}>
                    <input name="accountId" type="hidden" value={item.accountId} />
                    <input
                      name="providerId"
                      type="hidden"
                      value={item.providerId}
                    />
                    <button type="submit">Unlink</button>
                  </form>
                ) : null}
              </div>
            ))}
          </div>

          {enabledProviders.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {enabledProviders.map((provider) => (
                <form
                  action={beginSocialLinkAction.bind(null, provider)}
                  key={provider}
                >
                  <button
                    disabled={linkedProviders.has(provider)}
                    type="submit"
                  >
                    {linkedProviders.has(provider)
                      ? `${providerLabel(provider)} linked`
                      : `Link ${providerLabel(provider)}`}
                  </button>
                </form>
              ))}
            </div>
          ) : null}
        </section>

        <section className="border-border bg-surface rounded-(--radius-panel) border p-6">
          <div className="space-y-1">
            <h2 className="type-panel-title">Recent auth activity</h2>
            <p className="type-body-sm text-foreground-muted">
              Afenda records identity and auth-method changes for traceability.
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
                No identity events recorded yet.
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

function providerLabel(providerId: string) {
  return providerId === "credential"
    ? "Password"
    : providerId.charAt(0).toUpperCase() + providerId.slice(1);
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
