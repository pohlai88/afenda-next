import "server-only";

import {
  getRequiredAuthMailSendConfig,
  resolveAuthMailAppName,
} from "@/server/auth-mail/auth.mail.config.server";

const resendApiUrl = "https://api.resend.com/emails";

type AuthMailInput = {
  html: string;
  subject: string;
  text: string;
  to: string;
};

export async function sendOperatorInviteEmail(input: {
  acceptUrl: string;
  email: string;
  invitedByName?: string | null | undefined;
  role: string;
}) {
  const inviter = input.invitedByName?.trim() || "Afenda support";
  const roleLabel = input.role === "admin" ? "admin" : "operator";

  return sendAuthMail({
    html: [
      `<p>${escapeHtml(inviter)} invited you to Afenda as a ${escapeHtml(roleLabel)}.</p>`,
      `<p>Use the link below to activate your account and choose your password.</p>`,
      `<p><a href="${escapeHtml(input.acceptUrl)}">${escapeHtml(input.acceptUrl)}</a></p>`,
      "<p>This invitation expires in 7 days.</p>",
    ].join(""),
    subject: "Your Afenda operator invitation",
    text: [
      `${inviter} invited you to Afenda as a ${roleLabel}.`,
      "Use the link below to activate your account and choose your password.",
      input.acceptUrl,
      "This invitation expires in 7 days.",
    ].join("\n\n"),
    to: input.email,
  });
}

export async function sendAuthVerificationEmail(input: {
  appName: string;
  email: string;
  verificationUrl: string;
}) {
  const appName = resolveAuthMailAppName(input.appName);

  return sendAuthMail({
    html: [
      `<p>Verify your email address to continue into ${escapeHtml(appName)}.</p>`,
      `<p><a href="${escapeHtml(input.verificationUrl)}">${escapeHtml(input.verificationUrl)}</a></p>`,
    ].join(""),
    subject: `Verify your ${appName} email`,
    text: [
      `Verify your email address to continue into ${appName}.`,
      input.verificationUrl,
    ].join("\n\n"),
    to: input.email,
  });
}

export async function sendChangeEmailConfirmationEmail(input: {
  appName: string;
  currentEmail: string;
  newEmail: string;
  verificationUrl: string;
}) {
  const appName = resolveAuthMailAppName(input.appName);

  return sendAuthMail({
    html: [
      `<p>A request was made to change the ${escapeHtml(appName)} account email from ${escapeHtml(input.currentEmail)} to ${escapeHtml(input.newEmail)}.</p>`,
      `<p>Confirm the request from your current inbox first:</p>`,
      `<p><a href="${escapeHtml(input.verificationUrl)}">${escapeHtml(input.verificationUrl)}</a></p>`,
    ].join(""),
    subject: `Confirm your ${appName} email change`,
    text: [
      `A request was made to change the ${appName} account email from ${input.currentEmail} to ${input.newEmail}.`,
      "Confirm the request from your current inbox first:",
      input.verificationUrl,
    ].join("\n\n"),
    to: input.currentEmail,
  });
}

export async function sendMagicLinkEmail(input: {
  appName: string;
  email: string;
  magicLinkUrl: string;
}) {
  const appName = resolveAuthMailAppName(input.appName);

  return sendAuthMail({
    html: [
      `<p>Use this secure sign-in link to continue into ${escapeHtml(appName)}.</p>`,
      `<p><a href="${escapeHtml(input.magicLinkUrl)}">${escapeHtml(input.magicLinkUrl)}</a></p>`,
      "<p>This link expires shortly.</p>",
    ].join(""),
    subject: `Your ${appName} sign-in link`,
    text: [
      `Use this secure sign-in link to continue into ${appName}.`,
      input.magicLinkUrl,
      "This link expires shortly.",
    ].join("\n\n"),
    to: input.email,
  });
}

