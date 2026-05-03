/**
 * @afenda-owner app-search-field
 * @afenda-subject approval-ledger
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared approval ledger manifest for AppSearchField
 */
import { defineApprovedComponentManifest } from "../app.approval-ledger.schema.shared";

export const appSearchFieldManifest = defineApprovedComponentManifest({
  id: "app-search-field",
  owner: "shared-ui",
  exportName: "AppSearchField",
  status: "approved",
  category: "primitive",
  sourcePath: "src/components/ui/app.controls.primitive.client.tsx",
  reactAriaPrimitives: ["SearchField", "Label", "Input", "Text", "Button"],
  variants: ["clear-slot", "disabled"],
  constraints: [
    "Search framing must stay compact so queue filters do not crowd the route.",
  ],
  a11yNotes: ["Uses the native searchbox pattern with a labeled clear action."],
  usage: {
    useWhen: [
      "Operators need additive search inside queues and selector rails.",
    ],
    avoidWhen: ["The interaction needs freeform notes rather than filtering."],
  },
  workbench: {
    mode: "contracts",
    demoState: "available",
    demoLabel: "Contracts proof available",
  },
});
