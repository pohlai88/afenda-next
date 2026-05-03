/**
 * @afenda-owner app-table
 * @afenda-subject approval-ledger
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared approval ledger manifest for AppTable
 */
import { defineApprovedComponentManifest } from "../app.approval-ledger.schema.shared";

export const appTableManifest = defineApprovedComponentManifest({
  id: "app-table",
  owner: "shared-ui",
  exportName: "AppTable",
  status: "approved",
  category: "composition",
  sourcePath: "src/components/ui/app.controls.primitive.client.tsx",
  reactAriaPrimitives: ["Table"],
  variants: ["selectionMode", "selectionBehavior", "sortDescriptor"],
  constraints: [
    "Keep the primitive dense and legible instead of turning it into a spreadsheet engine.",
  ],
  a11yNotes: [
    "Table semantics stay with React Aria so keyboard selection remains consistent.",
  ],
  usage: {
    useWhen: ["Dense ERP queues need stable headers and row selection."],
    avoidWhen: [
      "A simple summary list would be clearer than a tabular surface.",
    ],
  },
  workbench: {
    mode: "contracts",
    demoState: "available",
    demoLabel: "Contracts proof available",
  },
});
