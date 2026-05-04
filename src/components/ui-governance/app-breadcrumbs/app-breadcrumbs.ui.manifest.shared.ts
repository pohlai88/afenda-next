/**
 * @afenda-owner app-breadcrumbs
 * @afenda-subject ui
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared manifest entry for AppBreadcrumbs ui governance
 */
import { defineApprovedComponentManifest } from "../governance.ui.manifest.shared";
import {
  appBreadcrumbsCompositionContract,
  appBreadcrumbsControlSourcePath,
  appBreadcrumbsOptionalPropNames,
  appBreadcrumbsReactAriaPrimitives,
  appBreadcrumbsRequiredPropNames,
  appBreadcrumbsSizeValues,
  appBreadcrumbsTokenContract,
} from "./app-breadcrumbs.contract.primitive.shared";

export const appBreadcrumbsManifest = defineApprovedComponentManifest({
  id: "app-breadcrumbs",
  owner: "components",
  exportName: "AppBreadcrumbs",
  status: "approved",

  category: "component",
  boundary: "client",

  sourcePath: appBreadcrumbsControlSourcePath,

  styleSources: [
    {
      exportName: "appBreadcrumbsVariants",
      sourcePath: appBreadcrumbsControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appBreadcrumbItemVariants",
      sourcePath: appBreadcrumbsControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appBreadcrumbLinkVariants",
      sourcePath: appBreadcrumbsControlSourcePath,
      type: "cva",
    },
  ],

  reactAriaPrimitives: [...appBreadcrumbsReactAriaPrimitives],

  cva: {
    appBreadcrumbsVariants: {
      required: true,
      variants: {
        size: {
          values: [...appBreadcrumbsSizeValues],
          default: "default",
        },
      },
    },
    appBreadcrumbItemVariants: {
      required: true,
      variants: {
        size: {
          values: [...appBreadcrumbsSizeValues],
          default: "default",
        },
      },
    },
    appBreadcrumbLinkVariants: {
      required: true,
      variants: {
        size: {
          values: [...appBreadcrumbsSizeValues],
          default: "default",
        },
        current: {
          values: ["true", "false"],
          default: "false",
        },
        disabled: {
          values: ["true", "false"],
          default: "false",
        },
      },
    },
  },

  props: {
    required: [...appBreadcrumbsRequiredPropNames],
    optional: [...appBreadcrumbsOptionalPropNames],
  },

  composition: {
    requiresChildren: appBreadcrumbsCompositionContract.requiresChildren,
    requiredElements: [...appBreadcrumbsCompositionContract.requiredElements],
    optionalElements: [...appBreadcrumbsCompositionContract.optionalElements],
    notes: [...appBreadcrumbsCompositionContract.notes],
  },

  a11y: {
    required: true,
    notes: [
      "Use AppBreadcrumb to render each crumb so the current item state and separator behavior stay consistent.",
      "When breadcrumbs are a primary page navigation landmark, wrap the primitive in nav with an aria-label at the route surface.",
      "The current breadcrumb should remain visually present without rendering a trailing separator.",
    ],
  },

  usage: {
    useWhen: [
      "Use for route hierarchy, nested record context, and operator drill-down paths that help users orient within the ERP.",
    ],
    avoidWhen: [
      "Do not use for primary navigation menus, tab navigation, or in-place command actions.",
    ],
  },

  tokens: {
    semanticColors: [...appBreadcrumbsTokenContract.semanticColors],
    radii: [...appBreadcrumbsTokenContract.radii],
    typography: [...appBreadcrumbsTokenContract.typography],
  },

  constraints: [
    "AppBreadcrumbs is the collection boundary and AppBreadcrumb is the only approved shared breadcrumb item helper for this primitive.",
    "Do not import raw React Aria Breadcrumb or Link into feature code when this shared breadcrumb pattern is sufficient.",
    "Keep landmark ownership at the route surface rather than burying nav semantics inside the primitive itself.",
  ],

  verdict: {
    cvaCoverage: "verified",
    a11yCoverage: "verified",
    usageCoverage: "verified",
    sourceCoverage: "verified",
  },
});
