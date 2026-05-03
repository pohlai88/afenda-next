/**
 * @afenda-owner erp-workbench
 * @afenda-subject runtime
 * @afenda-artifact contract-proof
 * @afenda-boundary shared
 * @afenda-description Shared manifest-driven approval proof builder for Contracts mode
 */
import type { ApprovedComponentManifest } from "@/components/ui/app.approval-ledger.schema.shared";
import { sharedUiComponentManifests } from "@/components/ui/app.approval-ledger.manifests.shared";

import type {
  WorkbenchContractProofItem,
  WorkbenchPreviewItem,
  WorkbenchStatusTone,
} from "./erp-workbench.runtime.contract.shared";

function capitalize(value: string) {
  return `${value.slice(0, 1).toUpperCase()}${value.slice(1)}`;
}

function toneForStatus(
  status: ApprovedComponentManifest["status"],
): WorkbenchStatusTone {
  switch (status) {
    case "approved":
      return "success";
    case "deprecated":
      return "danger";
    case "draft":
      return "warning";
  }
}

function summaryForManifest(manifest: ApprovedComponentManifest) {
  return (
    manifest.constraints[0] ??
    manifest.usage?.useWhen[0] ??
    manifest.a11yNotes[0] ??
    manifest.workbench.demoLabel
  );
}

function assertApprovedManifestHasProof(manifest: ApprovedComponentManifest) {
  if (
    manifest.status === "approved" &&
    manifest.workbench.demoState !== "available"
  ) {
    throw new Error(
      `Approved component "${manifest.exportName}" must expose Contracts proof availability.`,
    );
  }
}

export function buildContractsWorkbenchPreviewItems(
  manifests: readonly ApprovedComponentManifest[] = sharedUiComponentManifests,
): WorkbenchPreviewItem[] {
  return manifests.map((manifest) => ({
    id: manifest.id,
    modeId: "contracts",
    name: manifest.exportName,
    subtitle: `${capitalize(manifest.status)} ${manifest.category}`,
    summary: summaryForManifest(manifest),
    badgeLabel: capitalize(manifest.status),
    badgeTone: toneForStatus(manifest.status),
    sourcePath: manifest.sourcePath,
    ariaPrimitives: [...manifest.reactAriaPrimitives],
    states: [...manifest.variants],
    evidencePoints: [...manifest.constraints],
    decisionHints: [
      ...(manifest.usage?.useWhen ?? []),
      ...(manifest.usage?.avoidWhen ?? []),
    ],
  }));
}

export function buildContractsWorkbenchProofItems(
  manifests: readonly ApprovedComponentManifest[] = sharedUiComponentManifests,
): WorkbenchContractProofItem[] {
  manifests.forEach(assertApprovedManifestHasProof);

  return manifests.map((manifest) => ({
    id: manifest.id,
    exportName: manifest.exportName,
    status: manifest.status,
    category: manifest.category,
    sourcePath: manifest.sourcePath,
    reactAriaPrimitives: [...manifest.reactAriaPrimitives],
    variants: [...manifest.variants],
    constraints: [...manifest.constraints],
    a11yNotes: [...manifest.a11yNotes],
    ...(manifest.usage !== undefined
      ? {
          usage: {
            useWhen: [...manifest.usage.useWhen],
            avoidWhen: [...manifest.usage.avoidWhen],
          },
        }
      : {}),
    demoState: manifest.workbench.demoState,
    demoLabel: manifest.workbench.demoLabel,
  }));
}
