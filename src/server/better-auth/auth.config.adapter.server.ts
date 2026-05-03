import "server-only";

/**
 * @afenda-owner auth
 * @afenda-subject config
 * @afenda-artifact adapter
 * @afenda-boundary server
 * @afenda-description Server auth config adapter for Better Auth runtime access
 */
import { dash, sentinel } from "@better-auth/infra";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";

import { env } from "@/env";
import { getDb } from "@/server/db/db.postgres.adapter.server";

const baseURL = getBaseUrl();
const trustedOrigins = getTrustedOrigins(baseURL);

const socialProviders = {
  ...(env.BETTER_AUTH_GITHUB_CLIENT_ID && env.BETTER_AUTH_GITHUB_CLIENT_SECRET
    ? {
        github: {
          clientId: env.BETTER_AUTH_GITHUB_CLIENT_ID,
          clientSecret: env.BETTER_AUTH_GITHUB_CLIENT_SECRET,
          redirectURI: `${baseURL}/api/auth/callback/github`,
        },
      }
    : {}),
  ...(env.BETTER_AUTH_GOOGLE_CLIENT_ID && env.BETTER_AUTH_GOOGLE_CLIENT_SECRET
    ? {
        google: {
          clientId: env.BETTER_AUTH_GOOGLE_CLIENT_ID,
          clientSecret: env.BETTER_AUTH_GOOGLE_CLIENT_SECRET,
          redirectURI: `${baseURL}/api/auth/callback/google`,
        },
      }
    : {}),
  ...(env.BETTER_AUTH_LINKEDIN_CLIENT_ID &&
  env.BETTER_AUTH_LINKEDIN_CLIENT_SECRET
    ? {
        linkedin: {
          clientId: env.BETTER_AUTH_LINKEDIN_CLIENT_ID,
          clientSecret: env.BETTER_AUTH_LINKEDIN_CLIENT_SECRET,
          redirectURI: `${baseURL}/api/auth/callback/linkedin`,
        },
      }
    : {}),
};

export const auth = betterAuth({
  appName: env.NEXT_PUBLIC_APP_NAME ?? "Afenda",
  baseURL,
  trustedOrigins,
  ...(env.BETTER_AUTH_SECRET ? { secret: env.BETTER_AUTH_SECRET } : {}),
  database: drizzleAdapter(getDb(), {
    provider: "pg",
  }),
  account: {
    accountLinking: {
      enabled: true,
    },
    encryptOAuthTokens: true,
  },
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    ...(env.BETTER_AUTH_API_KEY
      ? [
          dash({
            apiKey: env.BETTER_AUTH_API_KEY,
            ...(env.BETTER_AUTH_API_URL
              ? { apiUrl: env.BETTER_AUTH_API_URL }
              : {}),
            ...(env.BETTER_AUTH_KV_URL
              ? { kvUrl: env.BETTER_AUTH_KV_URL }
              : {}),
          }),
          sentinel({
            apiKey: env.BETTER_AUTH_API_KEY,
            ...(env.BETTER_AUTH_API_URL
              ? { apiUrl: env.BETTER_AUTH_API_URL }
              : {}),
            ...(env.BETTER_AUTH_KV_URL
              ? { kvUrl: env.BETTER_AUTH_KV_URL }
              : {}),
            security: {
              credentialStuffing: {
                enabled: true,
                thresholds: { challenge: 3, block: 5 },
              },
            },
          }),
        ]
      : []),
    nextCookies(),
  ],
  socialProviders,
});

export function getAuth() {
  return auth;
}

function getBaseUrl() {
  if (env.BETTER_AUTH_URL) return env.BETTER_AUTH_URL;

  if (env.NODE_ENV === "production") {
    throw new Error(
      "BETTER_AUTH_URL is required in production. " +
        "Set it to the canonical public origin (for example, https://erp.example.com).",
    );
  }

  if (process.env["VERCEL_PROJECT_PRODUCTION_URL"]) {
    return `https://${process.env["VERCEL_PROJECT_PRODUCTION_URL"]}`;
  }
  if (process.env["VERCEL_URL"]) {
    return `https://${process.env["VERCEL_URL"]}`;
  }

  return `http://localhost:${process.env["PORT"] ?? 3000}`;
}

function getTrustedOrigins(authBaseURL: string) {
  const origins = new Set<string>([new URL(authBaseURL).origin]);

  for (const origin of env.BETTER_AUTH_TRUSTED_ORIGINS?.split(",") ?? []) {
    const normalizedOrigin = origin.trim();
    if (normalizedOrigin) origins.add(new URL(normalizedOrigin).origin);
  }

  return [...origins];
}

export type Session = typeof auth.$Infer.Session;
