/**
 * @afenda-owner auth
 * @afenda-subject security
 * @afenda-artifact action-test
 * @afenda-boundary test
 * @afenda-description Test coverage for account security server actions behind the fresh-session gate
 */
import { beforeEach, describe, expect, it, vi } from "vitest";

const {
  deletePasskeyMock,
  headersMock,
  listHeaders,
  requireFreshVerifiedEmailSessionMock,
  revalidatePathMock,
  revokeOtherSessionsMock,
  revokeSessionMock,
} = vi.hoisted(() => ({
  deletePasskeyMock: vi.fn(),
  headersMock: vi.fn(),
  listHeaders: new Headers({ cookie: "session=1" }),
  requireFreshVerifiedEmailSessionMock: vi.fn(),
  revalidatePathMock: vi.fn(),
  revokeOtherSessionsMock: vi.fn(),
  revokeSessionMock: vi.fn(),
}));

vi.mock("next/cache", () => ({
  revalidatePath: revalidatePathMock,
}));

vi.mock("server-only", () => ({}));

vi.mock("next/headers", () => ({
  headers: headersMock,
}));

vi.mock("@/server/better-auth/auth.config.adapter.server", () => ({
  getAuth: () => ({
    api: {
      deletePasskey: deletePasskeyMock,
      revokeOtherSessions: revokeOtherSessionsMock,
      revokeSession: revokeSessionMock,
    },
  }),
}));

vi.mock("@/server/better-auth/auth.policy.server", () => ({
  requireFreshVerifiedEmailSession: requireFreshVerifiedEmailSessionMock,
}));

import {
  deletePasskeyAction,
  revokeOtherSessionsAction,
  revokeSessionAction,
} from "@/app/(app)/account/security/security.actions.server";

describe("account security server actions", () => {
  beforeEach(() => {
    deletePasskeyMock.mockReset();
    headersMock.mockReset();
    headersMock.mockResolvedValue(listHeaders);
    requireFreshVerifiedEmailSessionMock.mockReset();
    requireFreshVerifiedEmailSessionMock.mockResolvedValue({
      session: {
        createdAt: new Date("2026-05-04T00:00:00Z"),
        id: "session-1",
      },
      user: { emailVerified: true, id: "user-1", role: "user" },
    });
    revalidatePathMock.mockReset();
    revokeOtherSessionsMock.mockReset();
    revokeSessionMock.mockReset();
  });

  it("requires fresh verified-email access before revoking one session", async () => {
    await revokeSessionAction("token-1");

    expect(requireFreshVerifiedEmailSessionMock).toHaveBeenCalledWith(
      "/account/security",
    );
    expect(revokeSessionMock).toHaveBeenCalledWith({
      body: { token: "token-1" },
      headers: listHeaders,
    });
  });

  it("requires fresh verified-email access before revoking other sessions", async () => {
    await revokeOtherSessionsAction();

    expect(requireFreshVerifiedEmailSessionMock).toHaveBeenCalledWith(
      "/account/security",
    );
    expect(revokeOtherSessionsMock).toHaveBeenCalledWith({
      headers: listHeaders,
    });
  });

  it("requires fresh verified-email access before deleting a passkey", async () => {
    await deletePasskeyAction("passkey-1");

    expect(requireFreshVerifiedEmailSessionMock).toHaveBeenCalledWith(
      "/account/security",
    );
    expect(deletePasskeyMock).toHaveBeenCalledWith({
      body: { id: "passkey-1" },
      headers: listHeaders,
    });
  });
});
