/**
 * @afenda-generated interface-lab
 * @afenda-boundary client
 * @afenda-description Auto-generated registry preview for app-progress-bar — edit scripts/interface-lab.registry-preview-snippet.automation.ts then run pnpm interface-lab:codegen
 */
"use client";

import { AppProgressBar } from "@/components/ui-governance/app-progress-bar/app-progress-bar.control.primitive.client";

export default function InterfaceLabRegistryPreview() {
  return (
    <div className="registry-preview-surface flex flex-wrap items-start gap-4 p-4">
      <AppProgressBar aria-label="Preview progress" value={35} />
    </div>
  );
}
