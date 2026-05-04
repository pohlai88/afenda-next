"use client";

/**
 * @afenda-owner auth
 * @afenda-subject security
 * @afenda-artifact route
 * @afenda-boundary client
 * @afenda-description Client security-center surface for MFA and passkey management
 */
import { useState, useSyncExternalStore } from "react";
import { authClient } from "@/client-runtime/auth/client-runtime.auth.adapter.client";
import { getStepUpHref } from "@/server/better-auth/auth.redirect.shared";
import { stepUpRequiredMessage } from "@/server/better-auth/auth.step-up.shared";

type Props = {
  hasPasswordAuth: boolean;
  twoFactorEnabled: boolean;
};

type TwoFactorSetupState = {
  backupCodes: string[];
  issuer: string;
  label: string;
  secret: string;
  totpURI: string;
};

const securityCallbackUrl = "/account/security";

function readPasskeySupported(): boolean {
  return (
    "PublicKeyCredential" in window &&
    (window.location.protocol === "https:" ||
      window.location.hostname === "localhost")
  );
}

export function AccountSecuritySurface({
  hasPasswordAuth,
  twoFactorEnabled,
}: Props) {
  const passkeySupported = useSyncExternalStore(
    () => () => undefined,
    readPasskeySupported,
    () => false,
  );
  const [currentPassword, setCurrentPassword] = useState("");
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [trustDevice, setTrustDevice] = useState(true);
  const [passkeyName, setPasskeyName] = useState("");
  const [backupCodes, setBackupCodes] = useState<string[] | null>(null);
  const [setupState, setSetupState] = useState<TwoFactorSetupState | null>(
    null,
  );
  const [formError, setFormError] = useState<string | null>(null);
  const [pendingAction, setPendingAction] = useState<
    | "enable-2fa"
    | "verify-2fa"
    | "disable-2fa"
    | "backup-codes"
    | "passkey"
    | null
  >(null);

  async function onEnableTwoFactor() {
    const password = resolvePasswordRequirement();
    if (password === null) return;

    setFormError(null);
    setPendingAction("enable-2fa");

    const { data, error } = await authClient.twoFactor.enable({
      ...(password ? { password } : {}),
    });

    setPendingAction(null);

    if (error) {
      if (handleStepUpRequired(error.message)) return;
      setFormError(error.message ?? "Could not start two-factor setup.");
      return;
    }

    if (!data?.totpURI) {
      setFormError("Two-factor setup did not return a TOTP secret.");
      return;
    }

    setBackupCodes(data.backupCodes ?? null);
    setSetupState(parseTotpUri(data.totpURI, data.backupCodes ?? []));
  }

  async function onVerifyTwoFactor() {
    setFormError(null);
    setPendingAction("verify-2fa");

    const { error } = await authClient.twoFactor.verifyTotp({
      code: twoFactorCode,
      trustDevice,
    });

    setPendingAction(null);

    if (error) {
      if (handleStepUpRequired(error.message)) return;
      setFormError(error.message ?? "Could not verify the two-factor code.");
      return;
    }

    window.location.reload();
  }

  async function onDisableTwoFactor() {
    const password = resolvePasswordRequirement();
    if (password === null) return;

    setFormError(null);
    setPendingAction("disable-2fa");

    const { error } = await authClient.twoFactor.disable({
      ...(password ? { password } : {}),
    });

    setPendingAction(null);

    if (error) {
      if (handleStepUpRequired(error.message)) return;
      setFormError(error.message ?? "Could not disable two-factor.");
      return;
    }

    window.location.reload();
  }

  async function onGenerateBackupCodes() {
    const password = resolvePasswordRequirement();
    if (password === null) return;

    setFormError(null);
    setPendingAction("backup-codes");

    const { data, error } = await authClient.twoFactor.generateBackupCodes({
      ...(password ? { password } : {}),
    });

    setPendingAction(null);

    if (error) {
      if (handleStepUpRequired(error.message)) return;
      setFormError(error.message ?? "Could not generate backup codes.");
      return;
    }

    setBackupCodes(data?.backupCodes ?? null);
  }

  async function onAddPasskey() {
    setFormError(null);
    setPendingAction("passkey");

    if (!passkeySupported) {
      setPendingAction(null);
      setFormError(
        "Passkeys require HTTPS or localhost. This origin cannot register WebAuthn credentials.",
      );
      return;
    }

    const { error } = await authClient.passkey.addPasskey({
      ...(passkeyName.trim() ? { name: passkeyName.trim() } : {}),
    });

    setPendingAction(null);

    if (error) {
      if (handleStepUpRequired(error.message)) return;
      setFormError(error.message ?? "Could not register this passkey.");
      return;
    }

    window.location.reload();
  }

  return (
    <div className="space-y-6">
      <section className="border-border bg-surface space-y-4 rounded-(--radius-panel) border p-5">
        <div className="space-y-1">
          <h2 className="type-panel-title">Passkeys</h2>
          <p className="type-body-sm text-foreground-muted">
            Register a phishing-resistant sign-in credential for this account.
          </p>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            void onAddPasskey();
          }}
        >
          <Field
            description="Optional label for this authenticator."
            label="Passkey label"
            name="passkey-name"
            placeholder="Office laptop"
            disabled={!passkeySupported}
            value={passkeyName}
            onChange={setPasskeyName}
          />
          {!passkeySupported ? (
            <p className="type-meta text-foreground-muted">
              Passkeys are available only on HTTPS origins or `localhost`.
            </p>
          ) : null}
          <button
            className="mt-2"
            disabled={!passkeySupported || pendingAction === "passkey"}
            type="submit"
          >
            {pendingAction === "passkey"
              ? "Registering..."
              : "Register passkey"}
          </button>
        </form>
      </section>

      <section className="border-border bg-surface space-y-4 rounded-(--radius-panel) border p-5">
        <div className="space-y-1">
          <h2 className="type-panel-title">Two-factor authentication</h2>
          <p className="type-body-sm text-foreground-muted">
            Protect this account with a TOTP authenticator and recovery codes.
          </p>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            void (twoFactorEnabled
              ? onGenerateBackupCodes()
              : onEnableTwoFactor());
          }}
        >
          {hasPasswordAuth ? (
            <Field
              autoComplete="current-password"
              description="Required for credential-backed security changes."
              label="Current password"
              name="current-password"
              type="password"
              value={currentPassword}
              onChange={setCurrentPassword}
            />
          ) : (
            <p className="type-meta text-foreground-muted">
              This account does not have a stored password. Because the session
              is already behind a fresh step-up gate, passkey, OAuth, magic
              link, and email-OTP accounts can still manage 2FA here.
            </p>
          )}
          <div className="flex flex-wrap gap-3">
            {!twoFactorEnabled ? (
              <button disabled={pendingAction === "enable-2fa"} type="submit">
                {pendingAction === "enable-2fa"
                  ? "Starting..."
                  : "Start 2FA setup"}
              </button>
            ) : (
              <>
                <button
                  disabled={pendingAction === "backup-codes"}
                  type="submit"
                >
                  {pendingAction === "backup-codes"
                    ? "Regenerating..."
                    : "Regenerate backup codes"}
                </button>
                <button
                  disabled={pendingAction === "disable-2fa"}
                  type="button"
                  onClick={() => void onDisableTwoFactor()}
                >
                  {pendingAction === "disable-2fa"
                    ? "Disabling..."
                    : "Disable 2FA"}
                </button>
              </>
            )}
          </div>
        </form>

        {setupState ? (
          <div className="border-border bg-surface-raised space-y-4 rounded-(--radius-control) border p-4">
            <div className="space-y-2">
              <p className="type-label text-foreground">Authenticator setup</p>
              <p className="type-body-sm text-foreground-muted">
                Add a manual TOTP entry using the issuer, account label, and
                shared secret below, then verify the generated code.
              </p>
            </div>
            <dl className="grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="type-meta text-foreground-muted">Issuer</dt>
                <dd className="type-body-sm text-foreground">
                  {setupState.issuer}
                </dd>
              </div>
              <div>
                <dt className="type-meta text-foreground-muted">Account</dt>
                <dd className="type-body-sm text-foreground">
                  {setupState.label}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="type-meta text-foreground-muted">
                  Shared secret
                </dt>
                <dd className="type-label bg-field text-foreground border-border-strong mt-1 rounded-(--radius-control) border px-3 py-2 break-all">
                  {setupState.secret}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="type-meta text-foreground-muted">TOTP URI</dt>
                <dd className="type-meta bg-field text-foreground border-border-strong mt-1 rounded-(--radius-control) border px-3 py-2 break-all">
                  {setupState.totpURI}
                </dd>
              </div>
            </dl>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                void onVerifyTwoFactor();
              }}
            >
              <Field
                description="Enter the 6-digit code from your authenticator."
                label="Verification code"
                name="two-factor-code"
                value={twoFactorCode}
                onChange={setTwoFactorCode}
              />
              <CheckboxField
                checked={trustDevice}
                description="Trust this device for future sign-ins on the current browser."
                label="Trust this device"
                onChange={setTrustDevice}
              />
              <button
                className="mt-2"
                disabled={pendingAction === "verify-2fa"}
                type="submit"
              >
                {pendingAction === "verify-2fa"
                  ? "Verifying..."
                  : "Verify and enable"}
              </button>
            </form>
          </div>
        ) : null}

        {backupCodes?.length ? (
          <div className="border-border bg-surface-raised space-y-3 rounded-(--radius-control) border p-4">
            <div className="space-y-1">
              <p className="type-label text-foreground">Backup codes</p>
              <p className="type-body-sm text-foreground-muted">
                Store these recovery codes securely. Each code can be used once.
              </p>
            </div>
            <ul className="grid gap-2 sm:grid-cols-2">
              {backupCodes.map((code) => (
                <li
                  className="type-label bg-field text-foreground border-border-strong rounded-(--radius-control) border px-3 py-2"
                  key={code}
                >
                  {code}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {formError ? (
          <p className="type-meta text-danger-strong" role="alert">
            {formError}
          </p>
        ) : null}
      </section>
    </div>
  );

  function handleStepUpRequired(message?: string | null | undefined) {
    if (message !== stepUpRequiredMessage) {
      return false;
    }

    window.location.assign(getStepUpHref(securityCallbackUrl));
    return true;
  }

  function resolvePasswordRequirement() {
    const password = currentPassword.trim();

    if (!hasPasswordAuth) {
      return password.length > 0 ? password : undefined;
    }

    if (password.length === 0) {
      setFormError(
        "Enter your current password before changing credential-backed security settings.",
      );
      return null;
    }

    return password;
  }
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
  disabled?: boolean;
  label: string;
  name: string;
  onChange: (value: string) => void;
  placeholder?: string;
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

function CheckboxField({
  checked,
  description,
  label,
  onChange,
}: {
  checked: boolean;
  description?: string;
  label: string;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="type-label">{label}</span>
      {description ? (
        <span className="type-meta text-foreground-muted">{description}</span>
      ) : null}
      <span className="flex items-center gap-2">
        <input
          checked={checked}
          type="checkbox"
          onChange={(event) => onChange(event.currentTarget.checked)}
        />
        <span className="type-body-sm text-foreground">Enabled</span>
      </span>
    </label>
  );
}

function parseTotpUri(
  totpURI: string,
  backupCodes: string[],
): TwoFactorSetupState {
  const url = new URL(totpURI);
  const label = decodeURIComponent(url.pathname.replace(/^\//, ""));
  const issuer = url.searchParams.get("issuer") ?? "Afenda";
  const secret = url.searchParams.get("secret") ?? "";

  return {
    backupCodes,
    issuer,
    label,
    secret,
    totpURI,
  };
}
