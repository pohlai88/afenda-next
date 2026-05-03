/**
 * @afenda-owner app-table-body
 * @afenda-subject approval-ledger
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared approval ledger manifest for AppTableBody
 */
import { defineApprovedComponentManifest } from "../app.approval-ledger.schema.shared";

export const appTableBodyManifest = defineApprovedComponentManifest({
  id: "app-table-body",
  owner: "shared-ui",
  exportName: "AppTableBody",
  status: "approved",
  category: "composition",
  sourcePath: "src/components/ui/app.controls.primitive.client.tsx",
  reactAriaPrimitives: ["TableBody"],
  variants: ["renderEmptyState"],
  constraints: [
    "Empty states should stay explicit so operators never mistake a blank queue for a rendering bug.",
  ],
  a11yNotes: [
    "Table body semantics remain intact for dynamic row collections.",
  ],
  usage: {
    useWhen: [
      "Queue rows are data-driven and may need an empty-state fallback.",
    ],
    avoidWhen: ["Static prose would be clearer than a table collection."],
  },
  workbench: {
    mode: "contracts",
    demoState: "available",
    demoLabel: "Contracts proof available",
  },
});
