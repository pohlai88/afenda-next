/**
 * @afenda-owner app-toggle-button-group
 * @afenda-subject ui
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared manifest entry for AppToggleButtonGroup ui governance
 */
import { defineApprovedComponentManifest } from "../governance.ui.manifest.shared";
import {
  appToggleButtonGroupCompositionContract,
  appToggleButtonGroupControlSourcePath,
  appToggleButtonGroupOptionalPropNames,
  appToggleButtonGroupReactAriaPrimitives,
  appToggleButtonGroupRequiredPropNames,
  appToggleButtonGroupTokenContract,
  appToggleButtonGroupVisualValues,
} from "./app-toggle-button-group.contract.primitive.shared";

export const appToggleButtonGroupManifest = defineApprovedComponentManifest({
  id: "app-toggle-button-group",
  owner: "components",
  exportName: "AppToggleButtonGroup",
  status: "review",

  category: "component",
  boundary: "client",

  sourcePath: appToggleButtonGroupControlSourcePath,

  styleSources: [
    {
      type: "cva",
      sourcePath:
        "@/components/ui-governance/app-toggle-button-group/app-toggle-button-group.control.primitive.client",
      exportName: "appToggleButtonGroupVariants",
    },
  ],
  reactAriaPrimitives: [...appToggleButtonGroupReactAriaPrimitives],
  cva: {
    appToggleButtonGroupVariants: {
      required: true,
      variants: {
        visual: {
          values: [...appToggleButtonGroupVisualValues],
          default: "toolbar",
          required: false,
        },
      },
    },
  },

  props: {
    required: [...appToggleButtonGroupRequiredPropNames],
    optional: [...appToggleButtonGroupOptionalPropNames],
  },

  composition: {
    requiresChildren: appToggleButtonGroupCompositionContract.requiresChildren,
    requiredElements: [...appToggleButtonGroupCompositionContract.requiredElements],
    optionalElements: [...appToggleButtonGroupCompositionContract.optionalElements],
    notes: [...appToggleButtonGroupCompositionContract.notes],
  },

  a11y: {
    required: true,
    notes: [
      "Provide aria-label or aria-labelledby so the toggle group has an explicit accessible name.",
      "Use selectionMode single or multiple with stable ToggleButton ids for selectedKeys.",
      "With selectionMode single (default), the group is exposed as a radiogroup and items as radio for assistive technologies.",
    ],
  },

  usage: {
    useWhen: [
      "Use AppToggleButtonGroup for governed mutually exclusive or multi-select toggle toolbars.",
    ],
    avoidWhen: [
      "Do not use AppToggleButtonGroup when a radio list, tabs, or a single primary action is clearer.",
    ],
  },

  tokens: {
    semanticColors: [...appToggleButtonGroupTokenContract.semanticColors],
    radii: [...appToggleButtonGroupTokenContract.radii],
    typography: [...appToggleButtonGroupTokenContract.typography],
  },

  constraints: [
    "AppToggleButtonGroup owns default layout and segmented styling so feature code does not fork toggle group chrome.",
    "Feature UI should consume this App* primitive instead of importing react-aria-components ToggleButtonGroup directly.",
  ],

  verdict: {
    cvaCoverage: "verified",
    a11yCoverage: "verified",
    usageCoverage: "verified",
    sourceCoverage: "verified",
  },
});
