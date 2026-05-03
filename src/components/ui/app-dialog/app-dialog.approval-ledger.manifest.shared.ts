/**
 * @afenda-owner app-dialog
 * @afenda-subject approval-ledger
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared approval ledger manifest for AppDialog
 */
import { defineApprovedComponentManifest } from "../app.approval-ledger.schema.shared";

export const appDialogManifest = defineApprovedComponentManifest({
  id: "app-dialog",
  owner: "shared-ui",
  exportName: "AppDialog",
  status: "approved",
  category: "pattern",
  sourcePath: "src/components/ui/app.controls.primitive.client.tsx",
  reactAriaPrimitives: [
    "DialogTrigger",
    "ModalOverlay",
    "Modal",
    "Dialog",
    "Heading",
    "Button",
  ],
  variants: ["dismissable", "actions"],
  constraints: [
    "Dialogs confirm visible context; they do not replace the primary review surface.",
  ],
  a11yNotes: [
    "Dialog title and close affordance stay explicit.",
    "Escape and close-button dismissal remain available by default.",
  ],
  usage: {
    useWhen: [
      "A workflow needs controlled confirmation over existing context.",
    ],
    avoidWhen: [
      "The operator still needs to discover core evidence or identity.",
    ],
  },
  workbench: {
    mode: "contracts",
    demoState: "available",
    demoLabel: "Contracts proof available",
  },
});
