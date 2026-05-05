/**
 * @afenda-generated interface-studio
 * @afenda-boundary client
 * @afenda-description Auto-generated registry preview for app-tree — edit scripts/interface-studio.registry-preview-snippet.automation.ts then run pnpm interface-studio:codegen
 */
"use client";

import { AppTree, AppTreeItem } from "@/components/ui-governance/app-tree/app-tree.control.primitive.client";

export default function InterfaceStudioRegistryPreview() {
  return (
    <div className="registry-preview-surface flex flex-wrap items-start gap-4 p-4">
      <AppTree aria-label="Preview tree"><AppTreeItem id="root" title="Root"><AppTreeItem id="child" title="Child" /></AppTreeItem></AppTree>
    </div>
  );
}
