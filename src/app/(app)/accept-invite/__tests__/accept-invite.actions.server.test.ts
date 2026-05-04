/**
 * @afenda-owner auth
 * @afenda-subject accept-invite
 * @afenda-artifact action-test
 * @afenda-boundary test
 * @afenda-description Test coverage for operator invite acceptance
 */
import { beforeEach, describe, expect, it, vi } from "vitest";

const {
  findFirstMock,
  getActiveOperatorInviteByTokenMock,
  headersMock,
  markOperatorInviteAcceptedMock,
  redirectMock,
  setStoredUserRoleMock,
  signUpEmailMock,
} = vi.hoisted(() => ({
  findFirstMock: vi.fn(),
  getActiveOperatorInviteByTokenMock: vi.fn(),
  headersMock: vi.fn(),
  markOperatorInviteAcceptedMock: vi.fn(),
  redirectMock: vi.fn((href: string) => {
    throw new Error(`REDIRECT:${href}`);
  }),
  setStoredUserRoleMock: vi.fn(),
  signUpEmailMock: vi.fn(),
}));

vi.mock("next/headers", () => ({
  headers: headersMock,
}));

vi.mock("next/navigation", () => ({
  redirect: redirectMock,
}));

vi.mock("@/server/better-auth/auth.operator-invite.server", () => ({
  getActiveOperatorInviteByToken: getActiveOperatorInviteByTokenMock,
  getVerificationCallbackUrl: () => "https://afenda.test/sign-in?verified=1",
  markOperatorInviteAccepted: markOperatorInviteAcceptedMock,
}));

vi.mock("@/server/better-auth/auth.config.adapter.server", () => ({
  getAuth: () => ({
    api: {
      signUpEmail: signUpEmailMock,
    },
  }),
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

import { acceptOperatorInviteAction } from "@/app/(app)/accept-invite/accept-invite.actions.server";

describe("accept operator invite action", () => {
  beforeEach(() => {
    findFirstMock.mockReset();
    findFirstMock.mockResolvedValue(null);
    getActiveOperatorInviteByTokenMock.mockReset();
    headersMock.mockReset();
    headersMock.mockResolvedValue(new Headers({}));
    markOperatorInviteAcceptedMock.mockReset();
    redirectMock.mockClear();
    setStoredUserRoleMock.mockReset();
    signUpEmailMock.mockReset();
    signUpEmailMock.mockResolvedValue({});
  });

  it("redirects invalid invites back to the acceptance route", async () => {
    getActiveOperatorInviteByTokenMock.mockResolvedValue(null);

    const formData = new FormData();
    formData.set("token", "missing");
    formData.set("name", "Operator");
    formData.set("password", "super-secret-password");

    await expect(acceptOperatorInviteAction(formData)).rejects.toThrow(
      "REDIRECT:/accept-invite?error=invalid-invite&token=missing",
    );
  });

  it("redirects existing accounts to sign-in instead of creating a duplicate", async () => {
    getActiveOperatorInviteByTokenMock.mockResolvedValue({
      email: "invitee@afenda.test",
      id: "invite-1",
      role: "operator",
    });
    findFirstMock.mockResolvedValue({ id: "user-1" });

    const formData = new FormData();
    formData.set("token", "invite-token");
    formData.set("name", "Operator");
    formData.set("password", "super-secret-password");

    await expect(acceptOperatorInviteAction(formData)).rejects.toThrow(
      "REDIRECT:/sign-in?email=invitee%40afenda.test&onboarding=existing-account",
    );
  });

  it("creates the invited account, binds the email, and marks the invite accepted", async () => {
    getActiveOperatorInviteByTokenMock.mockResolvedValue({
      email: "invitee@afenda.test",
      id: "invite-1",
      role: "operator",
    });
    findFirstMock.mockResolvedValueOnce(null).mockResolvedValueOnce({
      id: "user-1",
    });

    const formData = new FormData();
    formData.set("token", "invite-token");
    formData.set("name", "Operator");
    formData.set("password", "super-secret-password");

    await expect(acceptOperatorInviteAction(formData)).rejects.toThrow(
      "REDIRECT:/sign-in?email=invitee%40afenda.test&onboarding=check-email",
    );

    expect(signUpEmailMock).toHaveBeenCalledWith({
      body: {
        callbackURL: "https://afenda.test/sign-in?verified=1",
        email: "invitee@afenda.test",
        inviteToken: "invite-token",
        name: "Operator",
        password: "super-secret-password",
      },
      headers: expect.any(Headers),
    });
    expect(setStoredUserRoleMock).toHaveBeenCalledWith("user-1", "operator");
    expect(markOperatorInviteAcceptedMock).toHaveBeenCalledWith("invite-1");
  });
});
