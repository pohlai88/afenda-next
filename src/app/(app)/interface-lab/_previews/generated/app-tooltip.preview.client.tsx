/**
 * @afenda-generated interface-lab
 * @afenda-boundary client
 * @afenda-description Auto-generated registry preview for app-tooltip — edit scripts/interface-lab.registry-preview-snippet.automation.ts then run pnpm interface-lab:codegen
 */
"use client";

import { AppButton } from "@/components/ui-governance/app-button/app-button.control.primitive.client";
import { AppTooltip, AppTooltipTrigger } from "@/components/ui-governance/app-tooltip/app-tooltip.control.primitive.client";

export default function InterfaceLabRegistryPreview() {
  return (
    <div className="registry-preview-surface flex flex-wrap items-start gap-4 p-4">
      <AppTooltipTrigger><AppButton>Hover me</AppButton><AppTooltip>Tooltip copy</AppTooltip></AppTooltipTrigger>
    </div>
  );
}
