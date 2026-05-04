/**
 * @afenda-generated interface-lab
 * @afenda-boundary client
 * @afenda-description Auto-generated registry preview for app-tag-group — edit scripts/interface-lab.registry-preview-snippet.automation.ts then run pnpm interface-lab:codegen
 */
"use client";

import { AppTagGroup, AppTagList, AppTag } from "@/components/ui-governance/app-tag-group/app-tag-group.control.primitive.client";

export default function InterfaceLabRegistryPreview() {
  return (
    <div className="registry-preview-surface flex flex-wrap items-start gap-4 p-4">
      <AppTagGroup aria-label="Preview tags"><AppTagList><AppTag id="t1">Tag A</AppTag><AppTag id="t2">Tag B</AppTag></AppTagList></AppTagGroup>
    </div>
  );
}
