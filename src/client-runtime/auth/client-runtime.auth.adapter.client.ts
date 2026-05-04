"use client";

/**
 * @afenda-owner client-runtime
 * @afenda-subject auth
 * @afenda-artifact adapter
 * @afenda-boundary client
 * @afenda-description Client adapter for Better Auth browser sessions
 */
import { passkeyClient } from "@better-auth/passkey/client";
import { dashClient, sentinelClient } from "@better-auth/infra/client";
import {
  adminClient,
  emailOTPClient,
  magicLinkClient,
  twoFactorClient,
  usernameClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import { env } from "@/env";

/** Auth requests stay same-origin so browser and server share one auth origin. */
export const authClient = createAuthClient({
  fetchOptions: {
    credentials: "include",
  },
  plugins: [
    adminClient(),
    emailOTPClient(),
    magicLinkClient(),
    twoFactorClient(),
    usernameClient(),
    passkeyClient(),
    ...(env.NEXT_PUBLIC_BETTER_AUTH_INFRA === "1"
      ? [dashClient() as never, sentinelClient() as never]
      : []),
  ],
});

export type Session = typeof authClient.$Infer.Session;
