/**
 * @afenda-owner app-row
 * @afenda-subject approval-ledger
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared approval ledger manifest for AppRow
 */
import { defineApprovedComponentManifest } from "../app.approval-ledger.schema.shared";

export const appRowManifest = defineApprovedComponentManifest({
  id: "app-row",
  owner: "shared-ui",
  exportName: "AppRow",
  status: "approved",
  category: "composition",
  sourcePath: "src/components/ui/app.controls.primitive.client.tsx",
  reactAriaPrimitives: ["Row"],
  variants: ["selected"],
  constraints: [
    "Row styling must keep selection visible without turning queues into card galleries.",
  ],
  a11yNotes: [
    "Selected row state remains exposed through the table interaction model.",
  ],
  usage: {
    useWhen: ["The queue needs shared row selection and hover treatment."],
    avoidWhen: ["A list or grid surface would better match the interaction."],
  },
  workbench: {
    mode: "contracts",
    demoState: "available",
    demoLabel: "Contracts proof available",
  },
});
