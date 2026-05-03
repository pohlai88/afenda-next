/**
 * @afenda-owner app-tab-list
 * @afenda-subject approval-ledger
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared approval ledger manifest for AppTabList
 */
import { defineApprovedComponentManifest } from "../app.approval-ledger.schema.shared";

export const appTabListManifest = defineApprovedComponentManifest({
  id: "app-tab-list",
  owner: "shared-ui",
  exportName: "AppTabList",
  status: "approved",
  category: "composition",
  sourcePath: "src/components/ui/app.controls.primitive.client.tsx",
  reactAriaPrimitives: ["TabList"],
  variants: ["dense panel shell"],
  constraints: [
    "Tab list layout should stay compact and scan-friendly across ERP surfaces.",
  ],
  a11yNotes: [
    "Tab list labeling remains explicit for assistive technology navigation.",
  ],
  usage: {
    useWhen: ["AppTabs needs a shared visible control rail."],
    avoidWhen: ["A one-off segmented control would be more honest."],
  },
  workbench: {
    mode: "contracts",
    demoState: "available",
    demoLabel: "Contracts proof available",
  },
});
