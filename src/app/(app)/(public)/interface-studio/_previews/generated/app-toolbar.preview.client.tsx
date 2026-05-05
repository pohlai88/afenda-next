/**
 * @afenda-generated interface-studio
 * @afenda-boundary client
 * @afenda-description Auto-generated registry preview for app-toolbar — edit scripts/interface-studio.registry-preview-snippet.automation.ts then run pnpm interface-studio:codegen
 */
"use client";

import { AppToolbar } from "@/components/ui-governance/app-toolbar/app-toolbar.control.primitive.client";

export default function InterfaceStudioRegistryPreview() {
  return (
    <div className="registry-preview-surface flex flex-wrap items-start gap-4 p-4">
      <AppToolbar aria-label="Preview toolbar"><span className="type-body-sm">Toolbar preview</span></AppToolbar>
    </div>
  );
}
