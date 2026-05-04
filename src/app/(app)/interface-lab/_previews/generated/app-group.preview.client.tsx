/**
 * @afenda-generated interface-lab
 * @afenda-boundary client
 * @afenda-description Auto-generated registry preview for app-group — edit scripts/interface-lab.registry-preview-snippet.automation.ts then run pnpm interface-lab:codegen
 */
"use client";

import { AppGroup } from "@/components/ui-governance/app-group/app-group.control.primitive.client";

export default function InterfaceLabRegistryPreview() {
  return (
    <div className="registry-preview-surface flex flex-wrap items-start gap-4 p-4">
      <AppGroup><span className="type-body-sm">Grouped controls</span></AppGroup>
    </div>
  );
}
