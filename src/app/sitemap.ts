import type { MetadataRoute } from "next";

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
  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