export async function sendResetPasswordEmail(input: {
  appName: string;
  email: string;
  resetUrl: string;
}) {
  const appName = resolveAuthMailAppName(input.appName);

  return sendAuthMail({
    html: [
      `<p>Use this secure link to reset your ${escapeHtml(appName)} password.</p>`,
      `<p><a href="${escapeHtml(input.resetUrl)}">${escapeHtml(input.resetUrl)}</a></p>`,
      "<p>This link expires shortly. If you did not request a reset, you can ignore this email.</p>",
    ].join(""),
    subject: `Reset your ${appName} password`,
    text: [
      `Use this secure link to reset your ${appName} password.`,
      input.resetUrl,
      "This link expires shortly. If you did not request a reset, you can ignore this email.",
    ].join("\n\n"),
    to: input.email,
  });
}

export async function sendDeleteAccountVerificationEmail(input: {
  appName: string;
  email: string;
  deleteUrl: string;
}) {
  const appName = resolveAuthMailAppName(input.appName);

  return sendAuthMail({
    html: [
      `<p>Confirm this request to delete your public ${escapeHtml(appName)} account.</p>`,
      `<p><a href="${escapeHtml(input.deleteUrl)}">${escapeHtml(input.deleteUrl)}</a></p>`,
      "<p>If you did not request this deletion, ignore this email.</p>",
    ].join(""),
    subject: `Confirm deletion of your ${appName} account`,
    text: [
      `Confirm this request to delete your public ${appName} account.`,
      input.deleteUrl,
      "If you did not request this deletion, ignore this email.",
    ].join("\n\n"),
    to: input.email,
  });
}

export async function sendEmailOtpEmail(input: {
  appName: string;
  email: string;
  otp: string;
  type: "email-verification" | "forget-password" | "sign-in" | "change-email";
}) {
  const appName = resolveAuthMailAppName(input.appName);
  const subject =
    input.type === "email-verification"
      ? `Verify your ${appName} email`
      : input.type === "forget-password"
        ? `Reset your ${appName} password`
        : input.type === "change-email"
          ? `Confirm your new ${appName} email`
          : `Your ${appName} sign-in code`;
  const lead =
    input.type === "email-verification"
      ? `Use this code to verify your email for ${appName}.`
      : input.type === "forget-password"
        ? `Use this code to reset your ${appName} password.`
        : input.type === "change-email"
          ? `Use this code to confirm your email change for ${appName}.`
          : `Use this code to sign in to ${appName}.`;

  return sendAuthMail({
    html: [
      `<p>${escapeHtml(lead)}</p>`,
      `<p><strong>${escapeHtml(input.otp)}</strong></p>`,
    ].join(""),
    subject,
    text: [lead, input.otp].join("\n\n"),
    to: input.email,
  });
}

async function sendAuthMail(input: AuthMailInput) {
  const mailConfig = getRequiredAuthMailSendConfig();

  const response = await fetch(resendApiUrl, {
    body: JSON.stringify({
      from: mailConfig.fromEmail,
      html: input.html,
      ...(mailConfig.replyToEmail
        ? { reply_to: mailConfig.replyToEmail }
        : {}),
      subject: input.subject,
      text: input.text,
      to: [input.to],
    }),
    headers: {
      Authorization: `Bearer ${mailConfig.resendApiKey}`,
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  if (!response.ok) {
    throw new Error(await buildResendFailureMessage(response));
  }
}

async function buildResendFailureMessage(response: Response) {
  const details = await readResendFailureDetails(response);

  return details
    ? `Resend email delivery failed with status ${response.status}: ${details}`
    : `Resend email delivery failed with status ${response.status}.`;
}

async function readResendFailureDetails(response: Response) {
  try {
    const contentType = response.headers.get("content-type") ?? "";

    if (contentType.includes("application/json")) {
      const payload = (await response.json()) as {
        error?: string;
        message?: string;
        name?: string;
      };

      return payload.message ?? payload.error ?? payload.name ?? null;
    }

    const payload = (await response.text()).trim();
    return payload.length > 0 ? payload : null;
  } catch {
    return null;
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
