/**
 * @afenda-owner app-column
 * @afenda-subject approval-ledger
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared approval ledger manifest for AppColumn
 */
import { defineApprovedComponentManifest } from "../app.approval-ledger.schema.shared";

export const appColumnManifest = defineApprovedComponentManifest({
  id: "app-column",
  owner: "shared-ui",
  exportName: "AppColumn",
  status: "approved",
  category: "composition",
  sourcePath: "src/components/ui/app.controls.primitive.client.tsx",
  reactAriaPrimitives: ["Column"],
  variants: ["rowHeader", "allowsSorting"],
  constraints: [
    "Sorting affordances must stay visible instead of hiding direction in route-local code.",
  ],
  a11yNotes: [
    "Row-header columns preserve record identity for assistive technology users.",
  ],
  usage: {
    useWhen: [
      "A queue column needs shared styling and optional sorting semantics.",
    ],
    avoidWhen: [
      "A cell should render freeform content outside a table structure.",
    ],
  },
  workbench: {
    mode: "contracts",
    demoState: "available",
    demoLabel: "Contracts proof available",
  },
});
