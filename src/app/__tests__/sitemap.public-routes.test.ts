import { describe, expect, it } from "vitest";

import { publicTrustIndexableRoutes } from "@/features/public-trust/public-trust.content.data.fixture";
import { publicAppOrigin } from "@/lib/url.public-app-origin.shared";

import sitemap from "../sitemap";

describe("public sitemap", () => {
  it("includes the landing and live trust routes", () => {
    const entries = sitemap();
    const urls = entries.map((entry) => entry.url);
    const base = publicAppOrigin();

    expect(urls).toEqual(
      expect.arrayContaining([
        base,
        ...publicTrustIndexableRoutes.map((route) => `${base}${route}`),
      ]),
    );
  });
});
