import type { ReactNode } from "react";

/**
 * Route group `(app)` — URL-invisible segment that clusters product routes (public
 * marketing, IAM, interface studio) under shared loading/error/not-found boundaries.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/route-groups
 */
export default function AppRouteGroupLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
