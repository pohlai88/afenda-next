"use client";

/**
 * @afenda-owner auth
 * @afenda-subject two-factor
 * @afenda-artifact route
 * @afenda-boundary client
 * @afenda-description Client continuation surface for Better Auth two-factor verification
 */
import { useState } from "react";
import { authClient } from "@/client-runtime/auth/client-runtime.auth.adapter.client";

type Props = {
  callbackURL: string;
  methods: readonly string[];
};

export function TwoFactorSurface({ callbackURL, methods }: Props) {
  const [mode, setMode] = useState<"totp" | "backup">(
    methods.length === 0 || methods.includes("totp") ? "totp" : "backup",
  );
  const [totpCode, setTotpCode] = useState("");
  const [backupCode, setBackupCode] = useState("");
  const [trustDevice, setTrustDevice] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);
  const [pendingMode, setPendingMode] = useState<"totp" | "backup" | null>(
    null,
  );

  async function onVerifyTotp() {
    setFormError(null);
    setPendingMode("totp");

    const { error } = await authClient.twoFactor.verifyTotp({
      code: totpCode,
      trustDevice,
    });

    setPendingMode(null);

    if (error) {
      setFormError(error.message ?? "Could not verify the authenticator code.");
      return;
    }

    window.location.assign(callbackURL);
  }

  async function onVerifyBackupCode() {
    setFormError(null);
    setPendingMode("backup");

    const { error } = await authClient.twoFactor.verifyBackupCode({
      code: backupCode,
      trustDevice,
    });

    setPendingMode(null);

    if (error) {
      setFormError(error.message ?? "Could not verify the backup code.");
      return;
    }

    window.location.assign(callbackURL);
  }

  const showsTotp = methods.length === 0 || methods.includes("totp");

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="type-body-sm text-foreground-muted">
          Continue sign-in with your registered second factor.
        </p>
      </div>

      <div className="space-y-4">
        <div
          aria-label="Two-factor verification mode"
          className="border-border inline-flex gap-2 rounded-(--radius-control) border p-1"
          role="tablist"
        >
          {showsTotp ? (
            <button
              aria-selected={mode === "totp"}
              className="rounded-(--radius-control) px-3 py-2"
              role="tab"
              type="button"
              onClick={() => setMode("totp")}
            >
              Authenticator code
            </button>
          ) : null}
          <button
            aria-selected={mode === "backup"}
            className="rounded-(--radius-control) px-3 py-2"
            role="tab"
            type="button"
            onClick={() => setMode("backup")}
          >
            Backup code
          </button>
        </div>

        {showsTotp && mode === "totp" ? (
          <form
            className="space-y-4 pt-2"
            onSubmit={(event) => {
              event.preventDefault();
              void onVerifyTotp();
            }}
          >
            <Field
              description="Enter the 6-digit code from your authenticator."
              label="Authenticator code"
              name="totp-code"
              value={totpCode}
              onChange={setTotpCode}
            />
            <CheckboxField
              checked={trustDevice}
              description="Skip this prompt on this browser for the trusted-device window."
              label="Trust this device"
              onChange={setTrustDevice}
            />
            <button
              className="mt-2"
              disabled={pendingMode === "totp"}
              type="submit"
            >
              {pendingMode === "totp" ? "Verifying..." : "Verify code"}
            </button>
          </form>
        ) : null}

        {mode === "backup" ? (
          <form
            className="space-y-4 pt-2"
            onSubmit={(event) => {
              event.preventDefault();
              void onVerifyBackupCode();
            }}
          >
            <Field
              description="Use one of your recovery codes if the authenticator is unavailable."
              label="Backup code"
              name="backup-code"
              value={backupCode}
              onChange={setBackupCode}
            />
            <CheckboxField
              checked={trustDevice}
              description="Skip this prompt on this browser for the trusted-device window."
              label="Trust this device"
              onChange={setTrustDevice}
            />
            <button
              className="mt-2"
              disabled={pendingMode === "backup"}
              type="submit"
            >
              {pendingMode === "backup" ? "Verifying..." : "Verify backup code"}
            </button>
          </form>
        ) : null}
      </div>

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
  value,
}: {
  description?: string;
  label: string;
  name: string;
  onChange: (value: string) => void;
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
        value={value}
        onChange={(event) => onChange(event.currentTarget.value)}
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
