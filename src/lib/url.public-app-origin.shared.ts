/**
 * Canonical public HTTP origin for metadata routes (sitemap, robots, OG) and
 * `metadataBase`. Prefer `NEXT_PUBLIC_APP_URL`, then `BETTER_AUTH_URL`, then a
 * local default. Trailing slashes are stripped.
 */
export function publicAppOrigin(): string {
  const raw =
    process.env["NEXT_PUBLIC_APP_URL"]?.trim() ??
    process.env["BETTER_AUTH_URL"]?.trim() ??
    "http://localhost:3000";
  return raw.replace(/\/$/, "");
}
