/**
 * @afenda-owner governance
 * @afenda-subject ui
 * @afenda-artifact types
 * @afenda-boundary shared
 * @afenda-description Shared governance TypeScript types for manifest contracts without Zod imports
 *
 * This file is the public TypeScript contract for UI governance consumers.
 *
 * Rules:
 * - Type-only exports only.
 * - No runtime values.
 * - No Zod imports in consuming code.
 * - Use narrow manifest picks in props instead of `Record<string, unknown>`.
 *
 * @see ./governance.ui.registry.shared.ts
 */

export type {
  ApprovedComponentManifest as GovernedComponentManifest,
  GovernedManifestIdentity,
  ManifestBoundary as GovernedManifestBoundary,
  ManifestCategory as GovernedManifestCategory,
  ManifestCoverage as GovernedManifestCoverage,
  ManifestLifecycleStatus as GovernedManifestStatus,
  ManifestStyleSource as GovernedStyleSource,
  ManifestVerdict as GovernedManifestVerdict,
} from "./governance.ui.manifest.shared";
