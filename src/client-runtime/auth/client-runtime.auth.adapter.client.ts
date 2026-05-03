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

const clientBaseURL = process.env["NEXT_PUBLIC_APP_URL"]?.replace(/\/$/u, "");

const infraClientPlugins =
  env.NEXT_PUBLIC_BETTER_AUTH_INFRA === "1"
    ? ([dashClient(), sentinelClient()] as const as BetterAuthClientPlugin[])
    : [];

/** Same origin when `NEXT_PUBLIC_APP_URL` is unset (dev default). */
export const authClient = createAuthClient({
  ...(clientBaseURL ? { baseURL: clientBaseURL } : {}),
  ...(infraClientPlugins.length > 0 ? { plugins: infraClientPlugins } : {}),
});

export type Session = typeof authClient.$Infer.Session;
