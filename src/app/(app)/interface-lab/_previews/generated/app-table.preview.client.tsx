/**
 * @afenda-generated interface-lab
 * @afenda-boundary client
 * @afenda-description Auto-generated registry preview for app-table — edit scripts/interface-lab.registry-preview-snippet.automation.ts then run pnpm interface-lab:codegen
 */
"use client";

import { AppCell, AppColumn, AppRow, AppTable, AppTableBody, AppTableHeader } from "@/components/ui-governance/app-table/app-table.control.primitive.client";

export default function InterfaceLabRegistryPreview() {
  return (
    <div className="registry-preview-surface flex flex-wrap items-start gap-4 p-4">
      <AppTable aria-label="Preview table"><AppTableHeader><AppColumn id="c1" isRowHeader>Name</AppColumn><AppColumn id="c2">Value</AppColumn></AppTableHeader><AppTableBody><AppRow id="r1"><AppCell>Row A</AppCell><AppCell>1</AppCell></AppRow></AppTableBody></AppTable>
    </div>
  );
}
