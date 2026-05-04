/**
 * @afenda-owner app-toolbar
 * @afenda-subject ui
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared manifest entry for AppToolbar ui governance
 */
import { defineApprovedComponentManifest } from "../governance.ui.manifest.shared";
import {
  appToolbarCompositionContract,
  appToolbarControlSourcePath,
  appToolbarDensityValues,
  appToolbarOptionalPropNames,
  appToolbarReactAriaPrimitives,
  appToolbarRequiredPropNames,
  appToolbarTokenContract,
} from "./app-toolbar.contract.primitive.shared";

export const appToolbarManifest = defineApprovedComponentManifest({
  id: "app-toolbar",
  owner: "components",
  exportName: "AppToolbar",
  status: "review",

  category: "component",
  boundary: "client",

  sourcePath: appToolbarControlSourcePath,

  styleSources: [
    {
      type: "cva",
      sourcePath: "@/components/ui-governance/app-toolbar/app-toolbar.control.primitive.client",
      exportName: "appToolbarVariants",
    },
  ],
  reactAriaPrimitives: [...appToolbarReactAriaPrimitives],
  cva: {
    appToolbarVariants: {
      required: true,
      variants: {
        density: {
          values: [...appToolbarDensityValues],
          default: "default",
          required: false,
        },
      },
    },
  },

  props: {
    required: [...appToolbarRequiredPropNames],
    optional: [...appToolbarOptionalPropNames],
  },

  composition: {
    requiresChildren: appToolbarCompositionContract.requiresChildren,
    requiredElements: [...appToolbarCompositionContract.requiredElements],
    optionalElements: [...appToolbarCompositionContract.optionalElements],
    notes: [...appToolbarCompositionContract.notes],
  },

  a11y: {
    required: true,
    notes: [
      "Toolbar exposes role toolbar; provide aria-label or aria-labelledby for unnamed strips.",
      "Nested ToggleButtonGroup and Separator inherit orientation from AppToolbar via React Aria context.",
    ],
  },

  usage: {
    useWhen: [
      "Use AppToolbar to group governed controls with roving tabindex and arrow-key navigation.",
    ],
    avoidWhen: [
      "Do not use AppToolbar as a generic flex row when the region is not an operator control strip.",
    ],
  },

  tokens: {
    semanticColors: [...appToolbarTokenContract.semanticColors],
    radii: [...appToolbarTokenContract.radii],
    typography: [...appToolbarTokenContract.typography],
  },

  constraints: [
    "AppToolbar owns default layout, density, and context wiring so toolbars stay consistent across ERP surfaces.",
    "Feature UI should consume this App* primitive instead of importing react-aria-components Toolbar directly.",
  ],

  verdict: {
    cvaCoverage: "verified",
    a11yCoverage: "verified",
    usageCoverage: "verified",
    sourceCoverage: "verified",
  },
});
