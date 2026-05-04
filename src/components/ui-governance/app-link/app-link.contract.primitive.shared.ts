/**
 * @afenda-owner app-link
 * @afenda-subject contract
 * @afenda-artifact primitive
 * @afenda-boundary shared
 * @afenda-description Shared explicit primitive contract for app-link client and manifest shared boundary
 */

export const appLinkControlSourcePath =
  "@/components/ui-governance/app-link/app-link.control.primitive.client";

export const appLinkToneValues = ["accent", "neutral"] as const;
export type AppLinkTone = (typeof appLinkToneValues)[number];

export const appLinkSizeValues = ["default", "compact"] as const;
export type AppLinkSize = (typeof appLinkSizeValues)[number];

export const appLinkRequiredPropNames = [] as const;

export const appLinkOptionalPropNames = [
  "aria-describedby",
  "aria-details",
  "aria-label",
  "aria-labelledby",
  "autoFocus",
  "children",
  "className",
  "download",
  "href",
  "hrefLang",
  "id",
  "isDisabled",
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
  "ping",
  "referrerPolicy",
  "rel",
  "render",
  "routerOptions",
  "size",
  "slot",
  "style",
  "target",
  "tone",
  "translate",
] as const;

export const appLinkReactAriaPrimitives = ["Link"] as const;

export const appLinkCompositionContract = {
  requiresChildren: false,
  requiredElements: [],
  optionalElements: ["visible link text", "icon-only accessible label"],
  notes: [
    "AppLink owns the shared inline navigation treatment for ERP routes, supporting resources, and low-noise contextual navigation.",
    "Use href for navigation and onPress only for link semantics that do not navigate through a URL.",
    "Provide visible link text whenever practical; icon-only links must provide aria-label or aria-labelledby.",
  ],
} as const;

export const appLinkTokenContract = {
  semanticColors: [] as const,
  radii: [] as const,
  typography: [] as const,
} as const;
