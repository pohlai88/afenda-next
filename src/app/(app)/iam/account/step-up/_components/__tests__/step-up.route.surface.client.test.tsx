/**
 * @afenda-owner auth
 * @afenda-subject step-up
 * @afenda-artifact surface-test
 * @afenda-boundary test
 * @afenda-description Test coverage for the signed-in step-up re-authentication surface
 */
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { renderWithProviders } from "@/test-runtime/test-runtime.render.helper.test";
import { locationAssignMock } from "../../../../../../../../vitest.setup";

const {
  signInEmailMock,
  signInMagicLinkMock,
} = vi.hoisted(() => ({
  signInEmailMock: vi.fn(),
  signInMagicLinkMock: vi.fn(),
}));

vi.mock("@/client-runtime/auth/client-runtime.auth.adapter.client", () => ({
  authClient: {
    emailOtp: {
      sendVerificationOtp: vi.fn(),
    },
    signIn: {
      email: signInEmailMock,
      emailOtp: vi.fn(),
      magicLink: signInMagicLinkMock,
      passkey: vi.fn(),
      social: vi.fn(),
    },
  },
}));

import { StepUpSurface } from "@/app/(app)/iam/account/step-up/_components/step-up.route.surface.client";

describe("step-up route surface", () => {
  beforeEach(() => {
    locationAssignMock.mockReset();
    signInEmailMock.mockReset();
    signInMagicLinkMock.mockReset();
  });

  it("renders re-auth only controls without sign-up actions", () => {
    renderWithProviders(
      <StepUpSurface
        callbackURL="/iam/account/security"
        currentEmail="user@afenda.test"
        hasPasswordAuth={true}
        oauthProviders={[]}
      />,
    );

    expect(screen.getByText("Re-authenticating as")).toBeInTheDocument();
    expect(screen.queryByText("Create account")).not.toBeInTheDocument();
  });

  it("routes password step-up through the dedicated two-factor continuation when required", async () => {
    signInEmailMock.mockResolvedValue({
      data: { twoFactorMethods: ["totp"], twoFactorRedirect: true },
      error: null,
    });

    renderWithProviders(
      <StepUpSurface
        callbackURL="/iam/admin/users"
        currentEmail="admin@afenda.test"
        hasPasswordAuth={true}
        oauthProviders={[]}
      />,
    );

    fireEvent.change(screen.getByLabelText("Current password"), {
      target: { value: "secret-password" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Confirm with password" }));

    await waitFor(() => {
      expect(signInEmailMock).toHaveBeenCalledWith({
        callbackURL: "/iam/admin/users",
        email: "admin@afenda.test",
        password: "secret-password",
      });
    });

    expect(locationAssignMock).toHaveBeenCalledWith(
      "/iam/account/step-up/two-factor?callbackUrl=%2Fiam%2Fadmin%2Fusers&methods=totp",
    );
  });
});
