/**
 * @afenda-owner app-tabs
 * @afenda-subject contract
 * @afenda-artifact primitive
 * @afenda-boundary shared
 * @afenda-description Shared explicit primitive contract for app-tabs client and manifest shared boundary
 */

export const appTabsControlSourcePath =
  "@/components/ui-governance/app-tabs/app-tabs.control.primitive.client";

export const appTabsSizeValues = ["md", "sm"] as const;
export type AppTabsSize = (typeof appTabsSizeValues)[number];

export const appTabsOrientationValues = ["horizontal", "vertical"] as const;
export type AppTabsOrientation = (typeof appTabsOrientationValues)[number];

export const appTabsRequiredPropNames = ["children"] as const;

export const appTabsOptionalPropNames = [
  "aria-describedby",
  "aria-details",
  "aria-label",
  "aria-labelledby",
  "className",
  "defaultSelectedKey",
  "disabledKeys",
  "id",
  "isDisabled",
  "keyboardActivation",
  "onSelectionChange",
  "orientation",
  "render",
  "selectedKey",
  "size",
  "slot",
  "style",
] as const;

export const appTabsReactAriaPrimitives = [
  "Tabs",
  "TabList",
  "TabPanels",
  "TabPanel",
  "Tab",
  "SelectionIndicator",
] as const;

export const appTabsCompositionContract = {
  requiresChildren: true,
  requiredElements: [
    "AppTabList as a direct child",
    "AppTabPanels or AppTabPanel as a direct child",
  ],
  optionalElements: ["AppTabPanels", "AppTabPanel"],
  notes: [
    "AppTabs owns the navigation shell, tab chrome, selection indicator, and panel surface for governed section switching.",
    "Provide aria-label or aria-labelledby on AppTabList so the tab navigation has an explicit accessible name.",
    "Keep tab navigation and panel content explicit so operators can scan current context and switch sections without ambiguity.",
  ],
} as const;

export const appTabsTokenContract = {
  semanticColors: [
    "--color-accent",
    "--color-accent-ring",
    "--color-border",
    "--color-foreground",
    "--color-foreground-muted",
    "--color-surface-raised",
  ] as const,
  radii: ["--radius-control", "--radius-panel"] as const,
  typography: ["--text-body-sm"] as const,
} as const;
