/**
 * @afenda-owner afenda-home
 * @afenda-subject preferences-panel
 * @afenda-artifact interaction-test
 * @afenda-boundary test
 * @afenda-description Test coverage for the preferences panel interaction
 */
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PreferencesPanel } from "../afenda-home.preferences-panel.dialog.client";
import { HomeStateProvider } from "../afenda-home.state.provider.client";
import { renderWithProviders } from "@/test-runtime/test-runtime.render.helper.test";

describe("PreferencesPanel", () => {
  it("opens the preferences disclosure and applies local preference changes", async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <HomeStateProvider>
        <PreferencesPanel />
      </HomeStateProvider>,
    );

    const summary = screen.getByText("Preferences");
    const panel = summary.closest("details");

    expect(panel).toBeTruthy();
    expect(panel?.open).toBe(false);

    await user.click(summary);

    expect(panel?.open).toBe(true);

    const showComposerStatus = screen.getByRole("checkbox", {
      name: /show composer status/i,
    });
    expect(showComposerStatus).toBeChecked();

    await user.click(showComposerStatus);
    expect(showComposerStatus).not.toBeChecked();

    const composerDensity = screen.getByRole("combobox", {
      name: /composer density/i,
    });
    expect(composerDensity).toHaveValue("comfortable");

    await user.selectOptions(composerDensity, "compact");
    expect(composerDensity).toHaveValue("compact");
  });
});
