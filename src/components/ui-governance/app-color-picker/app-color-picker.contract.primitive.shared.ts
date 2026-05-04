/**
 * @afenda-owner app-color-picker
 * @afenda-subject contract
 * @afenda-artifact primitive
 * @afenda-boundary shared
 * @afenda-description Shared explicit primitive contract for app-color-picker client and manifest shared boundary
 */

export const appColorPickerControlSourcePath =
  "@/components/ui-governance/app-color-picker/app-color-picker.control.primitive.client";

export const appColorPickerSizeValues = ["md", "sm"] as const;

export type AppColorPickerSize = (typeof appColorPickerSizeValues)[number];

export const appColorPickerRequiredPropNames = [] as const;

export const appColorPickerOptionalPropNames = [
  "children",
  "defaultValue",
  "label",
  "onChange",
  "panelClassName",
  "size",
  "slot",
  "triggerAriaLabel",
  "triggerClassName",
  "value",
] as const;

export const appColorPickerReactAriaPrimitives = [
  "ColorPicker",
  "Dialog",
  "DialogTrigger",
  "Button",
  "Popover",
] as const;

export const appColorPickerCompositionContract = {
  requiresChildren: false,
  requiredElements: [],
  optionalElements: ["custom picker panel children"],
  notes: [
    "AppColorPicker owns the trigger button, swatch preview, and popover shell for governed color selection workflows.",
    "If children are omitted, the primitive renders a default HSB area, hue slider, and hex field layout.",
    "Provide label or triggerAriaLabel so the trigger button has an explicit accessible name.",
  ],
} as const;

export const appColorPickerTokenContract = {
  semanticColors: [
    "--color-border-strong",
    "--color-field",
    "--color-field-hover",
    "--color-foreground",
    "--color-foreground-muted",
    "--color-surface-raised",
  ] as const,
  radii: ["--radius-control", "--radius-panel"] as const,
  typography: ["--text-body-sm", "--text-label", "--text-meta"] as const,
} as const;
