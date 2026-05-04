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
    expect(safeInternalPath("/account/security", "/")).toBe(
      "/account/security",
    );
    expect(safeInternalPath("/interface-lab?mode=grid", "/")).toBe(
      "/interface-lab?mode=grid",
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
    expect(getSignInHref("/account/security")).toBe(
      "/sign-in?callbackUrl=%2Faccount%2Fsecurity",
    );
  });
});
