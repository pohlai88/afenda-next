/**
 * @afenda-generated interface-lab
 * @afenda-boundary client
 * @afenda-description Auto-generated registry preview for app-slider — edit scripts/interface-lab.registry-preview-snippet.automation.ts then run pnpm interface-lab:codegen
 */
"use client";

import { SliderThumb, SliderTrack } from "react-aria-components";
import { AppSlider } from "@/components/ui-governance/app-slider/app-slider.control.primitive.client";

export default function InterfaceLabRegistryPreview() {
  return (
    <div className="registry-preview-surface flex flex-wrap items-start gap-4 p-4">
      <AppSlider aria-label="Preview slider" defaultValue={30}><SliderTrack className="bg-surface-muted relative h-2 w-48 rounded-full"><SliderThumb className="bg-foreground top-1/2 size-4 rounded-full" /></SliderTrack></AppSlider>
    </div>
  );
}
