/**
 * @afenda-owner sign-in
 * @afenda-subject route
 * @afenda-artifact surface-test
 * @afenda-boundary test
 * @afenda-description Test coverage for passwordless Better Auth entry states
 */
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { renderWithProviders } from "@/test-runtime/test-runtime.render.helper.test";

const {
  sendVerificationEmailMock,
  sendVerificationOtpMock,
  signInEmailOtpMock,
  signInMagicLinkMock,
} = vi.hoisted(() => ({
  sendVerificationEmailMock: vi.fn(),
  sendVerificationOtpMock: vi.fn(),
  signInEmailOtpMock: vi.fn(),
  signInMagicLinkMock: vi.fn(),
}));

vi.mock("@/client-runtime/auth/client-runtime.auth.adapter.client", () => ({
  authClient: {
    emailOtp: {
      sendVerificationOtp: sendVerificationOtpMock,
    },
    sendVerificationEmail: sendVerificationEmailMock,
    signIn: {
      email: vi.fn(),
      emailOtp: signInEmailOtpMock,
      magicLink: signInMagicLinkMock,
      passkey: vi.fn(),
      social: vi.fn(),
    },
    signUp: {
      email: vi.fn(),
    },
  },
}));

import { SignInSurface } from "@/app/(app)/iam/sign-in/_components/sign-in.route.surface.client";

describe("sign-in route surface", () => {
  beforeEach(() => {
    sendVerificationEmailMock.mockReset();
    sendVerificationEmailMock.mockResolvedValue({ error: null });
    sendVerificationOtpMock.mockReset();
    sendVerificationOtpMock.mockResolvedValue({ error: null });
    signInEmailOtpMock.mockReset();
    signInEmailOtpMock.mockResolvedValue({ data: null, error: null });
    signInMagicLinkMock.mockReset();
    signInMagicLinkMock.mockResolvedValue({ error: null });
  });

  it("shows the check-email state after sending a magic link", async () => {
    renderWithProviders(
      <SignInSurface callbackURL="/" oauthProviders={[]} />,
    );

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "user@afenda.test" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Send sign-in link" }));

    await waitFor(() => {
      expect(signInMagicLinkMock).toHaveBeenCalledWith({
        callbackURL: "/",
        email: "user@afenda.test",
        newUserCallbackURL: "/",
      });
    });

    expect(await screen.findByText("Check your email")).toBeInTheDocument();
    expect(
      await screen.findByText(/secure sign-in link from your inbox/i),
    ).toBeInTheDocument();
  });

  it("shows the code-sent state after requesting an email OTP", async () => {
    renderWithProviders(
      <SignInSurface callbackURL="/" oauthProviders={[]} />,
    );

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "user@afenda.test" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Send one-time code" }));

    await waitFor(() => {
      expect(sendVerificationOtpMock).toHaveBeenCalledWith({
        email: "user@afenda.test",
        type: "sign-in",
      });
    });

    expect(screen.getByText("Code sent")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Continue with code" }),
    ).toBeInTheDocument();
  });
});
