/**
 * @afenda-generated interface-lab
 * @afenda-boundary client
 * @afenda-description Auto-generated registry preview for app-disclosure — edit scripts/interface-lab.registry-preview-snippet.automation.ts then run pnpm interface-lab:codegen
 */
"use client";

import { AppDisclosure } from "@/components/ui-governance/app-disclosure/app-disclosure.control.primitive.client";

export default function InterfaceLabRegistryPreview() {
  return (
    <div className="registry-preview-surface flex flex-wrap items-start gap-4 p-4">
      <AppDisclosure title="Preview disclosure"><p className="type-body-sm p-2">Panel body</p></AppDisclosure>
    </div>
  );
}
