/**
 * @afenda-owner auth
 * @afenda-subject policy
 * @afenda-artifact test
 * @afenda-boundary test
 * @afenda-description Test coverage for server auth policy helpers
 */
import { beforeEach, describe, expect, it, vi } from "vitest";

const { getSessionMock, redirectMock } = vi.hoisted(() => ({
  getSessionMock: vi.fn(),
  redirectMock: vi.fn((href: string) => {
    throw new Error(`REDIRECT:${href}`);
  }),
}));

vi.mock("server-only", () => ({}));

vi.mock("next/navigation", () => ({
  redirect: redirectMock,
}));

vi.mock("@/env", () => ({
  env: {
    BETTER_AUTH_ADMIN_USER_IDS: "bootstrap-admin, backup-admin",
  },
}));

vi.mock("@/server/better-auth/auth.session.query.server", () => ({
  getSession: getSessionMock,
}));

import {
  isAdminSession,
  isFreshSession,
  isVerifiedEmailSession,
  requireAdminSession,
  requireAnonymous,
  requireFreshAdminSession,
  requireFreshSession,
  requireFreshVerifiedEmailSession,
  requireSession,
  requireStepUpSession,
  requireVerifiedEmail,
  requireVerifiedOperatorSession,
} from "@/server/better-auth/auth.policy.server";

