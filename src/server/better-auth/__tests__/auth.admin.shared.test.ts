/**
 * @afenda-owner auth
 * @afenda-subject admin
 * @afenda-artifact test
 * @afenda-boundary test
 * @afenda-description Test coverage for shared admin-role helpers
 */
import { describe, expect, it } from "vitest";

import {
  getUserRoles,
  hasAdminAccess,
  hasVerifiedEmailAccess,
  hasVerifiedOperatorAccess,
  parseAdminUserIds,
} from "@/server/better-auth/auth.admin.shared";

describe("auth admin shared helpers", () => {
  it("parses bootstrap admin ids from comma-delimited env input", () => {
    expect(
      parseAdminUserIds(" user-1, user-2, user-1 ,, bootstrap-admin "),
    ).toEqual(["user-1", "user-2", "bootstrap-admin"]);
  });

  it("defaults missing roles to user", () => {
    expect(getUserRoles(undefined)).toEqual(["user"]);
    expect(getUserRoles(null)).toEqual(["user"]);
  });

  it("grants admin access from either stored role or bootstrap allowlist", () => {
    expect(hasAdminAccess({ id: "user-1", role: "admin" })).toBe(true);
    expect(
      hasAdminAccess({ id: "bootstrap-admin", role: undefined }, [
        "bootstrap-admin",
      ]),
    ).toBe(true);
    expect(hasAdminAccess({ id: "user-2", role: "user" })).toBe(false);
  });

  it("separates verified email from operator-grade access", () => {
    expect(
      hasVerifiedEmailAccess({
        emailVerified: true,
        id: "user-1",
        role: "user",
      }),
    ).toBe(true);
    expect(
      hasVerifiedOperatorAccess({
        emailVerified: true,
        id: "user-1",
        role: "user",
      }),
    ).toBe(false);
    expect(
      hasVerifiedOperatorAccess({
        emailVerified: true,
        id: "user-2",
        role: "operator",
      }),
    ).toBe(true);
  });
});
