import userEvent from "@testing-library/user-event";
import { screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PreferencesPanel } from "@/app/_components/afenda-home.preferences-panel.client";
import { renderWithProviders } from "@/test/test.render.shared";

describe("PreferencesPanel", () => {
  it("opens a dialog, keeps focus inside it, and closes on escape", async () => {
    const user = userEvent.setup();
    renderWithProviders(<PreferencesPanel />);

    await user.click(screen.getByRole("button", { name: "Preferences" }));

    const dialog = await screen.findByRole("dialog", {
      name: "Composer preferences",
    });

    expect(dialog).toBeTruthy();
    expect(dialog.contains(document.activeElement)).toBe(true);

    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(
        screen.queryByRole("dialog", { name: "Composer preferences" }),
      ).toBeNull();
    });
  });
});
