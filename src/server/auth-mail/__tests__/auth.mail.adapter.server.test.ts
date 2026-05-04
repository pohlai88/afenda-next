/**
 * @afenda-owner auth
 * @afenda-subject auth-mail
 * @afenda-artifact transport-test
 * @afenda-boundary test
 * @afenda-description Test coverage for Better Auth mail config resolution and Resend transport behavior
 */
import { afterEach, describe, expect, it, vi } from "vitest";

type EnvOverrides = Partial<{
  AUTH_FROM_EMAIL: string | undefined;
  AUTH_REPLY_TO_EMAIL: string | undefined;
  NEXT_PUBLIC_APP_NAME: string | undefined;
  RESEND_API_KEY: string | undefined;
}>;

vi.mock("server-only", () => ({}));

describe("auth mail config and transport", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
    vi.unstubAllGlobals();
  });

  it("resolves sender metadata from env", async () => {
    const mod = await loadConfigModule();

    expect(mod.getAuthMailConfig()).toEqual({
      appName: "Afenda",
      deliveryStatus: "ready",
      fromEmail: "no-reply@nexuscanon.com",
      hasResendApiKey: true,
      replyToEmail: "support@nexuscanon.com",
      senderDomain: "nexuscanon.com",
    });
  });

  it("fails clearly when AUTH_FROM_EMAIL is missing", async () => {
    const mod = await loadAdapterModule({
      AUTH_FROM_EMAIL: undefined,
    });

    await expect(
      mod.sendAuthVerificationEmail({
        appName: "Afenda",
        email: "user@afenda.test",
        verificationUrl: "https://afenda.test/verify",
      }),
    ).rejects.toThrow("AUTH_FROM_EMAIL is required to send auth email.");
  });

  it("fails clearly when RESEND_API_KEY is missing", async () => {
    const mod = await loadAdapterModule({
      RESEND_API_KEY: undefined,
    });

    await expect(
      mod.sendMagicLinkEmail({
        appName: "Afenda",
        email: "user@afenda.test",
        magicLinkUrl: "https://afenda.test/magic-link",
      }),
    ).rejects.toThrow("RESEND_API_KEY is required to send auth email.");
  });

  it("sends the normalized Resend payload", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ id: "email-1" }), {
        headers: { "content-type": "application/json" },
        status: 200,
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const mod = await loadAdapterModule();

    await mod.sendEmailOtpEmail({
      appName: "Ignored App Name",
      email: "user@afenda.test",
      otp: "123456",
      type: "sign-in",
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.resend.com/emails",
      expect.objectContaining({
        body: JSON.stringify({
          from: "no-reply@nexuscanon.com",
          html: "<p>Use this code to sign in to Ignored App Name.</p><p><strong>123456</strong></p>",
          reply_to: "support@nexuscanon.com",
          subject: "Your Ignored App Name sign-in code",
          text: "Use this code to sign in to Ignored App Name.\n\n123456",
          to: ["user@afenda.test"],
        }),
        headers: {
          Authorization: "Bearer re_test",
          "Content-Type": "application/json",
        },
        method: "POST",
      }),
    );
  });

  it("surfaces the Resend error message on failed delivery", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ message: "Domain not verified" }), {
        headers: { "content-type": "application/json" },
        status: 403,
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const mod = await loadAdapterModule();

    await expect(
      mod.sendOperatorInviteEmail({
        acceptUrl: "https://afenda.test/accept",
        email: "operator@afenda.test",
        invitedByName: "Admin One",
        role: "operator",
      }),
    ).rejects.toThrow(
      "Resend email delivery failed with status 403: Domain not verified",
    );
  });
});

async function loadConfigModule(overrides: EnvOverrides = {}) {
  vi.resetModules();
  vi.doMock("server-only", () => ({}));
  vi.doMock("@/env", () => ({
    env: buildEnv(overrides),
  }));

  return import("@/server/auth-mail/auth.mail.config.server");
}

async function loadAdapterModule(overrides: EnvOverrides = {}) {
  vi.resetModules();
  vi.doMock("server-only", () => ({}));
  vi.doMock("@/env", () => ({
    env: buildEnv(overrides),
  }));

  return import("@/server/auth-mail/auth.mail.adapter.server");
}

function buildEnv(overrides: EnvOverrides) {
  return {
    AUTH_FROM_EMAIL: "no-reply@nexuscanon.com",
    AUTH_REPLY_TO_EMAIL: "support@nexuscanon.com",
    NEXT_PUBLIC_APP_NAME: "Afenda",
    RESEND_API_KEY: "re_test",
    ...overrides,
  };
}
