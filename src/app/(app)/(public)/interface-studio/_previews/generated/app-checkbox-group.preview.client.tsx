/**
 * @afenda-generated interface-studio
 * @afenda-boundary client
 * @afenda-description Auto-generated registry preview for app-checkbox-group — edit scripts/interface-studio.registry-preview-snippet.automation.ts then run pnpm interface-studio:codegen
 */
"use client";

import { AppCheckbox } from "@/components/ui-governance/app-checkbox/app-checkbox.control.primitive.client";
import { AppCheckboxGroup } from "@/components/ui-governance/app-checkbox-group/app-checkbox-group.control.primitive.client";

export default function InterfaceStudioRegistryPreview() {
  return (
    <div className="registry-preview-surface flex flex-wrap items-start gap-4 p-4">
      <AppCheckboxGroup aria-label="Preview group"><AppCheckbox value="a">A</AppCheckbox><AppCheckbox value="b">B</AppCheckbox></AppCheckboxGroup>
    </div>
  );
}
