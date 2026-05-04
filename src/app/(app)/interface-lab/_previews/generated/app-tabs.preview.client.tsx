/**
 * @afenda-generated interface-lab
 * @afenda-boundary client
 * @afenda-description Auto-generated registry preview for app-tabs — edit scripts/interface-lab.registry-preview-snippet.automation.ts then run pnpm interface-lab:codegen
 */
"use client";

import { AppTab, AppTabList, AppTabPanel, AppTabPanels, AppTabs } from "@/components/ui-governance/app-tabs/app-tabs.control.primitive.client";

export default function InterfaceLabRegistryPreview() {
  return (
    <div className="registry-preview-surface flex flex-wrap items-start gap-4 p-4">
      <AppTabs selectedKey="a"><AppTabList aria-label="Preview tabs"><AppTab id="a">Tab A</AppTab><AppTab id="b">Tab B</AppTab></AppTabList><AppTabPanels><AppTabPanel id="a">Panel A</AppTabPanel><AppTabPanel id="b">Panel B</AppTabPanel></AppTabPanels></AppTabs>
    </div>
  );
}
