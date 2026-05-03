/**
 * @afenda-owner app-switch-field
 * @afenda-subject approval-ledger
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared approval ledger manifest for AppSwitchField
 */
import { defineApprovedComponentManifest } from "../app.approval-ledger.schema.shared";

export const appSwitchFieldManifest = defineApprovedComponentManifest({
  id: "app-switch-field",
  owner: "shared-ui",
  exportName: "AppSwitchField",
  status: "draft",
  category: "primitive",
  sourcePath: "src/components/ui/app.controls.primitive.client.tsx",
  reactAriaPrimitives: ["Switch", "Text"],
  variants: ["selected", "disabled"],
  constraints: [
    "Use switches only for immediate binary state, not workflow stage changes.",
  ],
  a11yNotes: [
    "The visible label and description stay in the same hit area as the switch.",
  ],
  usage: {
    useWhen: ["A local binary setting changes immediately and reversibly."],
    avoidWhen: ["The change implies approval, posting, or irreversible state."],
  },
  workbench: {
    mode: "contracts",
    demoState: "planned",
    demoLabel: "Contracts proof planned",
  },
});
