"use client";

import { useEffect, useMemo, useState } from "react";

import { authClient } from "@/client-runtime/auth/client-runtime.auth.adapter.client";

type Props = {
  email: string;
};

export function EmailVerificationActions({ email }: Props) {
  const [cooldownUntil, setCooldownUntil] = useState<number | null>(null);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!cooldownUntil) return;

    const timer = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [cooldownUntil]);

  const cooldownRemaining = useMemo(() => {
    if (!cooldownUntil) return 0;

    return Math.max(0, Math.ceil((cooldownUntil - now) / 1000));
  }, [cooldownUntil, now]);

  const cooldownActive = cooldownRemaining > 0;

  async function onResendVerification() {
    if (cooldownActive) return;

    setPending(true);
    setMessage(null);
    setError(null);

    try {
      const { error } = await authClient.sendVerificationEmail({
        callbackURL: "/iam/sign-in?verified=1",
        email,
      });

      if (error) {
        setError("Could not send a verification email right now.");
        return;
      }

      setCooldownUntil(Date.now() + 45_000);
      setMessage(
        "Verification email sent. Open the link in your inbox to unlock verified-email features and account security tools.",
      );
    } catch {
      setError("Could not send a verification email right now.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="space-y-2">
      <button
        className="type-label border-border-strong bg-field text-foreground hover:bg-field-hover rounded-2xl border px-6 py-3 font-semibold transition"
        disabled={pending || cooldownActive}
        type="button"
        onClick={() => void onResendVerification()}
      >
        {pending
          ? "Sending verification..."
          : cooldownActive
            ? `Resend available in ${cooldownRemaining}s`
            : "Resend verification email"}
      </button>
      {cooldownActive ? (
        <p className="type-meta text-foreground-muted">
          Keep this tab open or check your inbox now. A new verification email
          can be requested after the cooldown ends.
        </p>
      ) : null}
      {message ? (
        <p className="type-meta text-foreground-muted">{message}</p>
      ) : null}
      {error ? (
        <p className="type-meta text-danger-strong" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
