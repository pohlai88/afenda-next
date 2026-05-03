/**
 * @afenda-owner app-form
 * @afenda-subject approval-ledger
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared approval ledger manifest for AppForm
 */
import { defineApprovedComponentManifest } from "../app.approval-ledger.schema.shared";

export const appFormManifest = defineApprovedComponentManifest({
  id: "app-form",
  owner: "shared-ui",
  exportName: "AppForm",
  status: "draft",
  category: "pattern",
  sourcePath: "src/components/ui/app.controls.primitive.client.tsx",
  reactAriaPrimitives: ["Form"],
  variants: ["validationBehavior=aria"],
  constraints: [
    "Keep shared form semantics thin and route-owned validation explicit.",
  ],
  a11yNotes: ["Form submission semantics stay native and keyboard friendly."],
  usage: {
    useWhen: ["You need a shared form shell around App* field controls."],
    avoidWhen: ["A layout wrapper has no real form semantics or submit path."],
  },
  workbench: {
    mode: "contracts",
    demoState: "planned",
    demoLabel: "Contracts proof planned",
  },
});
