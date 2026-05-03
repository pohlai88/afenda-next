import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Server runtime environment contract.
   *
   * This validates the secrets and connection settings required by the reviewed
   * server surfaces before the app boots into an invalid state.
   */
  server: {
    AUTH_SECRET: z.string().optional(),
    AUTH_URL: z.string().url().optional(),
    BETTER_AUTH_API_KEY: z.string().optional(),
    BETTER_AUTH_API_URL: z.string().url().optional(),
    BETTER_AUTH_KV_URL: z.string().url().optional(),
    GITHUB_INTEGRATION_CLIENT_ID: z.string().optional(),
    GITHUB_INTEGRATION_CLIENT_SECRET: z.string().optional(),
    GOOGLE_CLIENT_ID: z.string().optional(),
    GOOGLE_CLIENT_SECRET: z.string().optional(),
    LINKEDIN_CLIENT_ID: z.string().optional(),
    LINKEDIN_CLIENT_SECRET: z.string().optional(),
    BETTER_AUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string()
        : z.string().optional(),
    BETTER_AUTH_TRUSTED_ORIGINS: z.string().optional(),
    BETTER_AUTH_URL: z.string().url().optional(),
    BETTER_AUTH_GITHUB_CLIENT_ID: z.string().optional(),
    BETTER_AUTH_GITHUB_CLIENT_SECRET: z.string().optional(),
    BETTER_AUTH_GOOGLE_CLIENT_ID: z.string().optional(),
    BETTER_AUTH_GOOGLE_CLIENT_SECRET: z.string().optional(),
    BETTER_AUTH_LINKEDIN_CLIENT_ID: z.string().optional(),
    BETTER_AUTH_LINKEDIN_CLIENT_SECRET: z.string().optional(),
    DATABASE_URL: z.string().url(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
  },

  /**
   * Client-exposed environment contract.
   *
   * Only variables prefixed with `NEXT_PUBLIC_` belong here.
   */
  client: {
    NEXT_PUBLIC_APP_NAME: z.string().min(1).optional(),
    NEXT_PUBLIC_APP_URL: z.string().url().optional(),
    NEXT_PUBLIC_STAGE: z.string().optional(),
    /** Mirrors server `dash` / `sentinel` plugins when set to `"1"`. */
    NEXT_PUBLIC_BETTER_AUTH_INFRA: z.enum(["0", "1"]).optional(),
  },

  /**
   * Explicit runtime env mapping for Next.js server and browser execution.
   */
  runtimeEnv: {
    AUTH_SECRET: process.env["AUTH_SECRET"],
    AUTH_URL: process.env["AUTH_URL"],
    BETTER_AUTH_API_KEY: process.env["BETTER_AUTH_API_KEY"],
    BETTER_AUTH_API_URL: process.env["BETTER_AUTH_API_URL"],
    BETTER_AUTH_KV_URL: process.env["BETTER_AUTH_KV_URL"],
    GITHUB_INTEGRATION_CLIENT_ID: process.env["GITHUB_INTEGRATION_CLIENT_ID"],
    GITHUB_INTEGRATION_CLIENT_SECRET:
      process.env["GITHUB_INTEGRATION_CLIENT_SECRET"],
    GOOGLE_CLIENT_ID: process.env["GOOGLE_CLIENT_ID"],
    GOOGLE_CLIENT_SECRET: process.env["GOOGLE_CLIENT_SECRET"],
    LINKEDIN_CLIENT_ID: process.env["LINKEDIN_CLIENT_ID"],
    LINKEDIN_CLIENT_SECRET: process.env["LINKEDIN_CLIENT_SECRET"],
    NEXT_PUBLIC_APP_NAME: process.env["NEXT_PUBLIC_APP_NAME"],
    NEXT_PUBLIC_APP_URL: process.env["NEXT_PUBLIC_APP_URL"],
    NEXT_PUBLIC_STAGE: process.env["NEXT_PUBLIC_STAGE"],
    NEXT_PUBLIC_BETTER_AUTH_INFRA: process.env["NEXT_PUBLIC_BETTER_AUTH_INFRA"],
    BETTER_AUTH_SECRET:
      process.env["BETTER_AUTH_SECRET"] ?? process.env["AUTH_SECRET"],
    BETTER_AUTH_TRUSTED_ORIGINS: process.env["BETTER_AUTH_TRUSTED_ORIGINS"],
    BETTER_AUTH_URL: process.env["BETTER_AUTH_URL"] ?? process.env["AUTH_URL"],
    BETTER_AUTH_GITHUB_CLIENT_ID:
      process.env["BETTER_AUTH_GITHUB_CLIENT_ID"] ??
      process.env["GITHUB_INTEGRATION_CLIENT_ID"],
    BETTER_AUTH_GITHUB_CLIENT_SECRET:
      process.env["BETTER_AUTH_GITHUB_CLIENT_SECRET"] ??
      process.env["GITHUB_INTEGRATION_CLIENT_SECRET"],
    BETTER_AUTH_GOOGLE_CLIENT_ID:
      process.env["BETTER_AUTH_GOOGLE_CLIENT_ID"] ??
      process.env["GOOGLE_CLIENT_ID"],
    BETTER_AUTH_GOOGLE_CLIENT_SECRET:
      process.env["BETTER_AUTH_GOOGLE_CLIENT_SECRET"] ??
      process.env["GOOGLE_CLIENT_SECRET"],
    BETTER_AUTH_LINKEDIN_CLIENT_ID:
      process.env["BETTER_AUTH_LINKEDIN_CLIENT_ID"] ??
      process.env["LINKEDIN_CLIENT_ID"],
    BETTER_AUTH_LINKEDIN_CLIENT_SECRET:
      process.env["BETTER_AUTH_LINKEDIN_CLIENT_SECRET"] ??
      process.env["LINKEDIN_CLIENT_SECRET"],
    DATABASE_URL: process.env["DATABASE_URL"],
    NODE_ENV: process.env.NODE_ENV,
  },
  /**
   * Allow deferred env validation for build pipelines that assemble artifacts
   * before production secrets are injected.
   */
  skipValidation: !!process.env["SKIP_ENV_VALIDATION"],
  /**
   * Treat empty strings as unset values so required fields fail fast instead of
   * passing through as invalid but present configuration.
   */
  emptyStringAsUndefined: true,
});
