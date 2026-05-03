import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

/**
 * Thin optimistic redirect only. The route itself must still validate the
 * session on the server before exposing protected ERP data.
 */
export function proxy(request: NextRequest) {
  if (process.env["AFENDA_E2E_SKIP_AUTH_GUARD"] === "true") {
    return NextResponse.next();
  }

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
  matcher: ["/erp-workbench/:path*"],
};
