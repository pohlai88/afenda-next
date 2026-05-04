import "server-only";

import { env } from "@/env";

export type AuthMailDeliveryStatus =
  | "missing-api-key"
  | "missing-from-email"
  | "ready";

export type AuthMailConfig = {
  appName: string;
  deliveryStatus: AuthMailDeliveryStatus;
  fromEmail: string | null;
  hasResendApiKey: boolean;
  replyToEmail: string | null;
  senderDomain: string | null;
};

type RequiredAuthMailSendConfig = {
  appName: string;
  fromEmail: string;
  resendApiKey: string;
  replyToEmail: string | null;
};

const fallbackAppName = "Afenda";

export function getAuthMailConfig(): AuthMailConfig {
  const appName =
    normalizeNonEmptyValue(env.NEXT_PUBLIC_APP_NAME) ?? fallbackAppName;
  const fromEmail = normalizeEmailValue(env.AUTH_FROM_EMAIL);
  const replyToEmail = normalizeEmailValue(env.AUTH_REPLY_TO_EMAIL);
  const hasResendApiKey = normalizeNonEmptyValue(env.RESEND_API_KEY) !== null;

  return {
    appName,
    deliveryStatus: !hasResendApiKey
      ? "missing-api-key"
      : !fromEmail
        ? "missing-from-email"
        : "ready",
    fromEmail,
    hasResendApiKey,
    replyToEmail,
    senderDomain: fromEmail ? extractEmailDomain(fromEmail) : null,
  };
}

export function resolveAuthMailAppName(appName?: string | null | undefined) {
  return normalizeNonEmptyValue(appName) ?? getAuthMailConfig().appName;
}

export function getRequiredAuthMailSendConfig(): RequiredAuthMailSendConfig {
  const config = getAuthMailConfig();

  if (!config.hasResendApiKey) {
    throw new Error("RESEND_API_KEY is required to send auth email.");
  }
  if (!config.fromEmail) {
    throw new Error("AUTH_FROM_EMAIL is required to send auth email.");
  }

  return {
    appName: config.appName,
    fromEmail: config.fromEmail,
    resendApiKey: env.RESEND_API_KEY!.trim(),
    replyToEmail: config.replyToEmail,
  };
}

function normalizeEmailValue(value: string | undefined) {
  return normalizeNonEmptyValue(value);
}

function normalizeNonEmptyValue(value: string | null | undefined) {
  const normalized = value?.trim();
  return normalized ? normalized : null;
}

function extractEmailDomain(email: string) {
  const atIndex = email.lastIndexOf("@");
  if (atIndex <= 0 || atIndex === email.length - 1) {
    return null;
  }

  return email.slice(atIndex + 1).toLowerCase();
}
