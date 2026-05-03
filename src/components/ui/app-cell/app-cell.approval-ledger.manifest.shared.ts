/**
 * @afenda-owner app-cell
 * @afenda-subject approval-ledger
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared approval ledger manifest for AppCell
 */
import { defineApprovedComponentManifest } from "../app.approval-ledger.schema.shared";

export const appCellManifest = defineApprovedComponentManifest({
  id: "app-cell",
  owner: "shared-ui",
  exportName: "AppCell",
  status: "approved",
  category: "composition",
  sourcePath: "src/components/ui/app.controls.primitive.client.tsx",
  reactAriaPrimitives: ["Cell"],
  variants: ["default"],
  constraints: ["Cell spacing must preserve scan speed for dense ERP tables."],
  a11yNotes: ["Cell content stays inside the table's semantic reading order."],
  usage: {
    useWhen: ["A queue column needs shared cell spacing and text treatment."],
    avoidWhen: ["The content is not part of a tabular record row."],
  },
  workbench: {
    mode: "contracts",
    demoState: "available",
    demoLabel: "Contracts proof available",
  },
});
