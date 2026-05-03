/**
 * @afenda-owner app
 * @afenda-subject approval-ledger
 * @afenda-artifact schema
 * @afenda-boundary shared
 * @afenda-description Shared approval ledger schema for the App* control boundary
 */
export type ApprovedComponentStatus = "draft" | "approved" | "deprecated";

export type ApprovedComponentCategory = "primitive" | "pattern" | "composition";

export type ApprovedComponentManifest = {
  id: string;
  owner: "shared-ui";
  exportName: string;
  status: ApprovedComponentStatus;
  category: ApprovedComponentCategory;
  sourcePath: string;
  reactAriaPrimitives: readonly string[];
  variants: readonly string[];
  constraints: readonly string[];
  a11yNotes: readonly string[];
  usage?: {
    useWhen: readonly string[];
    avoidWhen: readonly string[];
  };
  workbench: {
    mode: "contracts";
    demoState: "available" | "planned";
    demoLabel: string;
  };
};

export type ApprovedComponentsIndex = {
  version: 1;
  components: readonly {
    id: string;
    manifest: string;
  }[];
};

type ApprovedComponentManifestMap = Readonly<
  Record<string, ApprovedComponentManifest>
>;

export function defineApprovedComponentManifest(
  manifest: ApprovedComponentManifest,
) {
  return manifest;
}

export function createApprovedComponentManifestSet(
  manifests: readonly ApprovedComponentManifest[],
) {
  const byId: Record<string, ApprovedComponentManifest> = {};
  const byExportName: Record<string, ApprovedComponentManifest> = {};

  for (const manifest of manifests) {
    if (byId[manifest.id] !== undefined) {
      throw new Error(`Duplicate approved component id "${manifest.id}".`);
    }

    if (byExportName[manifest.exportName] !== undefined) {
      throw new Error(
        `Duplicate approved component export "${manifest.exportName}".`,
      );
    }

    byId[manifest.id] = manifest;
    byExportName[manifest.exportName] = manifest;
  }

  return {
    manifests,
    byId: byId as ApprovedComponentManifestMap,
    byExportName: byExportName as ApprovedComponentManifestMap,
  } as const;
}
