/**
 * @afenda-generated interface-lab
 * @afenda-boundary client
 * @afenda-description Auto-generated registry preview for app-toolbar — edit scripts/interface-lab.registry-preview-snippet.automation.ts then run pnpm interface-lab:codegen
 */
"use client";

import { AppToolbar } from "@/components/ui-governance/app-toolbar/app-toolbar.control.primitive.client";

export default function InterfaceLabRegistryPreview() {
  return (
    <div className="registry-preview-surface flex flex-wrap items-start gap-4 p-4">
      <AppToolbar aria-label="Preview toolbar"><span className="type-body-sm">Toolbar preview</span></AppToolbar>
    </div>
  );
}
