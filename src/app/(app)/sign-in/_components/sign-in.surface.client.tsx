"use client";

/**
 * Email/password + OAuth entry using Better Auth client APIs (basic-usage docs).
 */
import { useState } from "react";

import {
  AppButton,
  AppForm,
  AppTab,
  AppTabList,
  AppTabPanel,
  AppTabPanels,
  AppTabs,
  AppTextField,
} from "@/components/ui/app.controls.primitive.client";
import { authClient } from "@/client-runtime/auth/client-runtime.auth.adapter.client";
import type { OAuthProviderId } from "@/lib/auth.oauth.shared";

const providerLabels: Record<OAuthProviderId, string> = {
  github: "GitHub",
  google: "Google",
  linkedin: "LinkedIn",
};

type Props = {
  callbackURL: string;
  oauthProviders: readonly OAuthProviderId[];
};

export function SignInSurface({ callbackURL, oauthProviders }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [pending, setPending] = useState<
    "sign-in" | "sign-up" | OAuthProviderId | null
  >(null);

  async function onSignIn() {
    setFormError(null);
    setPending("sign-in");
    const { error } = await authClient.signIn.email({
      email,
      password,
      callbackURL,
    });
    setPending(null);
    if (error) setFormError(error.message ?? "Sign-in failed.");
  }

  async function onSignUp() {
    setFormError(null);
    setPending("sign-up");
    const { error } = await authClient.signUp.email({
      email,
      password,
      name,
      callbackURL,
    });
    setPending(null);
    if (error) setFormError(error.message ?? "Could not create account.");
  }

  async function onOAuth(provider: OAuthProviderId) {
    setFormError(null);
    setPending(provider);
    const { error } = await authClient.signIn.social({
      provider,
      callbackURL,
    });
    setPending(null);
    if (error) {
      setFormError(error.message ?? `${providerLabels[provider]} sign-in failed.`);
    }
  }

  return (
    <div className="space-y-6">
      {oauthProviders.length > 0 ? (
        <div className="space-y-3">
          <p className="type-label text-foreground-muted">OAuth</p>
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            {oauthProviders.map((id) => (
              <AppButton
                key={id}
                className="min-w-40"
                isLoading={pending === id}
                variant="secondary"
                onPress={() => void onOAuth(id)}
              >
                Continue with {providerLabels[id]}
              </AppButton>
            ))}
          </div>
        </div>
      ) : null}

      {oauthProviders.length > 0 ? (
        <p className="type-meta text-foreground-muted">or use email</p>
      ) : null}

      <AppTabs defaultSelectedKey="sign-in">
        <AppTabList aria-label="Sign-in mode">
          <AppTab id="sign-in">Sign in</AppTab>
          <AppTab id="register">Create account</AppTab>
        </AppTabList>
        <AppTabPanels>
          <AppTabPanel id="sign-in" className="space-y-4 pt-2">
            <AppForm
              onSubmit={(e) => {
                e.preventDefault();
                void onSignIn();
              }}
            >
              <AppTextField
                autoComplete="email"
                isRequired
                label="Email"
                name="email"
                type="email"
                value={email}
                onChange={setEmail}
              />
              <AppTextField
                autoComplete="current-password"
                isRequired
                label="Password"
                name="password"
                type="password"
                value={password}
                onChange={setPassword}
              />
              {formError ? (
                <p className="type-meta text-danger-strong" role="alert">
                  {formError}
                </p>
              ) : null}
              <AppButton
                className="mt-2"
                isLoading={pending === "sign-in"}
                type="submit"
                variant="primary"
              >
                Sign in
              </AppButton>
            </AppForm>
          </AppTabPanel>
          <AppTabPanel id="register" className="space-y-4 pt-2">
            <AppForm
              onSubmit={(e) => {
                e.preventDefault();
                void onSignUp();
              }}
            >
              <AppTextField
                autoComplete="name"
                isRequired
                label="Display name"
                name="name"
                value={name}
                onChange={setName}
              />
              <AppTextField
                autoComplete="email"
                isRequired
                label="Email"
                name="email"
                type="email"
                value={email}
                onChange={setEmail}
              />
              <AppTextField
                autoComplete="new-password"
                description="At least 8 characters."
                isRequired
                label="Password"
                name="password"
                type="password"
                value={password}
                onChange={setPassword}
              />
              {formError ? (
                <p className="type-meta text-danger-strong" role="alert">
                  {formError}
                </p>
              ) : null}
              <AppButton
                className="mt-2"
                isLoading={pending === "sign-up"}
                type="submit"
                variant="primary"
              >
                Create account
              </AppButton>
            </AppForm>
          </AppTabPanel>
        </AppTabPanels>
      </AppTabs>
    </div>
  );
}
