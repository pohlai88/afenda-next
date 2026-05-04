/**
 * @afenda-generated interface-lab
 * @afenda-boundary client
 * @afenda-description Auto-generated registry preview for app-drop-zone — edit scripts/interface-lab.registry-preview-snippet.automation.ts then run pnpm interface-lab:codegen
 */
"use client";

import { AppDropZone } from "@/components/ui-governance/app-drop-zone/app-drop-zone.control.primitive.client";

export default function InterfaceLabRegistryPreview() {
  return (
    <div className="registry-preview-surface flex flex-wrap items-start gap-4 p-4">
      <AppDropZone aria-label="Preview drop zone"><span className="type-body-sm">Drop files here</span></AppDropZone>
    </div>
  );
}
