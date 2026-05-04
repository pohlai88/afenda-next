/**
 * @afenda-generated interface-lab
 * @afenda-boundary client
 * @afenda-description Auto-generated registry preview for app-color-wheel — edit scripts/interface-lab.registry-preview-snippet.automation.ts then run pnpm interface-lab:codegen
 */
"use client";

import { AppColorWheel } from "@/components/ui-governance/app-color-wheel/app-color-wheel.control.primitive.client";

export default function InterfaceLabRegistryPreview() {
  return (
    <div className="registry-preview-surface flex flex-wrap items-start gap-4 p-4">
      <AppColorWheel aria-label="Preview color wheel" defaultValue="hsl(210, 80%, 50%)" />
    </div>
  );
}
