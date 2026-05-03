/**
 * @afenda-owner app-grid-list
 * @afenda-subject approval-ledger
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared approval ledger manifest for AppGridList
 */
import { defineApprovedComponentManifest } from "../app.approval-ledger.schema.shared";

export const appGridListManifest = defineApprovedComponentManifest({
  id: "app-grid-list",
  owner: "shared-ui",
  exportName: "AppGridList",
  status: "approved",
  category: "composition",
  sourcePath: "src/components/ui/app.controls.primitive.client.tsx",
  reactAriaPrimitives: ["GridList"],
  variants: ["selectionMode", "selectionBehavior"],
  constraints: [
    "Use selector rails for local context switching, not route navigation.",
  ],
  a11yNotes: [
    "Grid list selection stays keyboard accessible through React Aria.",
  ],
  usage: {
    useWhen: ["A compact selector rail needs one shared selection primitive."],
    avoidWhen: ["A table or tabs surface would better fit the workload."],
  },
  workbench: {
    mode: "contracts",
    demoState: "available",
    demoLabel: "Contracts proof available",
  },
});
