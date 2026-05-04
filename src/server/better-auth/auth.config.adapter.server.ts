import "server-only";

/**
 * @afenda-owner auth
 * @afenda-subject config
 * @afenda-artifact adapter
 * @afenda-boundary server
 * @afenda-description Server auth config adapter for Better Auth runtime access
 */
import { passkey } from "@better-auth/passkey";
import { dash, sentinel } from "@better-auth/infra";
import { betterAuth } from "better-auth";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import {
  admin,
  emailOTP,
  magicLink,
  twoFactor,
  username,
} from "better-auth/plugins";

import { env } from "@/env";
import {
  sendChangeEmailConfirmationEmail,
  sendAuthVerificationEmail,
  sendDeleteAccountVerificationEmail,
  sendEmailOtpEmail,
  sendMagicLinkEmail,
  sendResetPasswordEmail,
} from "@/server/auth-mail/auth.mail.adapter.server";
import { recordAuthEvent } from "@/server/better-auth/auth.audit.server";
import { getDb } from "@/server/db/db.postgres.adapter.server";
import { parseAdminUserIds } from "./auth.admin.shared";
import { validateActiveOperatorInviteToken } from "./auth.operator-invite.server";
import {
  hasFreshSessionAge,
  stepUpFreshAgeSeconds,
  stepUpRequiredMessage,
} from "./auth.step-up.shared";

