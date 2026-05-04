/**
 * @afenda-owner interface-lab
 * @afenda-subject registry-catalog
 * @afenda-boundary server
 * @afenda-description Maps ui governance manifests to Interface Lab catalog rows (server-only).
 */
import { uiComponentRegistry } from "@/components/ui-governance/governance.ui.registry.shared";
import type { ManifestLifecycleStatus } from "@/components/ui-governance/governance.ui.manifest.shared";

import type { InterfaceLabItem, InterfaceLabStatus } from "./interface-lab.types";

function manifestStatusToLabStatus(status: ManifestLifecycleStatus): InterfaceLabStatus {
  switch (status) {
    case "draft":
      return "experimental";
    case "review":
      return "candidate";
    case "approved":
      return "approved";
    case "deprecated":
      return "deprecated";
    default: {
      const _exhaustive: never = status;
      return _exhaustive;
    }
  }
}

function titleFromExportName(exportName: string): string {
  if (exportName.startsWith("App")) {
    return exportName.slice(3);
  }
  return exportName;
}

function slugFromManifestId(id: string): string {
  if (!id.startsWith("app-")) {
    return id;
  }
  return id.slice("app-".length);
}

export function buildRegistryDerivedInterfaceLabItems(): InterfaceLabItem[] {
  return uiComponentRegistry.map((manifest) => {
    const slug = slugFromManifestId(manifest.id);
    const title = titleFromExportName(manifest.exportName);
    const description =
      manifest.usage.useWhen[0] ??
      `${manifest.exportName} (${manifest.category}) — governed UI primitive.`;
    const tags = [...manifest.reactAriaPrimitives, manifest.owner];
    const anatomy =
      manifest.reactAriaPrimitives.length > 0
        ? [...manifest.reactAriaPrimitives]
        : [`${manifest.boundary} boundary`, manifest.category];

    return {
      slug,
      title,
      description,
      section: "components",
      status: manifestStatusToLabStatus(manifest.status),
      category: manifest.category,
      tags,
      registryId: manifest.id,
      preview: {
        label: `${title} preview`,
        description: `Live preview for ${manifest.exportName}.`,
      },
      studio: {
        templateKind: "component",
        operatorValue: description,
        remixPrompts: [
          `Remix ${title} for a dense command surface.`,
          `Compare ${title} across default, disabled, and exception states.`,
        ],
        canvasPreset: "Component specimen artboard",
        properties: {
          viewport: "Responsive component frame",
          density: getManifestDensity(manifest.category),
          motion: "Primitive-defined interaction motion",
          dataState: `${manifest.status} lifecycle sample`,
          tokenUsage: "App primitive semantic tokens",
          source: manifest.sourcePath,
          exportReadiness:
            manifest.status === "approved"
              ? "Ready for React and design spec export"
              : "Prototype export only until approved",
        },
        exportTargets: ["React import", "Design spec", "Preview URL"],
        anatomy,
        evidence: [
          manifest.sourcePath,
          `${manifest.status} manifest lifecycle`,
          ...manifest.usage.avoidWhen.slice(0, 1),
        ],
      },
    } satisfies InterfaceLabItem;
  });
}

function getManifestDensity(category: string) {
  return category === "primitive" ? "Balanced" : "Compact";
}
