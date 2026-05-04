/**
 * @afenda-owner app-disclosure-group
 * @afenda-subject contract
 * @afenda-artifact primitive
 * @afenda-boundary shared
 * @afenda-description Shared explicit primitive contract for app-disclosure-group client and manifest shared boundary
 */

export const appDisclosureGroupControlSourcePath =
  "@/components/ui-governance/app-disclosure-group/app-disclosure-group.control.primitive.client";

export const appDisclosureGroupSizeValues = ["md", "sm"] as const;

export type AppDisclosureGroupSize =
  (typeof appDisclosureGroupSizeValues)[number];

export const appDisclosureGroupRequiredPropNames = ["children"] as const;

export const appDisclosureGroupOptionalPropNames = [
  "allowsMultipleExpanded",
  "className",
  "defaultExpandedKeys",
  "expandedKeys",
  "id",
  "isDisabled",
  "onExpandedChange",
  "size",
] as const;

export const appDisclosureGroupReactAriaPrimitives = [
  "DisclosureGroup",
  "Disclosure",
] as const;

export const appDisclosureGroupCompositionContract = {
  requiresChildren: true,
  requiredElements: ["AppDisclosure as a direct child"],
  optionalElements: [],
  notes: [
    "AppDisclosureGroup keeps grouped disclosure children explicit so accordion structure remains easy to scan and audit.",
    "Use AppDisclosure children instead of raw React Aria Disclosure nodes so grouped sections stay inside the governed App* boundary.",
  ],
} as const;

export const appDisclosureGroupTokenContract = {
  semanticColors: [] as const,
  radii: [] as const,
  typography: [] as const,
} as const;
