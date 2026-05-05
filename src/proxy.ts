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

  const signInUrl = new URL("/iam/sign-in", request.url);
  signInUrl.searchParams.set(
    "callbackUrl",
    `${request.nextUrl.pathname}${request.nextUrl.search}`,
  );

  return NextResponse.redirect(signInUrl);
}

export const config = {
  matcher: [
    "/iam/account/identity/:path*",
    "/iam/account/no-tenants",
    "/iam/account/security/:path*",
    "/iam/account/select-tenant",
    "/iam/account/step-up/:path*",
    "/iam/account/workspace/:path*",
    "/iam/admin/:path*",
    "/iam/auth/post-login",
    "/iam/t/:path*",
  ],
};
