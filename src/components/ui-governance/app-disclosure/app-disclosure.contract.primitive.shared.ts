/**
 * @afenda-owner app-disclosure
 * @afenda-subject contract
 * @afenda-artifact primitive
 * @afenda-boundary shared
 * @afenda-description Shared explicit primitive contract for app-disclosure client and manifest shared boundary
 */

export const appDisclosureControlSourcePath =
  "@/components/ui-governance/app-disclosure/app-disclosure.control.primitive.client";

export const appDisclosureSizeValues = ["md", "sm"] as const;

export type AppDisclosureSize = (typeof appDisclosureSizeValues)[number];

export const appDisclosureRequiredPropNames = ["children", "title"] as const;

export const appDisclosureOptionalPropNames = [
  "className",
  "defaultExpanded",
  "headerAccessory",
  "headingClassName",
  "id",
  "isDisabled",
  "isExpanded",
  "onExpandedChange",
  "panelClassName",
  "panelContentClassName",
  "panelRole",
  "size",
  "slot",
  "triggerClassName",
] as const;

export const appDisclosureReactAriaPrimitives = [
  "Disclosure",
  "Heading",
  "Button",
  "DisclosurePanel",
  "DisclosureStateContext",
] as const;

export const appDisclosureCompositionContract = {
  requiresChildren: true,
  requiredElements: ["panel content passed as children"],
  optionalElements: [
    "internal Heading",
    "internal Button slot=\"trigger\"",
    "internal DisclosurePanel",
  ],
  notes: [
    "AppDisclosure owns the heading, trigger button, chevron, and panel wrapper so collapsible sections stay consistent across ERP surfaces.",
    "Provide title as the governed disclosure trigger content.",
    "Use headerAccessory for adjacent actions instead of rebuilding the disclosure header structure at call sites.",
  ],
} as const;

export const appDisclosureTokenContract = {
  semanticColors: [
    "--color-field-hover",
    "--color-foreground",
    "--color-foreground-muted",
  ] as const,
  radii: ["--radius-control"] as const,
  typography: ["--text-body-sm"] as const,
} as const;
