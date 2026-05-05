/**
 * @afenda-generated interface-studio
 * @afenda-boundary client
 * @afenda-description Auto-generated registry preview for app-color-picker — edit scripts/interface-studio.registry-preview-snippet.automation.ts then run pnpm interface-studio:codegen
 */
"use client";

import { AppColorPicker } from "@/components/ui-governance/app-color-picker/app-color-picker.control.primitive.client";

export default function InterfaceStudioRegistryPreview() {
  return (
    <div className="registry-preview-surface flex flex-wrap items-start gap-4 p-4">
      <AppColorPicker aria-label="Preview color picker" defaultValue="hsl(210, 80%, 50%)" />
    </div>
  );
}
