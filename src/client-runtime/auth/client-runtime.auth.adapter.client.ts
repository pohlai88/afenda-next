"use client";

/**
 * @afenda-owner client-runtime
 * @afenda-subject auth
 * @afenda-artifact adapter
 * @afenda-boundary client
 * @afenda-description Client adapter for Better Auth browser sessions
 */
import { dashClient, sentinelClient } from "@better-auth/infra/client";
import type { BetterAuthClientPlugin } from "better-auth/client";
import { createAuthClient } from "better-auth/react";

import { env } from "@/env";

const infraClientPlugins =
  env.NEXT_PUBLIC_BETTER_AUTH_INFRA === "1"
    ? ([dashClient(), sentinelClient()] as const as BetterAuthClientPlugin[])
    : [];

/** Auth requests stay same-origin so browser and server share one auth origin. */
export const authClient = createAuthClient({
  fetchOptions: {
    credentials: "include",
  },
  ...(infraClientPlugins.length > 0 ? { plugins: infraClientPlugins } : {}),
});

export type Session = typeof authClient.$Infer.Session;
