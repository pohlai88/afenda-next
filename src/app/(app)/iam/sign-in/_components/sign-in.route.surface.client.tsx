"use client";

/**
 * @afenda-owner sign-in
 * @afenda-subject route
 * @afenda-artifact surface
 * @afenda-boundary client
 * @afenda-description Client sign-in route surface for Better Auth entry actions
 */
import { useEffect, useState } from "react";

import { authClient } from "@/client-runtime/auth/client-runtime.auth.adapter.client";
import type { OAuthProviderId } from "@/server/better-auth/auth.oauth.provider.shared";

const providerLabels: Record<OAuthProviderId, string> = {
  github: "GitHub",
  google: "Google",
  linkedin: "LinkedIn",
};

type Props = {
  callbackURL: string;
  initialEmail?: string | undefined;
  notice?: string | null | undefined;
  oauthProviders: readonly OAuthProviderId[];
};

export function SignInSurface({
  callbackURL,
  initialEmail = "",
  notice,
  oauthProviders,
}: Props) {
  const [activeMailFlow, setActiveMailFlow] = useState<
    "email-otp" | "magic-link" | "verification" | null
  >(null);
  const [cooldownUntil, setCooldownUntil] = useState<number | null>(null);
  const [passwordMode, setPasswordMode] = useState<"sign-in" | "register">(
    "sign-in",
  );
  const [passwordIdentifier, setPasswordIdentifier] = useState(initialEmail);
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [displayUsername, setDisplayUsername] = useState("");
  const [otp, setOtp] = useState("");
  const [otpRequested, setOtpRequested] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formNotice, setFormNotice] = useState<string | null>(notice ?? null);
  const [now, setNow] = useState(() => Date.now());
  const [passkeyAvailable, setPasskeyAvailable] = useState(false);
  const [pending, setPending] = useState<
    | "email-otp"
    | "magic-link"
    | "passkey"
    | "password-register"
    | "password-sign-in"
    | "verification"
    | OAuthProviderId
    | null
  >(null);

  useEffect(() => {
    setFormNotice(notice ?? null);
  }, [notice]);

  useEffect(() => {
    if (!cooldownUntil) return;

    const timer = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [cooldownUntil]);

  useEffect(() => {
    let cancelled = false;

    async function preloadConditionalPasskey() {
      if (!isPasskeyContextSupported()) return;

      setPasskeyAvailable(true);

      const publicKeyCredential =
        window.PublicKeyCredential as typeof PublicKeyCredential & {
          isConditionalMediationAvailable?: () => Promise<boolean>;
        };

      if (!publicKeyCredential.isConditionalMediationAvailable) return;

      try {
        const conditionalAvailable =
          await publicKeyCredential.isConditionalMediationAvailable();
        if (!conditionalAvailable || cancelled) return;

        const hasConditionalInput = document.querySelector(
          'input[autocomplete="webauthn"], input[autocomplete$=" webauthn"]',
        );
        if (!hasConditionalInput) return;

        const result = await authClient.signIn.passkey({
          autoFill: true,
        });

        if (!cancelled && result.data) {
          window.location.assign(callbackURL);
        }
      } catch {
        // Ignore silent passkey preload failures and keep the form usable.
      }
    }

    void preloadConditionalPasskey();

    return () => {
      cancelled = true;
    };
  }, [callbackURL]);

  async function onSendMagicLink() {
    const normalizedEmail = email.trim();
    if (normalizedEmail.length === 0) {
      setFormError("Enter your email address first.");
      return;
    }
    if (isMailActionCoolingDown("magic-link")) return;

    setFormError(null);
    setFormNotice(null);
    setPending("magic-link");

    const { error } = await authClient.signIn.magicLink({
      callbackURL,
      email: normalizedEmail,
      newUserCallbackURL: callbackURL,
    });

    setPending(null);

    if (error) {
      setFormError(
        getAuthMailErrorMessage(error, "Could not send a sign-in link."),
      );
      return;
    }

    setActiveMailFlow("magic-link");
    setCooldownUntil(Date.now() + 45_000);
    setFormNotice(
      "Check your email for the secure sign-in link. If nothing arrives, you can request a new link after the cooldown.",
    );
  }

  async function onSendEmailOtp() {
    const normalizedEmail = email.trim();
    if (normalizedEmail.length === 0) {
      setFormError("Enter your email address first.");
      return;
    }
    if (isMailActionCoolingDown("email-otp")) return;

    setFormError(null);
    setFormNotice(null);
    setPending("email-otp");

    const { error } = await authClient.emailOtp.sendVerificationOtp({
      email: normalizedEmail,
      type: "sign-in",
    });

    setPending(null);

    if (error) {
      setFormError(
        getAuthMailErrorMessage(error, "Could not send a one-time code."),
      );
      return;
    }

    setActiveMailFlow("email-otp");
    setCooldownUntil(Date.now() + 45_000);
    setOtpRequested(true);
    setFormNotice(
      "Code sent. Enter it below to continue. If the message is delayed, request a new code after the cooldown.",
    );
  }

  async function onContinueWithOtp() {
    const normalizedEmail = email.trim();
    if (normalizedEmail.length === 0 || otp.trim().length === 0) {
      setFormError("Enter both your email and one-time code.");
      return;
    }

    setFormError(null);
    setFormNotice(null);
    setPending("email-otp");

    const result = await authClient.signIn.emailOtp({
      email: normalizedEmail,
      otp: otp.trim(),
    });

    setPending(null);

    if (result.error) {
      setFormError(
        getAuthMailErrorMessage(result.error, "Could not complete sign-in."),
      );
      return;
    }

    window.location.assign(callbackURL);
  }

  async function onPasswordSignIn() {
    const identifier = passwordIdentifier.trim();
    if (identifier.length === 0) {
      setFormError("Enter your email or username first.");
      return;
    }

    setFormError(null);
    setFormNotice(null);
    setPending("password-sign-in");

    const result = identifier.includes("@")
      ? await authClient.signIn.email({
          callbackURL,
          email: identifier,
          password,
        })
      : await (authClient.signIn as typeof authClient.signIn & {
          username: (input: {
            callbackURL: string;
            password: string;
            username: string;
          }) => Promise<{
            data?: unknown;
            error?: { code?: string | undefined; message?: string | undefined };
          }>;
        }).username({
          callbackURL,
          password,
          username: identifier,
        });

    setPending(null);

    if (result.error) {
      setFormError(getSignInErrorMessage(result.error));
      return;
    }

    if (isTwoFactorRedirectResult(result.data)) {
      window.location.assign(
        buildTwoFactorHref(callbackURL, result.data.twoFactorMethods ?? []),
      );
      return;
    }

    window.location.assign(callbackURL);
  }

  async function onPasswordSignUp() {
    setFormError(null);
    setFormNotice(null);
    setPending("password-register");

    const { error } = await (
      authClient.signUp as typeof authClient.signUp & {
        email: (input: {
          callbackURL: string;
          displayUsername?: string | undefined;
          email: string;
          name: string;
          password: string;
          username?: string | undefined;
        }) => Promise<{
          error?: { message?: string | undefined };
        }>;
      }
    ).email({
      callbackURL: "/iam/sign-in?onboarding=check-email",
      displayUsername: displayUsername.trim() || undefined,
      email,
      name,
      password,
      username: username.trim() || undefined,
    });

    setPending(null);

    if (error) {
      setFormError(error.message ?? "Could not create account.");
      return;
    }

    setPasswordMode("sign-in");
    setPasswordIdentifier(email);
    setPassword("");
    setFormNotice(
      "Account created. You can sign in now, and email verification will unlock higher-trust features.",
    );
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
      setFormError(
        error.message ?? `${providerLabels[provider]} sign-in failed.`,
      );
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
      setFormError(
        getSignInErrorMessage(result.error, "Passkey sign-in failed."),
      );
      return;
    }

    if (result.data) {
      window.location.assign(callbackURL);
    }
  }

  async function onResendVerification() {
    const normalizedEmail = email.trim();
    if (normalizedEmail.length === 0) {
      setFormError("Enter your account email first.");
      return;
    }
    if (isMailActionCoolingDown("verification")) return;

    setFormError(null);
    setPending("verification");

    const { error } = await authClient.sendVerificationEmail({
      callbackURL: "/iam/sign-in?verified=1",
      email: normalizedEmail,
    });

    setPending(null);

    if (error) {
      setFormError(
        getAuthMailErrorMessage(error, "Could not send a new verification email."),
      );
      return;
    }

    setActiveMailFlow("verification");
    setCooldownUntil(Date.now() + 45_000);
    setFormNotice(
      "Verification email sent. Open the link from your inbox to unlock higher-trust features. A new email can be requested after the cooldown.",
    );
  }

  function isMailActionCoolingDown(
    flow: "email-otp" | "magic-link" | "verification",
  ) {
    return activeMailFlow === flow && getMailCooldownRemaining() > 0;
  }

  function getMailCooldownRemaining() {
    if (!cooldownUntil) return 0;

    return Math.max(0, Math.ceil((cooldownUntil - now) / 1000));
  }

  const mailCooldownRemaining = getMailCooldownRemaining();

  return (
    <div className="space-y-6">
      <input
        aria-hidden="true"
        autoComplete="username webauthn"
        className="pointer-events-none absolute h-px w-px opacity-0"
        tabIndex={-1}
        value={email}
        onChange={(event) => setEmail(event.currentTarget.value)}
      />

      {formNotice ? (
        <div className="border-border bg-surface-raised space-y-2 rounded-(--radius-control) border p-4">
          <p className="type-body-sm text-foreground">{formNotice}</p>
        </div>
      ) : null}

      <div className="border-border bg-surface-raised space-y-2 rounded-(--radius-control) border p-4">
        <p className="type-label text-foreground">Fast public entry</p>
        <p className="type-body-sm text-foreground-muted">
          Use OAuth, a sign-in link, or a one-time code for the fastest path.
          Passwords remain available as a fallback.
        </p>
      </div>

      {activeMailFlow ? (
        <div className="border-border bg-surface-raised space-y-2 rounded-(--radius-control) border p-4">
          <p className="type-label text-foreground">
            {activeMailFlow === "magic-link"
              ? "Check your email"
              : activeMailFlow === "email-otp"
                ? "Code sent"
                : "Verification email sent"}
          </p>
          <p className="type-body-sm text-foreground-muted">
            {activeMailFlow === "magic-link"
              ? "Open the secure sign-in link from your inbox. If the email is delayed, use another method now or request a new link after the cooldown."
              : activeMailFlow === "email-otp"
                ? "Enter the one-time code from your inbox below. If the code expires or never arrives, request a new one after the cooldown."
                : "Open the verification link from your inbox to unlock verified-email features such as security settings and higher-trust workflows."}
          </p>
          {mailCooldownRemaining > 0 ? (
            <p className="type-meta text-foreground-muted">
              Another {activeMailFlow === "email-otp" ? "code" : "email"} can
              be requested in {mailCooldownRemaining}s.
            </p>
          ) : null}
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
            {pending === "passkey" ? "Working..." : "Sign in with passkey"}
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
        <Field
          autoComplete="email"
          label="Email"
          name="quick-email"
          required
          type="email"
          value={email}
          onChange={setEmail}
        />
        <div className="flex flex-wrap gap-3">
          <button
            disabled={
              pending === "magic-link" || isMailActionCoolingDown("magic-link")
            }
            type="button"
            onClick={() => void onSendMagicLink()}
          >
            {pending === "magic-link"
              ? "Sending link..."
              : isMailActionCoolingDown("magic-link")
                ? `Resend link in ${mailCooldownRemaining}s`
                : "Send sign-in link"}
          </button>
          <button
            disabled={
              pending === "email-otp" || isMailActionCoolingDown("email-otp")
            }
            type="button"
            onClick={() => void onSendEmailOtp()}
          >
            {pending === "email-otp"
              ? "Sending code..."
              : isMailActionCoolingDown("email-otp")
                ? `Resend code in ${mailCooldownRemaining}s`
                : "Send one-time code"}
          </button>
          <button
            disabled={
              pending === "verification" ||
              isMailActionCoolingDown("verification")
            }
            type="button"
            onClick={() => void onResendVerification()}
          >
            {pending === "verification"
              ? "Sending verification..."
              : isMailActionCoolingDown("verification")
                ? `Resend verification in ${mailCooldownRemaining}s`
                : "Resend verification email"}
          </button>
        </div>

        {otpRequested ? (
          <div className="border-border bg-surface-raised space-y-3 rounded-(--radius-control) border p-4">
            <Field
              autoComplete="one-time-code"
              label="One-time code"
              name="otp"
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

      <details className="border-border rounded-(--radius-control) border p-4">
        <summary className="type-label cursor-pointer text-foreground">
          Use password instead
        </summary>
        <div className="space-y-4 pt-4">
          <div
            aria-label="Password mode"
            className="border-border inline-flex gap-2 rounded-(--radius-control) border p-1"
            role="tablist"
          >
            <button
              aria-selected={passwordMode === "sign-in"}
              className="rounded-(--radius-control) px-3 py-2"
              role="tab"
              type="button"
              onClick={() => setPasswordMode("sign-in")}
            >
              Sign in
            </button>
            <button
              aria-selected={passwordMode === "register"}
              className="rounded-(--radius-control) px-3 py-2"
              role="tab"
              type="button"
              onClick={() => setPasswordMode("register")}
            >
              Create account
            </button>
          </div>

          {passwordMode === "sign-in" ? (
            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                void onPasswordSignIn();
              }}
            >
              <Field
                autoComplete="username"
                label="Email or username"
                name="password-identifier"
                required
                value={passwordIdentifier}
                onChange={setPasswordIdentifier}
              />
              <Field
                autoComplete="current-password webauthn"
                label="Password"
                name="password-sign-in"
                required
                type="password"
                value={password}
                onChange={setPassword}
              />
              <a
                className="type-body-sm text-accent-strong hover:underline"
                href="/iam/sign-in/reset-password"
              >
                Forgot password?
              </a>
              <button disabled={pending === "password-sign-in"} type="submit">
                {pending === "password-sign-in" ? "Signing in..." : "Sign in"}
              </button>
            </form>
          ) : (
            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                void onPasswordSignUp();
              }}
            >
              <Field
                autoComplete="name"
                label="Display name"
                name="name"
                required
                value={name}
                onChange={setName}
              />
              <Field
                autoComplete="username"
                description="Optional password sign-in alias. Letters, numbers, underscores, and dots only."
                label="Username"
                name="username"
                value={username}
                onChange={setUsername}
              />
              <Field
                description="Optional public-facing variant for the username."
                label="Display username"
                name="display-username"
                value={displayUsername}
                onChange={setDisplayUsername}
              />
              <Field
                autoComplete="new-password"
                description="At least 8 characters."
                label="Password"
                name="password-register"
                required
                type="password"
                value={password}
                onChange={setPassword}
              />
              <button
                disabled={pending === "password-register"}
                type="submit"
              >
                {pending === "password-register" ? "Creating..." : "Create account"}
              </button>
            </form>
          )}
        </div>
      </details>

      {formError ? (
        <p className="type-meta text-danger-strong" role="alert">
          {formError}
        </p>
      ) : null}
    </div>
  );
}

