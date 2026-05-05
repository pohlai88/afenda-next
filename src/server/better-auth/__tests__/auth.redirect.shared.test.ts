/**
 * @afenda-owner auth
 * @afenda-subject redirect
 * @afenda-artifact test
 * @afenda-boundary test
 * @afenda-description Test coverage for callback-safe auth redirect helpers
 */
import { describe, expect, it } from "vitest";

import {
  getSignInHref,
  safeInternalPath,
} from "@/server/better-auth/auth.redirect.shared";

describe("auth redirect helpers", () => {
  it("keeps same-origin internal callback paths", () => {
    expect(safeInternalPath("/iam/account/security", "/")).toBe(
      "/iam/account/security",
    );
    expect(safeInternalPath("/interface-studio?mode=grid", "/")).toBe(
      "/interface-studio?mode=grid",
    );
  });

  it("rejects external and malformed callback paths", () => {
    expect(safeInternalPath("https://example.com", "/")).toBe("/");
    expect(safeInternalPath("//example.com", "/")).toBe("/");
    expect(safeInternalPath("javascript:alert(1)", "/")).toBe("/");
    expect(safeInternalPath("/https://example.com", "/")).toBe("/");
    expect(safeInternalPath("/broken%ZZ", "/")).toBe("/");
  });

  it("builds sign-in redirects with encoded internal callback paths", () => {
    expect(getSignInHref("/iam/account/security")).toBe(
      "/iam/sign-in?callbackUrl=%2Fiam%2Faccount%2Fsecurity",
    );
  });
});
