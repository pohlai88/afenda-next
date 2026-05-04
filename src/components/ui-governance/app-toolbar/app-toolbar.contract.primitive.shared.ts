/**
 * @afenda-owner app-toolbar
 * @afenda-subject contract
 * @afenda-artifact primitive
 * @afenda-boundary shared
 * @afenda-description Shared explicit primitive contract for app-toolbar client and manifest shared boundary
 */

export const appToolbarControlSourcePath =
  "@/components/ui-governance/app-toolbar/app-toolbar.control.primitive.client";

export const appToolbarDensityValues = ["default", "compact"] as const;
export type AppToolbarDensity = (typeof appToolbarDensityValues)[number];

export const appToolbarRequiredPropNames = ["children"] as const;

export const appToolbarOptionalPropNames = [
  "aria-describedby",
  "aria-details",
  "aria-label",
  "aria-labelledby",
  "className",
  "density",
  "orientation",
  "render",
  "slot",
  "style",
] as const;

export const appToolbarReactAriaPrimitives = [
  "Toolbar",
  "ToggleButtonGroup",
  "Separator",
] as const;

export const appToolbarCompositionContract = {
  requiresChildren: true,
  requiredElements: [
    "Interactive toolbar items (e.g. AppButton, AppToggleButtonGroup, AppSeparator)",
  ],
  optionalElements: [] as const,
  notes: [
    "AppToolbar wraps Toolbar with ToggleButtonGroupContext and SeparatorContext so nested groups and separators inherit toolbar orientation.",
    "Provide aria-label or aria-labelledby on the toolbar when no visible title names the control strip.",
  ],
} as const;

export const appToolbarTokenContract = {
  semanticColors: ["--color-border", "--color-foreground"] as const,
  radii: [] as const,
  typography: [] as const,
} as const;
