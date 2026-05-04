"use client";

/**
 * @afenda-owner auth
 * @afenda-subject step-up
 * @afenda-artifact route
 * @afenda-boundary client
 * @afenda-description Client re-authentication surface for sensitive authenticated mutations
 */
import { useEffect, useState } from "react";

import { authClient } from "@/client-runtime/auth/client-runtime.auth.adapter.client";
import {
  getStepUpTwoFactorHref,
  safeInternalPath,
} from "@/server/better-auth/auth.redirect.shared";
import type { OAuthProviderId } from "@/server/better-auth/auth.oauth.provider.shared";

const providerLabels: Record<OAuthProviderId, string> = {
  github: "GitHub",
  google: "Google",
  linkedin: "LinkedIn",
};

type Props = {
  callbackURL: string;
  currentEmail: string;
  hasPasswordAuth: boolean;
  oauthProviders: readonly OAuthProviderId[];
};

export function StepUpSurface({
  callbackURL,
  currentEmail,
  hasPasswordAuth,
  oauthProviders,
}: Props) {
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpRequested, setOtpRequested] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formNotice, setFormNotice] = useState<string | null>(null);
  const [passkeyAvailable, setPasskeyAvailable] = useState(false);
  const [pending, setPending] = useState<
    | "email-otp"
    | "magic-link"
    | "passkey"
    | "password-sign-in"
    | OAuthProviderId
    | null
  >(null);

  useEffect(() => {
    setPasskeyAvailable(isPasskeyContextSupported());
  }, []);

  async function onSendMagicLink() {
    setFormError(null);
    setFormNotice(null);
    setPending("magic-link");

    const { error } = await authClient.signIn.magicLink({
      callbackURL,
      email: currentEmail,
    });

    setPending(null);

    if (error) {
      setFormError(error.message ?? "Could not send a sign-in link.");
      return;
    }

    setFormNotice(
      "Sign-in link sent. Open it from your inbox to refresh this session.",
    );
  }

  async function onSendEmailOtp() {
    setFormError(null);
    setFormNotice(null);
    setPending("email-otp");

    const { error } = await authClient.emailOtp.sendVerificationOtp({
      email: currentEmail,
      type: "sign-in",
    });

    setPending(null);

    if (error) {
      setFormError(error.message ?? "Could not send a one-time code.");
      return;
    }

    setOtpRequested(true);
    setFormNotice("One-time code sent. Enter it below to continue.");
  }

  async function onContinueWithOtp() {
    if (otp.trim().length === 0) {
      setFormError("Enter the one-time code from your inbox.");
      return;
    }

    setFormError(null);
    setFormNotice(null);
    setPending("email-otp");

    const result = await authClient.signIn.emailOtp({
      email: currentEmail,
      otp: otp.trim(),
    });

    setPending(null);

    if (result.error) {
      setFormError(result.error.message ?? "Could not complete step-up.");
      return;
    }

    if (isTwoFactorRedirectResult(result.data)) {
      window.location.assign(
        getStepUpTwoFactorHref(callbackURL, result.data.twoFactorMethods ?? []),
      );
      return;
    }

    window.location.assign(safeInternalPath(callbackURL, "/"));
  }

  async function onPasswordSignIn() {
    setFormError(null);
    setFormNotice(null);
    setPending("password-sign-in");

    const result = await authClient.signIn.email({
      callbackURL,
      email: currentEmail,
      password,
    });

    setPending(null);

    if (result.error) {
      setFormError(result.error.message ?? "Could not confirm your password.");
      return;
    }

    if (isTwoFactorRedirectResult(result.data)) {
      window.location.assign(
        getStepUpTwoFactorHref(callbackURL, result.data.twoFactorMethods ?? []),
      );
      return;
    }

    window.location.assign(safeInternalPath(callbackURL, "/"));
  }

  async function onOAuth(provider: OAuthProviderId) {
    setFormError(null);
    setFormNotice(null);
    setPending(provider);

    const { error } = await authClient.signIn.social({
      callbackURL,
      provider,
    });

    setPending(null);

    if (error) {
      setFormError(error.message ?? `${providerLabels[provider]} sign-in failed.`);
    }
  }

  async function onPasskeySignIn() {
    setFormError(null);
    setFormNotice(null);
    setPending("passkey");

    const result = await authClient.signIn.passkey({
      autoFill: false,
    });

    setPending(null);

    if (result.error) {
      setFormError(result.error.message ?? "Passkey sign-in failed.");
      return;
    }

    if (isTwoFactorRedirectResult(result.data)) {
      window.location.assign(
        getStepUpTwoFactorHref(callbackURL, result.data.twoFactorMethods ?? []),
      );
      return;
    }

    if (result.data) {
      window.location.assign(safeInternalPath(callbackURL, "/"));
    }
  }

  return (
    <div className="space-y-6">
      <div className="border-border bg-surface-raised space-y-2 rounded-(--radius-control) border p-4">
        <p className="type-label text-foreground">Re-authenticating as</p>
        <p className="type-body-sm text-foreground">{currentEmail}</p>
        <p className="type-body-sm text-foreground-muted">
          Complete a recent sign-in to continue with this sensitive action.
        </p>
      </div>

      {formNotice ? (
        <div className="border-border bg-surface-raised rounded-(--radius-control) border p-4">
          <p className="type-body-sm text-foreground">{formNotice}</p>
        </div>
      ) : null}

      {passkeyAvailable ? (
        <div className="space-y-3">
          <p className="type-label text-foreground-muted">Passkey</p>
          <button
            className="min-w-40"
            disabled={pending === "passkey"}
            type="button"
            onClick={() => void onPasskeySignIn()}
          >
            {pending === "passkey" ? "Working..." : "Use passkey"}
          </button>
        </div>
      ) : null}

      {oauthProviders.length > 0 ? (
        <div className="space-y-3">
          <p className="type-label text-foreground-muted">OAuth</p>
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            {oauthProviders.map((id) => (
              <button
                key={id}
                className="min-w-40"
                disabled={pending === id}
                type="button"
                onClick={() => void onOAuth(id)}
              >
                {pending === id
                  ? `Working with ${providerLabels[id]}...`
                  : `Continue with ${providerLabels[id]}`}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="space-y-4">
        <p className="type-label text-foreground-muted">Email</p>
        <div className="border-border bg-surface-raised rounded-(--radius-control) border px-3 py-2">
          <p className="type-body-sm text-foreground">{currentEmail}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            disabled={pending === "magic-link"}
            type="button"
            onClick={() => void onSendMagicLink()}
          >
            {pending === "magic-link" ? "Sending link..." : "Send sign-in link"}
          </button>
          <button
            disabled={pending === "email-otp"}
            type="button"
            onClick={() => void onSendEmailOtp()}
          >
            {pending === "email-otp" ? "Sending code..." : "Send one-time code"}
          </button>
        </div>

        {otpRequested ? (
          <div className="border-border bg-surface-raised space-y-3 rounded-(--radius-control) border p-4">
            <Field
              autoComplete="one-time-code"
              label="One-time code"
              name="step-up-otp"
              required
              value={otp}
              onChange={setOtp}
            />
            <button
              disabled={pending === "email-otp"}
              type="button"
              onClick={() => void onContinueWithOtp()}
            >
              {pending === "email-otp" ? "Checking code..." : "Continue with code"}
            </button>
          </div>
        ) : null}
      </div>

      {hasPasswordAuth ? (
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            void onPasswordSignIn();
          }}
        >
          <p className="type-label text-foreground-muted">Password</p>
          <Field
            autoComplete="current-password webauthn"
            label="Current password"
            name="step-up-password"
            required
            type="password"
            value={password}
            onChange={setPassword}
          />
          <button disabled={pending === "password-sign-in"} type="submit">
            {pending === "password-sign-in"
              ? "Confirming..."
              : "Confirm with password"}
          </button>
        </form>
      ) : (
        <div className="border-border bg-surface-raised rounded-(--radius-control) border p-4">
          <p className="type-body-sm text-foreground-muted">
            This account does not have a stored password. Use passkey, OAuth,
            magic link, or a one-time code instead.
          </p>
        </div>
      )}

      {formError ? (
        <p className="type-meta text-danger-strong" role="alert">
          {formError}
        </p>
      ) : null}
    </div>
  );
}

function Field({
  label,
  name,
  onChange,
  ...props
}: {
  autoComplete?: string;
  label: string;
  name: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
  value: string;
}) {
  return (
    <label className="flex min-w-0 flex-col gap-2" htmlFor={name}>
      <span className="type-label">{label}</span>
      <input
        className="border-border bg-field rounded-(--radius-control) border px-3 py-2"
        id={name}
        name={name}
        onChange={(event) => onChange(event.currentTarget.value)}
        {...props}
      />
    </label>
  );
}

function isPasskeyContextSupported() {
  if (!("PublicKeyCredential" in window)) return false;

  return (
    window.location.protocol === "https:" ||
    window.location.hostname === "localhost"
  );
}

function isTwoFactorRedirectResult(value: unknown): value is {
  twoFactorMethods?: string[];
  twoFactorRedirect?: boolean;
} {
  return (
    typeof value === "object" &&
    value !== null &&
    "twoFactorRedirect" in value &&
    value.twoFactorRedirect === true
  );
}
