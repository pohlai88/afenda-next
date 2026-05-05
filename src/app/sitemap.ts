import type { MetadataRoute } from "next";

import { publicTrustIndexableRoutes } from "@/features/public-trust/public-trust.content.data.fixture";
import { publicAppOrigin } from "@/lib/url.public-app-origin.shared";

/**
 * Minimal sitemap for the authenticated ERP shell. Expand deliberately when
 * public, indexable routes exist (marketing, docs, status).
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = publicAppOrigin();
  const now = new Date();
  const publicRoutes = ["", ...publicTrustIndexableRoutes];

  return [
    ...publicRoutes.map((route, index) => ({
      url: `${base}${route}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: index === 0 ? 1 : 0.8,
    })),
  ];
}
