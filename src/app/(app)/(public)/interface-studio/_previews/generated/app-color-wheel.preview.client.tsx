/**
 * @afenda-generated interface-studio
 * @afenda-boundary client
 * @afenda-description Auto-generated registry preview for app-color-wheel — edit scripts/interface-studio.registry-preview-snippet.automation.ts then run pnpm interface-studio:codegen
 */
"use client";

import { AppColorWheel } from "@/components/ui-governance/app-color-wheel/app-color-wheel.control.primitive.client";

export default function InterfaceStudioRegistryPreview() {
  return (
    <div className="registry-preview-surface flex flex-wrap items-start gap-4 p-4">
      <AppColorWheel aria-label="Preview color wheel" defaultValue="hsl(210, 80%, 50%)" />
    </div>
  );
}
