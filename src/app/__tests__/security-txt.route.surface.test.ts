/**
 * @afenda-owner security-txt
 * @afenda-subject route
 * @afenda-artifact surface
 * @afenda-boundary test
 * @afenda-description Route surface coverage for the machine-readable security.txt endpoint
 */
import { describe, expect, it } from "vitest";

import {
  publicTrustOwnerRoutes,
  securityTxtExpiresAt,
  securityTxtHref,
} from "@/features/public-trust/public-trust.content.data.fixture";
import { securityDisclosureLink } from "@/app/(app)/(public)/(marketing)/(declaration-docs)/footer";
import { publicAppOrigin } from "@/lib/url.public-app-origin.shared";

import { GET } from "../.well-known/security.txt/route";

describe("security.txt route", () => {
  it("returns a machine-readable disclosure document", async () => {
    const response = GET();
    const body = await response.text();
    const origin = publicAppOrigin();

    expect(response.headers.get("content-type")).toBe(
      "text/plain; charset=utf-8",
    );
    expect(body).toContain(
      `Contact: mailto:${publicTrustOwnerRoutes.security.value}`,
    );
    expect(body).toContain(`Expires: ${securityTxtExpiresAt}`);
    expect(body).toContain(`Canonical: ${origin}${securityTxtHref}`);
    expect(body).toContain(`Policy: ${origin}${securityDisclosureLink.href}`);
    expect(body).toContain("Preferred-Languages: en");
  });
});
