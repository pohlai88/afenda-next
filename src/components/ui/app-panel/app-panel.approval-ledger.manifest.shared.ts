/**
 * @afenda-owner app-panel
 * @afenda-subject approval-ledger
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared approval ledger manifest for AppPanel
 */
import { defineApprovedComponentManifest } from "../app.approval-ledger.schema.shared";

export const appPanelManifest = defineApprovedComponentManifest({
  id: "app-panel",
  owner: "shared-ui",
  exportName: "AppPanel",
  status: "approved",
  category: "composition",
  sourcePath: "src/components/ui/app.controls.primitive.client.tsx",
  reactAriaPrimitives: [],
  variants: ["comfortable", "compact", "default", "contrast", "muted"],
  constraints: [
    "Panels frame ERP context; they should not become ornamental card grids.",
  ],
  a11yNotes: [
    "Panel wrappers must preserve semantic headings and landmarks from their children.",
  ],
  usage: {
    useWhen: ["A scene needs a bounded surface for dense content or evidence."],
    avoidWhen: [
      "The wrapper adds decoration without clarifying workflow structure.",
    ],
  },
  workbench: {
    mode: "contracts",
    demoState: "available",
    demoLabel: "Contracts proof available",
  },
});
