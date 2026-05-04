import type { MetadataRoute } from "next";

import { publicAppOrigin } from "@/lib/url.public-app-origin.shared";

/**
 * Crawl policy for the deployed origin. API and auth handler paths stay out
 * of the index; adjust `allow` when you add a public marketing site.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots(): MetadataRoute.Robots {
  const base = publicAppOrigin();
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
