/**
 * @afenda-owner app-grid-list-item
 * @afenda-subject approval-ledger
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared approval ledger manifest for AppGridListItem
 */
import { defineApprovedComponentManifest } from "../app.approval-ledger.schema.shared";

export const appGridListItemManifest = defineApprovedComponentManifest({
  id: "app-grid-list-item",
  owner: "shared-ui",
  exportName: "AppGridListItem",
  status: "approved",
  category: "composition",
  sourcePath: "src/components/ui/app.controls.primitive.client.tsx",
  reactAriaPrimitives: ["GridListItem"],
  variants: ["selected", "focused"],
  constraints: [
    "Item content should stay concise enough for repeated scanning in narrow rails.",
  ],
  a11yNotes: [
    "Selected and focused states remain visible and announced through the collection model.",
  ],
  usage: {
    useWhen: [
      "A selector rail item needs shared focus and selection treatment.",
    ],
    avoidWhen: [
      "The content needs multi-column queue density instead of card selection.",
    ],
  },
  workbench: {
    mode: "contracts",
    demoState: "available",
    demoLabel: "Contracts proof available",
  },
});
