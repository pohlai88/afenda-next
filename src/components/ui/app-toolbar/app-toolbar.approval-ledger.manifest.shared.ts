/**
 * @afenda-owner app-toolbar
 * @afenda-subject approval-ledger
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared approval ledger manifest for AppToolbar
 */
import { defineApprovedComponentManifest } from "../app.approval-ledger.schema.shared";

export const appToolbarManifest = defineApprovedComponentManifest({
  id: "app-toolbar",
  owner: "shared-ui",
  exportName: "AppToolbar",
  status: "approved",
  category: "pattern",
  sourcePath: "src/components/ui/app.controls.primitive.client.tsx",
  reactAriaPrimitives: ["Toolbar"],
  variants: ["comfortable", "compact", "default", "contrast"],
  constraints: [
    "Toolbar content should stay action- and filter-oriented, not become a generic content shell.",
  ],
  a11yNotes: [
    "Toolbar naming stays explicit so grouped controls are announced with context.",
  ],
  usage: {
    useWhen: [
      "Filters and queue actions need one compact shared control rail.",
    ],
    avoidWhen: ["The layout is mostly prose or non-interactive content."],
  },
  workbench: {
    mode: "contracts",
    demoState: "available",
    demoLabel: "Contracts proof available",
  },
});
