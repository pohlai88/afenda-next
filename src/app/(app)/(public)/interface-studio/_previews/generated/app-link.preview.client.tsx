/**
 * @afenda-generated interface-studio
 * @afenda-boundary client
 * @afenda-description Auto-generated registry preview for app-link — edit scripts/interface-studio.registry-preview-snippet.automation.ts then run pnpm interface-studio:codegen
 */
"use client";

import { AppLink } from "@/components/ui-governance/app-link/app-link.control.primitive.client";

export default function InterfaceStudioRegistryPreview() {
  return (
    <div className="registry-preview-surface flex flex-wrap items-start gap-4 p-4">
      <AppLink href="/interface-studio">Interface Studio</AppLink>
    </div>
  );
}
