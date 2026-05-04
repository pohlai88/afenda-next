/**
 * @afenda-owner app-form
 * @afenda-subject contract
 * @afenda-artifact primitive
 * @afenda-boundary shared
 * @afenda-description Shared explicit primitive contract for app-form client and manifest shared boundary
 */

export const appFormControlSourcePath =
  "@/components/ui-governance/app-form/app-form.control.primitive.client";

export const appFormDensityValues = ["default", "compact"] as const;
export type AppFormDensity = (typeof appFormDensityValues)[number];

export const appFormRequiredPropNames = ["children"] as const;

export const appFormOptionalPropNames = [
  "action",
  "aria-describedby",
  "aria-details",
  "aria-label",
  "aria-labelledby",
  "autoCapitalize",
  "autoComplete",
  "className",
  "density",
  "encType",
  "id",
  "method",
  "onInvalid",
  "onReset",
  "onSubmit",
  "render",
  "role",
  "slot",
  "style",
  "target",
  "validationBehavior",
  "validationErrors",
] as const;

export const appFormReactAriaPrimitives = ["Form"] as const;

export const appFormCompositionContract = {
  requiresChildren: true,
  requiredElements: ["Governed form field, grouped action, or other explicit form content children"],
  optionalElements: ["validation summary alert region", "inline action row"],
  notes: [
    "AppForm owns the shared vertical form layout so governed fields and actions stay consistent across ERP entry flows.",
    "Treat the form as the canonical submission and validation boundary rather than a generic layout wrapper.",
    "Use validationErrors, onInvalid, and explicit action rows when workflows need server validation feedback or controlled error focus behavior.",
  ],
} as const;

export const appFormTokenContract = {
  semanticColors: [] as const,
  radii: [] as const,
  typography: [] as const,
} as const;
