/**
 * @afenda-owner app-combo-box
 * @afenda-subject contract
 * @afenda-artifact primitive
 * @afenda-boundary shared
 * @afenda-description Shared explicit primitive contract for app-combo-box client and manifest shared boundary
 */

export const appComboBoxControlSourcePath =
  "@/components/ui-governance/app-combo-box/app-combo-box.control.primitive.client";

export const appComboBoxSizeValues = ["md", "sm"] as const;
export type AppComboBoxSize = (typeof appComboBoxSizeValues)[number];

export const appComboBoxRequiredPropNames = ["children"] as const;

export const appComboBoxOptionalPropNames = [
  "allowsCustomValue",
  "allowsEmptyCollection",
  "aria-describedby",
  "aria-details",
  "aria-label",
  "aria-labelledby",
  "autoFocus",
  "className",
  "defaultFilter",
  "defaultInputValue",
  "defaultItems",
  "defaultValue",
  "description",
  "disabledKeys",
  "errorMessage",
  "form",
  "formValue",
  "id",
  "inputClassName",
  "inputValue",
  "isDisabled",
  "isInvalid",
  "isReadOnly",
  "isRequired",
  "items",
  "label",
  "listBoxClassName",
  "menuTrigger",
  "name",
  "onBlur",
  "onChange",
  "onFocus",
  "onFocusChange",
  "onInputChange",
  "onKeyDown",
  "onKeyUp",
  "onOpenChange",
  "placeholder",
  "popoverClassName",
  "selectionMode",
  "shouldFocusWrap",
  "size",
  "slot",
  "validate",
  "validationBehavior",
  "value",
  "valueChildren",
  "valueClassName",
  "valuePlaceholder",
] as const;

export const appComboBoxItemRequiredPropNames = [] as const;

export const appComboBoxItemOptionalPropNames = [
  "aria-label",
  "children",
  "className",
  "href",
  "id",
  "isDisabled",
  "onAction",
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
  "target",
  "textValue",
  "value",
] as const;

export const appComboBoxSectionRequiredPropNames = ["children"] as const;

export const appComboBoxSectionOptionalPropNames = [
  "className",
  "headerClassName",
  "id",
  "items",
  "title",
] as const;

export const appComboBoxReactAriaPrimitives = [
  "ComboBox",
  "Label",
  "Input",
  "Button",
  "ComboBoxValue",
  "Text",
  "FieldError",
  "Popover",
  "ListBox",
  "ListBoxItem",
  "ListBoxSection",
  "Header",
] as const;

export const appComboBoxCompositionContract = {
  requiresChildren: true,
  requiredElements: [
    "Static AppComboBoxItem children, AppComboBoxSection children, or a render function that returns them",
  ],
  optionalElements: [
    "internal Label",
    "internal Input",
    "internal Button",
    "internal ComboBoxValue for multiple selection",
    "internal Text slot=\"description\"",
    "internal FieldError",
    "internal Popover",
    "internal ListBox",
  ],
  notes: [
    "AppComboBox owns the field, trigger, popover, and listbox shell so choice workflows stay consistent across the ERP.",
    "Use AppComboBoxItem for options and AppComboBoxSection for grouped collections instead of composing raw React Aria listbox pieces in feature code.",
    "Provide label, aria-label, or aria-labelledby so the editable combobox input has an explicit accessible name.",
  ],
} as const;

export const appComboBoxTokenContract = {
  semanticColors: [
    "--color-accent",
    "--color-accent-foreground",
    "--color-danger",
    "--color-field-hover",
    "--color-foreground",
    "--color-foreground-muted",
    "--color-surface-raised",
  ] as const,
  radii: ["--radius-control"] as const,
  typography: ["--text-body-sm", "--text-label", "--text-meta"] as const,
} as const;
