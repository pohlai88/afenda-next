/**
 * @afenda-generated interface-lab
 * @afenda-boundary client
 * @afenda-description Auto-generated registry preview for app-color-swatch-picker — edit scripts/interface-lab.registry-preview-snippet.automation.ts then run pnpm interface-lab:codegen
 */
"use client";

import { AppColorSwatchPicker, AppColorSwatchPickerItem } from "@/components/ui-governance/app-color-swatch-picker/app-color-swatch-picker.control.primitive.client";

export default function InterfaceLabRegistryPreview() {
  return (
    <div className="registry-preview-surface flex flex-wrap items-start gap-4 p-4">
      <AppColorSwatchPicker aria-label="Preview swatches" defaultValue="hsl(210, 80%, 50%)"><AppColorSwatchPickerItem color="hsl(210, 80%, 50%)" /><AppColorSwatchPickerItem color="hsl(120, 60%, 45%)" /></AppColorSwatchPicker>
    </div>
  );
}
