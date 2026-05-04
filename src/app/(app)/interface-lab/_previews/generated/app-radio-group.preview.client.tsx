/**
 * @afenda-generated interface-lab
 * @afenda-boundary client
 * @afenda-description Auto-generated registry preview for app-radio-group — edit scripts/interface-lab.registry-preview-snippet.automation.ts then run pnpm interface-lab:codegen
 */
"use client";

import { AppRadio, AppRadioGroup } from "@/components/ui-governance/app-radio-group/app-radio-group.control.primitive.client";

export default function InterfaceLabRegistryPreview() {
  return (
    <div className="registry-preview-surface flex flex-wrap items-start gap-4 p-4">
      <AppRadioGroup aria-label="Preview choice" defaultValue="a"><AppRadio value="a">Option A</AppRadio><AppRadio value="b">Option B</AppRadio></AppRadioGroup>
    </div>
  );
}
