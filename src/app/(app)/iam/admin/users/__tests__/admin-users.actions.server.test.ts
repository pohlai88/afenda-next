/**
 * @afenda-owner auth
 * @afenda-subject admin-users
 * @afenda-artifact action-test
 * @afenda-boundary test
 * @afenda-description Test coverage for Better Auth admin user server actions
 */
import { beforeEach, describe, expect, it, vi } from "vitest";

const {
  banUserMock,
  buildOperatorInviteUrlMock,
  createOrRefreshOperatorInviteMock,
  findFirstMock,
  headersMock,
  listHeaders,
  requireFreshAdminSessionMock,
  revalidatePathMock,
  revokeUserSessionMock,
  revokeUserSessionsMock,
  sendOperatorInviteEmailMock,
  setStoredUserRoleMock,
  unbanUserMock,
} = vi.hoisted(() => ({
  banUserMock: vi.fn(),
  buildOperatorInviteUrlMock: vi.fn(),
  createOrRefreshOperatorInviteMock: vi.fn(),
  findFirstMock: vi.fn(),
  headersMock: vi.fn(),
  listHeaders: new Headers({ cookie: "session=1" }),
  requireFreshAdminSessionMock: vi.fn(),
  revalidatePathMock: vi.fn(),
  revokeUserSessionMock: vi.fn(),
  revokeUserSessionsMock: vi.fn(),
  sendOperatorInviteEmailMock: vi.fn(),
  setStoredUserRoleMock: vi.fn(),
  unbanUserMock: vi.fn(),
}));

vi.mock("next/cache", () => ({
  revalidatePath: revalidatePathMock,
}));

vi.mock("next/headers", () => ({
  headers: headersMock,
}));

vi.mock("@/server/auth-mail/auth.mail.adapter.server", () => ({
  sendOperatorInviteEmail: sendOperatorInviteEmailMock,
}));

vi.mock("@/server/better-auth/auth.operator-invite.server", () => ({
  buildOperatorInviteUrl: buildOperatorInviteUrlMock,
  createOrRefreshOperatorInvite: createOrRefreshOperatorInviteMock,
  normalizeOperatorInviteEmail: (email: string) => email.trim().toLowerCase(),
}));

vi.mock("@/server/better-auth/auth.config.adapter.server", () => ({
  getAuth: () => ({
    api: {
      banUser: banUserMock,
      revokeUserSession: revokeUserSessionMock,
      revokeUserSessions: revokeUserSessionsMock,
      unbanUser: unbanUserMock,
    },
  }),
}));

vi.mock("@/server/better-auth/auth.policy.server", () => ({
  requireFreshAdminSession: requireFreshAdminSessionMock,
}));

vi.mock("@/server/better-auth/auth.role.server", () => ({
  setStoredUserRole: setStoredUserRoleMock,
}));

vi.mock("@/server/db/db.postgres.adapter.server", () => ({
  getDb: () => ({
    query: {
      user: {
        findFirst: findFirstMock,
      },
    },
  }),
}));

import {
  banUserAction,
  createOperatorInviteAction,
  resendOperatorInviteAction,
  revokeUserSessionAction,
  revokeUserSessionsAction,
  setUserRoleAction,
  unbanUserAction,
} from "@/app/(app)/iam/admin/users/admin-users.actions.server";

