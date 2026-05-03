import "server-only";

import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { env } from "@/env";
import { getDb } from "@/server/db/db.server";

function createAuth() {
  const github =
    env.BETTER_AUTH_GITHUB_CLIENT_ID && env.BETTER_AUTH_GITHUB_CLIENT_SECRET
      ? {
          github: {
            clientId: env.BETTER_AUTH_GITHUB_CLIENT_ID,
            clientSecret: env.BETTER_AUTH_GITHUB_CLIENT_SECRET,
            redirectURI: `${getBaseUrl()}/api/auth/callback/github`,
          },
        }
      : {};

  return betterAuth({
    baseURL: getBaseUrl(),
    database: drizzleAdapter(getDb(), {
      provider: "pg",
    }),
    emailAndPassword: {
      enabled: true,
    },
    socialProviders: github,
  });
}

let auth: ReturnType<typeof createAuth> | undefined;

export function getAuth() {
  auth ??= createAuth();
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

export type Session = ReturnType<typeof getAuth>["$Infer"]["Session"];
