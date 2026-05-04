/**
 * @afenda-owner app-tooltip
 * @afenda-subject ui
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared manifest entry for AppTooltip ui governance
 */
import { defineApprovedComponentManifest } from "../governance.ui.manifest.shared";
import {
  appTooltipCompositionContract,
  appTooltipControlSourcePath,
  appTooltipOptionalPropNames,
  appTooltipReactAriaPrimitives,
  appTooltipRequiredPropNames,
  appTooltipSizeValues,
  appTooltipTokenContract,
} from "./app-tooltip.contract.primitive.shared";

export const appTooltipManifest = defineApprovedComponentManifest({
  id: "app-tooltip",
  owner: "components",
  exportName: "AppTooltip",
  status: "review",

  category: "component",
  boundary: "client",

  sourcePath: appTooltipControlSourcePath,

  styleSources: [
    {
      type: "cva",
      sourcePath: "@/components/ui-governance/app-tooltip/app-tooltip.control.primitive.client",
      exportName: "appTooltipVariants",
    },
  ],
  reactAriaPrimitives: [...appTooltipReactAriaPrimitives],
  cva: {
    appTooltipVariants: {
      required: true,
      variants: {
        size: {
          values: [...appTooltipSizeValues],
          default: "md",
          required: false,
        },
      },
    },
  },

  props: {
    required: [...appTooltipRequiredPropNames],
    optional: [...appTooltipOptionalPropNames],
  },

  composition: {
    requiresChildren: appTooltipCompositionContract.requiresChildren,
    requiredElements: [...appTooltipCompositionContract.requiredElements],
    optionalElements: [...appTooltipCompositionContract.optionalElements],
    notes: [...appTooltipCompositionContract.notes],
  },

  a11y: {
    required: true,
    notes: [
      "Tooltips do not open on touch; triggers must remain understandable without the tooltip (labels, visible text, or popovers for critical detail).",
      "Use AppTooltipTrigger so focus and hover timing follow React Aria tooltip warmup and cooldown behavior.",
    ],
  },

  usage: {
    useWhen: [
      "Use AppTooltipTrigger + AppTooltip for short supplementary hints on dense ERP chrome (icon-only controls, abbreviations).",
    ],
    avoidWhen: [
      "Do not rely on tooltips for required workflow instructions, validation text, or anything operators cannot recover without hover.",
    ],
  },

  tokens: {
    semanticColors: [...appTooltipTokenContract.semanticColors],
    radii: [...appTooltipTokenContract.radii],
    typography: [...appTooltipTokenContract.typography],
  },

  constraints: [
    "AppTooltip owns the overlay surface, arrow, and default offset; re-export AppTooltipTrigger from the same module for the governed trigger pairing.",
    "Feature UI should consume AppTooltip / AppTooltipTrigger instead of importing react-aria-components Tooltip primitives directly.",
  ],

  verdict: {
    cvaCoverage: "verified",
    a11yCoverage: "verified",
    usageCoverage: "verified",
    sourceCoverage: "verified",
  },
});
