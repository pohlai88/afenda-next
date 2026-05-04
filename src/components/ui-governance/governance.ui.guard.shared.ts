/**
 * @afenda-owner governance
 * @afenda-subject ui
 * @afenda-artifact guard
 * @afenda-boundary shared
 * @afenda-description Shared runtime-neutral guard for schema parse registry uniqueness and CSS snapshot
 *
 * Boundary (do not expand without manifest fields to validate):
 * - Zod manifest shape (`safeParseApprovedComponentManifest`)
 * - duplicate `id` / `exportName` across the registry list
 * - CSS snapshot lists are non-empty (evidence the extractor ran — **not** that manifests reference real tokens)
 * - each `styleSources` entry of type `cva` has a matching key under `cva`
 *
 * @see ./governance.ui.registry.shared.ts
 */
import { uiCssGenerated } from "./governance.ui.css-snapshot.shared";
import {
  isKnownUiRadiusToken,
  isKnownUiSemanticColorToken,
  isKnownUiTypographyToken,
} from "./governance.ui.css-snapshot.shared";
import { uiComponentRegistry } from "./governance.ui.registry.shared";
import { safeParseApprovedComponentManifest } from "./governance.ui.manifest.shared";

type UiGuardFindingLevel = "pass" | "warn" | "block";

type UiGuardFinding = {
  level: UiGuardFindingLevel;
  code: string;
  message: string;
  target?: string;
};

/** Keys listed in the generated CSS snapshot (presence check only). */
function collectCssSnapshotTokenKeys(): ReadonlySet<string> {
  return new Set(
    Object.values(uiCssGenerated.tokens).flatMap((tokens) => [...tokens]),
  );
}

export function validateUiGovernance(): UiGuardFinding[] {
  const findings: UiGuardFinding[] = [];
  const cssSnapshotKeys = collectCssSnapshotTokenKeys();
  const ids = new Set<string>();
  const exportNames = new Set<string>();

  if (cssSnapshotKeys.size === 0) {
    findings.push({
      level: "block",
      code: "UI-CSS-SNAPSHOT-001",
      message:
        "CSS snapshot has no token keys — run or wire the globals extractor (this check does not validate manifest token usage).",
    });
  }

  for (const manifest of uiComponentRegistry) {
    const parsed = safeParseApprovedComponentManifest(manifest);

    if (!parsed.success) {
      const finding: UiGuardFinding = {
        level: "block",
        code: "UI-SCHEMA-001",
        message: parsed.error.message,
      };
      if ("id" in manifest && typeof manifest.id === "string") {
        finding.target = manifest.id;
      }
      findings.push(finding);
      continue;
    }

    const checked = parsed.data;

    if (ids.has(checked.id)) {
      findings.push({
        level: "block",
        code: "UI-REGISTRY-001",
        target: checked.id,
        message: `Duplicate manifest id "${checked.id}".`,
      });
    }

    ids.add(checked.id);

    if (exportNames.has(checked.exportName)) {
      findings.push({
        level: "block",
        code: "UI-REGISTRY-002",
        target: checked.id,
        message: `Duplicate manifest exportName "${checked.exportName}".`,
      });
    }

    exportNames.add(checked.exportName);

    for (const source of checked.styleSources) {
      if (source.type === "cva" && !checked.cva[source.exportName]) {
        findings.push({
          level: "block",
          code: "UI-CVA-001",
          target: checked.id,
          message: `Missing CVA contract for style source "${source.exportName}".`,
        });
      }
    }

    for (const token of checked.tokens.semanticColors) {
      if (!isKnownUiSemanticColorToken(token)) {
        findings.push({
          level: "block",
          code: "UI-TOKEN-001",
          target: checked.id,
          message: `Unknown semantic color token "${token}".`,
        });
      }
    }

    for (const token of checked.tokens.radii) {
      if (!isKnownUiRadiusToken(token)) {
        findings.push({
          level: "block",
          code: "UI-TOKEN-002",
          target: checked.id,
          message: `Unknown radius token "${token}".`,
        });
      }
    }

    for (const token of checked.tokens.typography) {
      if (!isKnownUiTypographyToken(token)) {
        findings.push({
          level: "block",
          code: "UI-TOKEN-003",
          target: checked.id,
          message: `Unknown typography token "${token}".`,
        });
      }
    }
  }

  return findings.length
    ? findings
    : [
        {
          level: "pass",
          code: "UI-GOVERNANCE-OK",
          message: "UI governance files are valid.",
        },
      ];
}
