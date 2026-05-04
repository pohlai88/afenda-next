/**
 * @afenda-owner app-separator
 * @afenda-subject contract
 * @afenda-artifact primitive
 * @afenda-boundary shared
 * @afenda-description Shared explicit primitive contract for app-separator client and manifest shared boundary
 */

export const appSeparatorControlSourcePath =
  "@/components/ui-governance/app-separator/app-separator.control.primitive.client";

export const appSeparatorOrientationValues = [
  "horizontal",
  "vertical",
] as const;

export type AppSeparatorOrientation =
  (typeof appSeparatorOrientationValues)[number];

export const appSeparatorRequiredPropNames = [] as const;

export const appSeparatorOptionalPropNames = [
  "aria-describedby",
  "aria-details",
  "aria-label",
  "aria-labelledby",
  "className",
  "elementType",
  "id",
  "orientation",
  "render",
  "slot",
  "style",
] as const;

export const appSeparatorReactAriaPrimitives = ["Separator"] as const;

export const appSeparatorCompositionContract = {
  requiresChildren: false,
  requiredElements: [],
  optionalElements: [],
  notes: [
    "AppSeparator owns the governed divider styling for horizontal and vertical content grouping across ERP surfaces.",
    "Use AppSeparator when a semantic divider clarifies sections, item groups, or adjacent utility regions without introducing extra layout markup.",
  ],
} as const;

export const appSeparatorTokenContract = {
  semanticColors: ["--color-border"] as const,
  radii: [] as const,
  typography: [] as const,
} as const;
