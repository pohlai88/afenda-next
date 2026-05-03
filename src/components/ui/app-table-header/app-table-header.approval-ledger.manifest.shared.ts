/**
 * @afenda-owner app-table-header
 * @afenda-subject approval-ledger
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared approval ledger manifest for AppTableHeader
 */
import { defineApprovedComponentManifest } from "../app.approval-ledger.schema.shared";

export const appTableHeaderManifest = defineApprovedComponentManifest({
  id: "app-table-header",
  owner: "shared-ui",
  exportName: "AppTableHeader",
  status: "approved",
  category: "composition",
  sourcePath: "src/components/ui/app.controls.primitive.client.tsx",
  reactAriaPrimitives: ["TableHeader"],
  variants: ["surface header"],
  constraints: [
    "Header styling must stay aligned with dense queue scanning and sorting affordances.",
  ],
  a11yNotes: [
    "Header semantics remain in the table structure for keyboard and screen reader navigation.",
  ],
  usage: {
    useWhen: ["You are composing AppTable with named columns."],
    avoidWhen: ["The table surface is not the active interaction pattern."],
  },
  workbench: {
    mode: "contracts",
    demoState: "available",
    demoLabel: "Contracts proof available",
  },
});
