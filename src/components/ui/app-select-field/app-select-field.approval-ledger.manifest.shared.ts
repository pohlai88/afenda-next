/**
 * @afenda-owner app-select-field
 * @afenda-subject approval-ledger
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared approval ledger manifest for AppSelectField
 */
import { defineApprovedComponentManifest } from "../app.approval-ledger.schema.shared";

export const appSelectFieldManifest = defineApprovedComponentManifest({
  id: "app-select-field",
  owner: "shared-ui",
  exportName: "AppSelectField",
  status: "approved",
  category: "primitive",
  sourcePath: "src/components/ui/app.controls.primitive.client.tsx",
  reactAriaPrimitives: [
    "Select",
    "Label",
    "Text",
    "FieldError",
    "SelectValue",
    "Popover",
    "ListBox",
    "ListBoxItem",
  ],
  variants: ["comfortable", "compact", "invalid"],
  constraints: [
    "Selection options must stay explicit and small enough for repeated review work.",
  ],
  a11yNotes: [
    "Supports visible labels plus an ariaLabel escape hatch.",
    "Error and description messaging remain attached to the field semantics.",
  ],
  usage: {
    useWhen: [
      "The workflow needs a constrained choice with shared field framing.",
    ],
    avoidWhen: ["Options are too large or fuzzy for a simple select list."],
  },
  workbench: {
    mode: "contracts",
    demoState: "available",
    demoLabel: "Contracts proof available",
  },
});
