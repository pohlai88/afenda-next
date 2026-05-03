/**
 * @afenda-owner app-text-field
 * @afenda-subject approval-ledger
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared approval ledger manifest for AppTextField
 */
import { defineApprovedComponentManifest } from "../app.approval-ledger.schema.shared";

export const appTextFieldManifest = defineApprovedComponentManifest({
  id: "app-text-field",
  owner: "shared-ui",
  exportName: "AppTextField",
  status: "draft",
  category: "primitive",
  sourcePath: "src/components/ui/app.controls.primitive.client.tsx",
  reactAriaPrimitives: ["TextField", "Label", "Input", "Text", "FieldError"],
  variants: ["comfortable", "compact", "invalid"],
  constraints: [
    "Keep field state explicit and route-owned instead of hiding domain rules.",
  ],
  a11yNotes: [
    "Supports visible labels plus an ariaLabel escape hatch.",
    "Descriptions and errors use React Aria slots and field semantics.",
  ],
  usage: {
    useWhen: ["You need a single-line text input with shared field framing."],
    avoidWhen: ["The workflow needs search, selection, or multiline behavior."],
  },
  workbench: {
    mode: "contracts",
    demoState: "planned",
    demoLabel: "Contracts proof planned",
  },
});
