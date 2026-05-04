import type { Route } from "next";
import Link from "next/link";
import { headers } from "next/headers";

import {
  banUserAction,
  createOperatorInviteAction,
  resendOperatorInviteAction,
  revokeUserSessionAction,
  revokeUserSessionsAction,
  setUserRoleAction,
  unbanUserAction,
} from "./admin-users.actions.server";
import { env } from "@/env";
import { getAuthMailConfig } from "@/server/auth-mail/auth.mail.config.server";
import {
  getOperatorInviteState,
  listOperatorInvites,
} from "@/server/better-auth/auth.operator-invite.server";
import {
  getUserRoles,
  hasAdminAccess,
  parseAdminUserIds,
} from "@/server/better-auth/auth.admin.shared";
import { getAuth } from "@/server/better-auth/auth.config.adapter.server";
import { requireFreshAdminSession } from "@/server/better-auth/auth.policy.server";
import { getStepUpWindowMinutes } from "@/server/better-auth/auth.step-up.shared";

const usersPerPage = 20;

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams?: Promise<{ offset?: string; q?: string; userId?: string }>;
}) {
  const session = await requireFreshAdminSession("/admin/users");
  const sp = searchParams ? await searchParams : {};
  const searchValue = typeof sp.q === "string" ? sp.q.trim() : "";
  const requestedUserId = typeof sp.userId === "string" ? sp.userId : "";
  const offset = parseOffset(sp.offset);
  const bootstrapAdminUserIds = parseAdminUserIds(
    env.BETTER_AUTH_ADMIN_USER_IDS,
  );
  const authMailConfig = getAuthMailConfig();
  const requestHeaders = await headers();

  const [userPage, recentInvites] = await Promise.all([
    getAuth().api.listUsers({
      query: {
        limit: usersPerPage,
        offset,
        ...(searchValue
          ? {
              searchField: "email",
              searchOperator: "contains",
              searchValue,
            }
          : {}),
      },
      headers: requestHeaders,
    }),
    listOperatorInvites(),
  ]);

  const users = userPage.users;
  const selectedUser =
    users.find((item) => item.id === requestedUserId) ?? users[0] ?? null;
  const selectedUserSessions = selectedUser
    ? await getAuth().api.listUserSessions({
        body: { userId: selectedUser.id },
        headers: requestHeaders,
      })
    : null;
  const selectedSessions = selectedUserSessions?.sessions ?? [];
  const pageLimit = usersPerPage;
  const pageOffset = offset;
  const previousOffset = Math.max(0, pageOffset - pageLimit);
  const hasNextPage = pageOffset + users.length < userPage.total;
  const currentPath = buildAdminHref({
    offset: pageOffset,
    q: searchValue,
    userId: selectedUser?.id ?? requestedUserId,
  });

  return (
    <main className="bg-background text-foreground min-h-screen">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-16">
        <div className="space-y-3">
          <p className="type-kicker text-accent-strong">Afenda ERP</p>
          <h1 className="type-page-title">Admin user controls</h1>
          <p className="type-body text-foreground-muted max-w-3xl">
            User administration stays on the Better Auth boundary. Public
            accounts can self-register for lightweight use, while invitations
            and role changes are used to provision verified operator or
            elevated access.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(22rem,0.95fr)_minmax(0,1.35fr)]">
          <section className="space-y-4">
            <section className="border-border bg-surface space-y-4 rounded-(--radius-panel) border p-6">
              <div className="space-y-1">
                <h2 className="type-panel-title">Step-up status</h2>
                <p className="type-body-sm text-foreground-muted">
                  High-risk admin controls stay behind a fresh-session gate.
                  This session was re-authenticated recently, but Afenda will
                  ask for step-up again after {getStepUpWindowMinutes()} minutes
                  on stale tabs or deferred actions.
                </p>
              </div>
            </section>

            <section className="border-border bg-surface space-y-4 rounded-(--radius-panel) border p-6">
              <div className="space-y-1">
                <h2 className="type-panel-title">Auth mail status</h2>
                <p className="type-body-sm text-foreground-muted">
                  Better Auth mail uses Resend with the sender addresses defined
                  in env. This is a visibility panel only. Domain verification
                  remains a Resend and DNS operation outside the product.
                </p>
              </div>

              <dl className="grid gap-3 text-sm md:grid-cols-2">
                <div>
                  <dt className="type-meta text-foreground-muted">Delivery</dt>
                  <dd className="type-body-sm text-foreground">
                    {authMailConfig.deliveryStatus === "ready"
                      ? "Ready"
                      : authMailConfig.deliveryStatus === "missing-api-key"
                        ? "Missing RESEND_API_KEY"
                        : "Missing AUTH_FROM_EMAIL"}
                  </dd>
                </div>
                <div>
                  <dt className="type-meta text-foreground-muted">Sender</dt>
                  <dd className="type-body-sm text-foreground">
                    {authMailConfig.fromEmail ?? "Not configured"}
                  </dd>
                </div>
                <div>
                  <dt className="type-meta text-foreground-muted">Reply-to</dt>
                  <dd className="type-body-sm text-foreground">
                    {authMailConfig.replyToEmail ?? "Not configured"}
                  </dd>
                </div>
                <div>
                  <dt className="type-meta text-foreground-muted">
                    Sender domain
                  </dt>
                  <dd className="type-body-sm text-foreground">
                    {authMailConfig.senderDomain ?? "Not configured"}
                  </dd>
                </div>
              </dl>

              <div className="border-border bg-surface-raised space-y-2 rounded-(--radius-control) border p-4">
                <p className="type-label text-foreground">
                  Operational requirements
                </p>
                <p className="type-body-sm text-foreground-muted">
                  The sender domain must be verified in Resend. Local auth mail
                  needs `RESEND_API_KEY`, `AUTH_FROM_EMAIL`, optional
                  `AUTH_REPLY_TO_EMAIL`, and the canonical `BETTER_AUTH_URL`.
                  Production Vercel envs must mirror the same contract.
                </p>
              </div>
            </section>

            <section className="border-border bg-surface space-y-4 rounded-(--radius-panel) border p-6">
              <div className="space-y-1">
                <h2 className="type-panel-title">Operator invites</h2>
                <p className="type-body-sm text-foreground-muted">
                  Issue onboarding links when Afenda needs to pre-provision a
                  verified operator account or elevated role. Invite acceptance
                  is bound to the invited email and activation completes only
                  after email verification.
                </p>
              </div>

              <form action={createOperatorInviteAction} className="space-y-3">
                <label className="flex min-w-0 flex-col gap-2">
                  <span className="type-label">Operator email</span>
                  <input
                    className="border-border-strong bg-field text-foreground placeholder:text-foreground-muted focus:border-accent focus:ring-accent/20 min-h-[var(--control-height-comfortable)] rounded-(--radius-control) border px-[var(--control-padding-x-comfortable)] py-[var(--control-padding-y-comfortable)] transition outline-none"
                    name="email"
                    placeholder="operator@company.com"
                    required
                    type="email"
                  />
                </label>
                <label className="flex min-w-0 flex-col gap-2">
                  <span className="type-label">Bootstrap role</span>
                  <select
                    className="border-border-strong bg-field text-foreground focus:border-accent focus:ring-accent/20 min-h-[var(--control-height-comfortable)] rounded-(--radius-control) border px-[var(--control-padding-x-comfortable)] py-[var(--control-padding-y-comfortable)] transition outline-none"
                    defaultValue="operator"
                    name="role"
                  >
                    <option value="operator">Operator</option>
                    <option value="admin">Admin</option>
                  </select>
                </label>
                <button
                  className="type-label border-border-strong bg-field text-foreground hover:bg-field-hover rounded-(--radius-control) border px-4 py-2 transition"
                  type="submit"
                >
                  Send invite
                </button>
              </form>

              <div className="space-y-3">
                {recentInvites.length > 0 ? (
                  recentInvites.map((invite) => {
                    const inviteState = getOperatorInviteState(invite);
                    const inviteAccepted = inviteState === "accepted";

                    return (
                      <div
                        className="border-border bg-surface-raised space-y-3 rounded-(--radius-control) border p-4"
                        key={invite.id}
                      >
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="space-y-1">
                            <p className="type-label text-foreground">
                              {invite.email}
                            </p>
                            <p className="type-meta text-foreground-muted">
                              Role: {invite.role}
                            </p>
                          </div>
                          <span className="type-meta border-border-strong bg-field text-foreground rounded-full border px-2.5 py-1">
                            {inviteState}
                          </span>
                        </div>
                        <dl className="grid gap-2 text-sm md:grid-cols-2">
                          <div>
                            <dt className="type-meta text-foreground-muted">
                              Created
                            </dt>
                            <dd className="type-body-sm text-foreground">
                              {formatDateTime(invite.createdAt)}
                            </dd>
                          </div>
                          <div>
                            <dt className="type-meta text-foreground-muted">
                              Expires
                            </dt>
                            <dd className="type-body-sm text-foreground">
                              {formatDateTime(invite.expiresAt)}
                            </dd>
                          </div>
                        </dl>
                        {!inviteAccepted ? (
                          <form action={resendOperatorInviteAction}>
                            <input name="email" type="hidden" value={invite.email} />
                            <input name="role" type="hidden" value={invite.role} />
                            <button
                              className="type-label border-border-strong bg-field text-foreground hover:bg-field-hover rounded-(--radius-control) border px-4 py-2 transition"
                              type="submit"
                            >
                              Resend invite
                            </button>
                          </form>
                        ) : null}
                      </div>
                    );
                  })
                ) : (
                  <p className="type-body-sm text-foreground-muted">
                    No operator invites have been issued yet.
                  </p>
                )}
              </div>
            </section>

            <section className="border-border bg-surface space-y-4 rounded-(--radius-panel) border p-6">
              <div className="space-y-1">
                <h2 className="type-panel-title">User directory</h2>
                <p className="type-body-sm text-foreground-muted">
                  Search by email and select an operator account to inspect.
                </p>
              </div>

              <form className="flex flex-col gap-3 sm:flex-row" method="get">
                <input
                  className="border-border-strong bg-field text-foreground placeholder:text-foreground-muted focus:border-accent focus:ring-accent/20 min-h-[var(--control-height-comfortable)] flex-1 rounded-(--radius-control) border px-[var(--control-padding-x-comfortable)] py-[var(--control-padding-y-comfortable)] transition outline-none"
                  defaultValue={searchValue}
                  name="q"
                  placeholder="Search by email"
                  type="search"
                />
                <button
                  className="type-label border-border-strong bg-field text-foreground hover:bg-field-hover rounded-(--radius-control) border px-4 py-2 transition"
                  type="submit"
                >
                  Search
                </button>
              </form>

              <div className="space-y-3">
                {users.length > 0 ? (
                  users.map((item) => {
                    const itemRoles = getUserRoles(item.role);
                    const itemIsSelected = item.id === selectedUser?.id;
                    const itemIsBootstrapAdmin = bootstrapAdminUserIds.includes(
                      item.id,
                    );

                    return (
                      <Link
                        className={`block rounded-(--radius-control) border p-4 transition ${
                          itemIsSelected
                            ? "border-accent bg-accent-soft"
                            : "border-border bg-surface-raised hover:bg-field-hover"
                        }`}
                        href={buildAdminHref({
                          offset: pageOffset,
                          q: searchValue,
                          userId: item.id,
                        })}
                        key={item.id}
                      >
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="space-y-1">
                            <p className="type-label text-foreground">
                              {item.name ?? item.email}
                            </p>
                            <p className="type-body-sm text-foreground-muted">
                              {item.email}
                            </p>
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="type-meta border-border-strong bg-field text-foreground rounded-full border px-2.5 py-1">
                              {itemRoles.join(", ")}
                            </span>
                            <span className="type-meta border-border-strong bg-field text-foreground rounded-full border px-2.5 py-1">
                              {item.emailVerified ? "Verified" : "Unverified"}
                            </span>
                            {itemIsBootstrapAdmin ? (
                              <span className="type-meta border-border-strong bg-field text-foreground rounded-full border px-2.5 py-1">
                                Bootstrap admin
                              </span>
                            ) : null}
                            {item.banned ? (
                              <span className="type-meta border-border-strong bg-field text-danger-strong rounded-full border px-2.5 py-1">
                                Banned
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </Link>
                    );
                  })
                ) : (
                  <p className="type-body-sm text-foreground-muted">
                    No users matched this search.
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between gap-3 pt-2">
                <p className="type-meta text-foreground-muted">
                  Showing {users.length} of {userPage.total} user
                  {userPage.total === 1 ? "" : "s"}.
                </p>
                <div className="flex gap-2">
                  <Link
                    aria-disabled={pageOffset === 0}
                    className={`type-label rounded-(--radius-control) border px-4 py-2 transition ${
                      pageOffset === 0
                        ? "border-border bg-surface-raised text-foreground-muted pointer-events-none opacity-60"
                        : "border-border-strong bg-field text-foreground hover:bg-field-hover"
                    }`}
                    href={buildAdminHref({
                      offset: previousOffset,
                      q: searchValue,
                      userId: selectedUser?.id,
                    })}
                  >
                    Previous
                  </Link>
                  <Link
                    aria-disabled={!hasNextPage}
                    className={`type-label rounded-(--radius-control) border px-4 py-2 transition ${
                      !hasNextPage
                        ? "border-border bg-surface-raised text-foreground-muted pointer-events-none opacity-60"
                        : "border-border-strong bg-field text-foreground hover:bg-field-hover"
                    }`}
                    href={buildAdminHref({
                      offset: pageOffset + pageLimit,
                      q: searchValue,
                      userId: selectedUser?.id,
                    })}
                  >
                    Next
                  </Link>
                </div>
              </div>
            </section>
          </section>

          <section className="space-y-4">
            {selectedUser ? (
              <>
                <section className="border-border bg-surface space-y-5 rounded-(--radius-panel) border p-6">
                  <div className="space-y-1">
                    <h2 className="type-panel-title">
                      {selectedUser.name ?? selectedUser.email}
                    </h2>
                    <p className="type-body-sm text-foreground-muted">
                      {selectedUser.email}
                    </p>
                  </div>

                  <dl className="grid gap-3 text-sm md:grid-cols-2">
                    <div>
                      <dt className="type-meta text-foreground-muted">
                        Stored role
                      </dt>
                      <dd className="type-body-sm text-foreground">
                        {getUserRoles(selectedUser.role).join(", ")}
                      </dd>
                    </div>
                    <div>
                      <dt className="type-meta text-foreground-muted">
                        Effective access
                      </dt>
                      <dd className="type-body-sm text-foreground">
                        {hasAdminAccess(selectedUser, bootstrapAdminUserIds)
                          ? "Admin"
                          : "User"}
                      </dd>
                    </div>
                    <div>
                      <dt className="type-meta text-foreground-muted">
                        Email verification
                      </dt>
                      <dd className="type-body-sm text-foreground">
                        {selectedUser.emailVerified ? "Verified" : "Pending"}
                      </dd>
                    </div>
                    <div>
                      <dt className="type-meta text-foreground-muted">
                        Ban status
                      </dt>
                      <dd className="type-body-sm text-foreground">
                        {selectedUser.banned ? "Banned" : "Active"}
                      </dd>
                    </div>
                    <div>
                      <dt className="type-meta text-foreground-muted">
                        Ban expires
                      </dt>
                      <dd className="type-body-sm text-foreground">
                        {formatDateTime(selectedUser.banExpires)}
                      </dd>
                    </div>
                    <div className="md:col-span-2">
                      <dt className="type-meta text-foreground-muted">
                        Ban reason
                      </dt>
                      <dd className="type-body-sm text-foreground">
                        {selectedUser.banReason ?? "No active ban reason"}
                      </dd>
                    </div>
                  </dl>

                  <div className="grid gap-4 lg:grid-cols-2">
                    <section className="border-border bg-surface-raised space-y-3 rounded-(--radius-control) border p-4">
                      <div className="space-y-1">
                        <h3 className="type-label text-foreground">
                          Role management
                        </h3>
                        <p className="type-body-sm text-foreground-muted">
                          Convert this account between public, operator, and
                          admin trust tiers.
                        </p>
                      </div>

                      {selectedUser.id === session.user.id &&
                      hasAdminAccess(selectedUser, bootstrapAdminUserIds) &&
                      getUserRoles(selectedUser.role).includes("admin") ? (
                        <p className="type-meta text-foreground-muted">
                          Your own stored admin role is protected here. Use the
                          bootstrap allowlist or another admin account before
                          demoting yourself.
                        </p>
                      ) : (
                        <form action={setUserRoleAction}>
                          <input
                            name="userId"
                            type="hidden"
                            value={selectedUser.id}
                          />
                          <select
                            className="border-border-strong bg-field text-foreground focus:border-accent focus:ring-accent/20 min-h-[var(--control-height-comfortable)] rounded-(--radius-control) border px-[var(--control-padding-x-comfortable)] py-[var(--control-padding-y-comfortable)] transition outline-none"
                            defaultValue={getUserRoles(selectedUser.role)[0] ?? "user"}
                            name="role"
                          >
                            <option value="user">Public user</option>
                            <option value="operator">Operator</option>
                            <option value="admin">Admin</option>
                          </select>
                          <button
                            className="type-label border-border-strong bg-field text-foreground hover:bg-field-hover ml-3 rounded-(--radius-control) border px-4 py-2 transition"
                            type="submit"
                          >
                            Apply role
                          </button>
                        </form>
                      )}
                    </section>

                    <section className="border-border bg-surface-raised space-y-3 rounded-(--radius-control) border p-4">
                      <div className="space-y-1">
                        <h3 className="type-label text-foreground">
                          Ban controls
                        </h3>
                        <p className="type-body-sm text-foreground-muted">
                          Ban revokes all active sessions immediately. Unban
                          restores sign-in eligibility.
                        </p>
                      </div>

                      {selectedUser.id === session.user.id ? (
                        <p className="type-meta text-foreground-muted">
                          Self-ban is intentionally blocked for operator safety.
                        </p>
                      ) : selectedUser.banned ? (
                        <form action={unbanUserAction}>
                          <input
                            name="userId"
                            type="hidden"
                            value={selectedUser.id}
                          />
                          <button
                            className="type-label border-border-strong bg-field text-foreground hover:bg-field-hover rounded-(--radius-control) border px-4 py-2 transition"
                            type="submit"
                          >
                            Unban user
                          </button>
                        </form>
                      ) : (
                        <form action={banUserAction} className="space-y-3">
                          <input
                            name="userId"
                            type="hidden"
                            value={selectedUser.id}
                          />
                          <input
                            className="border-border-strong bg-field text-foreground placeholder:text-foreground-muted focus:border-accent focus:ring-accent/20 min-h-[var(--control-height-comfortable)] w-full rounded-(--radius-control) border px-[var(--control-padding-x-comfortable)] py-[var(--control-padding-y-comfortable)] transition outline-none"
                            name="banReason"
                            placeholder="Reason for the ban"
                            type="text"
                          />
                          <button
                            className="type-label border-border-strong bg-field text-foreground hover:bg-field-hover rounded-(--radius-control) border px-4 py-2 transition"
                            type="submit"
                          >
                            Ban user
                          </button>
                        </form>
                      )}
                    </section>
                  </div>
                </section>

                <section className="border-border bg-surface space-y-4 rounded-(--radius-panel) border p-6">
                  <div className="space-y-1">
                    <h2 className="type-panel-title">Active sessions</h2>
                    <p className="type-body-sm text-foreground-muted">
                      Review the selected user&apos;s current sessions and
                      revoke tokens when support intervention is required.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {selectedSessions.length > 0 ? (
                      selectedSessions.map((item) => {
                        const isCurrentAdminSession =
                          selectedUser.id === session.user.id &&
                          item.id === session.session.id;

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
                                {isCurrentAdminSession ? (
                                  <span className="type-meta border-border-strong bg-field text-foreground rounded-full border px-2.5 py-1">
                                    Current admin session
                                  </span>
                                ) : null}
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

                            {!isCurrentAdminSession ? (
                              <form action={revokeUserSessionAction}>
                                <input
                                  name="sessionToken"
                                  type="hidden"
                                  value={item.token}
                                />
                                <button
                                  className="type-label border-border-strong bg-field text-foreground hover:bg-field-hover rounded-(--radius-control) border px-4 py-2 transition"
                                  type="submit"
                                >
                                  Revoke session
                                </button>
                              </form>
                            ) : null}
                          </div>
                        );
                      })
                    ) : (
                      <p className="type-body-sm text-foreground-muted">
                        No active sessions returned for this user.
                      </p>
                    )}
                  </div>

                  {selectedUser.id !== session.user.id ? (
                    <form action={revokeUserSessionsAction}>
                      <input
                        name="userId"
                        type="hidden"
                        value={selectedUser.id}
                      />
                      <button
                        className="type-label border-border-strong bg-field text-foreground hover:bg-field-hover rounded-(--radius-control) border px-4 py-2 transition"
                        type="submit"
                      >
                        Revoke all user sessions
                      </button>
                    </form>
                  ) : (
                    <p className="type-meta text-foreground-muted">
                      Bulk revoke is hidden for your own account to avoid
                      dropping the active admin session accidentally.
                    </p>
                  )}
                </section>
              </>
            ) : (
              <section className="border-border bg-surface rounded-(--radius-panel) border p-6">
                <p className="type-body-sm text-foreground-muted">
                  Select a user from the directory to inspect admin controls and
                  active sessions.
                </p>
              </section>
            )}
          </section>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            className="type-body-sm text-accent-strong hover:underline"
            href="/"
          >
            ← Back to home
          </Link>
          <Link
            className="type-body-sm text-accent-strong hover:underline"
            href={currentPath}
          >
            Refresh current selection
          </Link>
        </div>
      </div>
    </main>
  );
}

function buildAdminHref({
  offset,
  q,
  userId,
}: {
  offset?: number | undefined;
  q?: string | undefined;
  userId?: string | undefined;
}) {
  const params = new URLSearchParams();

  if ((offset ?? 0) > 0) {
    params.set("offset", String(offset));
  }
  if (q) {
    params.set("q", q);
  }
  if (userId) {
    params.set("userId", userId);
  }

  const query = params.toString();
  return (query ? `/admin/users?${query}` : "/admin/users") as Route;
}

function parseOffset(value: string | undefined) {
  if (!value) return 0;

  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

function formatDateTime(value: Date | string | null | undefined) {
  if (!value) return "Not set";

  const parsed = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(parsed.valueOf())) return "Not set";

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(parsed);
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
