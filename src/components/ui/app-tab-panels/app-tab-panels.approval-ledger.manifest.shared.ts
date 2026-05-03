/**
 * @afenda-owner app-tab-panels
 * @afenda-subject approval-ledger
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared approval ledger manifest for AppTabPanels
 */
import { defineApprovedComponentManifest } from "../app.approval-ledger.schema.shared";

export const appTabPanelsManifest = defineApprovedComponentManifest({
  id: "app-tab-panels",
  owner: "shared-ui",
  exportName: "AppTabPanels",
  status: "approved",
  category: "composition",
  sourcePath: "src/components/ui/app.controls.primitive.client.tsx",
  reactAriaPrimitives: ["TabPanels"],
  variants: ["min-height shell"],
  constraints: [
    "Panels must stay route-owned; this wrapper should not invent hidden state.",
  ],
  a11yNotes: ["Panel containers stay coupled to the tab relationship model."],
  usage: {
    useWhen: ["AppTabs needs the shared panel container for local views."],
    avoidWhen: ["You are rendering standalone content outside a tab contract."],
  },
  workbench: {
    mode: "contracts",
    demoState: "available",
    demoLabel: "Contracts proof available",
  },
});
