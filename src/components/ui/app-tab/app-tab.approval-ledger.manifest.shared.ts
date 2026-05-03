/**
 * @afenda-owner app-tab
 * @afenda-subject approval-ledger
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared approval ledger manifest for AppTab
 */
import { defineApprovedComponentManifest } from "../app.approval-ledger.schema.shared";

export const appTabManifest = defineApprovedComponentManifest({
  id: "app-tab",
  owner: "shared-ui",
  exportName: "AppTab",
  status: "approved",
  category: "composition",
  sourcePath: "src/components/ui/app.controls.primitive.client.tsx",
  reactAriaPrimitives: ["Tab"],
  variants: ["selected", "disabled"],
  constraints: [
    "Tab labels should express workflow meaning instead of implementation jargon.",
  ],
  a11yNotes: [
    "Selected and disabled state stay exposed through the tab semantics.",
  ],
  usage: {
    useWhen: ["A local mode change needs one labeled, focusable tab control."],
    avoidWhen: ["A button or navigation link would be semantically clearer."],
  },
  workbench: {
    mode: "contracts",
    demoState: "available",
    demoLabel: "Contracts proof available",
  },
});
