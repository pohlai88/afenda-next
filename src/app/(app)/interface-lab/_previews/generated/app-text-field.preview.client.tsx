/**
 * @afenda-generated interface-lab
 * @afenda-boundary client
 * @afenda-description Auto-generated registry preview for app-text-field — edit scripts/interface-lab.registry-preview-snippet.automation.ts then run pnpm interface-lab:codegen
 */
"use client";

import { AppTextField, AppInput } from "@/components/ui-governance/app-text-field/app-text-field.control.primitive.client";

export default function InterfaceLabRegistryPreview() {
  return (
    <div className="registry-preview-surface flex flex-wrap items-start gap-4 p-4">
      <AppTextField aria-label="Preview field"><AppInput placeholder="Sample" /></AppTextField>
    </div>
  );
}
