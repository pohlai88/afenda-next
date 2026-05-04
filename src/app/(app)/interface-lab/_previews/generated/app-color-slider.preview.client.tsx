/**
 * @afenda-generated interface-lab
 * @afenda-boundary client
 * @afenda-description Auto-generated registry preview for app-color-slider — edit scripts/interface-lab.registry-preview-snippet.automation.ts then run pnpm interface-lab:codegen
 */
"use client";

import { AppColorSlider } from "@/components/ui-governance/app-color-slider/app-color-slider.control.primitive.client";

export default function InterfaceLabRegistryPreview() {
  return (
    <div className="registry-preview-surface flex flex-wrap items-start gap-4 p-4">
      <AppColorSlider aria-label="Preview color slider" channel="hue" defaultValue="hsl(210, 80%, 50%)" />
    </div>
  );
}
