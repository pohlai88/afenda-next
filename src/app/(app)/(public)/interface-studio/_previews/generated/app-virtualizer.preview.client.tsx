/**
 * @afenda-generated interface-studio
 * @afenda-boundary client
 * @afenda-description Auto-generated registry preview for app-virtualizer — edit scripts/interface-studio.registry-preview-snippet.automation.ts then run pnpm interface-studio:codegen
 */
"use client";

import { AppListBox, AppListBoxItem, AppListBoxText } from "@/components/ui-governance/app-list-box/app-list-box.control.primitive.client";
import { AppVirtualizer } from "@/components/ui-governance/app-virtualizer/app-virtualizer.control.primitive.client";
import { ListLayout } from "react-aria-components";

export default function InterfaceStudioRegistryPreview() {
  return (
    <div className="registry-preview-surface flex flex-wrap items-start gap-4 p-4">
      <AppVirtualizer layout={ListLayout}><AppListBox aria-label="Preview virtual list" items={[{ id: "1", name: "A" }]}>{(item) => (<AppListBoxItem id={item.id} textValue={item.name}><AppListBoxText>{item.name}</AppListBoxText></AppListBoxItem>)}</AppListBox></AppVirtualizer>
    </div>
  );
}
