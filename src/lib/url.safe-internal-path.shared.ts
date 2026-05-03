/**
 * Prevent open redirects: only allow same-origin relative paths.
 */
export function safeInternalPath(raw: string | undefined, fallback: string): string {
  if (raw === undefined || raw === "") return fallback;
  const decoded = decodeURIComponent(raw);
  if (!decoded.startsWith("/") || decoded.startsWith("//")) return fallback;
  if (decoded.includes("://")) return fallback;
  return decoded;
}
