/**
 * @afenda-owner app-tabs
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary test
 * @afenda-description Test coverage for app-tabs explicit primitive boundary
 */
import "@testing-library/jest-dom/vitest";
import { act, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  AppTab,
  AppTabList,
  AppTabPanel,
  AppTabPanels,
  AppTabs,
} from "@/components/ui-governance/app-tabs/app-tabs.control.primitive.client";

describe("AppTabs", () => {
  it("renders a governed tabbed workspace with owned tab chrome", async () => {
    await act(async () => {
      render(
        <AppTabs selectedKey="general">
          <AppTabList aria-label="Settings sections">
            <AppTab id="general">General</AppTab>
            <AppTab id="appearance">Appearance</AppTab>
            <AppTab id="notifications">Notifications</AppTab>
          </AppTabList>
          <AppTabPanels>
            <AppTabPanel id="general">General settings</AppTabPanel>
            <AppTabPanel id="appearance">Appearance settings</AppTabPanel>
            <AppTabPanel id="notifications">Notification settings</AppTabPanel>
          </AppTabPanels>
        </AppTabs>,
      );
    });

    expect(screen.getByRole("tablist", { name: "Settings sections" })).toBeVisible();
    expect(screen.getByRole("tab", { name: "General", selected: true })).toBeVisible();
    expect(screen.getByRole("tabpanel")).toHaveTextContent("General settings");
  });

  it("renders governed vertical tabs with direct tab panels", async () => {
    await act(async () => {
      render(
        <AppTabs orientation="vertical" selectedKey="profile">
          <AppTabList aria-label="Profile areas">
            <AppTab id="summary">Summary</AppTab>
            <AppTab id="profile">Profile</AppTab>
          </AppTabList>
          <AppTabPanel id="summary">Summary panel</AppTabPanel>
          <AppTabPanel id="profile">Profile panel</AppTabPanel>
        </AppTabs>,
      );
    });

    expect(screen.getByRole("tablist", { name: "Profile areas" })).toBeVisible();
    expect(screen.getByRole("tab", { name: "Profile", selected: true })).toBeVisible();
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Profile panel");
  });

  it("rejects unnamed tab navigation in development", () => {
    expect(() =>
      render(
        <AppTabs>
          <AppTabList>
            <AppTab id="general">General</AppTab>
          </AppTabList>
          <AppTabPanels>
            <AppTabPanel id="general">General panel</AppTabPanel>
          </AppTabPanels>
        </AppTabs>,
      ),
    ).toThrow("AppTabList requires aria-label or aria-labelledby.");
  });
});
