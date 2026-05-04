/**
 * @afenda-owner app-breadcrumbs
 * @afenda-subject contract
 * @afenda-artifact primitive
 * @afenda-boundary shared
 * @afenda-description Shared explicit primitive contract for app-breadcrumbs client and manifest shared boundary
 */

export const appBreadcrumbsControlSourcePath =
  "@/components/ui-governance/app-breadcrumbs/app-breadcrumbs.control.primitive.client";

export const appBreadcrumbsSizeValues = ["default", "compact"] as const;
export type AppBreadcrumbsSize = (typeof appBreadcrumbsSizeValues)[number];

export const appBreadcrumbsRequiredPropNames = [] as const;

export const appBreadcrumbsOptionalPropNames = [
  "children",
  "className",
  "isDisabled",
  "items",
  "onAction",
  "render",
  "size",
  "slot",
  "style",
] as const;

export const appBreadcrumbRequiredPropNames = ["children"] as const;

export const appBreadcrumbOptionalPropNames = [
  "className",
  "download",
  "href",
  "id",
  "linkClassName",
  "ping",
  "referrerPolicy",
  "rel",
  "routerOptions",
  "separator",
  "size",
  "target",
] as const;

export const appBreadcrumbsReactAriaPrimitives = [
  "Breadcrumbs",
  "Breadcrumb",
  "Link",
] as const;

export const appBreadcrumbsCompositionContract = {
  requiresChildren: true,
  requiredElements: [
    "Static AppBreadcrumb children or a render function that returns AppBreadcrumb",
  ],
  optionalElements: ["nav[aria-label] wrapper owned by the route surface"],
  notes: [
    "AppBreadcrumbs owns the ordered collection container and AppBreadcrumb owns each clickable crumb item.",
    "When breadcrumbs represent page navigation, place the primitive inside a nav landmark with an aria-label at the route boundary.",
    "Use static children for known route hierarchies and the collection API for dynamic breadcrumb trails.",
  ],
} as const;

export const appBreadcrumbsTokenContract = {
  semanticColors: [] as const,
  radii: [] as const,
  typography: ["--text-body", "--text-label"] as const,
} as const;
