/**
 * @afenda-generated interface-lab
 * @afenda-boundary client
 * @afenda-description Auto-generated registry preview for app-popover — edit scripts/interface-lab.registry-preview-snippet.automation.ts then run pnpm interface-lab:codegen
 */
"use client";

import { AppButton } from "@/components/ui-governance/app-button/app-button.control.primitive.client";
import { AppPopover, AppPopoverTrigger } from "@/components/ui-governance/app-popover/app-popover.control.primitive.client";

export default function InterfaceLabRegistryPreview() {
  return (
    <div className="registry-preview-surface flex flex-wrap items-start gap-4 p-4">
      <AppPopoverTrigger><AppButton>Open</AppButton><AppPopover><p className="type-body-sm">Popover body</p></AppPopover></AppPopoverTrigger>
    </div>
  );
}
