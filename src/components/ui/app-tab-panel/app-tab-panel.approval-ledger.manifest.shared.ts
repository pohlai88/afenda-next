/**
 * @afenda-owner app-tab-panel
 * @afenda-subject approval-ledger
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared approval ledger manifest for AppTabPanel
 */
import { defineApprovedComponentManifest } from "../app.approval-ledger.schema.shared";

export const appTabPanelManifest = defineApprovedComponentManifest({
  id: "app-tab-panel",
  owner: "shared-ui",
  exportName: "AppTabPanel",
  status: "approved",
  category: "composition",
  sourcePath: "src/components/ui/app.controls.primitive.client.tsx",
  reactAriaPrimitives: ["TabPanel"],
  variants: ["default"],
  constraints: [
    "Panel content should keep the active context visible instead of hiding key state.",
  ],
  a11yNotes: [
    "Tab panel semantics preserve the active tab-to-panel relationship.",
  ],
  usage: {
    useWhen: ["A selected tab reveals a route-local scene or proof surface."],
    avoidWhen: ["The content is not controlled by the current tab selection."],
  },
  workbench: {
    mode: "contracts",
    demoState: "available",
    demoLabel: "Contracts proof available",
  },
});
