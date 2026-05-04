/**
 * @afenda-generated interface-lab
 * @afenda-boundary client
 * @afenda-description Auto-generated registry preview for app-menu — edit scripts/interface-lab.registry-preview-snippet.automation.ts then run pnpm interface-lab:codegen
 */
"use client";

import { AppMenu, AppMenuItem } from "@/components/ui-governance/app-menu/app-menu.control.primitive.client";

export default function InterfaceLabRegistryPreview() {
  return (
    <div className="registry-preview-surface flex flex-wrap items-start gap-4 p-4">
      <AppMenu aria-label="Preview menu"><AppMenuItem textValue="Cut">Cut</AppMenuItem><AppMenuItem textValue="Copy">Copy</AppMenuItem></AppMenu>
    </div>
  );
}
