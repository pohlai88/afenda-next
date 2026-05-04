/**
 * @afenda-owner auth
 * @afenda-subject admin-users
 * @afenda-artifact route-test
 * @afenda-boundary test
 * @afenda-description Test coverage for the Better Auth admin users page route
 */
import { screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { renderWithProviders } from "@/test-runtime/test-runtime.render.helper.test";

const {
  getAuthMailConfigMock,
  headersMock,
  listOperatorInvitesMock,
  listUserSessionsMock,
  listUsersMock,
  requireFreshAdminSessionMock,
} = vi.hoisted(() => ({
  getAuthMailConfigMock: vi.fn(),
  headersMock: vi.fn(),
  listOperatorInvitesMock: vi.fn(),
  listUserSessionsMock: vi.fn(),
  listUsersMock: vi.fn(),
  requireFreshAdminSessionMock: vi.fn(),
}));

vi.mock("next/link", () => ({
  default: ({ children }: { children: ReactNode }) => children,
}));

vi.mock("next/headers", () => ({
  headers: headersMock,
}));

vi.mock("@/env", () => ({
  env: {
    BETTER_AUTH_ADMIN_USER_IDS: "bootstrap-admin",
  },
}));

vi.mock("@/server/auth-mail/auth.mail.config.server", () => ({
  getAuthMailConfig: getAuthMailConfigMock,
}));

vi.mock("@/server/better-auth/auth.operator-invite.server", () => ({
  getOperatorInviteState: (invite: { acceptedAt: Date | null; expiresAt: Date }) =>
    invite.acceptedAt
      ? "accepted"
      : invite.expiresAt.getTime() < Date.now()
        ? "expired"
        : "pending",
  listOperatorInvites: listOperatorInvitesMock,
}));

vi.mock("@/server/better-auth/auth.config.adapter.server", () => ({
  getAuth: () => ({
    api: {
      listUserSessions: listUserSessionsMock,
      listUsers: listUsersMock,
    },
  }),
}));

vi.mock("@/server/better-auth/auth.policy.server", () => ({
  requireFreshAdminSession: requireFreshAdminSessionMock,
}));

vi.mock("@/app/(app)/admin/users/admin-users.actions.server", () => ({
  banUserAction: vi.fn(),
  createOperatorInviteAction: vi.fn(),
  resendOperatorInviteAction: vi.fn(),
  revokeUserSessionAction: vi.fn(),
  revokeUserSessionsAction: vi.fn(),
  setUserRoleAction: vi.fn(),
  unbanUserAction: vi.fn(),
}));

import AdminUsersPage from "@/app/(app)/admin/users/page";

describe("admin users page route", () => {
  beforeEach(() => {
    getAuthMailConfigMock.mockReset();
    getAuthMailConfigMock.mockReturnValue({
      appName: "Afenda",
      deliveryStatus: "ready",
      fromEmail: "no-reply@nexuscanon.com",
      hasResendApiKey: true,
      replyToEmail: "support@nexuscanon.com",
      senderDomain: "nexuscanon.com",
    });
    headersMock.mockReset();
    headersMock.mockResolvedValue(new Headers({ cookie: "session=1" }));
    listOperatorInvitesMock.mockReset();
    listOperatorInvitesMock.mockResolvedValue([
      {
        acceptedAt: null,
        createdAt: new Date("2026-05-04T00:00:00Z"),
        email: "invitee@afenda.test",
        expiresAt: new Date("2026-05-11T00:00:00Z"),
        id: "invite-1",
        role: "operator",
      },
    ]);
    listUserSessionsMock.mockReset();
    listUserSessionsMock.mockResolvedValue({
      sessions: [
        {
          createdAt: new Date("2026-05-04T00:00:00Z"),
          expiresAt: new Date("2026-05-05T00:00:00Z"),
          id: "session-2",
          ipAddress: "127.0.0.1",
          token: "token-2",
          updatedAt: new Date("2026-05-04T00:30:00Z"),
          userAgent:
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/136.0 Safari/537.36",
        },
      ],
    });
    listUsersMock.mockReset();
    listUsersMock.mockResolvedValue({
      total: 1,
      users: [
        {
          banned: false,
          banExpires: null,
          banReason: null,
          email: "operator@afenda.test",
          emailVerified: true,
          id: "user-1",
          name: "Operator One",
          role: "operator",
        },
      ],
    });
    requireFreshAdminSessionMock.mockReset();
    requireFreshAdminSessionMock.mockResolvedValue({
      session: {
        createdAt: new Date("2026-05-04T00:00:00Z"),
        id: "session-1",
      },
      user: { emailVerified: true, id: "admin-1", role: "admin" },
    });
  });

  it("renders the admin user console for an admin session", async () => {
    renderWithProviders(
      await AdminUsersPage({
        searchParams: Promise.resolve({}),
      }),
    );

    expect(
      screen.getByRole("heading", { name: "Admin user controls" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Auth mail status" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Step-up status" }),
    ).toBeInTheDocument();
    expect(screen.getByText("no-reply@nexuscanon.com")).toBeInTheDocument();
    expect(screen.getByText("support@nexuscanon.com")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Operator invites" }),
    ).toBeInTheDocument();
    expect(screen.getByText("invitee@afenda.test")).toBeInTheDocument();
    expect(screen.getAllByText("Operator One")).toHaveLength(2);
    expect(screen.getAllByText("operator@afenda.test")).toHaveLength(2);
    expect(
      screen.getByRole("heading", { name: "Active sessions" }),
    ).toBeInTheDocument();
  });
});
