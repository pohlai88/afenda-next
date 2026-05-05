/**
 * @afenda-generated interface-studio
 * @afenda-boundary client
 * @afenda-description Auto-generated registry preview for app-toggle-button-group — edit scripts/interface-studio.registry-preview-snippet.automation.ts then run pnpm interface-studio:codegen
 */
"use client";

import { AppToggleButton } from "@/components/ui-governance/app-toggle-button/app-toggle-button.control.primitive.client";
import { AppToggleButtonGroup } from "@/components/ui-governance/app-toggle-button-group/app-toggle-button-group.control.primitive.client";

export default function InterfaceStudioRegistryPreview() {
  return (
    <div className="registry-preview-surface flex flex-wrap items-start gap-4 p-4">
      <AppToggleButtonGroup aria-label="Preview group" selectionMode="single"><AppToggleButton id="left">Left</AppToggleButton><AppToggleButton id="right">Right</AppToggleButton></AppToggleButtonGroup>
    </div>
  );
}
