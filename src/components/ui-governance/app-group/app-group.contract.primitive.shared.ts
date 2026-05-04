/**
 * @afenda-owner app-group
 * @afenda-subject contract
 * @afenda-artifact primitive
 * @afenda-boundary shared
 * @afenda-description Shared explicit primitive contract for app-group client and manifest shared boundary
 */

export const appGroupControlSourcePath =
  "@/components/ui-governance/app-group/app-group.control.primitive.client";

export const appGroupLayoutValues = ["inline", "stack"] as const;
export type AppGroupLayout = (typeof appGroupLayoutValues)[number];

export const appGroupDensityValues = ["default", "compact"] as const;
export type AppGroupDensity = (typeof appGroupDensityValues)[number];

export const appGroupRequiredPropNames = ["children"] as const;

export const appGroupOptionalPropNames = [
  "aria-describedby",
  "aria-details",
  "aria-label",
  "aria-labelledby",
  "className",
  "density",
  "dir",
  "hidden",
  "id",
  "isDisabled",
  "isInvalid",
  "isReadOnly",
  "lang",
  "layout",
  "onBlur",
  "onFocus",
  "onHoverChange",
  "onHoverEnd",
  "onHoverStart",
  "onKeyDown",
  "onKeyUp",
  "render",
  "role",
  "slot",
  "style",
  "tabIndex",
  "translate",
] as const;

export const appGroupReactAriaPrimitives = ["Group"] as const;

export const appGroupCompositionContract = {
  requiresChildren: true,
  requiredElements: ["Related governed input, action, or other explicit control children"],
  optionalElements: ["inline separators", "trailing inline action", "supporting hidden semantic label"],
  notes: [
    "AppGroup owns the shared shell for adjacent or stacked related controls so focus, invalid, disabled, and read-only states stay visually unified.",
    "Use AppGroup for segmented entry and compound control surfaces rather than as a generic layout div.",
    "Prefer explicit child controls with their own labels when the group does not have a standalone visible label.",
  ],
} as const;

export const appGroupTokenContract = {
  semanticColors: [] as const,
  radii: [] as const,
  typography: [] as const,
} as const;
