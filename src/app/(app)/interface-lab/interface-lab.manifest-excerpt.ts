/**
 * @afenda-owner interface-lab
 * @afenda-subject manifest-excerpt
 * @afenda-boundary server
 * @afenda-description Serializable governance manifest excerpts for Interface Lab detail pages.
 */
import type { ApprovedComponentManifest } from "@/components/ui-governance/governance.ui.manifest.shared";

export type InterfaceLabManifestExcerpt = {
  id: string;
  exportName: string;
  status: string;
  category: string;
  boundary: string;
  sourcePath: string;
  reactAriaPrimitives: string[];
  useWhen: string[];
  avoidWhen: string[];
  a11yRequired: boolean;
  a11yNotes: string[];
};

export function toInterfaceLabManifestExcerpt(
  manifest: ApprovedComponentManifest,
): InterfaceLabManifestExcerpt {
  return {
    id: manifest.id,
    exportName: manifest.exportName,
    status: manifest.status,
    category: manifest.category,
    boundary: manifest.boundary,
    sourcePath: manifest.sourcePath,
    reactAriaPrimitives: [...manifest.reactAriaPrimitives],
    useWhen: [...manifest.usage.useWhen],
    avoidWhen: [...manifest.usage.avoidWhen],
    a11yRequired: manifest.a11y.required,
    a11yNotes: [...manifest.a11y.notes],
  };
}
