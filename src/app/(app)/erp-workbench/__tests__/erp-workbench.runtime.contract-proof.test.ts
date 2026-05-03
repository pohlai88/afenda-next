/**
 * @afenda-owner erp-workbench
 * @afenda-subject runtime
 * @afenda-artifact contract-proof
 * @afenda-boundary test
 * @afenda-description Test coverage for the manifest-driven Contracts proof builder
 */
import { describe, expect, it } from "vitest";

import {
  buildContractsWorkbenchProofItems,
  buildContractsWorkbenchPreviewItems,
} from "@/app/(app)/erp-workbench/_components/erp-workbench.runtime.contract-proof.shared";
import {
  createApprovedComponentManifestSet,
  defineApprovedComponentManifest,
} from "@/components/ui/app.approval-ledger.schema.shared";
import { sharedUiComponentManifests } from "@/components/ui/app.approval-ledger.manifests.shared";

describe("shared UI approval ledger", () => {
  it("direct imports produce the complete typed manifest set", () => {
    expect(sharedUiComponentManifests).toHaveLength(23);
    expect(
      sharedUiComponentManifests.every(
        (manifest) => manifest.owner === "shared-ui",
      ),
    ).toBe(true);
    expect(
      sharedUiComponentManifests.map((manifest) => manifest.exportName),
    ).toContain("AppTabs");
    expect(
      sharedUiComponentManifests.map((manifest) => manifest.exportName),
    ).toContain("AppToolbar");
  });

  it("serializes manifest-driven Contracts proof items", () => {
    const previewItems = buildContractsWorkbenchPreviewItems();
    const proofItems = buildContractsWorkbenchProofItems();

    expect(previewItems).toHaveLength(sharedUiComponentManifests.length);
    expect(proofItems).toHaveLength(sharedUiComponentManifests.length);
    expect(JSON.stringify(proofItems)).toContain('"id":"app-button"');
    expect(JSON.stringify(proofItems)).toContain('"exportName":"AppButton"');
    expect(JSON.stringify(proofItems)).toContain('"demoState":"available"');
  });

  it("fails predictably on duplicate ids and missing approved proof state", () => {
    const baseManifest = sharedUiComponentManifests[0];
    expect(baseManifest).toBeDefined();

    const duplicateManifest = defineApprovedComponentManifest({
      ...baseManifest!,
      exportName: "AppButtonDuplicate",
    });

    expect(() =>
      createApprovedComponentManifestSet([baseManifest!, duplicateManifest]),
    ).toThrow('Duplicate approved component id "app-button".');

    expect(() =>
      buildContractsWorkbenchProofItems([
        defineApprovedComponentManifest({
          ...baseManifest!,
          workbench: {
            ...baseManifest!.workbench,
            demoState: "planned",
          },
        }),
      ]),
    ).toThrow(
      'Approved component "AppButton" must expose Contracts proof availability.',
    );
  });
});
