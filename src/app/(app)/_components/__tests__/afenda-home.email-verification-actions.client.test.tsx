/**
 * @afenda-owner auth
 * @afenda-subject home
 * @afenda-artifact verification-actions-test
 * @afenda-boundary test
 * @afenda-description Test coverage for verified-email resend messaging on the home boundary
 */
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { renderWithProviders } from "@/test-runtime/test-runtime.render.helper.test";

const { sendVerificationEmailMock } = vi.hoisted(() => ({
  sendVerificationEmailMock: vi.fn(),
}));

vi.mock("@/client-runtime/auth/client-runtime.auth.adapter.client", () => ({
  authClient: {
    sendVerificationEmail: sendVerificationEmailMock,
  },
}));

import { EmailVerificationActions } from "@/app/(app)/_components/afenda-home.email-verification-actions.client";

describe("home email verification actions", () => {
  beforeEach(() => {
    sendVerificationEmailMock.mockReset();
    sendVerificationEmailMock.mockResolvedValue({ error: null });
  });

  it("shows the verified-email upgrade message after a resend succeeds", async () => {
    renderWithProviders(
      <EmailVerificationActions email="user@afenda.test" />,
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Resend verification email" }),
    );

    await waitFor(() => {
      expect(sendVerificationEmailMock).toHaveBeenCalledWith({
        callbackURL: "/sign-in?verified=1",
        email: "user@afenda.test",
      });
    });

    expect(
      await screen.findByText(
        /unlock verified-email features and account security tools/i,
      ),
    ).toBeInTheDocument();
  });
});