const baseURL = getBaseUrl();
const trustedOrigins = getTrustedOrigins(baseURL);
const appName = env.NEXT_PUBLIC_APP_NAME ?? "Afenda";

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
  appName,
  baseURL,
  trustedOrigins,
  ...(env.BETTER_AUTH_SECRET ? { secret: env.BETTER_AUTH_SECRET } : {}),
  database: drizzleAdapter(getDb(), {
    provider: "pg",
  }),
  session: {
    cookieCache: {
      maxAge: 300,
      refreshCache: false,
    },
    deferSessionRefresh: false,
    expiresIn: 60 * 60 * 24 * 7,
    freshAge: stepUpFreshAgeSeconds,
    updateAge: 60 * 60 * 24,
  },
  account: {
    accountLinking: {
      enabled: true,
      allowDifferentEmails: false,
      allowUnlinkingAll: false,
      trustedProviders: [],
      updateUserInfoOnLink: false,
    },
    encryptOAuthTokens: true,
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    customSyntheticUser: ({ additionalFields, coreFields, id }) => ({
      ...coreFields,
      role: "user",
      banned: false,
      banReason: null,
      banExpires: null,
      twoFactorEnabled: false,
      ...additionalFields,
      id,
    }),
    requireEmailVerification: false,
    revokeSessionsOnPasswordReset: true,
    sendResetPassword: async ({ url, user }) => {
      void sendResetPasswordEmail({
        appName,
        email: user.email,
        resetUrl: url,
      });
    },
    onPasswordReset: async ({ user }) => {
      await recordAuthEvent({
        actorEmail: user.email,
        actorUserId: user.id,
        eventType: "password_reset",
      });
    },
  },
  emailVerification: {
    afterEmailVerification: async (user) => {
      await recordAuthEvent({
        actorEmail: user.email,
        actorUserId: user.id,
        eventType: "email_verified",
      });
    },
    beforeEmailVerification: async (user) => {
      await recordAuthEvent({
        actorEmail: user.email,
        actorUserId: user.id,
        eventType: "email_verified",
        metadata: { status: "requested" },
      });
    },
    expiresIn: 60 * 60 * 24,
    sendOnSignIn: true,
    sendOnSignUp: true,
    sendVerificationEmail: async ({ url, user }) => {
      void sendAuthVerificationEmail({
        appName,
        email: user.email,
        verificationUrl: url,
      });
    },
  },
  user: {
    changeEmail: {
      enabled: true,
      sendChangeEmailConfirmation: async ({ newEmail, token, url, user }) => {
        void sendChangeEmailConfirmationEmail({
          appName,
          currentEmail: user.email,
          newEmail,
          verificationUrl: url,
        });
      },
      updateEmailWithoutVerification: false,
    },
    deleteUser: {
      enabled: true,
      afterDelete: async (user) => {
        await recordAuthEvent({
          actorEmail: user.email,
          actorUserId: user.id,
          eventType: "account_deleted",
        });
      },
      beforeDelete: async (user) => {
        const persistedUser = await getDb().query.user.findFirst({
          columns: { role: true },
          where: (fields, { eq }) => eq(fields.id, user.id),
        });
        const roles = new Set(
          (persistedUser?.role ?? "user")
            .split(",")
            .map((item: string) => item.trim())
            .filter(Boolean),
        );
        if (
          parseAdminUserIds(env.BETTER_AUTH_ADMIN_USER_IDS).includes(user.id) ||
          roles.has("admin") ||
          roles.has("operator")
        ) {
          throw new APIError("FORBIDDEN", {
            message:
              "Operator and admin accounts cannot self-delete. Contact an administrator instead.",
          });
        }
      },
      deleteTokenExpiresIn: 60 * 60 * 24,
      sendDeleteAccountVerification: async ({ url, user }) => {
        await recordAuthEvent({
          actorEmail: user.email,
          actorUserId: user.id,
          eventType: "account_delete_requested",
        });

        void sendDeleteAccountVerificationEmail({
          appName,
          deleteUrl: url,
          email: user.email,
        });
      },
    },
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/is-username-available") {
        throw new APIError("FORBIDDEN", {
          message: "Username availability checks are disabled.",
        });
      }

      if (ctx.path !== "/sign-up/email") {
        if (!requiresFreshSessionForAuthPath(ctx.path)) {
          return;
        }

        const sessionToken = ctx.getCookie(ctx.context.authCookies.sessionToken.name);
        if (!sessionToken) {
          return;
        }

        const activeSession = await getDb().query.session.findFirst({
          columns: {
            createdAt: true,
            expiresAt: true,
            id: true,
          },
          where: (fields, { eq }) => eq(fields.token, sessionToken),
        });

        if (
          !activeSession ||
          activeSession.expiresAt.getTime() <= Date.now() ||
          !hasFreshSessionAge(activeSession.createdAt)
        ) {
          throw new APIError("FORBIDDEN", {
            message: stepUpRequiredMessage,
          });
        }

        return;
      }

      const body = readInviteAwareBody(ctx.body);
      const email = typeof body["email"] === "string" ? body["email"] : "";
      const inviteToken =
        typeof body["inviteToken"] === "string" ? body["inviteToken"] : "";

      if (inviteToken.length === 0) {
        return;
      }

      const invite = await validateActiveOperatorInviteToken({
        email,
        token: inviteToken,
      });

      if (!invite) {
        throw new APIError("FORBIDDEN", {
          message: "A valid operator invitation is required to create an account.",
        });
      }

      return {
        context: {
          ...ctx,
          body: {
            ...body,
            email: invite.email,
          },
        },
      };
    }),
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
    admin({
      adminUserIds: parseAdminUserIds(env.BETTER_AUTH_ADMIN_USER_IDS),
    }),
    emailOTP({
      sendVerificationOTP: async ({ email, otp, type }) => {
        void sendEmailOtpEmail({
          appName,
          email,
          otp,
          type,
        });
      },
    }),
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        void sendMagicLinkEmail({
          appName,
          email,
          magicLinkUrl: url,
        });
      },
    }),
    twoFactor({
      allowPasswordless: true,
      issuer: appName,
    }),
    username({
      displayUsernameValidator: async (value) => value.trim().length >= 3,
      maxUsernameLength: 30,
      minUsernameLength: 3,
      usernameValidator: async (value) => /^[a-z0-9_.]+$/.test(value),
    }),
    passkey(getPasskeyOptions(baseURL, appName)),
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

function getPasskeyOptions(authBaseURL: string, authAppName: string) {
  const origin = new URL(authBaseURL).origin;
  const rpID = new URL(origin).hostname;

  return {
    origin,
    rpID,
    rpName: authAppName,
  };
}

export type Session = typeof auth.$Infer.Session;

function readInviteAwareBody(body: unknown) {
  return typeof body === "object" && body !== null
    ? (body as Record<string, unknown>)
    : {};
}

function requiresFreshSessionForAuthPath(path: string) {
  return (
    path === "/passkey/add-passkey" ||
    path === "/two-factor/disable" ||
    path === "/two-factor/enable" ||
    path === "/two-factor/generate-backup-codes" ||
    path === "/two-factor/verify-totp"
  );
}
