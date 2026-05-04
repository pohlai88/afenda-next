/**
 * @afenda-owner app-switch
 * @afenda-subject contract
 * @afenda-artifact primitive
 * @afenda-boundary shared
 * @afenda-description Shared explicit primitive contract for app-switch client and manifest shared boundary
 */

export const appSwitchControlSourcePath =
  "@/components/ui-governance/app-switch/app-switch.control.primitive.client";

export const appSwitchSizeValues = ["md", "sm"] as const;
export type AppSwitchSize = (typeof appSwitchSizeValues)[number];

export const appSwitchRequiredPropNames = [] as const;

export const appSwitchOptionalPropNames = [
  "aria-controls",
  "aria-describedby",
  "aria-details",
  "aria-label",
  "aria-labelledby",
  "autoFocus",
  "children",
  "className",
  "defaultSelected",
  "excludeFromTabOrder",
  "form",
  "id",
  "inputRef",
  "isDisabled",
  "isReadOnly",
  "isSelected",
  "name",
  "onBlur",
  "onChange",
  "onFocus",
  "onFocusChange",
  "onHoverChange",
  "onHoverEnd",
  "onHoverStart",
  "onKeyDown",
  "onKeyUp",
  "size",
  "slot",
  "value",
] as const;

export const appSwitchReactAriaPrimitives = ["Switch"] as const;

export const appSwitchCompositionContract = {
  requiresChildren: false,
  requiredElements: [],
  optionalElements: [],
  notes: [
    "AppSwitch owns the binary track and handle chrome for governed on or off settings.",
    "Provide visible label content or aria-label or aria-labelledby so the setting remains explicit to operators and assistive technology.",
    "Prefer AppSwitch for durable setting toggles, not for transient actions or multi-choice workflows.",
  ],
} as const;

export const appSwitchTokenContract = {
  semanticColors: [
    "--color-accent",
    "--color-accent-foreground",
    "--color-accent-ring",
    "--color-border",
    "--color-border-strong",
    "--color-field",
    "--color-field-hover",
    "--color-foreground",
    "--color-foreground-muted",
    "--color-surface-raised",
  ] as const,
  radii: [] as const,
  typography: ["--text-body-sm"] as const,
} as const;
