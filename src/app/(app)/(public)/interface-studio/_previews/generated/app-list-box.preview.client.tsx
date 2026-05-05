/**
 * @afenda-generated interface-studio
 * @afenda-boundary client
 * @afenda-description Auto-generated registry preview for app-list-box — edit scripts/interface-studio.registry-preview-snippet.automation.ts then run pnpm interface-studio:codegen
 */
"use client";

import { AppListBox, AppListBoxItem, AppListBoxText } from "@/components/ui-governance/app-list-box/app-list-box.control.primitive.client";

export default function InterfaceStudioRegistryPreview() {
  return (
    <div className="registry-preview-surface flex flex-wrap items-start gap-4 p-4">
      <AppListBox aria-label="Preview list" selectionMode="single"><AppListBoxItem id="1" textValue="One"><AppListBoxText>One</AppListBoxText></AppListBoxItem><AppListBoxItem id="2" textValue="Two"><AppListBoxText>Two</AppListBoxText></AppListBoxItem></AppListBox>
    </div>
  );
}
