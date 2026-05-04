/**
 * @afenda-owner app-progress-bar
 * @afenda-subject contract
 * @afenda-artifact primitive
 * @afenda-boundary shared
 * @afenda-description Shared explicit primitive contract for app-progress-bar client and manifest shared boundary
 */

export const appProgressBarControlSourcePath =
  "@/components/ui-governance/app-progress-bar/app-progress-bar.control.primitive.client";

export const appProgressBarSizeValues = ["md", "sm"] as const;
export type AppProgressBarSize = (typeof appProgressBarSizeValues)[number];

export const appProgressBarRequiredPropNames = [] as const;

export const appProgressBarOptionalPropNames = [
  "aria-describedby",
  "aria-details",
  "aria-label",
  "aria-labelledby",
  "className",
  "formatOptions",
  "id",
  "isIndeterminate",
  "label",
  "maxValue",
  "minValue",
  "render",
  "size",
  "slot",
  "style",
  "value",
  "valueLabel",
] as const;

export const appProgressBarReactAriaPrimitives = [
  "ProgressBar",
  "Label",
] as const;

export const appProgressBarCompositionContract = {
  requiresChildren: false,
  requiredElements: [],
  optionalElements: ["Label"],
  notes: [
    "AppProgressBar owns the progress surface, inline label/value row, and track/fill treatment for determinate and indeterminate operational work.",
    "Provide label, aria-label, or aria-labelledby so operators and assistive technology can identify the operation being tracked.",
    "Use indeterminate progress only when completion is unknown; determinate progress should prefer explicit values and ranges.",
  ],
} as const;

export const appProgressBarTokenContract = {
  semanticColors: [
    "--color-accent",
    "--color-border",
    "--color-field",
    "--color-foreground",
    "--color-foreground-muted",
  ] as const,
  radii: [] as const,
  typography: ["--text-body-sm", "--text-label", "--text-meta"] as const,
} as const;