describe("auth policy helpers", () => {
  beforeEach(() => {
    redirectMock.mockClear();
    getSessionMock.mockReset();
  });

  it("returns the active session for authenticated routes", async () => {
    const session = {
      session: { createdAt: new Date("2026-05-04T00:00:00Z"), id: "session-1" },
      user: { id: "user-1" },
    };

    getSessionMock.mockResolvedValue(session);

    await expect(requireSession("/account/security")).resolves.toBe(session);
    expect(redirectMock).not.toHaveBeenCalled();
  });

  it("redirects anonymous requests to sign-in with a preserved callback", async () => {
    getSessionMock.mockResolvedValue(null);

    await expect(requireSession("/account/security")).rejects.toThrow(
      "REDIRECT:/sign-in?callbackUrl=%2Faccount%2Fsecurity",
    );
  });

  it("redirects authenticated users away from anonymous-only routes", async () => {
    getSessionMock.mockResolvedValue({
      session: { createdAt: new Date("2026-05-04T00:00:00Z"), id: "session-1" },
      user: { id: "user-1" },
    });

    await expect(requireAnonymous("/")).rejects.toThrow("REDIRECT:/");
  });

  it("treats verified email as a separate trust tier", async () => {
    getSessionMock.mockResolvedValue({
      session: { createdAt: new Date("2026-05-04T00:00:00Z"), id: "session-1" },
      user: { emailVerified: true, id: "user-1", role: "user" },
    });

    await expect(isVerifiedEmailSession()).resolves.toBe(true);
    await expect(requireVerifiedEmail("/account/security")).resolves.toEqual({
      session: { createdAt: new Date("2026-05-04T00:00:00Z"), id: "session-1" },
      user: { emailVerified: true, id: "user-1", role: "user" },
    });
  });

  it("redirects unverified users away from verified-email routes", async () => {
    getSessionMock.mockResolvedValue({
      session: { createdAt: new Date("2026-05-04T00:00:00Z"), id: "session-1" },
      user: { emailVerified: false, id: "user-1", role: "user" },
    });

    await expect(requireVerifiedEmail("/account/security")).rejects.toThrow(
      "REDIRECT:/",
    );
  });

  it("requires an explicit operator role for operator-grade routes", async () => {
    getSessionMock.mockResolvedValue({
      session: { createdAt: new Date("2026-05-04T00:00:00Z"), id: "session-1" },
      user: { emailVerified: true, id: "user-1", role: "user" },
    });

    await expect(requireVerifiedOperatorSession("/")).rejects.toThrow(
      "REDIRECT:/",
    );
  });

  it("allows verified operator sessions through the stricter policy gate", async () => {
    getSessionMock.mockResolvedValue({
      session: { createdAt: new Date("2026-05-04T00:00:00Z"), id: "session-1" },
      user: { emailVerified: true, id: "user-1", role: "operator" },
    });

    await expect(requireVerifiedOperatorSession("/")).resolves.toEqual({
      session: { createdAt: new Date("2026-05-04T00:00:00Z"), id: "session-1" },
      user: { emailVerified: true, id: "user-1", role: "operator" },
    });
  });

  it("allows bootstrap admins through verified-operator checks during rollout", async () => {
    getSessionMock.mockResolvedValue({
      session: { createdAt: new Date("2026-05-04T00:00:00Z"), id: "session-1" },
      user: { emailVerified: false, id: "bootstrap-admin", role: "user" },
    });

    await expect(requireVerifiedOperatorSession("/")).resolves.toEqual({
      session: { createdAt: new Date("2026-05-04T00:00:00Z"), id: "session-1" },
      user: { emailVerified: false, id: "bootstrap-admin", role: "user" },
    });
  });

  it("detects admin sessions from the stored admin role", async () => {
    getSessionMock.mockResolvedValue({
      session: { createdAt: new Date("2026-05-04T00:00:00Z"), id: "session-1" },
      user: { emailVerified: true, id: "user-1", role: "admin" },
    });

    await expect(isAdminSession()).resolves.toBe(true);
  });

  it("treats bootstrap allowlisted users as admin sessions", async () => {
    getSessionMock.mockResolvedValue({
      session: { createdAt: new Date("2026-05-04T00:00:00Z"), id: "session-1" },
      user: { emailVerified: false, id: "bootstrap-admin" },
    });

    await expect(requireAdminSession("/admin/users")).resolves.toEqual({
      session: { createdAt: new Date("2026-05-04T00:00:00Z"), id: "session-1" },
      user: { emailVerified: false, id: "bootstrap-admin" },
    });
  });

  it("redirects signed-in non-admin operators away from admin routes", async () => {
    getSessionMock.mockResolvedValue({
      session: { createdAt: new Date("2026-05-04T00:00:00Z"), id: "session-1" },
      user: { emailVerified: true, id: "user-1", role: "operator" },
    });

    await expect(requireAdminSession("/admin/users")).rejects.toThrow(
      "REDIRECT:/",
    );
  });

  it("detects fresh sessions separately from baseline authentication", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-05-04T00:04:00Z"));
    getSessionMock.mockResolvedValue({
      session: { createdAt: new Date("2026-05-04T00:00:00Z"), id: "session-1" },
      user: { emailVerified: true, id: "user-1", role: "user" },
    });

    await expect(isFreshSession()).resolves.toBe(true);
    await expect(requireFreshSession("/account/security")).resolves.toEqual({
      session: { createdAt: new Date("2026-05-04T00:00:00Z"), id: "session-1" },
      user: { emailVerified: true, id: "user-1", role: "user" },
    });
    await expect(requireStepUpSession("/account/security")).resolves.toEqual({
      session: { createdAt: new Date("2026-05-04T00:00:00Z"), id: "session-1" },
      user: { emailVerified: true, id: "user-1", role: "user" },
    });
    vi.useRealTimers();
  });

  it("redirects stale sessions to the signed-in step-up route", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-05-04T00:20:00Z"));
    getSessionMock.mockResolvedValue({
      session: { createdAt: new Date("2026-05-04T00:00:00Z"), id: "session-1" },
      user: { emailVerified: true, id: "user-1", role: "admin" },
    });

    await expect(requireFreshSession("/account/security")).rejects.toThrow(
      "REDIRECT:/account/step-up?callbackUrl=%2Faccount%2Fsecurity",
    );
    await expect(
      requireFreshVerifiedEmailSession("/account/security"),
    ).rejects.toThrow(
      "REDIRECT:/account/step-up?callbackUrl=%2Faccount%2Fsecurity",
    );
    await expect(requireFreshAdminSession("/admin/users")).rejects.toThrow(
      "REDIRECT:/account/step-up?callbackUrl=%2Fadmin%2Fusers",
    );
    vi.useRealTimers();
  });
});
