/**
 * @afenda-owner app-tabs
 * @afenda-subject approval-ledger
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared approval ledger manifest for AppTabs
 */
import { defineApprovedComponentManifest } from "../app.approval-ledger.schema.shared";

export const appTabsManifest = defineApprovedComponentManifest({
  id: "app-tabs",
  owner: "shared-ui",
  exportName: "AppTabs",
  status: "approved",
  category: "composition",
  sourcePath: "src/components/ui/app.controls.primitive.client.tsx",
  reactAriaPrimitives: ["Tabs"],
  variants: ["selectedKey", "onSelectionChange"],
  constraints: [
    "Use tabs for local mode changes, not hidden workflow mutation.",
  ],
  a11yNotes: [
    "Tab state remains keyboard accessible through the shared React Aria wrapper.",
  ],
  usage: {
    useWhen: [
      "A route needs compact mode switching within one visible surface.",
    ],
    avoidWhen: ["The interaction should navigate to a different route."],
  },
  workbench: {
    mode: "contracts",
    demoState: "available",
    demoLabel: "Contracts proof available",
  },
});
