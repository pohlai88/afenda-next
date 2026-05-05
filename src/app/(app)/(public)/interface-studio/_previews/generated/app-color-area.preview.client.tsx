/**
 * @afenda-generated interface-studio
 * @afenda-boundary client
 * @afenda-description Auto-generated registry preview for app-color-area — edit scripts/interface-studio.registry-preview-snippet.automation.ts then run pnpm interface-studio:codegen
 */
"use client";

import { AppColorArea } from "@/components/ui-governance/app-color-area/app-color-area.control.primitive.client";

export default function InterfaceStudioRegistryPreview() {
  return (
    <div className="registry-preview-surface flex flex-wrap items-start gap-4 p-4">
      <AppColorArea aria-label="Preview color area" xChannel="saturation" yChannel="lightness" defaultValue="hsl(210, 80%, 50%)" />
    </div>
  );
}
