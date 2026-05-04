/**
 * @afenda-generated interface-lab
 * @afenda-boundary client
 * @afenda-description Auto-generated registry preview for app-select — edit scripts/interface-lab.registry-preview-snippet.automation.ts then run pnpm interface-lab:codegen
 */
"use client";

import { AppSelect, AppSelectItem } from "@/components/ui-governance/app-select/app-select.control.primitive.client";

export default function InterfaceLabRegistryPreview() {
  return (
    <div className="registry-preview-surface flex flex-wrap items-start gap-4 p-4">
      <AppSelect aria-label="Preview select" placeholder="Choose"><AppSelectItem id="a">Alpha</AppSelectItem><AppSelectItem id="b">Bravo</AppSelectItem></AppSelect>
    </div>
  );
}