function Field({
  description,
  label,
  name,
  onChange,
  ...props
}: {
  autoComplete?: string;
  description?: string;
  label: string;
  name: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
  value: string;
}) {
  return (
    <label className="flex min-w-0 flex-col gap-2" htmlFor={name}>
      <span className="type-label">{label}</span>
      {description ? (
        <span className="type-meta text-foreground-muted">{description}</span>
      ) : null}
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

function buildTwoFactorHref(callbackURL: string, methods: readonly string[]) {
  const params = new URLSearchParams({ callbackUrl: callbackURL });
  if (methods.length > 0) {
    params.set("methods", methods.join(","));
  }

  return `/sign-in/two-factor?${params.toString()}`;
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

function isPasskeyContextSupported() {
  if (!("PublicKeyCredential" in window)) return false;

  return (
    window.location.protocol === "https:" ||
    window.location.hostname === "localhost"
  );
}

function getSignInErrorMessage(
  error: { code?: string | undefined; message?: string | undefined },
  fallback = "Sign-in failed.",
) {
  if (error.code === "BANNED_USER") {
    return (
      error.message ??
      "You have been banned from this application. Please contact support if you believe this is an error."
    );
  }

  return error.message ?? fallback;
}

function getAuthMailErrorMessage(
  error: { code?: string | undefined; message?: string | undefined },
  fallback: string,
) {
  if (error.code === "INVALID_OTP") {
    return "That one-time code is invalid. Request a new code if needed.";
  }
  if (error.code === "TOO_MANY_ATTEMPTS") {
    return "Too many attempts were used on this code. Request a fresh one to continue.";
  }
  if (
    error.code === "TOKEN_EXPIRED" ||
    error.code === "INVALID_TOKEN" ||
    error.code === "EXPIRED_TOKEN"
  ) {
    return "That email link is no longer valid. Request a fresh email to continue.";
  }

  return error.message ?? fallback;
}
