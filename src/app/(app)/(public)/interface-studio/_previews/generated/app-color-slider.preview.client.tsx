/**
 * @afenda-generated interface-studio
 * @afenda-boundary client
 * @afenda-description Auto-generated registry preview for app-color-slider — edit scripts/interface-studio.registry-preview-snippet.automation.ts then run pnpm interface-studio:codegen
 */
"use client";

import { AppColorSlider } from "@/components/ui-governance/app-color-slider/app-color-slider.control.primitive.client";

export default function InterfaceStudioRegistryPreview() {
  return (
    <div className="registry-preview-surface flex flex-wrap items-start gap-4 p-4">
      <AppColorSlider aria-label="Preview color slider" channel="hue" defaultValue="hsl(210, 80%, 50%)" />
    </div>
  );
}
