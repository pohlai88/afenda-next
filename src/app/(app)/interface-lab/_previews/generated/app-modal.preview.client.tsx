/**
 * @afenda-generated interface-lab
 * @afenda-boundary client
 * @afenda-description Auto-generated registry preview for app-modal — edit scripts/interface-lab.registry-preview-snippet.automation.ts then run pnpm interface-lab:codegen
 */
"use client";

import { AppModal } from "@/components/ui-governance/app-modal/app-modal.control.primitive.client";

export default function InterfaceLabRegistryPreview() {
  return (
    <div className="registry-preview-surface flex flex-wrap items-start gap-4 p-4">
      <AppModal isOpen aria-label="Preview modal"><div className="type-body p-4">Modal preview surface</div></AppModal>
    </div>
  );
}
