/**
 * @afenda-owner app-button
 * @afenda-subject approval-ledger
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared approval ledger manifest for AppButton
 */
import { defineApprovedComponentManifest } from "../app.approval-ledger.schema.shared";

export const appButtonManifest = defineApprovedComponentManifest({
  id: "app-button",
  owner: "shared-ui",
  exportName: "AppButton",
  status: "approved",
  category: "primitive",
  sourcePath: "src/components/ui/app.controls.primitive.client.tsx",
  reactAriaPrimitives: ["Button"],
  variants: ["primary", "secondary", "selected", "loading", "fullWidth"],
  constraints: [
    "Preserve React Aria onPress semantics through the wrapper.",
    "Keep button tone and density inside the shared token system.",
  ],
  a11yNotes: [
    "Accessible name must come from visible text or aria-label.",
    "Loading state disables press interaction and changes the announced label.",
  ],
  usage: {
    useWhen: ["Trigger direct operator actions inside dense ERP flows."],
    avoidWhen: ["You need navigation semantics instead of button semantics."],
  },
  workbench: {
    mode: "contracts",
    demoState: "available",
    demoLabel: "Contracts proof available",
  },
});
