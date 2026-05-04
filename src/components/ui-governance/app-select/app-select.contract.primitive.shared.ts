/**
 * @afenda-owner app-select
 * @afenda-subject contract
 * @afenda-artifact primitive
 * @afenda-boundary shared
 * @afenda-description Shared explicit primitive contract for app-select client and manifest shared boundary
 */

export const appSelectControlSourcePath =
  "@/components/ui-governance/app-select/app-select.control.primitive.client";

export const appSelectSizeValues = ["md", "sm"] as const;
export type AppSelectSize = (typeof appSelectSizeValues)[number];

export const appSelectRequiredPropNames = ["children"] as const;

export const appSelectOptionalPropNames = [
  "allowsEmptyCollection",
  "aria-describedby",
  "aria-details",
  "aria-label",
  "aria-labelledby",
  "autoComplete",
  "autoFocus",
  "className",
  "defaultOpen",
  "defaultValue",
  "description",
  "disabledKeys",
  "errorMessage",
  "excludeFromTabOrder",
  "form",
  "id",
  "isDisabled",
  "isInvalid",
  "isOpen",
  "isRequired",
  "items",
  "label",
  "listBoxClassName",
  "name",
  "onBlur",
  "onChange",
  "onFocus",
  "onFocusChange",
  "onKeyDown",
  "onKeyUp",
  "onOpenChange",
  "placeholder",
  "popoverClassName",
  "render",
  "selectionMode",
  "shouldCloseOnSelect",
  "size",
  "slot",
  "style",
  "triggerClassName",
  "validate",
  "validationBehavior",
  "value",
  "valueClassName",
] as const;

export const appSelectReactAriaPrimitives = [
  "Select",
  "Button",
  "SelectValue",
  "Popover",
  "ListBox",
  "Label",
  "Text",
  "FieldError",
  "ListBoxItem",
  "ListBoxSection",
  "Header",
] as const;

export const appSelectCompositionContract = {
  requiresChildren: true,
  requiredElements: ["AppSelectItem children or an item renderer"],
  optionalElements: [
    "AppSelectSection",
    "AppSelectHeader",
    "AppSelectText slot='description'",
  ],
  notes: [
    "AppSelect owns the label, trigger button, selected value presentation, popover shell, and list surface for governed choice workflows.",
    "Provide label, aria-label, or aria-labelledby so the selection control has an explicit accessible name.",
    "Use AppSelectItem and section helpers for governed option chrome instead of rebuilding list row treatment at feature boundaries.",
  ],
} as const;

export const appSelectTokenContract = {
  semanticColors: [
    "--color-border-strong",
    "--color-danger",
    "--color-field",
    "--color-field-hover",
    "--color-foreground",
    "--color-foreground-muted",
  ] as const,
  radii: ["--radius-control", "--radius-panel"] as const,
  typography: ["--text-body-sm", "--text-label", "--text-meta"] as const,
} as const;
