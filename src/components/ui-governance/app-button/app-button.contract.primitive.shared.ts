/**
 * @afenda-owner app-button
 * @afenda-subject contract
 * @afenda-artifact primitive
 * @afenda-boundary shared
 * @afenda-description Shared explicit primitive contract for app-button client and manifest shared boundary
 */

export const appButtonControlSourcePath =
  "@/components/ui-governance/app-button/app-button.control.primitive.client";

export const appButtonVariantValues = [
  "primary",
  "secondary",
  "destructive",
  "quiet",
] as const;
export type AppButtonVariant = (typeof appButtonVariantValues)[number];

export const appButtonSizeValues = ["md", "sm"] as const;
export type AppButtonSize = (typeof appButtonSizeValues)[number];

export const appButtonRequiredPropNames = ["children"] as const;

export const appButtonOptionalPropNames = [
  "aria-controls",
  "aria-current",
  "aria-describedby",
  "aria-details",
  "aria-disabled",
  "aria-expanded",
  "aria-haspopup",
  "aria-label",
  "aria-labelledby",
  "aria-pressed",
  "autoFocus",
  "className",
  "excludeFromTabOrder",
  "form",
  "formAction",
  "formEncType",
  "formMethod",
  "formNoValidate",
  "formTarget",
  "id",
  "isDisabled",
  "isPending",
  "name",
  "onBlur",
  "onFocus",
  "onFocusChange",
  "onHoverChange",
  "onHoverEnd",
  "onHoverStart",
  "onKeyDown",
  "onKeyUp",
  "onPress",
  "onPressChange",
  "onPressEnd",
  "onPressStart",
  "onPressUp",
  "pendingLabel",
  "preventFocusOnPress",
  "slot",
  "size",
  "type",
  "value",
  "variant",
] as const;

export const appButtonReactAriaPrimitives = ["Button"] as const;

export const appButtonCompositionContract = {
  requiresChildren: true,
  requiredElements: ["Visible label, icon, or render-prop content as button children"],
  optionalElements: ["Inline SVG icon", "kbd hint", "pending spinner overlay"],
  notes: [
    "Use AppButton for semantic button actions only; link-looking actions should use AppLink.",
    "Pending state keeps the child label in the DOM with opacity rather than removing it from the accessibility tree.",
    "Prefer onPress over onClick so mouse, keyboard, and touch interactions stay normalized.",
  ],
} as const;

export const appButtonTokenContract = {
  semanticColors: [
    "--color-accent",
    "--color-accent-foreground",
    "--color-border-strong",
    "--color-danger",
    "--color-danger-foreground",
    "--color-field",
    "--color-field-hover",
    "--color-foreground",
    "--color-foreground-muted",
    "--color-surface-raised",
  ] as const,
  radii: ["--radius-control"] as const,
  typography: ["--text-label"] as const,
} as const;
