import { getSessionCookie } from "better-auth/cookies";
import { type NextRequest, NextResponse } from "next/server";

/**
 * Thin optimistic redirect only. The route itself must still validate the
 * session on the server before exposing protected ERP data.
 */
export function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  if (sessionCookie) {
    return NextResponse.next();
  }

  const signInUrl = new URL("/sign-in", request.url);
  signInUrl.searchParams.set(
    "callbackUrl",
    `${request.nextUrl.pathname}${request.nextUrl.search}`,
  );

  return NextResponse.redirect(signInUrl);
}

export const config = {
  matcher: [
    "/account/identity/:path*",
    "/account/no-tenants",
    "/account/security/:path*",
    "/account/select-tenant",
    "/account/step-up/:path*",
    "/account/workspace/:path*",
    "/admin/:path*",
    "/auth/post-login",
    "/t/:path*",
  ],
};
