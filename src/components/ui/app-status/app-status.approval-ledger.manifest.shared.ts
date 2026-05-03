/**
 * @afenda-owner app-status
 * @afenda-subject approval-ledger
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared approval ledger manifest for AppStatus
 */
import { defineApprovedComponentManifest } from "../app.approval-ledger.schema.shared";

export const appStatusManifest = defineApprovedComponentManifest({
  id: "app-status",
  owner: "shared-ui",
  exportName: "AppStatus",
  status: "approved",
  category: "primitive",
  sourcePath: "src/components/ui/app.controls.primitive.client.tsx",
  reactAriaPrimitives: [],
  variants: ["neutral", "info", "success", "warning", "danger"],
  constraints: [
    "Status color guides attention; it must not become decorative noise.",
  ],
  a11yNotes: [
    "Badge text must carry the meaning; color cannot be the only signal.",
  ],
  usage: {
    useWhen: ["A workflow state or proof state needs compact inline emphasis."],
    avoidWhen: [
      "Long explanatory text would communicate the state more clearly.",
    ],
  },
  workbench: {
    mode: "contracts",
    demoState: "available",
    demoLabel: "Contracts proof available",
  },
});
