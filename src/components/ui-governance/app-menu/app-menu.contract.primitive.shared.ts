/**
 * @afenda-owner app-menu
 * @afenda-subject contract
 * @afenda-artifact primitive
 * @afenda-boundary shared
 * @afenda-description Shared explicit primitive contract for app-menu client and manifest shared boundary
 */

export const appMenuControlSourcePath =
  "@/components/ui-governance/app-menu/app-menu.control.primitive.client";

export const appMenuSizeValues = ["md", "sm"] as const;
export type AppMenuSize = (typeof appMenuSizeValues)[number];

export const appMenuRequiredPropNames = ["children"] as const;

export const appMenuOptionalPropNames = [
  "aria-describedby",
  "aria-details",
  "aria-label",
  "aria-labelledby",
  "autoFocus",
  "className",
  "defaultSelectedKeys",
  "dependencies",
  "disabledKeys",
  "disallowEmptySelection",
  "escapeKeyBehavior",
  "id",
  "items",
  "onAction",
  "onClose",
  "onSelectionChange",
  "render",
  "renderEmptyState",
  "selectedKeys",
  "selectionMode",
  "shouldCloseOnSelect",
  "shouldFocusWrap",
  "size",
  "slot",
  "style",
] as const;

export const appMenuReactAriaPrimitives = [
  "Menu",
  "MenuItem",
  "MenuSection",
  "MenuTrigger",
  "SubmenuTrigger",
  "Popover",
  "Header",
  "Separator",
  "Text",
] as const;

export const appMenuCompositionContract = {
  requiresChildren: true,
  requiredElements: ["AppMenuItem children or an item renderer"],
  optionalElements: [
    "AppMenuSection",
    "AppMenuHeader",
    "AppMenuSeparator",
    "AppMenuText slot='description'",
    "AppMenuKeyboard",
    "AppSubmenuTrigger",
  ],
  notes: [
    "AppMenu owns the menu surface, item chrome, submenu shell, and trigger popover treatment for governed command and action lists.",
    "Use AppMenuTrigger and AppSubmenuTrigger instead of rebuilding menu popover behavior at feature boundaries.",
    "Keep menu item children non-interactive; use textual content, decorative icons, and shortcut hints only.",
  ],
} as const;

export const appMenuTokenContract = {
  semanticColors: [
    "--color-accent",
    "--color-accent-strong",
    "--color-border",
    "--color-field",
    "--color-field-hover",
    "--color-field-strong",
    "--color-foreground",
    "--color-foreground-muted",
  ] as const,
  radii: ["--radius-control", "--radius-panel"] as const,
  typography: ["--text-body-sm", "--text-meta"] as const,
} as const;
