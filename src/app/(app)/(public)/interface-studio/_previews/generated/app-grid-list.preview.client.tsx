/**
 * @afenda-generated interface-studio
 * @afenda-boundary client
 * @afenda-description Auto-generated registry preview for app-grid-list — edit scripts/interface-studio.registry-preview-snippet.automation.ts then run pnpm interface-studio:codegen
 */
"use client";

import { AppGridList, AppGridListItem, AppGridListText } from "@/components/ui-governance/app-grid-list/app-grid-list.control.primitive.client";

export default function InterfaceStudioRegistryPreview() {
  return (
    <div className="registry-preview-surface flex flex-wrap items-start gap-4 p-4">
      <AppGridList aria-label="Preview grid list" items={[{ id: "1", name: "Alpha" }, { id: "2", name: "Beta" }]}>{(item) => (<AppGridListItem id={item.id} textValue={item.name}><AppGridListText>{item.name}</AppGridListText></AppGridListItem>)}</AppGridList>
    </div>
  );
}