describe("admin user server actions", () => {
  beforeEach(() => {
    banUserMock.mockReset();
    buildOperatorInviteUrlMock.mockReset();
    buildOperatorInviteUrlMock.mockReturnValue(
      "https://afenda.test/iam/accept-invite?token=invite-token",
    );
    createOrRefreshOperatorInviteMock.mockReset();
    createOrRefreshOperatorInviteMock.mockResolvedValue({
      email: "invitee@afenda.test",
      id: "invite-1",
      role: "admin",
      token: "invite-token",
    });
    findFirstMock.mockReset();
    findFirstMock.mockResolvedValue(null);
    headersMock.mockReset();
    headersMock.mockResolvedValue(listHeaders);
    requireFreshAdminSessionMock.mockReset();
    requireFreshAdminSessionMock.mockResolvedValue({
      session: { id: "session-1" },
      user: {
        email: "admin@afenda.test",
        id: "admin-1",
        name: "Admin One",
        role: "admin",
      },
    });
    revalidatePathMock.mockReset();
    revokeUserSessionMock.mockReset();
    revokeUserSessionsMock.mockReset();
    sendOperatorInviteEmailMock.mockReset();
    setStoredUserRoleMock.mockReset();
    unbanUserMock.mockReset();
  });

  it("sets a user's role and revalidates the admin route", async () => {
    const formData = new FormData();
    formData.set("userId", "user-1");
    formData.set("role", "operator");

    await setUserRoleAction(formData);

    expect(requireFreshAdminSessionMock).toHaveBeenCalledWith("/iam/admin/users");
    expect(setStoredUserRoleMock).toHaveBeenCalledWith("user-1", "operator");
    expect(revalidatePathMock).toHaveBeenCalledWith("/iam/admin/users");
  });

  it("bans a user with an optional reason and revalidates the route", async () => {
    const formData = new FormData();
    formData.set("userId", "user-2");
    formData.set("banReason", "Account abuse");

    await banUserAction(formData);

    expect(banUserMock).toHaveBeenCalledWith({
      body: { banReason: "Account abuse", userId: "user-2" },
      headers: listHeaders,
    });
    expect(revalidatePathMock).toHaveBeenCalledWith("/iam/admin/users");
  });

  it("unbans a user and revalidates the route", async () => {
    const formData = new FormData();
    formData.set("userId", "user-3");

    await unbanUserAction(formData);

    expect(unbanUserMock).toHaveBeenCalledWith({
      body: { userId: "user-3" },
      headers: listHeaders,
    });
    expect(revalidatePathMock).toHaveBeenCalledWith("/iam/admin/users");
  });

  it("revokes a single user session and revalidates the route", async () => {
    const formData = new FormData();
    formData.set("sessionToken", "token-1");

    await revokeUserSessionAction(formData);

    expect(revokeUserSessionMock).toHaveBeenCalledWith({
      body: { sessionToken: "token-1" },
      headers: listHeaders,
    });
    expect(revalidatePathMock).toHaveBeenCalledWith("/iam/admin/users");
  });

  it("revokes all sessions for a user and revalidates the route", async () => {
    const formData = new FormData();
    formData.set("userId", "user-4");

    await revokeUserSessionsAction(formData);

    expect(revokeUserSessionsMock).toHaveBeenCalledWith({
      body: { userId: "user-4" },
      headers: listHeaders,
    });
    expect(revalidatePathMock).toHaveBeenCalledWith("/iam/admin/users");
  });

  it("creates an operator invite and sends the onboarding email", async () => {
    const formData = new FormData();
    formData.set("email", "INVITEE@afenda.test");
    formData.set("role", "admin");

    await createOperatorInviteAction(formData);

    expect(createOrRefreshOperatorInviteMock).toHaveBeenCalledWith({
      email: "invitee@afenda.test",
      invitedById: "admin-1",
      role: "admin",
    });
    expect(sendOperatorInviteEmailMock).toHaveBeenCalledWith({
      acceptUrl: "https://afenda.test/iam/accept-invite?token=invite-token",
      email: "invitee@afenda.test",
      invitedByName: "Admin One",
      role: "admin",
    });
    expect(revalidatePathMock).toHaveBeenCalledWith("/iam/admin/users");
  });

  it("resends an operator invite with a refreshed token", async () => {
    const formData = new FormData();
    formData.set("email", "invitee@afenda.test");
    formData.set("role", "operator");

    await resendOperatorInviteAction(formData);

    expect(createOrRefreshOperatorInviteMock).toHaveBeenCalledWith({
      email: "invitee@afenda.test",
      invitedById: "admin-1",
      role: "operator",
    });
    expect(sendOperatorInviteEmailMock).toHaveBeenCalled();
    expect(revalidatePathMock).toHaveBeenCalledWith("/iam/admin/users");
  });
});
